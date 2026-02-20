import React from 'react'

export const OfferCard = ({offer}) => {
  const {description, endDate, image, limitCoupons, offerPrice, regularPrice} = offer

  const formattedEndDate = endDate && typeof endDate.toDate === "function"
    ? endDate.toDate().toLocaleDateString()
    : "Sin fecha";


  return (
    <div>
        <img src={`${image}.svg`} alt="Imagen de oferta" className='offer-image'/>
        <p className='offer-desc'>{description}</p>

        <div className='price-comparison'>
            <p className='new-price'>${offerPrice}</p>
            <p className='price-divider'>| Antes</p>
            <p className='old-price'>${regularPrice}</p>
        </div>
        <button className='details-button'>Mas Detalles</button>
        <div className='expiration-info'>
            <p className='ammount-bought'>Cantidad limite de compras: {limitCoupons} |</p>
            <p className='expiration-date'>finaliza en <span>{formattedEndDate}</span></p>
        </div>
    </div>
  )
}
