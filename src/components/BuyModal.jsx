import React, { useContext, useState } from 'react';
import useCoupons from '../hooks/useCoupons';
import {AuthContext} from '../context/AuthContext'


export default function BuyModal({ isOpen, onClose, offer }) {

    const {user} = useContext(AuthContext)

    const {buyCoupon} = useCoupons(user)

    return(
        <div className="modal-overlay">
    <div className="modal buy-modal">
      <h2>Confirmar compra</h2>
      <p>¿Estás seguro de que quieres comprar el cupón?</p>

      <h3>{offer.title}</h3>
      <p className="buy-price">Precio: <strong>${offer.offerPrice}</strong></p>

      <div className="card-icons-placeholder">
        <img src="/assets/credit_card.svg" alt="creditcard" />
        <img src="/assets/ma_symbol.svg" alt="mastercard" />
        <img src="/assets/visa.svg" alt="visa" />
      </div>

      <form
        className="buy-form"
        onSubmit={(e) => { e.preventDefault(); buyCoupon(offer); }}
      >
        <div className="form-group">
          <label>Nombre en la tarjeta</label>
          <input
            type="text"
            className="input"
            placeholder="Como aparece en la tarjeta"
          />
        </div>

        <div className="form-group">
          <label>Número de tarjeta</label>
          <input
            type="text"
            className="input"
            placeholder="0000 0000 0000 0000"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Fecha exp.</label>
            <input
              type="text"
              className="input"
              placeholder="MM/YY"
            />
          </div>

          <div className="form-group">
            <label>CVC</label>
            <input
              type="text"
              className="input"
              placeholder="123"
            />
          </div>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            Pagar ${offer.offerPrice}
          </button>
        </div>
      </form>
    </div>
  </div>
    );
}