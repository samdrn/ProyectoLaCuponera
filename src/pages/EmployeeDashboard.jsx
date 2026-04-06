// src/pages/EmployeeDashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function EmployeeDashboard() {
  const navigate = useNavigate();

  return (
    <main className="site-main">
      <div className="container">
        <div className="page-header-simple">
          <h1>Panel de <span>Empleado</span></h1>
          <p>Bienvenido. Selecciona una herramienta para comenzar.</p>
        </div>

        <div className="grid-coupons">
          {/* Tarjeta de Acceso al Canje */}
          <div className="coupon-card-purchased" style={{ cursor: 'pointer', padding: '30px', textAlign: 'center', justifyContent: 'center' }} 
               onClick={() => navigate('/redeem')}>
            <div className="icon-placeholder" style={{ fontSize: '50px', marginBottom: '20px' }}>🎫</div>
            <h3 className="coupon-title">Canjear Cupón</h3>
            <p className="muted">Validar y registrar el uso de un cupón de cliente.</p>
            <button className="btn-primary" style={{ marginTop: '20px', width: '100%' }}>
              Abrir Escáner / Lector
            </button>
          </div>
          
          {/* Puedes dejar espacio para otras herramientas futuras */}
        </div>
      </div>
    </main>
  );
}