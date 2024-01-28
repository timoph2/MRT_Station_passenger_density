import React, { useState } from 'react'
import { Link, useLocation  } from 'react-router-dom';

import './TopNavBar.css'

function TopNavBar() {
  const currentLocation = useLocation();

    return (
      <div className="topnav"> 
        <Link to="/" replace={currentLocation.pathname === '/'}>Chart</Link>
        <Link to="/contact" replace={currentLocation.pathname === '/contact'}>Contact</Link>
        <Link to="/codes" replace={currentLocation.pathname === '/contact'}>Codes</Link>
        <Link to="/history" replace={currentLocation.pathname === '/history'}>History</Link>
      </div>
    );
  }
  
  export default TopNavBar;