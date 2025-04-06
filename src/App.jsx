// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import HomePage from './pages/Home';
import Pallete from './pages/Pallete';
import EventPage from './pages/Event';

const App = () => {
  return (
    <Router>
      <span style={{ position: 'fixed', top: 10, left: 10, opacity: 0.5 }}>WIP V0.0.060425</span>
      <div className="App">
        <Routes>
          <Route path="/event/:id" element={<EventPage />} />
          <Route path="/pallete" element={<Pallete />} />
          <Route path='/' element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
