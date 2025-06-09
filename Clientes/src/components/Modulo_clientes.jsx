import React, { useState } from 'react';
import '../assets/css/Modulo_clientes.css';

export default function ModuloClientes() {
  const tabs = [
    'Registro','Login','Perfil','Restaurantes','Menú',
    'Carrito','Seguimiento','Historial','Reseñas'
  ];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  // --- STUBS & ESTADOS ---
  const [regForm, setRegForm] = useState({ nombre:'', email:'', password:'', telefono:'' });
  const [loginForm, setLoginForm] = useState({ email:'', password:'' });
  const [profile, setProfile] = useState({ nombre:'Juan Pérez', email:'juan@ej.com', telefono:'+59170000000' });
  const restaurantsStub = [
    { id:1, nombre:'Pizza Italia', categoria:'Italiana', valoracion:4.5, tiempo:30 },
    { id:2, nombre:'Burger Fast', categoria:'Comida rápida', valoracion:4.0, tiempo:15 },
    { id:3, nombre:'Sushi Zen', categoria:'Japonesa', valoracion:4.8, tiempo:25 },
  ];
  const [restList, setRestList] = useState(restaurantsStub);
  const [menuStub] = useState({
    1:[{id:11,nombre:'Margherita',precio:8.5},{id:12,nombre:'Pepperoni',precio:9.5}],
    2:[{id:21,nombre:'Cheeseburger',precio:7},{id:22,nombre:'Fries',precio:2.5}],
    3:[{id:31,nombre:'California Roll',precio:6},{id:32,nombre:'Nigiri',precio:5}],
  });
  const [selectedRest, setSelectedRest] = useState(null);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [ratingForm, setRatingForm] = useState({ restId:'', estrellas:5, comentario:'' });

  // Helpers genéricos
  const onChange = (form,setForm)=>(e)=> {
    const { name,value } = e.target;
    setForm({ ...form,[name]:value });
  };
  const addToCart = item => {
    setCart([...cart,item]);
  };
  const total = cart.reduce((s,i)=>s+i.precio,0).toFixed(2);
  const placeOrder = () => {
    const newOrder = {
      id: Date.now(),
      items:cart.map(i=>i.nombre).join(', '),
      monto: total,
      estado:'en preparación'
    };
    setOrders([newOrder,...orders]);
    setCart([]);
    setActiveTab('Seguimiento');
  };

  return (
    <div className="clientes-container">
      <div className="content-wrapper">
        <h1 className="page-title">Módulo de Clientes</h1>
        <div className="tabs">
          {tabs.map(t=>(
            <div
              key={t}
              className={`tab ${activeTab===t?'active':''}`}
              onClick={()=>setActiveTab(t)}
            >{t}</div>
          ))}
        </div>

        {/* Registro */}
        {activeTab==='Registro' && (
          <form className="formulario" onSubmit={e=>e.preventDefault()}>
            <div><label>Nombre *</label>
              <input name="nombre" value={regForm.nombre} onChange={onChange(regForm,setRegForm)} /></div>
            <div><label>Email *</label>
              <input name="email" type="email" value={regForm.email} onChange={onChange(regForm,setRegForm)} /></div>
            <div><label>Contraseña *</label>
              <input name="password" type="password" value={regForm.password} onChange={onChange(regForm,setRegForm)} /></div>
            <div><label>Teléfono *</label>
              <input name="telefono" value={regForm.telefono} onChange={onChange(regForm,setRegForm)} /></div>
            <div className="full-width">
              <button className="button">Registrarme</button>
            </div>
          </form>
        )}

        {/* Login */}
        {activeTab==='Login' && (
          <form className="formulario" onSubmit={e=>e.preventDefault()}>
            <div><label>Email *</label>
              <input name="email" type="email" value={loginForm.email} onChange={onChange(loginForm,setLoginForm)} /></div>
            <div><label>Contraseña *</label>
              <input name="password" type="password" value={loginForm.password} onChange={onChange(loginForm,setLoginForm)} /></div>
            <div className="full-width">
              <button className="button">Iniciar Sesión</button>
            </div>
            <p className="help">¿Olvidaste tu contraseña?</p>
          </form>
        )}

        {/* Perfil */}
        {activeTab==='Perfil' && (
          <form className="formulario" onSubmit={e=>e.preventDefault()}>
            <div><label>Nombre</label>
              <input name="nombre" value={profile.nombre} onChange={e=>setProfile({...profile,nombre:e.target.value})} /></div>
            <div><label>Email</label>
              <input name="email" value={profile.email} onChange={e=>setProfile({...profile,email:e.target.value})} /></div>
            <div><label>Teléfono</label>
              <input name="telefono" value={profile.telefono} onChange={e=>setProfile({...profile,telefono:e.target.value})} /></div>
            <div className="full-width">
              <button className="button">Guardar Cambios</button>
            </div>
          </form>
        )}

        {/* Búsqueda de Restaurantes */}
        {activeTab==='Restaurantes' && (
          <>
            <form className="formulario" onSubmit={e=>e.preventDefault()}>
              <div><label>Buscar por nombre o categoría</label>
                <input
                  onChange={e=>{
                    const q=e.target.value.toLowerCase();
                    setRestList(restaurantsStub.filter(r=>
                      r.nombre.toLowerCase().includes(q) || r.categoria.toLowerCase().includes(q)
                    ));
                  }}
                />
              </div>
              <div className="full-width" style={{display:'flex',justifyContent:'center'}}>
                <button className="button" type="button">Filtrar</button>
              </div>
            </form>
            <div className="list">
              {restList.map(r=>(
                <div key={r.id} className="tienda-card">
                  <h4>{r.nombre}</h4>
                  <p><b>Categoría:</b> {r.categoria}</p>
                  <p><b>⭐ {r.valoracion}</b> &nbsp; <b>⏱ {r.tiempo} min</b></p>
                  <button className="button" onClick={()=>{setSelectedRest(r.id);setActiveTab('Menú')}}>
                    Ver Menú
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Menú */}
        {activeTab==='Menú' && selectedRest && (
          <>
            <h2 className="sub-title">Menú de {restaurantsStub.find(r=>r.id===selectedRest).nombre}</h2>
            <div className="list">
              {menuStub[selectedRest].map(item=>(
                <div key={item.id} className="producto-card">
                  <h4>{item.nombre}</h4>
                  <p><b>${item.precio.toFixed(2)}</b></p>
                  <button className="button small" onClick={()=>addToCart(item)}>
                    Añadir al carrito
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Carrito */}
        {activeTab==='Carrito' && (
          <div className="list">
            {cart.length===0
              ? <p>No hay items en el carrito.</p>
              : cart.map((i,idx)=>(
                  <div key={idx} className="producto-card">
                    <h4>{i.nombre}</h4>
                    <p>${i.precio.toFixed(2)}</p>
                  </div>
                ))
            }
            {cart.length>0 && (
              <div className="summary">
                <p><b>Total: ${total}</b></p>
                <button className="button" onClick={placeOrder}>Confirmar Pedido</button>
              </div>
            )}
          </div>
        )}

        {/* Seguimiento */}
        {activeTab==='Seguimiento' && (
          <div className="list">
            {orders.map(o=>(
              <div key={o.id} className="pedido-card">
                <h4>Pedido #{o.id}</h4>
                <p><b>Items:</b> {o.items}</p>
                <p><b>Monto:</b> ${o.monto}</p>
                <p><b>Estado:</b> {o.estado}</p>
              </div>
            ))}
            {orders.length===0 && <p>No hay pedidos.</p>}
          </div>
        )}

        {/* Historial */}
        {activeTab==='Historial' && (
          <div className="list">
            {orders.map(o=>(
              <div key={o.id} className="pedido-card">
                <h4>Pedido #{o.id}</h4>
                <p><b>Items:</b> {o.items}</p>
                <p><b>Monto:</b> ${o.monto}</p>
                <button className="button small" onClick={()=>{
                  setCart(menuStub[selectedRest]||[]); setActiveTab('Carrito');
                }}>Repetir Pedido</button>
              </div>
            ))}
            {orders.length===0 && <p>No hay historial.</p>}
          </div>
        )}

        {/* Reseñas */}
        {activeTab==='Reseñas' && (
          <form className="formulario" onSubmit={e=>e.preventDefault()}>
            <div>
              <label>Restaurante *</label>
              <select name="restId" value={ratingForm.restId} onChange={onChange(ratingForm,setRatingForm)}>
                <option value="">-- Selecciona --</option>
                {restaurantsStub.map(r=>(
                  <option key={r.id} value={r.id}>{r.nombre}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Estrellas *</label>
              <input
                name="estrellas" type="number" min="1" max="5"
                value={ratingForm.estrellas}
                onChange={onChange(ratingForm,setRatingForm)}
              />
            </div>
            <div className="full-width">
              <label>Comentario</label>
              <textarea name="comentario" value={ratingForm.comentario} onChange={onChange(ratingForm,setRatingForm)} />
            </div>
            <div className="full-width">
              <button className="button">Enviar Reseña</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
