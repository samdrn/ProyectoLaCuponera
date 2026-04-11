import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import useOffers from "../hooks/useOffers";
import useAuth from "../hooks/useAuth";

export default function ManageOffers() {

    const { user } = useAuth();
    const { offers, fetchMyOffers, removeOffer } = useOffers(user);

    const [selectedOffer, setSelectedOffer] = useState(null);

    useEffect(() => {
        fetchMyOffers();
    }, []);

    return (
        <>
            <Navbar />

            <div className="container">

                {/* 🔥 HEADER */}
                <div className="page-header">
                    <h1>Mis Ofertas</h1>
                    <p>Administra las ofertas que has creado</p>
                </div>

                {/* 🔥 LISTA */}
                <div className="admin-list">

                    {offers.length === 0 ? (
                        <p>No has creado ofertas aún</p>
                    ) : (
                        offers.map((offer) => (
                            <div key={offer.id} className="admin-card">

                                {/* INFO */}
                                <div className="admin-info">
                                    <strong>{offer.title}</strong>
                                    <span className="muted">{offer.description}</span>

                                    <div style={{ display: "flex", gap: "10px", marginTop: "6px" }}>
                                        
                                        <span className="badge">
                                            {offer.category}
                                        </span>

                                        {offer.status === "approved" && (
                                            <span className="badge badge-success">
                                                Aprobada
                                            </span>
                                        )}

                                        {offer.status === "pending" && (
                                            <span className="badge badge-warning">
                                                Pendiente
                                            </span>
                                        )}

                                        {offer.status === "rejected" && (
                                            <span className="badge badge-danger">
                                                Rechazada
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* ACCIONES */}
                                <div className="admin-actions">

                                    <button 
                                        className="btn"
                                        onClick={() => setSelectedOffer(offer)}
                                    >
                                        Ver
                                    </button>

                                    {offer.status === "pending" && (
                                        <button 
                                            className="btn btn-danger"
                                            onClick={() => removeOffer(offer.id)}
                                        >
                                            Eliminar
                                        </button>
                                    )}

                                </div>

                            </div>
                        ))
                    )}

                </div>
            </div>

            {/* 🔥 MODAL REAL */}
            <Modal
                isOpen={!!selectedOffer}
                title="Detalle de la oferta"
                onClose={() => setSelectedOffer(null)}
                footer={
                    <button 
                        className="btn"
                        onClick={() => setSelectedOffer(null)}
                    >
                        Cerrar
                    </button>
                }
            >
                {selectedOffer && (
                    <>
                        <p><strong>Título:</strong> {selectedOffer.title}</p>
                        <p><strong>Descripción:</strong> {selectedOffer.description}</p>

                        <div className="hr"></div>

                        <p><strong>Categoría:</strong> {selectedOffer.category}</p>
                        <p><strong>Precio normal:</strong> ${selectedOffer.regularPrice}</p>
                        <p><strong>Precio oferta:</strong> ${selectedOffer.offerPrice}</p>
                        <p><strong>Cupones disponibles:</strong> {selectedOffer.limitCoupons}</p>

                        <p>
                            <strong>Estado:</strong>{" "}
                            <span className="badge">
                                {selectedOffer.status}
                            </span>
                        </p>
                    </>
                )}
            </Modal>

        </>
    );
}