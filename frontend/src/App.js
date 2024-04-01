
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Law from './pages/Law';
import AddJudgement from './pages/AddJudgement';
import Judgement from './pages/Judgement';
import { JudgementPage } from './pages/JudgementPage';
import { PdfLaw } from './pages/PdfLaw';


function App() {

  const [isNavbarOpen, setIsNavbarOpen] = useState(true);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path='/law' Component={Law} />
        <Route exact path='/pdf-law' Component={PdfLaw} />
        <Route exact path='/judgement' Component={JudgementPage} />
        <Route exact path='/add' Component={AddJudgement} />
      </Routes>
    </Router>
      
    </>
  );
}

export default App;
