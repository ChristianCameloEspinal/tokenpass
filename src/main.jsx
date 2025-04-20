import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { ModalProvider } from './contexts/ModalContext.js'
import { UserProvider } from './contexts/UserContext.js'

import { AppContextProvider } from './contexts/AppContextProvider.js'

import './index.css'
import App from './App.jsx'
import Footer from './components/layout/Footer';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </StrictMode>,
)
