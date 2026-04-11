import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CompanyDashboard() {
    const navigate = useNavigate();

    return (
        <div className="app-layout">
            <Navbar />

            <main className="site-main">
                <div className="container" style={{ paddingTop: "40px", paddingBottom: "60px" }}>

                    {/* Encabezado */}
                    <div style={{ marginBottom: "40px", borderLeft: "6px solid var(--accent)", paddingLeft: "20px" }}>
                        <h1 style={{ fontSize: "34px", fontWeight: "900", color: "var(--primary)", margin: 0 }}>
                            Panel de <span style={{ color: "var(--accent)" }}>Empresa</span>
                        </h1>
                        <p style={{ color: "var(--muted)", marginTop: "8px", fontSize: "16px" }}>
                            Gestiona tus ofertas y promociones activas.
                        </p>
                    </div>

                    <div className="grid-coupons">

                        <div
                            className="coupon-card-purchased"
                            style={{
                                cursor: "pointer",
                                padding: "36px 24px",
                                textAlign: "center",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                minHeight: "200px",
                                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                            }}
                            onClick={() => navigate("/company/create-offer")}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-4px)";
                                e.currentTarget.style.boxShadow = "var(--shadow-lg)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "none";
                                e.currentTarget.style.boxShadow = "";
                            }}
                        >
                            <img src="/assets/ofertas.svg" alt="Crear oferta" style={{ width: "56px", marginBottom: "16px" }} />
                            <h3 className="coupon-title">Crear Oferta</h3>
                        </div>

                        <div
                            className="coupon-card-purchased"
                            style={{
                                cursor: "pointer",
                                padding: "36px 24px",
                                textAlign: "center",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                minHeight: "200px",
                                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                            }}
                            onClick={() => navigate("/company/manage-offers")}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-4px)";
                                e.currentTarget.style.boxShadow = "var(--shadow-lg)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "none";
                                e.currentTarget.style.boxShadow = "";
                            }}
                        >
                            <img src="/assets/ofertas.svg" alt="Gestionar ofertas" style={{ width: "56px", marginBottom: "16px" }} />
                            <h3 className="coupon-title">Gestionar Ofertas</h3>
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}