// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import ModuloPagos from './components/Modulo_pagos';
import './assets/css/Modulo_pagos.css';

export default function App() {
  return (
    <>
      <nav style={{ padding: '1rem', textAlign: 'center' }}>
        {/* Solo la ruta de Pagos */}
        <Link to="/pagos" style={{ margin: '0 1rem' }}>Pagos</Link>
      </nav>

      <Routes>
        {/* Redirige la raíz a /pagos */}
        <Route path="/" element={<Navigate to="/pagos" replace />} />

        {/* Ruta para tu módulo */}
        <Route path="/pagos" element={<ModuloPagos />} />

        {/* Fallback 404 */}
        <Route
          path="*"
          element={
            <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>
              404 · Página no encontrada
            </h1>
          }
        />
      </Routes>
    </>
  );
}
