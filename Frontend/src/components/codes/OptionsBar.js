import React from 'react' 
import './OptionsBar.css'

function Sidebar(props) {

return <>
    <div>  
        <button className = "NE sideBtn" onClick={() => props.setExpanded("NE")}> NE </button>
        <button className = "TE sideBtn" onClick={() => props.setExpanded("TE")}> TE </button>
        <button className = "NS sideBtn" onClick={() => props.setExpanded("NS")}> NS </button>
        <button className = "CC sideBtn" onClick={() => props.setExpanded("CC")}> CC </button>
        <button className = "DT sideBtn" onClick={() => props.setExpanded("DT")}> DT </button>
        <button className = "EW sideBtn" onClick={() => props.setExpanded("EW")}> EW </button>
    </div>
    </>
  }
  
  export default Sidebar;