import React, { useState } from 'react'
import BuyModal from './BuyModal';

export const OfferCard = ({offer}) => {
  const {description, endDate, limitCoupons, offerPrice, regularPrice, category} = offer

  const [isOpen, setIsOpen] = useState(false);

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
    <div>
        <img src={`/assets/${category}.svg`} alt={`Imagen de oferta de categoría: ${category}`} className='offer-image'/>
        <p className='offer-desc'>{description}</p>

        <div className='price-comparison'>
            <p className='new-price'>${offerPrice}</p>
            <p className='price-divider'> Antes</p>
            <p className='old-price'>${regularPrice}</p>
        </div>
        <button className='details-button' onClick={()=>handleOpen()}>Comprar</button>
        <div className='expiration-info'>
          {
            limitCoupons?
            <p className='ammount-bought'>Cantidad limite de compras: {limitCoupons}</p>
            :
            <p className='ammount-bought'>Sin limite de compras</p>
            
            
          }
            <p className='expiration-date'>finaliza: <span>{formattedEndDate}</span></p>
                    {isOpen && (
            <BuyModal
                isOpen={isOpen}
                onClose={handleClose}
                offer={offer}
            />
        )}
        </div>
    </div>
  )
}
