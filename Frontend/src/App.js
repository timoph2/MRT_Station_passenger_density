import { React, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Contact from './components/contact/Contact';
import TopNavBar from './components/TopNavBar';
import Chart from './components/chart/Chart';
import WelcomeModal from "./components/chart/WelcomeModal";
import MrtCode from "./components/codes/MrtCode";
import History from "./components/history/History";
import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
 
function App() {
  const [isModalOpen, setModalOpen] = useState(true);

  return (
    <div>
      <BrowserRouter>
        <TopNavBar />
        {isModalOpen && <WelcomeModal setModalOpen={setModalOpen}/>}
        <Routes>
          <Route path="/" element={<Chart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/codes" element={<MrtCode />} />
          <Route path="/history" element={<History />} />
        </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;