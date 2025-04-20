import React from 'react';
import { users, events, tickets } from '../utils/examples';

const DashboardPage = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <h2>Events</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Event Name</th>
            <th>Event Date</th>
            <th>Type</th>
            <th>Last Price</th>
            <th>Current Price</th>
            <th>Location</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.id}</td>
              <td>{event.eventName}</td>
              <td>{event.eventDate}</td>
              <td>{event.type}</td>
              <td>{event.lastPrice}</td>
              <td>{event.currentPrice}</td>
              <td>{event.location}</td>
              <td>{event.eventDescription}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Users</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Wallet Address</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>DOB</th>
            <th>Token</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td> {/* This is the wallet address now */}
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.dob}</td>
              <td>{user.token}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Tickets</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Event Name</th>
            <th>Price</th>
            <th>Purchased Date</th>
            <th>Owner Address</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.id}</td>
              <td>{events[ticket.event]?.eventName}</td> {/* Corrected access to event name */}
              <td>{ticket.price}</td>
              <td>{ticket.purchasedDate}</td>
              <td>{ticket.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardPage;
