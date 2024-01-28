import React from 'react'
import './Contact.css'

function Contact() {

    return (
      <div className='contactContainer'>
        <div>
          App by Timothy Phua <br/>
          Email: <span> phuatimothy231@gmail.com </span> <br/>
          Github: <a href='https://github.com/timoph2/Passengers_per_MRT_Station'> Passengers_per_MRT_station </a> <br/><br/> 
        </div>

        <div>
          Data is obtained from LTA Datamall API: <br/>          
          <a href='https://datamall.lta.gov.sg/content/datamall/en/dynamic-data.html'> Passenger Volume by Train Stations</a> (page3) <br/><br/> 
        </div>

        <div>
          Built using Typescript and React.js <br/>
          Deployed on Elastic Container Service
        </div>
      </div>
    );
  }
  
  export default Contact;
  