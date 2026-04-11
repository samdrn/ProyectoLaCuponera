import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getAll } from "../services/companiesService";
import { getAllOffers } from "../services/offersService";

export default function AdminCompaniesOffers() {

    const [companies, setCompanies] = useState([]);
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setCompanies(await getAll());
            setOffers(await getAllOffers());
        };

        fetchData();
    }, []);

    return (
        <>
            <Navbar />

            <div className="container">
                <h2>Empresas y sus ofertas</h2>

                {companies.map(company => {
                    const companyOffers = offers.filter(o => o.companyId === company.id);

                    return (
                        <div key={company.id} className="offer-card">

                            <h3>{company.name}</h3>

                            {companyOffers.length === 0 ? (
                                <p>No tiene ofertas</p>
                            ) : (
                                companyOffers.map(o => (
                                    <div key={o.id} style={{ marginLeft: "20px" }}>
                                        <strong>{o.title}</strong>
                                        <p>{o.description}</p>
                                        <small>{o.status}</small>
                                    </div>
                                ))
                            )}

                        </div>
                    );
                })}
            </div>

            <Footer />
        </>
    );
}