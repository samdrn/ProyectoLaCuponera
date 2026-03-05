import React, { useState } from 'react'
import BuyModal from './BuyModal';

export const OfferCard = ({offer}) => {
  const {description, endDate, limitCoupons, offerPrice, regularPrice, category} = offer
  

  const [isOpen, setIsOpen] = useState(false);
  const cardClass = isOpen ? "offer-card-horizontal modal-active" : "offer-card-horizontal";

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const formattedEndDate = endDate && typeof endDate.toDate === "function"
    ? endDate.toDate().toLocaleDateString()
    : "Sin fecha";


  return (
    <article className={cardClass}> 
        {/* Lado Izquierdo: Imagen y Badge */}
        <div className="offer-card-image-content">
          <img src={`/assets/${category}.svg`} alt={category} className="offer-image"/>
          <span className="category-badge">{category}</span>
        </div>

        {/* Lado Medio: Información principal */}
        <div className="offer-card-main-info">
          <h3 className="offer-desc" title={description}>{description}</h3>
          
          <div className="offer-card-footer-info">
            {limitCoupons ? (
              <p className="amount-bought">Límite: <strong>{limitCoupons}</strong> unidades</p>
            ) : (
              <p className="amount-bought">Sin límite de compra</p>
            )}
            <p className="expiration-date">Vence: <span>{formattedEndDate}</span></p>
          </div>
        </div>

        {/* Lado Derecho: Precios y Acción */}
        <div className="offer-card-actions">
            <div className="price-stack">
              <span className="old-price">${regularPrice}</span>
              <span className="new-price">${offerPrice}</span>
              <span className="save-tag">AHORRA ${(regularPrice - offerPrice).toFixed(0)}</span>
            </div>
            
            <button className="details-button" onClick={handleOpen}>
              Comprar
            </button>
        </div>

        {isOpen && (
            <BuyModal isOpen={isOpen} onClose={handleClose} offer={offer} />
        )}
    </article>
  
  )
}
