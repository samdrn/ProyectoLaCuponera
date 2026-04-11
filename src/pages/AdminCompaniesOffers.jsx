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
        <div className="app-layout">
            <Navbar />

            <main className="site-main">
                <div className="container" style={{ paddingTop: '40px' }}>
                    
                    {/* ENCABEZADO ESTILO PREMIUM */}
                    <div style={{ marginBottom: '40px', borderLeft: '6px solid var(--accent)', paddingLeft: '20px' }}>
                        <h1 style={{ fontSize: '32px', fontWeight: '900', color: 'var(--primary)', margin: 0 }}>
                            Directorio de <span>Empresas</span>
                        </h1>
                        <p style={{ color: 'var(--muted)', marginTop: '8px', fontSize: '16px' }}>
                            Visualiza las empresas registradas y el catálogo de ofertas de cada una.
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', paddingBottom: '60px' }}>
                        {companies.map(company => {
                            const companyOffers = offers.filter(o => o.companyId === company.id);

                            return (
                                <div key={company.id} className="card-body" style={{ 
                                    background: 'white', 
                                    border: '1px solid var(--border)', 
                                    borderRadius: '24px', 
                                    padding: '30px',
                                    boxShadow: 'var(--shadow-sm)'
                                }}>

                                    {/* INFO DE LA EMPRESA */}
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '2px solid var(--bg)', paddingBottom: '15px' }}>
                                        <h3 style={{ margin: 0, fontSize: '22px', color: 'var(--primary)', fontWeight: '800' }}>
                                            🏢 {company.name}
                                        </h3>
                                        <span className="badge-secondary" style={{ padding: '6px 14px', borderRadius: '10px' }}>
                                            {companyOffers.length} {companyOffers.length === 1 ? 'Oferta' : 'Ofertas'}
                                        </span>
                                    </div>

                                    {/* LISTADO DE OFERTAS DE ESTA EMPRESA */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                        {companyOffers.length === 0 ? (
                                            <p className="muted" style={{ fontStyle: 'italic', paddingLeft: '10px' }}>No tiene ofertas registradas actualmente.</p>
                                        ) : (
                                            companyOffers.map(o => (
                                                <div key={o.id} style={{ 
                                                    marginLeft: "10px", 
                                                    padding: '15px', 
                                                    background: '#f8fafc', 
                                                    borderRadius: '16px',
                                                    border: '1px solid #f1f5f9',
                                                    position: 'relative',
                                                    overflow: 'hidden'
                                                }}>
                                                    {/* Línea decorativa lateral para cada oferta */}
                                                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: o.status === 'approved' ? 'var(--success)' : o.status === 'pending' ? 'var(--warning)' : 'var(--danger)' }}></div>

                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                        <strong style={{ fontSize: '16px', color: 'var(--text)' }}>{o.title}</strong>
                                                        
                                                        <span className="status-badge" style={{ 
                                                            fontSize: '10px', 
                                                            fontWeight: '800', 
                                                            padding: '2px 8px', 
                                                            borderRadius: '6px',
                                                            background: o.status === 'approved' ? '#dcfce7' : '#fef3c7',
                                                            color: o.status === 'approved' ? '#166534' : '#92400e'
                                                        }}>
                                                            {o.status.toUpperCase()}
                                                        </span>
                                                    </div>
                                                    
                                                    <p className="muted" style={{ margin: '5px 0 0', fontSize: '13px', lineHeight: '1.4' }}>
                                                        {o.description}
                                                    </p>
                                                </div>
                                            ))
                                        )}
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}