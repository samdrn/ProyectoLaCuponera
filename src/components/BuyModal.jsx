import React, { useState } from 'react';
import Modal from './Modal';
export default function BuyModal({ isOpen, onClose, offer }) {
    // esta funcion hay que cambiarla para enviar el cupon
    const handlePayment = () => {
        console.log("procesando pago para ", offer.description);
        console.log("enviando cupon");
        // aqui va a ir la logica del pago real
        onClose(); 
    };

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            title="Pasarela de Pago"
        >
            <div className="payment-form">
                <p className="payment-summary">
                    Total a pagar: <strong>${offer.offerPrice}</strong>
                </p>

                <div className="card-icons-placeholder" style={{ margin: '1rem 0', display: 'flex', gap: '10px' }}>
                    <img src="/assets/credit_card.svg" alt="creditcard" />
                    <div style={{ width: '40px', height: '25px'}}><img src='/assets/ma_symbol.svg'></img></div>
                    <div style={{ width: '40px', height: '25px'}}><img src='/assets/visa.svg'></img></div>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); handlePayment(); }}>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Nombre en la tarjeta</label>
                        <input 
                            type="text" 
                            className="input" 
                            placeholder="Como aparece en la tarjeta" 
                            style={{ width: '100%' }}
                        />
                    </div>

                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Número de tarjeta</label>
                        <input 
                            type="text" 
                            className="input" 
                            placeholder="0000 0000 0000 0000" 
                            style={{ width: '100%' }}
                        />
                    </div>

                    <div className="form-row" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Fecha exp.</label>
                            <input 
                                type="text" 
                                className="input" 
                                placeholder="MM/YY" 
                                style={{ width: '100%' }}
                            />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>CVC</label>
                            <input 
                                type="text" 
                                className="input" 
                                placeholder="123" 
                                style={{ width: '100%' }}
                            />
                        </div>
                    </div>

                    <div className="modal-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Pagar ${offer.offerPrice}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}