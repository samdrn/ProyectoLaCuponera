import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { OfferCard } from "../components/OfferCard";
import { getApprovedOffers } from "../services/offersService";
import { useSearchParams } from "react-router-dom";

export default function Home() {
    const [offers, setOffers] = useState([]);
    const [searchParams] = useSearchParams();
    const selectedCategory = searchParams.get("category");

    useEffect(() => {
        const fetchOffers = async () => {
            const data = await getApprovedOffers();
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
