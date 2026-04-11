import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { OfferCard } from "../components/OfferCard";
import { getApprovedOffers } from "../services/offersService";
import { useSearchParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Timestamp } from "firebase/firestore";

export default function Home() {
    const [offers, setOffers] = useState([]);
    const [searchParams] = useSearchParams();
    const selectedCategory = searchParams.get("category");
    const { user } = useAuth();

    useEffect(() => {
        const fetchOffers = async () => {
            let data = await getApprovedOffers();

            data = data.filter(o => o.endDate > Timestamp.now())

            // para demo, no tiene filtros
            setOffers(data);
        };

        fetchOffers();

        // auto refresh cada 3 segundos para ver nuevas ofertas (en producción se haría con sockets o similar)
        const interval = setInterval(() => {
            fetchOffers();
        }, 3000);

        return () => clearInterval(interval);

    }, []);

    const filteredOffers = selectedCategory
        ? offers.filter((offer) => offer.category === selectedCategory)
        : offers;

    return (
      <>
        <Navbar />
        <div className="container">
            {user && user.names && (
                <div style={{ margin: '1rem 0', fontSize: '1.2rem' }}>
                    👋 Hola, <strong>{user.names}</strong>
                </div>
            )}

            <h2>Ofertas disponibles</h2>

            <div className="grid coupons">
                {filteredOffers.length === 0 ? (
                    <p>No hay ofertas disponibles</p>
                ) : (
                    filteredOffers.map((offer) => (
                        <OfferCard key={offer.id} offer={offer} />
                    ))
                )}
            </div>
        </div>
        <Footer />
      </>
    );
}