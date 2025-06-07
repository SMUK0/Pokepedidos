// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ProveedoresModule from './components/ProveedoresModule'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Ruta principal */}
        <Route path="/" element={<App />} />
        {/* Tu módulo de proveedores en /proveedores */}
        <Route path="/proveedores" element={<ProveedoresModule />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
