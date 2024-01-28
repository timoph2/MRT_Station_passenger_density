import { SelectedFiltersRequest, StationData, CachedResult} from './utils/interfaces';
import { ObtainDataError, DatabaseError } from './utils/errors'
import { Selectedfilter } from "./utils/models";
import { allStationData } from './utils/stationData'
import { collections } from './utils/db'
import express from 'express'
import dotenv from 'dotenv'
import unzipper from 'unzipper'
import csv from 'csv-parser'
import axios from 'axios'
import fs from 'fs'
dotenv.config();

const router = express.Router();
const cachedResult : CachedResult = {}

router.post('/data', async (req, res) => {
  const { yearMonth, trainLine, time, dayType, dateTimeSearched }: SelectedFiltersRequest = req.body;
  console.info(yearMonth, trainLine, time, dayType, dateTimeSearched)

    try {
      if (!cachedResult.hasOwnProperty(yearMonth)) { // if data not cached, then make API call
        const excelFileUrl:string = await getDownloadUrlFromLTA(yearMonth) 
        await downloadZippedExcelFile(yearMonth, excelFileUrl)
        const originalExcelData = await readExcelData(yearMonth)
        await appendStationName(yearMonth, originalExcelData)
      }
      await saveSearchFilter(yearMonth, trainLine, time, dayType, dateTimeSearched)
    } catch (error) {
      handleDataRouteError(error,res)
    }

  const selectedStations : StationData[] = filterData(yearMonth, trainLine, time, dayType)
  res.json( sortData(selectedStations, trainLine) )
})


router.get('/history', async (req, res) => {
  getAllSelectedFilterHistory(res)
});

export default router;


// -----------------------------------------------------------------------
// -------------------------- /data logic --------------------------------

async function getDownloadUrlFromLTA(yearMonth : string) {
  // Call LTA endpoint to obtain Url to download zipped csv file
  console.log("Obtaining new data")
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
      throw new ObtainDataError(`Error getting download Link: ${error.response.data.fault}`)
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
      throw new ObtainDataError(`Error downloading the zip folder: ${error}`);
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
    throw new ObtainDataError(`Error reading zip file: ${err}`);
  })

  await new Promise(r => setTimeout(r, 500));
  return currentData
}


async function appendStationName(yearMonth:string, originalExcelData : StationData[])  {
  const appendedStationNameData = originalExcelData.map(mrtStationData => {
    const mrtStationCode = mrtStationData.PT_CODE
    const stationInfo = allStationData[mrtStationCode];

    if (stationInfo) {
      return {
        ...mrtStationData,
        stationName: stationInfo.stationName, 
      };
    } else {
      return mrtStationData; 
    }
  });

  cachedResult[yearMonth] = appendedStationNameData
  return appendedStationNameData
};


function filterData(yearMonth:string, trainLine:string, time:string, dayType:string) {
  const dataSet = cachedResult[yearMonth]
  const filteredItems = dataSet
  .filter((stationDetails: StationData) => {
    return (
      stationDetails.TIME_PER_HOUR === time &&
      stationDetails.DAY_TYPE === dayType &&
      stationDetails.PT_CODE.includes(trainLine)
    );
  })

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

  console.info(selectedStations);
  return selectedStations
}

// -----------------------------------------------------------------------
// -------------------------- DB operation -------------------------------

async function getAllSelectedFilterHistory(res) {
  try {
    const selectedFilterHistory = (await collections.selectedFilter.find({}).toArray()) as unknown as Selectedfilter[];
     res.status(200).send(selectedFilterHistory);
  } catch (error) {
     res.status(500).send(error.message);
 }
}


async function saveSearchFilter(yearMonth, trainLine, time, dayType, dateTimeSearched) {
  try {
    const newSelectedFilter: Selectedfilter = new Selectedfilter(yearMonth, trainLine, time, dayType, dateTimeSearched);
    const result = await collections.selectedFilter.insertOne(newSelectedFilter);
    console.log('Inserted data: ', result)
  } catch (error) {
    throw new DatabaseError(`Error writing to DB: ${error.message}`)
  }
}

// -----------------------------------------------------------------------
// -------------------------- Error Handling -------------------------------

async function handleDataRouteError(error,res) {
  switch (error) {
    case error instanceof ObtainDataError:
      console.error(error.message);
      res.json({ "Status": "Obtaining Data failed." });
      break;

    case error instanceof DatabaseError:
      console.error("Writing Data to DB failed.", error.message);
      break;

    default:
      console.error(error.message);
      res.json({ "Status": "Something went wrong." });
      break
  }
  return
}
 