import { React, useState } from 'react' 
import MrtCodeTable from './MrtCodeTable'
import OptionsBar from './OptionsBar'
import './MrtCode.css'

function MrtCode() {
  const [isExpanded, setExpanded] = useState() 

    return <>
    <div className={`tablesContainer ${isExpanded}Border`}>
      <div onClick={()=> setExpanded()} style={{ width: '100%' }}>
         <h3> Station Code | Station Name </h3>
      </div>
      <OptionsBar setExpanded={setExpanded} /> 
      <div className = {isExpanded ? 'visible' : 'hidden'}> 
      {isExpanded === "NE" && <MrtCodeTable selectedTrainLine={"NE"} rows={10} />}
      {isExpanded === "TE" && <MrtCodeTable selectedTrainLine={"TE"} rows={10} />}
      {isExpanded === "NS" && <MrtCodeTable selectedTrainLine={"NS"} rows={10} />}
      {isExpanded === "CC" && <MrtCodeTable selectedTrainLine={"CC"} rows={10} />} 
      {isExpanded === "DT" && <MrtCodeTable selectedTrainLine={"DT"} rows={10} />}
      {isExpanded === "EW" && <MrtCodeTable selectedTrainLine={"EW"} rows={10} />}
      </div>
    </div>
    </>
  }
  
  export default MrtCode;