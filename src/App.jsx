// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pallete from './pages/Pallete';
import './App.css'; // Asegúrate de que tu CSS de Tailwind esté importado aquí
import Home from './pages/Home';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/pallete" element={<Pallete />} />  {/* Página de estilos */}
          <Route path='/' element={<Home/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
