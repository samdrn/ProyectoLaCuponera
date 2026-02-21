import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { OfferCard } from "../components/OfferCard";
import { getApprovedOffers } from "../services/offersService";
import { useSearchParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Home() {
    const [offers, setOffers] = useState([]);
    const [searchParams] = useSearchParams();
    const selectedCategory = searchParams.get("category");
    const { user } = useAuth();

    useEffect(() => {
        const fetchOffers = async () => {

            const currentTimestamp = Math.floor(Date.now()/1000)

            let data = await getApprovedOffers();

            console.log(data, currentTimestamp)

            data = data.filter((offer) => offer.startDate.seconds < currentTimestamp && offer.endDate.seconds > currentTimestamp)

            setOffers(data);
        };

        fetchOffers();
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
                {filteredOffers.map((offer) => (
                    <OfferCard key={offer.id} offer={offer} />
                ))}
            </div>
        </div>
        <Footer />
      </>
    );
  }
