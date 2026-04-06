import React, { useState } from 'react';
import { useRedeem } from '../hooks/useRedeem';

export default function RedeemCoupon() {
  const [code, setCode] = useState('');
  const { redeem, loading, error, success } = useRedeem();

  const handleRedeem = (e) => {
    e.preventDefault();
    if (code.trim()) {
      // Llamamos a la lógica del hook que creamos antes
      redeem(code.trim().toUpperCase());
    }
  };

  return (
    <main className="site-main">
      <div className="container" style={{ maxWidth: '550px' }}>
        
        {/* Encabezado siguiendo tu estilo de Mis Cupones */}
        <div style={{ marginBottom: '30px', borderLeft: '5px solid var(--accent)', paddingLeft: '20px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: 'var(--primary)', margin: 0 }}>
            Canje de <span>Cupones</span>
          </h1>
          <p style={{ color: 'var(--muted)', marginTop: '5px' }}>
            Módulo exclusivo para empleados. Valida el código del cliente.
          </p>
        </div>

        {/* Caja de formulario usando tu clase .card-body y .card-offer (o similar) */}
        <div className="card-body" style={{ 
          background: 'var(--surface)', 
          border: '1px solid var(--border)', 
          borderRadius: '18px',
          boxShadow: 'var(--shadow)' 
        }}>
          
          <form onSubmit={handleRedeem}>
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700' }}>
                Código Único del Cupón
              </label>
              <input 
                type="text" 
                className="input" 
                placeholder="EJ: LBD1234567"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                disabled={loading}
                style={{ fontSize: '18px', letterSpacing: '2px', textAlign: 'center', fontWeight: '800', color: 'var(--primary)' }}
              />
            </div>
            
            <button 
              type="submit" 
              className="btn-primary" 
              style={{ width: '100%', height: '50px', fontSize: '16px' }}
              disabled={loading || !code}
            >
              {loading ? "Verificando en sistema..." : "Validar y Marcar como Canjeado"}
            </button>
          </form>

          {/* Feedback Visual usando tus estilos de badges */}
          {error && (
            <div className="badge-warning" style={{ 
              marginTop: '20px', 
              width: '100%', 
              justifyContent: 'center', 
              padding: '12px', 
              borderRadius: '12px',
              border: '1px solid rgba(220, 38, 38, 0.2)',
              background: 'rgba(220, 38, 38, 0.05)',
              color: '#991b1b'
            }}>
              <strong>Error:</strong> {error}
            </div>
          )}

          {success && (
            <div className="badge-success" style={{ 
              marginTop: '20px', 
              width: '100%', 
              justifyContent: 'center', 
              padding: '12px', 
              borderRadius: '12px',
              fontWeight: '700'
            }}>
              ✅ ¡Cupón válido! El estado se cambió a "Canjeado".
            </div>
          )}
        </div>

        {/* Footer de ayuda rápida */}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p className="muted" style={{ fontSize: '13px' }}>
            Si el código no funciona, verifica que el cliente presente su DUI para confirmar titularidad.
          </p>
        </div>

      </div>
    </main>
  );
}