import { useEffect, useState } from "react";
import { getAllOffers, updateOfferStatus } from "../services/offersService";
import Navbar from "../components/Navbar";

export default function AdminOffers() {

    const [offers, setOffers] = useState([]);

    const fetchOffers = async () => {
        const data = await getAllOffers();
        setOffers(data);
    };

    useEffect(() => {
        fetchOffers();
    }, []);

    const approve = async (id) => {
        await updateOfferStatus(id, "approved");
        fetchOffers();
    };

    const reject = async (id) => {
        await updateOfferStatus(id, "rejected");
        fetchOffers();
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <h2>Administrar Ofertas</h2>

                {offers.map(o => (
                    <div key={o.id}>
                        <h3>{o.title}</h3>
                        <p>{o.status}</p>

                        <button onClick={() => approve(o.id)}>Aprobar</button>
                        <button onClick={() => reject(o.id)}>Rechazar</button>
                    </div>
                ))}
            </div>
        </>
    );
}