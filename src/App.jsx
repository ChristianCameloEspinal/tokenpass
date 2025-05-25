import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import HomePage from './pages/Home';
import EventPage from './pages/Event';
import CheckoutPage from './pages/Checkout';
import TicketsPage from './pages/Tickets';
import ValidationPage from './pages/Validation';
import SellPage from './pages/Sell';
import EventsPage from './pages/Events';
import ProfilePage from './pages/Profile';
import CreateEventPage from './pages/CreateEventPage';
import SalesPage from './pages/SalesPAge';
import ValidateTicketPage from './pages/ValidateTicketPage';

import Footer from './components/layout/Footer';

const AppContent = () => {

  return (
    <div className="App">
      <span style={{ position: 'fixed', bottom: 10, left: 10, opacity: 0.5 }}>WIP V0.0.060425</span>


      <main className="page-content">
        <Routes>
          <Route path='/sell/:id' element={<SellPage/>}></Route>
          <Route path='/validate/:eventParam' element={<ValidationPage/>}></Route>
          <Route path='/tickets' element={<TicketsPage/>}></Route>
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/event/:id" element={<EventPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/create" element={<CreateEventPage />} />
          <Route path="/events/sales/:id" element={<SalesPage />} />
          <Route path="/events/validate/:id" element={<ValidateTicketPage />} />

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
