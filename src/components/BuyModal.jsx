import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import usePayments from '../hooks/usePayments';

export default function BuyModal({ isOpen, onClose, offer }) {
    const { user } = useContext(AuthContext);
    const { purchaseCoupon, loading, error, success, newCoupon, reset } = usePayments(user);

    // Estado del formulario de tarjeta
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');

    const handleClose = () => {
        reset();
        setCardName('');
        setCardNumber('');
        setExpiry('');
        setCvc('');
        onClose();
    };

    const formatCardNumber = (value) => {
        // Agrupamos en bloques de 4 dígitos: "1234 5678 9012 3456"
        const digits = value.replace(/\D/g, '').slice(0, 16);
        return digits.replace(/(.{4})/g, '$1 ').trim();
    };

    const formatExpiry = (value) => {
        const digits = value.replace(/\D/g, '').slice(0, 4);
        if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2);
        return digits;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await purchaseCoupon({ offer, cardName, cardNumber, expiry, cvc });
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && handleClose()}>
            <div className="modal buy-modal">

                {/* ── ESTADO ÉXITO ───────────────────────────────────── */}
                {success && newCoupon ? (
                    <div style={{ textAlign: 'center', padding: '10px 0' }}>
                        <div style={{ fontSize: '56px', marginBottom: '12px' }}>🎉</div>
                        <h2 style={{ color: 'var(--primary)', marginBottom: '8px' }}>¡Compra exitosa!</h2>
                        <p className="muted" style={{ marginBottom: '20px' }}>
                            Tu cupón ha sido generado y guardado en "Mis Cupones".
                        </p>

                        {/* Cupón generado */}
                        <div style={{
                            background: 'var(--accent-soft)',
                            border: '2px dashed var(--accent)',
                            borderRadius: '16px',
                            padding: '20px',
                            marginBottom: '24px',
                        }}>
                            <p style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                                Tu Código de Canje
                            </p>
                            <code style={{
                                fontSize: '28px',
                                fontWeight: '900',
                                color: 'var(--accent)',
                                letterSpacing: '4px',
                            }}>
                                {newCoupon.code}
                            </code>
                            <p className="muted" style={{ fontSize: '12px', marginTop: '8px' }}>
                                Muéstraselo al empleado al momento de usar el beneficio
                            </p>
                        </div>

                        <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleClose}>
                            Cerrar
                        </button>
                    </div>
                ) : (
                    /* ── FORMULARIO DE PAGO ─────────────────────────── */
                    <>
                        <h2>Confirmar compra</h2>
                        <p className="muted">Revisa los detalles antes de pagar.</p>

                        {/* Resumen de la oferta */}
                        <div style={{
                            background: 'var(--surface-2)',
                            borderRadius: '12px',
                            padding: '12px 16px',
                            marginBottom: '20px',
                        }}>
                            <h3 style={{ margin: '0 0 4px', fontSize: '15px', color: 'var(--text)' }}>{offer.description}</h3>
                            <p className="buy-price" style={{ margin: 0 }}>
                                Precio: <strong style={{ color: 'var(--accent)' }}>${offer.offerPrice}</strong>
                                {offer.regularPrice && (
                                    <span className="muted" style={{ textDecoration: 'line-through', marginLeft: '8px', fontSize: '13px' }}>
                                        ${offer.regularPrice}
                                    </span>
                                )}
                            </p>
                        </div>

                        {/* Íconos de tarjetas */}
                        <div className="card-icons-placeholder">
                            <img src="/assets/credit_card.svg" alt="creditcard" />
                            <img src="/assets/ma_symbol.svg" alt="mastercard" />
                            <img src="/assets/visa.svg" alt="visa" />
                        </div>

                        {/* Mensaje de error */}
                        {error && (
                            <div style={{
                                background: '#fff1f2',
                                border: '1px solid #fecaca',
                                color: '#991b1b',
                                borderRadius: '10px',
                                padding: '10px 14px',
                                marginBottom: '16px',
                                fontSize: '14px',
                                fontWeight: '600',
                            }}>
                                ⚠️ {error}
                            </div>
                        )}

                        <form className="buy-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Nombre en la tarjeta</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Como aparece en la tarjeta"
                                    value={cardName}
                                    onChange={(e) => setCardName(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-group">
                                <label>Número de tarjeta</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="0000 0000 0000 0000"
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                    maxLength={19}
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Fecha exp.</label>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="MM/YY"
                                        value={expiry}
                                        onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                                        maxLength={5}
                                        required
                                        disabled={loading}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>CVC</label>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="123"
                                        value={cvc}
                                        onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                                        maxLength={4}
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <div className="modal-actions">
                                <button type="button" className="btn btn-secondary" onClick={handleClose} disabled={loading}>
                                    Cancelar
                                </button>
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? 'Procesando...' : `Pagar $${offer.offerPrice}`}
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}