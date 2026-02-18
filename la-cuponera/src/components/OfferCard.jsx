import React from 'react'

export const OfferCard = ({offer}) => {
  const {id, description, discount, oldPrice, ammountBought, daysLeft, offerImage, companyImage} = offer

  return (
    <div>
        <img src={`${offerImage}.svg`} alt="Imagen de oferta" className='offer-image'/>
        <img src={`${companyImage}=.svg`} alt="Imagen de empresa" className='company-image'/>
        <p className='offer-desc'>{description}</p>
        <p className='new-price'>${oldPrice * (1 - discount)}</p>
        <div className='price-comparison'>
            <p className='discount'>%{discount}</p>
            <p className='price-divider'>| Antes</p>
            <p className='old-price'>${oldPrice}</p>
        </div>
        <button className='details-button'>Mas Detalles</button>
        <div className='expiration-info'>
            <p className='ammount-bought'>Cantidad comprada: {ammountBought} |</p>
            <p className='expiration-date'>finaliza en <span>{daysLeft}</span></p>
        </div>
    </div>
  )
}
