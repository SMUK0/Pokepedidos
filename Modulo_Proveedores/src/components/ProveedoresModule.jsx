// src/components/ProveedoresModule.jsx
import React, { useState } from 'react';
import '../assets/css/ProveedoresModule.css';

const initialTiendas = [
  {
    id: 1,
    nombre: 'Tienda Alpha',
    descripcion: 'Ropa y accesorios',
    direccion_fisica: 'Av. Siempre Viva 123',
    telefono_contacto: '+59171234567',
    correo_contacto: 'alpha@tienda.com',
    categoria_id: 1,
    latitud: '-16.500000',
    longitud: '-68.150000',
    estado: 'pendiente',
  },
];
const categoriasStub = [
  { id: 1, nombre: 'Ropa' },
  { id: 2, nombre: 'Alimentos' },
  { id: 3, nombre: 'Electrónica' },
];

const ProveedoresModule = () => {
  const [activeTab, setActiveTab] = useState('tiendas');
  const [tiendas, setTiendas] = useState(initialTiendas);
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    direccion_fisica: '',
    telefono_contacto: '',
    correo_contacto: '',
    categoria_id: '',
    latitud: '',
    longitud: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [categorias] = useState(categoriasStub);

  const handleInput = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const resetForm = () => {
    setForm({
      nombre: '',
      descripcion: '',
      direccion_fisica: '',
      telefono_contacto: '',
      correo_contacto: '',
      categoria_id: '',
      latitud: '',
      longitud: '',
    });
    setEditingId(null);
    setMessage('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    const {
      nombre,
      direccion_fisica,
      telefono_contacto,
      correo_contacto,
      categoria_id,
    } = form;
    if (
      !nombre ||
      !direccion_fisica ||
      !telefono_contacto ||
      !correo_contacto ||
      !categoria_id
    ) {
      return setMessage('Completa todos los campos obligatorios.');
    }
    if (tiendas.some(t => t.nombre === nombre && t.id !== editingId)) {
      return setMessage('Ya existe una tienda con ese nombre.');
    }

    if (editingId) {
      setTiendas(tiendas.map(t => (t.id === editingId ? { ...t, ...form } : t)));
      setMessage('¡Tienda actualizada!');
    } else {
      setTiendas([...tiendas, { id: Date.now(), estado: 'pendiente', ...form }]);
      setMessage('¡Tienda registrada!');
    }
    resetForm();
  };

  const handleEdit = t => {
    setForm({ ...t });
    setEditingId(t.id);
    setActiveTab('tiendas');
    setMessage('');
  };

  return (
    <div className="proveedores-container">
      {/* Título agregado */}
      <h1 className="page-title">Proveedores</h1>

      <div className="tabs">
        <div
          className={`tab ${activeTab === 'tiendas' ? 'active' : ''}`}
          onClick={() => setActiveTab('tiendas')}
        >
          Tiendas
        </div>
        <div
          className={`tab ${activeTab === 'historial' ? 'active' : ''}`}
          onClick={() => setActiveTab('historial')}
        >
          Historial
        </div>
      </div>

      {message && <div className="message">{message}</div>}

      {activeTab === 'tiendas' && (
        <>
          <form className="formulario" onSubmit={handleSubmit}>
            <div>
              <label>Nombre de Tienda *</label>
              <input
                name="nombre"
                value={form.nombre}
                onChange={handleInput}
              />
            </div>
            <div>
              <label>Descripción</label>
              <input
                name="descripcion"
                value={form.descripcion}
                onChange={handleInput}
              />
            </div>
            <div>
              <label>Dirección Física *</label>
              <input
                name="direccion_fisica"
                value={form.direccion_fisica}
                onChange={handleInput}
              />
            </div>
            <div>
              <label>Teléfono Contacto *</label>
              <input
                name="telefono_contacto"
                value={form.telefono_contacto}
                onChange={handleInput}
              />
            </div>
            <div>
              <label>Correo Contacto *</label>
              <input
                name="correo_contacto"
                type="email"
                value={form.correo_contacto}
                onChange={handleInput}
              />
            </div>
            <div>
              <label>Categoría *</label>
              <select
                name="categoria_id"
                value={form.categoria_id}
                onChange={handleInput}
              >
                <option value="">-- Selecciona --</option>
                {categorias.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Latitud</label>
              <input
                name="latitud"
                type="number"
                step="0.000001"
                value={form.latitud}
                onChange={handleInput}
              />
            </div>
            <div>
              <label>Longitud</label>
              <input
                name="longitud"
                type="number"
                step="0.000001"
                value={form.longitud}
                onChange={handleInput}
              />
            </div>
            <div className="full-width">
              <button className="button" type="submit">
                {editingId ? 'Actualizar Tienda' : 'Registrar Tienda'}
              </button>
            </div>
          </form>

          <div className="list">
            {tiendas.map(t => (
              <div key={t.id} className="tienda-card">
                <h4>{t.nombre}</h4>
                <p><strong>Tel:</strong> {t.telefono_contacto}</p>
                <p><strong>Categoría:</strong> {categorias.find(c => c.id === +t.categoria_id)?.nombre}</p>
                <p><strong>Estado:</strong> {t.estado}</p>
                <a
                  className="edit-btn"
                  onClick={() => handleEdit(t)}
                >
                  Editar
                </a>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'historial' && (
        <div className="table-container">
          <h3>Historial de Pedidos</h3>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tienda</th>
                <th>Fecha</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {/* Aquí irían tus datos reales */}
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>
                  Sin datos aún.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProveedoresModule;
