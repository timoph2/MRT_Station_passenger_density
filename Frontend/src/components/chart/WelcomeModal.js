import React from 'react' 
import "./WelcomeModal.css"

function WelcomeModal(props) {
  return (
    <div className='overlay' onClick={()=> props.setModalOpen(false)}>
      <div className="modalContent">
        <h4> <u> Passengers_per_MRT_station  </u></h4>
        This web app displays the number of passengers per MRT station on a given month, time of day and if its a weekday/weekend. <br/> <br/> 
        <span className='closeText'> *Click anywhere to close* </span> 
      </div>
    </div>
  );
};
 
export default WelcomeModal;