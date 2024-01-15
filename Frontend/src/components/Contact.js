import React from 'react'
import './Contact.css'


function Contact() {
  

    return (
      <div className='contactContainer'>
        <div>
          App by Timothy Phua <br/>
          Github: <a href='https://github.com/timoph2/MRT_Station_passenger_density'> MRT_Station_passenger_density </a> <br/>
          LTA_API: <a href='https://datamall.lta.gov.sg/content/datamall/en/dynamic-data.html'> Passenger Volume by Train Stations</a> (page3) <br/>
          Built using React.js and Typescript <br/>
          Deployed on Elastic Container Service
        </div>
      </div>
    );
  }
  
  export default Contact;
  