import useAuth from "../hooks/useAuth";
import useCoupons from "../hooks/useCoupons";
import CouponCard from "../components/CouponCard";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";

export default function MyCoupons() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { myCoupons } = useCoupons(user);

    return (
        
        <main className="my-coupons-page">
            <Navbar />
            <header className="page-intro">
                <div className="container">
                    <h1>Mis Cupones Adquiridos</h1>
                    <p className="muted">Aquí tienes todos los beneficios que has desbloqueado.</p>
                </div>
            </header>

            <section className="container">
                {myCoupons.length > 0 ? (
                    <div className="grid-coupons">
                        {myCoupons.map(coupon => (
                            <CouponCard key={coupon.id} coupon={coupon} />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <img src="/assets/empty-box.svg" alt="No hay cupones" />
                        <h3>Aún no tienes cupones</h3>
                        <p>Explora nuestras ofertas y comienza a ahorrar hoy mismo.</p>
                        <button className="nav-auth-btn" onClick={() => navigate("/")}>
                            Ver Ofertas
                        </button>
                    </div>
                )}
            </section>
        </main>
    );
}