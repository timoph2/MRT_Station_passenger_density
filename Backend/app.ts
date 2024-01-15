// npm i express dotenv ts-node axios csvtojson typescript @types/express @types/node 
import { SelectedFilters, StationData, CachedResult} from './interfaces';
import express from 'express'
import dotenv from 'dotenv'
import unzipper from 'unzipper'
import csv from 'csv-parser'
import axios from 'axios'
import cors from 'cors'
import fs from 'fs'

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
const corsOptions = {
  // origin: 'http://localhost:3000',
  origin: "http://lta-fe-alb-1597805.ap-southeast-1.elb.amazonaws.com",
  optionsSuccessStatus: 200,
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions))

const cachedResult : CachedResult = {}


app.post('/data', async (req, res) => {
  const { yearMonth, trainLine, time, dayType }: SelectedFilters = req.body;
  console.info(yearMonth, trainLine, time, dayType)
  // Check if data is cached, else make API call
  if (!cachedResult.hasOwnProperty(yearMonth)) {
    try {
      const excelFileUrl:string = 
      await getDownloadUrlFromLTA(yearMonth) 
      await downloadZippedExcelFile(yearMonth, excelFileUrl)
      await readExcelData(yearMonth)
      
    } catch(error) {
      res.json({"Status" : "Obtaining Data failed"})
      return
    }
  }
  
  const selectedStations : StationData[] = filterData(yearMonth, trainLine, time, dayType)
  res.json( sortData(selectedStations, trainLine) )
})

app.get('/health', async (req, res) => {
  res.json({"Status" : "Backend healthy"})
});

app.get('/', async (req, res) => {
  res.json({"Status" : "GET / healthy"})
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port} !`);
});



// -----------------------------------------------------------------------
// -------------------------- /data logic --------------------------------
async function getDownloadUrlFromLTA(yearMonth : string) {
  // Call LTA endpoint to obtain Url to download zipped csv file
  console.log("Obtaining new data")
  console.info(process.env.AccountKey)
  const endpointLTA: string = process.env.endpointLTA + yearMonth
  console.info(endpointLTA)

  const headers = {
      'AccountKey': process.env.AccountKey,  
      'accept': 'application/json',
    };
      
  let excelFileUrl : string = ''
  await axios.get( endpointLTA , { headers })
    .then(response => {
        excelFileUrl = response.data.value[0].Link
        console.log('Excel link obtained:',  excelFileUrl)
    })
    .catch(error => { 
      console.error(`Error getting download Link: ${error.response.data.fault}`)
      throw new Error(`Error getting download Link: ${error.response.data.fault}`)
    })
    return excelFileUrl
  }


  async function downloadZippedExcelFile(yearMonth : string, excelFileUrl : string) {
    try {
      const httpExcelFileUrl = excelFileUrl.replace(/^https/, 'http')
      const responseStream = await axios.get( httpExcelFileUrl, { responseType: 'stream'} )
  
      const writer = fs.createWriteStream(`./${yearMonth}.zip`);
      responseStream.data.pipe(writer);
  
      await new Promise((resolve, reject) => {
          writer.on('finish', resolve);
          writer.on('error', reject);
        });
      console.log('File downloaded successfully.');
  
    } catch (error) {
      console.error(`Error downloading the zip folder: ${error}`)
      throw new Error(`Error downloading the zip folder: ${error}`);
    }
  }


async function readExcelData(yearMonth:string) {
  const currentData: StationData[] = []
  const zipFilePath = `./${yearMonth}.zip`
  const csvFileName = `transport_node_train_${yearMonth}.csv`;

  fs.createReadStream(zipFilePath, { highWaterMark: 256  * 1024 }) 
  .pipe(unzipper.Parse())
  .on('entry', (entry) => {
    const fileName = entry.path;
    if (fileName === csvFileName) {
      entry.pipe(csv())
        .on('data', (row: StationData) => {
          currentData.push(row)
        })
        .on('end', () => {
          console.log(`CSV file '${csvFileName}' has been read.`);
        });
    } else {
      entry.autodrain(); // Skip other files
    }
  })
  .on('error', (err) => {
    console.error('Error reading zip file:', err);
    throw new Error(`Error reading zip file: ${err}`);
  })

  await new Promise(r => setTimeout(r, 500));
  // Cache data
  cachedResult[yearMonth] = currentData
  return 
}


function filterData(yearMonth:string, trainLine:string, time:string, dayType:string) {
  const dataSet = cachedResult[yearMonth]
  const filteredItems = dataSet.filter((stationDetails: StationData) => {
    return stationDetails.TIME_PER_HOUR === time && 
           stationDetails.DAY_TYPE === dayType && 
           stationDetails.PT_CODE.includes(trainLine);
  });
  return filteredItems
}


function sortData(selectedStations : StationData[], trainLine:string) {
  const regexPattern = new RegExp(trainLine + "(\\d{1,2})");    // d{1,2}) get first 2 digits only 

  selectedStations.sort((stationA, stationB) => {
    const stationAcode = stationA.PT_CODE.match(regexPattern)!; // eg match "DT2" or "DT10"
    const stationAcodeNumber = parseInt(stationAcode[1], 10);   // Extract number after "DT"

    const stationBcode = stationB.PT_CODE.match(regexPattern)!; // ! Turns off null warning
    const stationBcodeNumber = parseInt(stationBcode[1], 10)!;  // [1st] match, 10 = parse as number
  
    if (stationAcodeNumber < stationBcodeNumber) { return -1 }
    else { return 1 }
  });

  console.log(selectedStations);
  return selectedStations
}
