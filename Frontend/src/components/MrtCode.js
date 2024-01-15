import React from 'react' 
import MrtCodeTable from './MrtCodeTable'
import './MrtCode.css'

function MrtCode() {
    return <>
    <div>
    <h3> Station Code | Station Name </h3> 
    </div>
      <div className='tablesContainer'> 
        <MrtCodeTable selectedTrainLine={"NE"} rows={50} />
        <MrtCodeTable selectedTrainLine={"TE"} rows={50} />
        <MrtCodeTable selectedTrainLine={"NS"} rows={50} />
        <MrtCodeTable selectedTrainLine={"CC"} rows={50} />
        <MrtCodeTable selectedTrainLine={"DT"} rows={50} />
        <MrtCodeTable selectedTrainLine={"EW"} rows={50} />
      </div>
      </>
  }
  
  export default MrtCode;