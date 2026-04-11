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
        <div className="app-layout">
            <Navbar />

            <main className="site-main">
                <div className="container" style={{ paddingTop: '40px' }}>
                    
                    {/* ENCABEZADO DE ADMINISTRACIÓN */}
                    <div style={{ marginBottom: '40px', borderLeft: '6px solid var(--accent)', paddingLeft: '20px' }}>
                        <h1 style={{ fontSize: '32px', fontWeight: '900', color: 'var(--primary)', margin: 0 }}>
                            Control Global de <span>Ofertas</span>
                        </h1>
                        <p style={{ color: 'var(--muted)', marginTop: '8px', fontSize: '16px' }}>
                            Aprobación, edición y moderación de todas las promociones del sistema.
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {offers.map(o => (
                            <div key={o.id} className="card-body" style={{ 
                                background: 'white', 
                                border: '1px solid var(--border)', 
                                borderRadius: '20px', 
                                padding: '25px',
                                boxShadow: 'var(--shadow-sm)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: '20px'
                            }}>

                                <div style={{ flex: 1 }}>
                                    {editingId === o.id ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            <input
                                                className="input"
                                                style={{ fontWeight: '700', fontSize: '16px' }}
                                                value={editData.title}
                                                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                                            />
                                            <textarea
                                                className="input"
                                                style={{ minHeight: '80px', fontSize: '14px' }}
                                                value={editData.description}
                                                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                            />
                                            <button 
                                                className="btn-primary" 
                                                style={{ height: '35px', width: 'fit-content' }}
                                                onClick={() => saveEdit(o.id)}
                                            >
                                                Guardar Cambios
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <h3 style={{ margin: '0 0 5px', color: 'var(--text)', fontSize: '20px' }}>{o.title}</h3>
                                            <p className="muted" style={{ margin: '0 0 15px', fontSize: '14px' }}>{o.description}</p>
                                        </>
                                    )}

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--muted)' }}>ESTADO:</span>
                                        <span className="status-badge" style={{ 
                                            background: o.status === 'approved' ? '#dcfce7' : o.status === 'pending' ? '#fef3c7' : '#fee2e2',
                                            color: o.status === 'approved' ? '#166534' : o.status === 'pending' ? '#92400e' : '#991b1b',
                                            padding: '4px 12px',
                                            borderRadius: '99px',
                                            fontSize: '11px',
                                            fontWeight: '800'
                                        }}>
                                            {o.status.toUpperCase()}
                                        </span>
                                    </div>
                                </div>

                                {/* ACCIONES DINÁMICAS */}
                                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: '300px' }}>
                                    
                                    {editingId !== o.id && (
                                        <button className="btn" onClick={() => startEdit(o)}>
                                            Editar
                                        </button>
                                    )}

                                    {o.status === "pending" && (
                                        <>
                                            <button className="btn-primary" onClick={() => approve(o.id)}>
                                                Aprobar
                                            </button>
                                            <button className="btn-danger" style={{ border: 'none', padding: '10px 15px' }} onClick={() => reject(o.id)}>
                                                Rechazar
                                            </button>
                                        </>
                                    )}

                                    {o.status === "approved" && (
                                        <button className="btn-danger" style={{ border: 'none', padding: '10px 15px' }} onClick={() => remove(o.id)}>
                                            Eliminar
                                        </button>
                                    )}

                                    {o.status === "rejected" && (
                                        <button className="btn-primary" onClick={() => approve(o.id)}>
                                            Pasar a Aprobado
                                        </button>
                                    )}

                                    {o.status === "deleted" && (
                                        <button className="btn-secondary" onClick={() => recover(o.id)}>
                                            Recuperar
                                        </button>
                                    )}

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}