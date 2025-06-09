import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import ModuloClientes from "./components/Modulo_clientes";
import "./assets/css/Modulo_clientes.css";

export default function App() {
  return (
    <>
      <nav style={{ padding: "1rem", textAlign: "center" }}>
        <Link to="/clientes" style={{ margin: "0 1rem" }}>Clientes</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="/clientes" replace />} />
        <Route path="/clientes/*" element={<ModuloClientes />} />
        <Route path="*" element={<h1 style={{ textAlign: "center", marginTop: "2rem" }}>404 · No encontrado</h1>} />
      </Routes>
    </>
  );
}