import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
    getAllOffers,
    updateOfferStatus,
    deleteOfferByAdmin,
    updateOffer
} from "../services/offersService";

export default function AdminOffers() {

    const [offers, setOffers] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({});

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

    const remove = async (id) => {
        await deleteOfferByAdmin(id);
        fetchOffers();
    };

    const recover = async (id) => {
        await updateOfferStatus(id, "approved");
        fetchOffers();
    };

    const startEdit = (offer) => {
        setEditingId(offer.id);
        setEditData({
            title: offer.title,
            description: offer.description
        });
    };

    const saveEdit = async (id) => {
        await updateOffer(id, editData);
        setEditingId(null);
        fetchOffers();
    };

    return (
        <>
            <Navbar />

            <div className="container">
                <h2>Administrar Ofertas</h2>

                {offers.map(o => (
                    <div key={o.id} className="offer-card">

                        {editingId === o.id ? (
                            <>
                                <input
                                    value={editData.title}
                                    onChange={(e) =>
                                        setEditData({ ...editData, title: e.target.value })
                                    }
                                />

                                <input
                                    value={editData.description}
                                    onChange={(e) =>
                                        setEditData({ ...editData, description: e.target.value })
                                    }
                                />

                                <button onClick={() => saveEdit(o.id)}>
                                    Guardar
                                </button>
                            </>
                        ) : (
                            <>
                                <h3>{o.title}</h3>
                                <p>{o.description}</p>
                            </>
                        )}

                        <p>Estado: <strong>{o.status}</strong></p>

                        {editingId !== o.id && (
                            <button onClick={() => startEdit(o)}>
                                Editar
                            </button>
                        )}

                        {o.status === "pending" && (
                            <>
                                <button onClick={() => approve(o.id)}>
                                    Aprobar
                                </button>

                                <button onClick={() => reject(o.id)}>
                                    Rechazar
                                </button>
                            </>
                        )}

                        {o.status === "approved" && (
                            <button onClick={() => remove(o.id)}>
                                Eliminar oferta
                            </button>
                        )}

                        {o.status === "rejected" && (
                            <button onClick={() => approve(o.id)}>
                                Aprobar
                            </button>
                        )}

                        {o.status === "deleted" && (
                            <button onClick={() => recover(o.id)}>
                                Recuperar oferta
                            </button>
                        )}

                    </div>
                ))}
            </div>
        </>
    );
}