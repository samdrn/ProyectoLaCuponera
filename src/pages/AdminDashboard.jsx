import useAuth from "../hooks/useAuth"; 
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const LINKS = [
    { path: "/admin/create-offer", icon: "/assets/ofertas.svg", label: "Crear Oferta" }, 
    { path: "/admin/offers", icon: "/assets/ofertas.svg", label: "Aprobar Ofertas" },
    { path: "/admin/companies", icon: "/assets/empresas.svg", label: "Empresas" },
    { path: "/admin/companies-offers", icon: "/assets/ofertas.svg", label: "Ofertas por Empresa" },
    { path: "/admin/categories", icon: "/assets/categorias.svg", label: "Categorías" },
    { path: "/admin/clients", icon: "/assets/clientes.svg", label: "Clientes" },
    { path: "/admin/employees", icon: "/assets/empleados.svg", label: "Empleados" },
];

export default function AdminDashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <>
            <Navbar />

            <main className="site-main">
                <div className="container" style={{ paddingTop: "40px", paddingBottom: "60px" }}>

                    <div style={{
                        marginBottom: "40px",
                        borderLeft: "6px solid var(--accent)",
                        paddingLeft: "20px"
                    }}>
                        <h1 style={{
                            fontSize: "34px",
                            fontWeight: "900",
                            color: "var(--primary)",
                            margin: 0
                        }}>
                            Panel de <span style={{ color: "var(--accent)" }}>Administrador</span>
                        </h1>

                        <p style={{
                            color: "var(--muted)",
                            marginTop: "8px",
                            fontSize: "16px"
                        }}>
                            Bienvenido{user?.names ? `, ${user.names}` : ""}. 
                            Gestiona todo el sistema desde aquí.
                        </p>
                    </div>

                    <div className="grid-coupons">
                        {LINKS.map((link) => (
                            <div
                                key={link.path}
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
                                }}
                                onClick={() => navigate(link.path)}
                            >
                                <img
                                    src={link.icon}
                                    alt={link.label}
                                    style={{ width: "56px", marginBottom: "16px" }}
                                />

                                <h3 className="coupon-title">
                                    {link.label}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}