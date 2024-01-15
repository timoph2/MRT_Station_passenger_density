import { React } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Contact from './components/Contact';
import TopNavBar from './components/TopNavBar';
import Chart from './components/Chart';
import MrtCode from "./components/MrtCode";
import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
 
function App() {
  return (
    <div>
      <BrowserRouter>
        <TopNavBar />
        <Routes>
          <Route path="/" element={<Chart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/codes" element={<MrtCode />} />
        </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;