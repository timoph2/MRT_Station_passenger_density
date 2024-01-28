import React from 'react' 
import { allStationData } from '../../data/stationData'
import './MrtCodeTable.css'

function MrtCodeTable(props) { 
  const trainData = Object.entries(allStationData[props.selectedTrainLine])
  const rowsPerPage = props.rows | 10
  const numberOfTables = Math.ceil(trainData.length / rowsPerPage);

  const tables = Array.from({ length: numberOfTables }, (_, index) => {
    const start = index * rowsPerPage;
    const end = start + rowsPerPage;
    const currentTrainDataRange = trainData.slice(start, end);

    return (
      <table className="codeTable" key={index}>
        <tbody>
          {currentTrainDataRange.map(([StationCode, details], itemIndex) => (
            <tr key={itemIndex}>
              <td> {StationCode} </td>
              <td> {details.stationName} </td>
            </tr>
          ))}
          </tbody>
      </table>
    );
  });


  return <>
          {tables} 
        </>;
};


export default MrtCodeTable;