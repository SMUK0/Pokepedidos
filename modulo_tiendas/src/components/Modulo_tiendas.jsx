import React, { useState } from 'react';
import '../assets/css/Modulo_Tiendas.css';

export default function ModuloTiendas() {
  const tabs = ['Registro','Catálogo','Pedidos','Horarios','Promociones','Pagos','Reseñas','Soporte','Notificaciones','Logística'];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  // Estado y formularios
  const [stores, setStores] = useState([]);
  const [storeForm, setStoreForm] = useState({ nombre:'', direccion:'', contacto:'', categoria:'' });

  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState({ nombre:'', descripcion:'', precio:'', imagen:null });

  const initialOrders = [
    { id: 1, cliente: 'Cliente Uno', items: 'Prod A, Prod B', status: 'pendiente' },
    { id: 2, cliente: 'Cliente Dos', items: 'Prod C', status: 'en proceso' },
  ];
  const [orders, setOrders] = useState(initialOrders);

  const [schedules, setSchedules] = useState([]);
  const [scheduleForm, setScheduleForm] = useState({ dia:'', apertura:'', cierre:'' });

  const [promotions, setPromotions] = useState([]);
  const [promoForm, setPromoForm] = useState({ descripcion:'', porcentaje:'', inicio:'', fin:'' });

  const [payments] = useState([]);
  const [reviews] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [ticketForm, setTicketForm] = useState({ asunto:'', descripcion:'' });
  const [notifications] = useState([]);
  const stubCouriers = [{ id:1, nombre:'Repartidor A' },{ id:2, nombre:'Repartidor B' }];
  const [logistics, setLogistics] = useState([]);

  // Handlers genéricos
  const handleChange = (form, setForm) => e => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };
  const handleSubmit = (e, data, setData, form, reset) => {
    e.preventDefault();
    setData([...data, { ...form, id: Date.now() }]);
    reset();
  };

  return (
    <div className="tiendas-container">
      <h1 className="page-title">Módulo de Tiendas</h1>

      <div className="tabs">
        {tabs.map(t => (
          <div
            key={t}
            className={`tab ${activeTab===t?'active':''}`}
            onClick={()=>setActiveTab(t)}
          >
            {t}
          </div>
        ))}
      </div>

      {/* --- Registro --- */}
      {activeTab==='Registro' && (
        <form
          className="formulario"
          onSubmit={e=>handleSubmit(
            e, stores, setStores,
            storeForm, ()=>setStoreForm({ nombre:'', direccion:'', contacto:'', categoria:'' })
          )}
        >
          {[
            { label:'Nombre *', name:'nombre', type:'text' },
            { label:'Dirección *', name:'direccion', type:'text' },
            { label:'Contacto *', name:'contacto', type:'text' },
            { label:'Categoría *', name:'categoria', type:'text' },
          ].map(f=>(
            <div key={f.name}>
              <label>{f.label}</label>
              <input
                name={f.name}
                type={f.type}
                value={storeForm[f.name]}
                onChange={handleChange(storeForm, setStoreForm)}
              />
            </div>
          ))}
          <div className="full-width">
            <button className="button" type="submit">Registrar Tienda</button>
          </div>
          <div className="list">
            {stores.map(s=>(
              <div key={s.id} className="tienda-card">
                <h4>{s.nombre}</h4>
                <p><b>Dirección:</b> {s.direccion}</p>
                <p><b>Contacto:</b> {s.contacto}</p>
                <p><b>Categoría:</b> {s.categoria}</p>
                <p><b>Estado:</b> pendiente</p>
              </div>
            ))}
          </div>
        </form>
      )}

      {/* --- Catálogo --- */}
      {activeTab==='Catálogo' && (
        <>
          <form
            className="formulario"
            onSubmit={e=>handleSubmit(
              e, products, setProducts,
              productForm, ()=>setProductForm({ nombre:'', descripcion:'', precio:'', imagen:null })
            )}
          >
            <div>
              <label>Nombre *</label>
              <input
                name="nombre"
                value={productForm.nombre}
                onChange={handleChange(productForm, setProductForm)}
              />
            </div>
            <div>
              <label>Precio *</label>
              <input
                name="precio"
                type="number"
                value={productForm.precio}
                onChange={handleChange(productForm, setProductForm)}
              />
            </div>
            <div>
              <label>Descripción</label>
              <textarea
                name="descripcion"
                value={productForm.descripcion}
                onChange={handleChange(productForm, setProductForm)}
              />
            </div>
            <div>
              <label>Imagen</label>
              <input
                name="imagen"
                type="file"
                onChange={handleChange(productForm, setProductForm)}
              />
            </div>
            <div className="full-width">
              <button className="button" type="submit">Agregar Producto</button>
            </div>
          </form>
          <div className="list">
            {products.map(p=>(
              <div key={p.id} className="producto-card">
                <h4>{p.nombre}</h4>
                <p><b>Precio:</b> ${p.precio}</p>
                <p>{p.descripcion}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* --- Pedidos --- */}
      {activeTab==='Pedidos' && (
        <div className="list">
          {orders.map(o=>(
            <div key={o.id} className="pedido-card">
              <h4>Pedido #{o.id}</h4>
              <p><b>Cliente:</b> {o.cliente}</p>
              <p><b>Items:</b> {o.items}</p>
              <p>
                <b>Estado:</b>
                <select
                  value={o.status}
                  onChange={e=>setOrders(orders.map(x=>x.id===o.id?{...x,status:e.target.value}:x))}
                >
                  {['pendiente','en proceso','enviado','entregado'].map(st=>(
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </p>
            </div>
          ))}
        </div>
      )}

      {/* --- Horarios --- */}
      {activeTab==='Horarios' && (
        <>
          <form
            className="formulario"
            onSubmit={e=>handleSubmit(
              e, schedules, setSchedules,
              scheduleForm, ()=>setScheduleForm({ dia:'', apertura:'', cierre:'' })
            )}
          >
            <div>
              <label>Día *</label>
              <select
                name="dia"
                value={scheduleForm.dia}
                onChange={handleChange(scheduleForm, setScheduleForm)}
              >
                <option value="">-- Selecciona --</option>
                {['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'].map(d=>(
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Apertura *</label>
              <input
                name="apertura"
                type="time"
                value={scheduleForm.apertura}
                onChange={handleChange(scheduleForm, setScheduleForm)}
              />
            </div>
            <div>
              <label>Cierre *</label>
              <input
                name="cierre"
                type="time"
                value={scheduleForm.cierre}
                onChange={handleChange(scheduleForm, setScheduleForm)}
              />
            </div>
            <div className="full-width">
              <button className="button" type="submit">Guardar Horario</button>
            </div>
          </form>
          <div className="list">
            {schedules.map(h=>(
              <div key={h.id} className="schedule-card">
                <p><b>{h.dia}:</b> {h.apertura} – {h.cierre}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* --- Promociones --- */}
      {activeTab==='Promociones' && (
        <>
          <form
            className="formulario"
            onSubmit={e=>handleSubmit(
              e, promotions, setPromotions,
              promoForm, ()=>setPromoForm({ descripcion:'', porcentaje:'', inicio:'', fin:'' })
            )}
          >
            <div>
              <label>Descripción *</label>
              <input
                name="descripcion"
                value={promoForm.descripcion}
                onChange={handleChange(promoForm, setPromoForm)}
              />
            </div>
            <div>
              <label>% Descuento *</label>
              <input
                name="porcentaje"
                type="number"
                value={promoForm.porcentaje}
                onChange={handleChange(promoForm, setPromoForm)}
              />
            </div>
            <div>
              <label>Inicio *</label>
              <input
                name="inicio"
                type="datetime-local"
                value={promoForm.inicio}
                onChange={handleChange(promoForm, setPromoForm)}
              />
            </div>
            <div>
              <label>Fin *</label>
              <input
                name="fin"
                type="datetime-local"
                value={promoForm.fin}
                onChange={handleChange(promoForm, setPromoForm)}
              />
            </div>
            <div className="full-width">
              <button className="button" type="submit">Crear Promoción</button>
            </div>
          </form>
          <div className="list">
            {promotions.map(p=>(
              <div key={p.id} className="promo-card">
                <p><b>{p.descripcion}</b> — {p.porcentaje}% ({p.inicio}→{p.fin})</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* --- Pagos --- */}
      {activeTab==='Pagos' && (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr><th>Fecha</th><th>Monto</th><th>Comisión</th></tr>
            </thead>
            <tbody>
              {payments.length===0
                ? <tr><td colSpan="3">Sin transacciones</td></tr>
                : payments.map((p,i)=>(
                    <tr key={i}>
                      <td>{p.fecha}</td><td>{p.monto}</td><td>{p.comision}</td>
                    </tr>
                  ))
              }
            </tbody>
          </table>
        </div>
      )}

      {/* --- Reseñas --- */}
      {activeTab==='Reseñas' && (
        <div className="list">
          {reviews.length===0
            ? <p>No hay reseñas.</p>
            : reviews.map(r=>(
                <div key={r.id} className="review-card">
                  <h4>{r.usuario} — {r.puntuacion}/5</h4>
                  <p>{r.comentario}</p>
                  <textarea placeholder="Responder..." onBlur={e=>console.log(e.target.value)} />
                </div>
              ))
          }
        </div>
      )}

      {/* --- Soporte --- */}
      {activeTab==='Soporte' && (
        <>
          <form
            className="formulario"
            onSubmit={e=>handleSubmit(
              e, tickets, setTickets,
              ticketForm, ()=>setTicketForm({ asunto:'', descripcion:'' })
            )}
          >
            <div>
              <label>Asunto *</label>
              <input name="asunto" value={ticketForm.asunto} onChange={handleChange(ticketForm, setTicketForm)} />
            </div>
            <div>
              <label>Descripción *</label>
              <textarea name="descripcion" value={ticketForm.descripcion} onChange={handleChange(ticketForm, setTicketForm)} />
            </div>
            <div className="full-width">
              <button className="button" type="submit">Enviar Solicitud</button>
            </div>
          </form>
          <div className="list">
            {tickets.map(t=>(
              <div key={t.id} className="ticket-card">
                <h4>{t.asunto}</h4>
                <p>{t.descripcion}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* --- Notificaciones --- */}
      {activeTab==='Notificaciones' && (
        <div className="list">
          {notifications.length===0
            ? <p>Sin notificaciones.</p>
            : notifications.map((n,i)=><div key={i} className="notification-card">{n}</div>)
          }
        </div>
      )}

      {/* --- Logística --- */}
      {activeTab==='Logística' && (
        <div className="list">
          {logistics.length===0
            ? <p>Nada por asignar.</p>
            : logistics.map(l=>(
                <div key={l.id} className="logi-card">
                  <h4>Pedido #{l.pedidoId}</h4>
                  <select onChange={e=>console.log(e.target.value)}>
                    <option value="">-- Repartidor --</option>
                    {stubCouriers.map(c=>(
                      <option key={c.id} value={c.id}>{c.nombre}</option>
                    ))}
                  </select>
                </div>
              ))
          }
        </div>
      )}
    </div>
  );
}
