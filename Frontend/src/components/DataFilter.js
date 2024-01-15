import React from 'react'
import mrtData from "../data/mrtData.json";
import './DataFilter.css';

function DataFilter(props) { 
  const handleGenerateGraph = (param) => async (e) =>  {
    e.preventDefault();
    props.setIsVisible(false)
    if ( param == "Hide") { return }   
    props.setIsVisible(true);

    const displayData = {
      yearMonth: `${props.selectedYearMonth.substring(0,4)}-${props.selectedYearMonth.substring(4,7)}`,
      trainLine: props.selectedTrainLine,
      dayType : props.selectedDayType.charAt(0) + props.selectedDayType.slice(1).toLowerCase(),
      time: `${props.selectedTime.padStart(2, '0')}00 hours`,
    }
    props.setDisplayedFilter(displayData)

    const postData = {
      yearMonth : props.selectedYearMonth,
      trainLine: props.selectedTrainLine,
      time : props.selectedTime,
      dayType : props.selectedDayType
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData)
    } 
    console.log(process.env.BACKEND_ENDPOINT)
    mrtData = await fetch("http://lta-be-alb-1245576723.ap-southeast-1.elb.amazonaws.com/data" , requestOptions)
    mrtData = await mrtData.json()
    props.setMrtData(mrtData)
  }; 
  
    return (
      <div className='dataContainer'>
        <u>Filter by:</u>
        <br/>
        Train Line: ㅤㅤ
          <select value={props.selectedTrainLine} onChange={(e) => props.setSelectedTrainLine(e.target.value)}>
            <option value="DT">Downtown (DT)</option>
            <option value="NE">Northeast (NE)</option>
            <option value="EW">Eastwest (EW)</option>
            <option value="NS">Northsouth (NS)</option>
            <option value="CC">Circle (CC)</option>
            <option value="TE">Thomson East Coast (TE)</option>
          </select>
        <br/>
        

        Year-Month: ㅤ
          <select value={props.selectedYearMonth} onChange={(e) => props.setSelectedYearMonth(e.target.value)}>
            <option value="202310">2023-10</option>
            <option value="202311">2023-11</option>
            <option value="202312">2023-12</option>
          </select>
        <br/>

        Time of day: ㅤ
          <select value={props.selectedTime} onChange={(e) => props.setSelectedTime(e.target.value)} >
            {/* Generate time options from 0600 to 2300 hours */}
            {Array.from({ length: 18 }, (_, timeOption) => (
            <option key={timeOption + 6} value={timeOption + 6}> {timeOption + 6} </option> )) }
          </select>
        <br/>
        
        <label>
          <input 
            type="radio" value="WEEKDAY"
            checked={props.selectedDayType === 'WEEKDAY'}
            onChange={(e) => props.setSelectedDayType(e.target.value)}
          />
          Weekday ㅤㅤ 
        </label>
        <label>
          <input
            type="radio" value="WEEKENDS/HOLIDAY"
            checked={props.selectedDayType === 'WEEKENDS/HOLIDAY'}
            onChange={(e) => props.setSelectedDayType(e.target.value)}
          />
          Weekends/Holiday
        </label>
        <br/>

        <button onClick={handleGenerateGraph("Generate")}> Generate Chart! </button> ㅤ  
        <button onClick={handleGenerateGraph("Hide")}> Hide Chart! </button>
      </div>
    );
  }
  
  export default DataFilter;