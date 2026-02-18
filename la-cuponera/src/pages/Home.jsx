import React, { useState } from 'react';
import {Navbar} from "../components/Navbar";
import {Footer} from "../components/Footer";
import { OfferCard } from '../components/OfferCard';

export const Home = () => {
    const offers = [{
        id: 1,
        description: "descripcion prueba",
        dicount: 0.99,
        oldPrice: 100,
        ammountBought: 999,
        daysLeft: 365,
        offerImage: "vite",
        companyImage: "vite",
        category: "food"
    }]
    const [searchParams] = useSearchParams();


    const selectedCategory = searchParams.get("category");

    const filteredOffers = selectedCategory
        ? products.filter((p) => p.category === selectedCategory)
        : products;

    

  return (
    <>
    <Navbar/>


      <div style={{ padding: "20px" }}>
        <h2>
          {selectedCategory
            ? `Categoría seleccionada: ${selectedCategory}`
            : ""}
        </h2>
        </div>

        <h2>Ofertas Disponibles</h2>
        <div className='offerContainer'>
            {filteredOffers.map((offer)=>(
            <OfferCard offer={offer} key={offer.id}/>
            ))}
        </div>
    
    <Footer/>
    </>
  )
}
