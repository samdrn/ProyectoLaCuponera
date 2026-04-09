import React, { useState } from 'react';
import { useRedeem } from '../hooks/useRedeem';
import Navbar from "../components/Navbar";

export default function RedeemCoupon() {
  const [code, setCode] = useState('');
  const { redeem, loading, error, success } = useRedeem();

  const handleRedeem = (e) => {
    e.preventDefault();
    if (code.trim()) {
      redeem(code.trim().toUpperCase());
    }
  };

  return (
    <div className="app-layout">
      {/* 1. Navbar integrado en la parte superior */}
      <Navbar />

      <main className="site-main">
        <div className="container" style={{ maxWidth: '500px', paddingTop: '40px' }}>
          
          {/* 2. Encabezado con línea de acento naranja */}
          <div style={{ marginBottom: '35px', borderLeft: '6px solid var(--accent)', paddingLeft: '20px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '900', color: 'var(--primary)', margin: 0, letterSpacing: '-1px' }}>
              Canje de <span>Cupones</span>
            </h1>
            <p style={{ color: 'var(--muted)', marginTop: '8px', fontSize: '15px' }}>
              Valida el código único del cliente para procesar el beneficio.
            </p>
          </div>

          {/* 3. El Formulario de Canje (Caja Blanca Premium) */}
          <div className="card-body" style={{ 
            background: 'var(--surface)', 
            border: '1px solid var(--border)', 
            borderRadius: '24px',
            padding: '40px',
            boxShadow: 'var(--shadow-lg)',
            textAlign: 'center'
          }}>
            
            <form onSubmit={handleRedeem}>
              <div className="form-group" style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', marginBottom: '15px', fontWeight: '800', fontSize: '13px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Ingresa el Código Aquí
                </label>
                <input 
                  type="text" 
                  className="input" 
                  placeholder="EJ: RES123WT8"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  disabled={loading}
                  style={{ 
                    height: '65px', 
                    fontSize: '24px', 
                    letterSpacing: '3px', 
                    textAlign: 'center', 
                    fontWeight: '900', 
                    color: 'var(--primary)',
                    borderRadius: '16px',
                    border: '2px solid var(--border)',
                    outline: 'none'
                  }}
                />
              </div>
              
              <button 
                type="submit" 
                className="btn-primary" 
                style={{ 
                  width: '100%', 
                  height: '55px', 
                  fontSize: '17px', 
                  borderRadius: '14px',
                  boxShadow: '0 8px 20px rgba(249, 115, 22, 0.3)'
                }}
                disabled={loading || !code}
              >
                {loading ? "Procesando..." : "Validar y Canjear"}
              </button>
            </form>

            {/* Mensajes de Feedback */}
            {error && (
              <div style={{ 
                marginTop: '25px', padding: '15px', borderRadius: '12px', 
                background: '#fff1f2', border: '1px solid #fecaca', color: '#991b1b',
                fontWeight: '700', fontSize: '14px'
              }}>
                ⚠️ {error}
              </div>
            )}

            {success && (
              <div style={{ 
                marginTop: '25px', padding: '15px', borderRadius: '12px', 
                background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534',
                fontWeight: '800', fontSize: '15px'
              }}>
                ✅ Cupón canjeado satisfactoriamente
              </div>
            )}
          </div>

          <p className="muted" style={{ marginTop: '30px', textAlign: 'center', fontSize: '12px', fontStyle: 'italic' }}>
            Recuerda solicitar el DUI del cliente para verificar que el cupón le pertenece.
          </p>
        </div>
      </main>
    </div>
  );
}