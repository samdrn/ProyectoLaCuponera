import React, { useState } from 'react';
import BuyModal from './BuyModal';
import Modal from './Modal';

export const OfferCard = ({ offer }) => {
  const {
    description,
    endDate,
    limitCoupons,
    offerPrice,
    regularPrice,
    category
  } = offer;

  // MODAL COMPRA
  const [isOpen, setIsOpen] = useState(false);

  // MODAL DETALLES
  const [showDetails, setShowDetails] = useState(false);

  const cardClass = isOpen
    ? "offer-card-horizontal modal-active"
    : "offer-card-horizontal";

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const formattedEndDate =
    endDate && typeof endDate.toDate === "function"
      ? endDate.toDate().toLocaleDateString()
      : "Sin fecha";

  const ahorro = (regularPrice - offerPrice).toFixed(0);

  return (
    <>
      {/* CARD */}
      <article className={cardClass}>

        {/* IZQUIERDA: IMAGEN */}
        <div className="offer-card-image-content">
          <img
            src={`/assets/${category}.svg`}
            alt={category}
            className="offer-image"
          />
          <span className="category-badge">{category}</span>
        </div>

        {/* CENTRO: INFO */}
        <div className="offer-card-main-info">
          <h3 className="offer-desc" title={description}>
            {description}
          </h3>

          <div className="offer-card-footer-info">
            {limitCoupons ? (
              <p className="amount-bought">
                Límite: <strong>{limitCoupons}</strong> unidades
              </p>
            ) : (
              <p className="amount-bought">Sin límite de compra</p>
            )}

            <p className="expiration-date">
              Vence: <span>{formattedEndDate}</span>
            </p>
          </div>
        </div>

        {/* DERECHA: PRECIO + BOTONES */}
        <div className="offer-card-actions">

          <div className="price-stack">
            <span className="old-price">${regularPrice}</span>
            <span className="new-price">${offerPrice}</span>
            <span className="save-tag">AHORRA ${ahorro}</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <button
              className="details-button"
              onClick={handleOpen}
            >
              Comprar
            </button>

            <button
              className="btn"
              onClick={() => setShowDetails(true)}
            >
              Ver detalles
            </button>
          </div>

        </div>

      </article>

      {isOpen && (
        <BuyModal
          isOpen={isOpen}
          onClose={handleClose}
          offer={offer}
        />
      )}

      <Modal
        isOpen={showDetails}
        title="Detalle de la oferta"
        onClose={() => setShowDetails(false)}
        footer={
          <button
            className="btn"
            onClick={() => setShowDetails(false)}
          >
            Cerrar
          </button>
        }
      >
        <p><strong>Descripción:</strong> {description}</p>

        <div className="hr"></div>

        <p><strong>Categoría:</strong> {category}</p>
        <p><strong>Precio normal:</strong> ${regularPrice}</p>
        <p><strong>Precio oferta:</strong> ${offerPrice}</p>

        <p><strong>Ahorro:</strong> ${ahorro}</p>

        <p>
          <strong>Disponibles:</strong> {limitCoupons || "Sin límite"}
        </p>

        <p>
          <strong>Fecha límite:</strong> {formattedEndDate}
        </p>
      </Modal>
    </>
  );
};