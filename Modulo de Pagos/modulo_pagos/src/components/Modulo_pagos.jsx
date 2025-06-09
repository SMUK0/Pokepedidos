// src/components/Modulo_pagos.jsx
import React, { useState } from 'react';
import '../assets/css/Modulo_pagos.css';

export default function ModuloPagos() {
  const tabs = [
    'Pago con Tarjeta',
    'Historial de Pagos',
    'Estado de Pagos',
    'Confirmación Pago'
  ];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  // Estado Pago Tarjeta (HU024)
  const [cardData, setCardData] = useState({ numero:'', expiracion:'', cvv:'' });
  const [cardErrors, setCardErrors] = useState({});

  // Historial de Pagos (HU025)
  const pagosStub = [
    { id:1, fecha:'2025-06-01', monto:45.00, metodo:'Tarjeta' },
    { id:2, fecha:'2025-05-28', monto:23.50, metodo:'Efectivo' },
  ];

  // Estado de Pagos (HU026) / Confirmación Pago (HU027/28)
  const [estadoPagos, setEstadoPagos] = useState([
    { pedidoId:101, estado:'Pendiente' },
    { pedidoId:102, estado:'Pagado' },
  ]);

  // Handlers genéricos
  const onChange = (form,setForm)=>(e)=>{
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validación Tarjeta
  const validarTarjeta = () => {
    const errs = {};
    if (!/^\d{16}$/.test(cardData.numero)) errs.numero = 'Número debe tener 16 dígitos';
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardData.expiracion)) errs.expiracion = 'Formato MM/AA';
    if (!/^\d{3}$/.test(cardData.cvv)) errs.cvv = 'CVV de 3 dígitos';
    setCardErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submitPago = e => {
    e.preventDefault();
    if (!validarTarjeta()) return;
    alert('Pago con tarjeta exitoso 🎉');
    // aquí llamarías a tu API...
  };

  return (
    <div className="pagos-container">
      <h1 className="page-title">Módulo de Pagos</h1>
      <div className="tabs">
        {tabs.map(t=>(
          <div
            key={t}
            className={`tab ${activeTab===t?'active':''}`}
            onClick={()=>setActiveTab(t)}
          >{t}</div>
        ))}
      </div>

      {/* HU024: Pago con Tarjeta */}
      {activeTab==='Pago con Tarjeta' && (
        <form className="formulario" onSubmit={submitPago}>
          <div>
            <label>Número de Tarjeta *</label>
            <input
              name="numero"
              value={cardData.numero}
              onChange={onChange(cardData,setCardData)}
              maxLength="16"
            />
            {cardErrors.numero && <p className="error">{cardErrors.numero}</p>}
          </div>
          <div>
            <label>Expiración (MM/AA) *</label>
            <input
              name="expiracion"
              value={cardData.expiracion}
              onChange={onChange(cardData,setCardData)}
              placeholder="MM/AA"
            />
            {cardErrors.expiracion && <p className="error">{cardErrors.expiracion}</p>}
          </div>
          <div>
            <label>CVV *</label>
            <input
              name="cvv"
              value={cardData.cvv}
              onChange={onChange(cardData,setCardData)}
              maxLength="3"
            />
            {cardErrors.cvv && <p className="error">{cardErrors.cvv}</p>}
          </div>
          <div className="full-width">
            <button className="button" type="submit">Pagar Ahora</button>
          </div>
        </form>
      )}

      {/* HU025: Historial de Pagos */}
      {activeTab==='Historial de Pagos' && (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID Pago</th>
                <th>Fecha</th>
                <th>Monto</th>
                <th>Método</th>
              </tr>
            </thead>
            <tbody>
              {pagosStub.map(p=>(
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.fecha}</td>
                  <td>${p.monto.toFixed(2)}</td>
                  <td>{p.metodo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* HU026 & HU027: Estado de Pagos / Confirmación de Pago */}
      {activeTab==='Estado de Pagos' && (
        <div className="list">
          {estadoPagos.map(ep=>(
            <div key={ep.pedidoId} className="estado-card">
              <h4>Pedido #{ep.pedidoId}</h4>
              <p><b>Estado:</b> {ep.estado}</p>
              <button
                className="button small"
                onClick={()=>{
                  const nuevo = estadoPagos.map(x=>
                    x.pedidoId===ep.pedidoId
                      ? {...x, estado:'Pagado'}
                      : x
                  );
                  setEstadoPagos(nuevo);
                }}
              >
                Confirmar Pago
              </button>
            </div>
          ))}
        </div>
      )}

      {/* HU028: Confirmación de Pago para repartidor */}
      {activeTab==='Confirmación Pago' && (
        <div className="list">
          {estadoPagos.map(ep=>(
            <div key={ep.pedidoId} className="estado-card">
              <h4>Pedido #{ep.pedidoId}</h4>
              <p><b>Estado:</b> {ep.estado}</p>
              <button
                className="button small"
                onClick={()=>{
                  const nuevo = estadoPagos.map(x=>
                    x.pedidoId===ep.pedidoId
                      ? {...x, estado:'Entregado'}
                      : x
                  );
                  setEstadoPagos(nuevo);
                }}
              >
                Marcar Entregado
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
