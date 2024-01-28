import {React, useState, useEffect} from 'react'
import './History.css'

function History() {
  const [allHistoryData, setAllHistoryData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 

  useEffect( () => {
    // fetch('http://localhost:3001/api/v1/chart/history')
    fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/v1/chart/history`)
      .then(res => {
        return res.json();
      })
      .then(historyData => {
        historyData.reverse()
          while (historyData.length % itemsPerPage !== 0) {
              historyData.push({      
              dateTimeSearched: '_ ⠀',  
              yearMonth: '–',    
              trainLine: '–', 
              time: '–', 
              dayType: '–',
            });
  }
        setAllHistoryData(historyData)
      })
  }, []); 

  // Calculate total number of pages
  const totalPages = Math.ceil(allHistoryData.length / itemsPerPage);
  // Calculate the start and end indices of the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // Get the data for the current page
  const currentPageData = allHistoryData.slice(startIndex, endIndex);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className='historyContainer'>
      {allHistoryData ? (
        <>
          <table className='historyTable table-bordered'>
            <thead>
              <tr>
                <th>Searched at</th>
                <th>Year-Month</th>
                <th>TrainLine</th>
                <th>Time Of Day</th>
                <th>Day Type</th>
              </tr>
            </thead>
            <tbody>
              {currentPageData.map((item, index) => (
                <tr key={index}>
                  <td>{item.dateTimeSearched.split(',')[0]} <br/> {item.dateTimeSearched.split(' ')[1]}</td>
                  <td>{`${item.yearMonth.substring(0,4)}-${item.yearMonth.substring(4,7)}`}</td>
                  <td>{item.trainLine}</td>
                  <td>{item.time !== "–" ? `${item.time.padStart(2, '0')}00 hours` : "–"}</td>
                  <td>{`${item.dayType.charAt(0)}${item.dayType.slice(1).toLowerCase()}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
  
          <div>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>
            ⠀⠀ <span>{`Page ${currentPage} of ${totalPages}`}</span> ⠀⠀
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
            </button>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  
  );
};

 export default History;  