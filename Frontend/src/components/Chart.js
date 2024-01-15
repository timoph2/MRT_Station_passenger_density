import React, { useState } from 'react'
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import DataFilter from './DataFilter';
import MrtCodeTable from './MrtCodeTable'
import './Chart.css';

defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

function Chart() {
  const [selectedYearMonth, setSelectedYearMonth] = useState('202310'); 
  const [selectedTrainLine, setSelectedTrainLine] = useState('DT'); 
  const [selectedDayType, setSelectedDayType] = useState('WEEKDAY'); 
  const [selectedTime, setSelectedTime] = useState('6'); 
  const [isVisible, setIsVisible] = useState(false);
  const [mrtData, setMrtData] = useState([]); 

  const [displayedFilter, setDisplayedFilter] = useState({
    yearMonth: `${selectedYearMonth.substring(0,4)}-${selectedYearMonth.substring(4,7)}`,
    trainLine: selectedTrainLine,
    dayType : selectedDayType.charAt(0) + selectedDayType.slice(1).toLowerCase(),
    time: `${selectedTime.padStart(2, '0')}00 hours`,
  })


    return <>
      <DataFilter setSelectedYearMonth={setSelectedYearMonth} selectedYearMonth={selectedYearMonth}
                      setSelectedTrainLine={setSelectedTrainLine} selectedTrainLine={selectedTrainLine}
                      setSelectedTime={setSelectedTime}  selectedTime={selectedTime}
                      setSelectedDayType={setSelectedDayType} selectedDayType={selectedDayType}
                      setIsVisible={setIsVisible} isVisible={isVisible}
                      setDisplayedFilter={setDisplayedFilter}
                      setMrtData={setMrtData} 
                      />
      <div className='center'>
        <div className = {`chartContainer ${isVisible ? 'visible' : 'hidden'}`}>
          <Bar
            data={{
              labels: mrtData.map((data) => data.PT_CODE),
              datasets: [
                { label: "Tap in",
                  data: mrtData.map((data) => data.TOTAL_TAP_IN_VOLUME),
                  borderRadius: 5,
                },
                { label: "Tap out",
                  data: mrtData.map((data) => data.TOTAL_TAP_OUT_VOLUME),
                  borderRadius: 5,
                }
              ],
            }}
            options={{
              plugins: {
                title: {
                  text: `Passengers per MRT station: [${displayedFilter.trainLine} Line], [${displayedFilter.yearMonth}], at [${displayedFilter.time}] on [${displayedFilter.dayType}]`,
                },
              },
              width: 1, // Specify the width of the chart
              height: 400, // Specify the height of the chart
            }}
            />

            <div className='tableContainer'>
              <MrtCodeTable selectedTrainLine={displayedFilter.trainLine} rows={10} />
            </div>
        </div>
      </div>
    </>;
  }
  
  export default Chart;
  