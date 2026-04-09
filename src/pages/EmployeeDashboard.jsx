// src/pages/EmployeeDashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar"; // IMPORTANTE: Importar el menú

export default function EmployeeDashboard() {
  const navigate = useNavigate();

  return (
    <div className="app-layout">
      {/* 1. Menú superior integrado */}
      <Navbar />

      <main className="site-main">
        <div className="container" style={{ paddingTop: '40px' }}>
          
          {/* 2. Encabezado profesional con línea naranja */}
          <div style={{ marginBottom: '40px', borderLeft: '6px solid var(--accent)', paddingLeft: '20px' }}>
            <h1 style={{ fontSize: '34px', fontWeight: '900', color: 'var(--primary)', margin: 0 }}>
              Panel de <span>Empleado</span>
            </h1>
            <p style={{ color: 'var(--muted)', marginTop: '8px', fontSize: '16px' }}>
              Bienvenido. Selecciona una herramienta para comenzar.
            </p>
          </div>

          <div className="grid-coupons">
            {/* Tarjeta de Acceso al Canje */}
            <div 
              className="coupon-card-purchased" 
              style={{ 
                cursor: 'pointer', 
                padding: '40px', 
                textAlign: 'center', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '320px',
                transition: 'transform 0.2s ease'
              }} 
              onClick={() => navigate('/redeem')}
            >
              <div style={{ fontSize: '60px', marginBottom: '20px' }}>🎫</div>
              <h3 className="coupon-title">Canjear Cupón</h3>
              <p className="muted" style={{ fontSize: '14px', marginBottom: '20px' }}>
                Validar y registrar el uso de un cupón de cliente en tiempo real.
              </p>
              <button className="btn-primary" style={{ height: '50px', width: '100%', borderRadius: '12px' }}>
                Abrir Herramienta de Canje
              </button>
            </div>

            {/* Espacio para futuras herramientas (Deshabilitado visualmente) */}
            <div 
              className="coupon-card-purchased" 
              style={{ 
                padding: '40px', 
                textAlign: 'center', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.5,
                background: 'rgba(15, 23, 42, 0.03)'
              }} 
            >
              <div style={{ fontSize: '60px', marginBottom: '20px', filter: 'grayscale(1)' }}>📊</div>
              <h3 className="coupon-title">Reporte de Ventas</h3>
              <p className="muted" style={{ fontSize: '14px' }}>
                Próximamente: Visualiza el resumen de cupones canjeados por fecha.
              </p>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}