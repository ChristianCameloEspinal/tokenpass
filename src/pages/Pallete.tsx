import React from "react";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useState } from 'react';

import { useModal } from "../contexts/ModalContext";

import QuantityInput from "../components/forms/QuantityInput";
import ModalRegular from "../components/modals/modal-regular/ModalRegular";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export default function Pallete() {

  const { openModal } = useModal();

  const data = {
    labels: ['12:00', '13:00', '14:00', '15:00', '16:00'], // Las etiquetas en el eje X (tiempo)
    datasets: [
      {
        label: 'Sell on',
        data: [120, 180, 150, 200, 190], // Los valores para el eje Y
        fill: false, // No llenar el área bajo la línea
        borderColor: '', // Color de la línea
        tension: 0.3, // Curvatura de la línea
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: false,
        text: 'Gráfico de Línea - Valores con el tiempo',
      },
      tooltip: {
        // mode: 'index',
        intersect: false,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: false,
          // text: 'Tiempo',
        },
      },
      y: {
        title: {
          display: false,
          // text: 'Valor Personalizable',
        },
      },
    },
    legend: {
      display: false,
    },
    title: {
      display: false,
    }
  };
  
  const handleClick = () => {
    openModal(
      {
        title: "Eliminar elemento",
        subtitle: "¿Estás seguro?",
        message: "Esta acción no se puede deshacer.",
      },
      () => {
        console.log("Confirmado");
      },
      () => {
        console.log("Cancelado");
      }
    );
  };

  return (
    <>
      <div className="page">
        <div className="wrapper padding xl all" style={{ marginBottom: "400px" }}>
          <h1 className="text-display">Authenticate</h1>
          <div className="frame-flex vertical padding l all border shadow">
            <span className="text-subtitle">Confirm your identity</span>
            <span className="text-hint">We will send you a code to your phone number to confirm your identity</span>
            <span className="text-body">We will send you a code to your phone number to confirm your identity</span>
            <div className="input-field border">
              <span className="frame-flex input padding s all">
                <input type="number" placeholder="Value"></input>
                {/* <span className="input-type">$</span> */}
              </span>
            </div>
            <div className="frame-flex horizontal gap-m space-between">
              <button className="button secondary">Cancel</button>
              <button className="button primary">Resend code</button>
            </div>
            <div className="frame-flex">
              <button className="button primary">Resend code</button>
            </div>
          </div>
          <h1 className="text-display">Marketplace</h1>
          <div id="frame-ticket-full" className="frame-flex vertical border shadow">
            <img className="frame-photo" src="/images/placeholder.jpg" alt="Foto del evento" />
            <div className="frame-flex horizontal padding m all space-between">
              <div className="frame-flex vertical">
                <span className="text-hint">Tue/21 2024</span>
                <span className="text-subtitle">Name of event</span>
                <span className="text-link">Location link</span>
              </div>
              <div className="frame-flex vertical align-right">
                <span className="text-hint">Type of event</span>
                <span className="text-hint">Last price $ 00.0</span>
                <span className="text-subtitle">$ 00.0</span>
              </div>
            </div>
          </div>
          <div id="frame-ticket-lite" className="frame-flex vertical border shadow">
            <div className="frame-flex horizontal padding m all space-between">
              <div className="frame-flex vertical">
                <span className="text-hint">Tue/21 2024</span>
                <span className="text-subtitle">Name of event</span>
                <span className="text-link">Location link</span>
              </div>
              <div className="frame-flex vertical align-right">
                <span className="text-hint">Type of event</span>
                <span className="text-hint">Last price $ 00.0</span>
                <span className="text-subtitle">$ 00.0</span>
              </div>
            </div>
          </div>
          <h1 className="text-display">My Tickets</h1>
          <div id="frame-ticket-lite-sell" className="frame-flex vertical border shadow">
            <div className="frame-flex horizontal padding m all space-between">
              <div className="frame-flex vertical">
                <span className="text-hint">Tue/21 2024</span>
                <span className="text-subtitle">Name of event</span>
                <span className="text-link">Location link</span>
              </div>
              <div className="frame-flex vertical align-right">
                <span className="text-hint">Type of event</span>
                <span className="text-hint">Purchased for $ 00.0</span>
              </div>
            </div>
            <div className="frame-flex horizontal padding m all gap-m space-between">
              <button className="button secondary">Sell</button>
              <button className="button primary">Validate</button>
            </div>
          </div>
          <h1 className="text-display">My Ticket</h1>
          <div id="page-ticket-sell" className="frame-flex vertical gap-m">
            <span className="text-title">Name of event</span>
            <img className="ticket-photo border" src="/images/placeholder.jpg" alt="Foto del evento" />
            <div className="frame-flex vertical">
              <span className="text-hint">Tue/21 2024</span>
              <span className="text-subtitle">Name of event</span>
              <span className="text-link">Location link</span>
            </div>
            <div className="frame-flex vertical gap-s">
              <span className="text-subtitle">Description</span>
              <span className="text-body">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</span>
            </div>
            <div className="frame-flex vertical gap-s">
              <span className="text-subtitle">Price history</span>
              <Line data={data} options={options} />
            </div>
            <div className="frame-flex vertical gap-s">
              <span className="text-subtitle">Last sells</span>
              <div className="frame-flex horizontal gap-m space-between">
                <span className="text-hint">Tue/21 - 2024</span>
                <span className="text-subtitle">$ 00.0</span>
              </div>
              <div className="frame-flex horizontal gap-m space-between">
                <span className="text-hint">Tue/21 - 2024</span>
                <span className="text-subtitle">$ 00.0</span>
              </div>
              <div className="frame-flex horizontal gap-m space-between">
                <span className="text-hint">Tue/21 - 2024</span>
                <span className="text-subtitle">$ 00.0</span>
              </div>
            </div>
            <div id="panel-resell" className="frame-flex vertical gap-m">
              <span className="text-title">Re-sell</span>
              <div className="frame-flex horizontal gap-m space-between">
                <QuantityInput></QuantityInput>
                <div className="input-field border">
                  <span className="frame-flex input padding s all">
                    <input type="number" placeholder="Value"></input>
                    <span className="input-type">$</span>
                  </span>
                </div>
              </div>
              <div className="frame-flex">
                <button className="button primary">Sell</button>
              </div>
            </div>
          </div>
          <h1 className="text-display">Validate</h1>
          <div id="page-ticket-sell" className="frame-flex vertical gap-m">
            <div className="frame-flex vertical gap-s">
              <span className="text-subtitle">Validate your entrance</span>
              <span className="text-body">Show the QR code to validate your entrance.</span>
            </div>
            <span className="text-title">Name of event</span>
            <img className="ticket-photo border" src="/images/placeholder.jpg" alt="Foto del evento" />
            <div className="frame-flex vertical">
              <span className="text-hint">Tue/21 2024</span>
              <span className="text-subtitle">Name of event</span>
              <span className="text-link">Location link</span>
            </div>
            <div className="frame-flex vertical align-center gap-m">
              <img className="frame-flex vertical padding l all border" src="/images/qr.png" style={{ width: 250, margin: '0 auto' }}></img>
              <span className="text-title" style={{ textAlign: 'center' }}>XBR45GBC</span>
            </div>
            <div className="frame-flex vertical">
              <span className="text-body">Expire on 3 minutes</span>
              <span className="text-hint">This QR code will expire at 06/04 2024 12:02:05:00 UCT</span>
            </div>
          </div>
          <h1 className="text-display">Ticket Info</h1>
          <div id="page-ticket-sell" className="frame-flex vertical gap-m">
            <span className="text-title">Name of event</span>
            <img className="ticket-photo border" src="/images/placeholder.jpg" alt="Foto del evento" />
            <div className="frame-flex vertical">
              <span className="text-hint">Tue/21 2024</span>
              <span className="text-subtitle">Name of event</span>
              <span className="text-link">Location link</span>
            </div>
            <div className="frame-flex vertical gap-s">
              <span className="text-subtitle">Description</span>
              <span className="text-body">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</span>
            </div>
            <div id="panel-resell" className="frame-flex vertical gap-m">
              <span className="text-title">Purchase</span>
              <div className="frame-flex horizontal gap-m space-between">
                <div className="frame-flex vertical gap-s">
                  <span>Tickets</span>
                  <QuantityInput></QuantityInput>
                </div>
                <div className="frame-flex vertical gap-s">
                  <span>Total price</span>
                  <span className="frame-flex align-rigth input padding s all">
                    <span className="text-subtitle">00.0</span>
                    <span className="input-type">$</span>
                  </span>
                </div>
              </div>
              <div className="frame-flex">
                <button className="button primary">Pay</button>
              </div>
            </div>
          </div>



          {/* Acciones varias */}
          <div className="frame-flex vertical">
            <span className="text-title">Acciones varias</span>
            <button className="button primary" onClick={handleClick}>Abrir Modal</button>
          </div>
        </div>
      </div >
    </>
  );
}
