import React, { useState } from 'react';
import BuyModal from './BuyModal';
import Modal from './Modal';

export const OfferCard = ({ offer }) => {
  const {
    title,
    description,
    endDate,
    limitCoupons,
    offerPrice,
    regularPrice,
    category
  } = offer;

  const [isOpen, setIsOpen] = useState(false);
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
      <article className={cardClass}>

        <div className="offer-card-image-content">
          <img
            src={`/assets/${category}.svg`}
            alt={category}
            className="offer-image"
          />
          <span className="category-badge">{category}</span>
        </div>

        <div className="offer-card-main-info">

          <h3
            style={{
              margin: "0 0 6px 0",
              fontWeight: "700",
              fontSize: "18px"
            }}
          >
            {title || "Oferta sin título"}
          </h3>

          <p
            className="offer-desc"
            style={{
              marginBottom: "10px",
              color: "var(--muted)"
            }}
          >
            {description}
          </p>

          <div className="offer-card-footer-info">
            {limitCoupons ? (
              <p className="amount-bought">
                Límite: <strong>{limitCoupons}</strong>
              </p>
            ) : (
              <p className="amount-bought">Sin límite</p>
            )}

            <p className="expiration-date">
              Vence: <span>{formattedEndDate}</span>
            </p>
          </div>
        </div>

        <div className="offer-card-actions">

          <div className="price-stack">
            <span className="old-price">${regularPrice}</span>
            <span className="new-price">${offerPrice}</span>
            <span className="save-tag">AHORRA ${ahorro}</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <button className="details-button" onClick={handleOpen}>
              Comprar
            </button>

            <button className="btn" onClick={() => setShowDetails(true)}>
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
          <button className="btn" onClick={() => setShowDetails(false)}>
            Cerrar
          </button>
        }
      >

        <p><strong>Título:</strong> {title}</p>

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