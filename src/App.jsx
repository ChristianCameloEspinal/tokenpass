import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import './App.css';

import HomePage from './pages/Home';
import Pallete from './pages/Pallete';
import EventPage from './pages/Event';
import DashboardPage from './pages/Dashboard';
import CheckoutPage from './pages/Checkout';

import Footer from './components/layout/Footer';
import { useUser } from './contexts/UserContext';
import TicketsPage from './pages/Tickets';


const AppContent = () => {
  const { user } = useUser();
  const location = useLocation();

  const isHome = location.pathname === '/';
  const showFooter = !(isHome && !user);

  return (
    <div className="App">
      <span style={{ position: 'fixed', top: 10, left: 10, opacity: 0.5 }}>WIP V0.0.060425</span>

      <main className="page-content">
        <Routes>
          <Route path='/tickets' element={<TicketsPage/>}></Route>
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/event/:id" element={<EventPage />} />
          <Route path="/pallete" element={<Pallete />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
