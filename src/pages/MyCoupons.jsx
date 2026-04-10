import useAuth from "../hooks/useAuth";
import useCoupons from "../hooks/useCoupons";
import CouponCard from "../components/CouponCard";
import Loader from "../components/Loader";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MyCoupons() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { myCoupons, loading, refetchCoupons } = useCoupons(user);

    // Separar cupones activos de canjeados/vencidos
    const activeCoupons = myCoupons.filter(
        (c) => c.status === "active" || c.status === "Disponible"
    );
    const usedCoupons = myCoupons.filter(
        (c) => c.status !== "active" && c.status !== "Disponible"
    );

    return (
        <main className="my-coupons-page">
            <Navbar />

            <header className="page-intro">
                <div className="container">
                    <h1>Mis Cupones Adquiridos</h1>
                    <p className="muted">Aquí tienes todos los beneficios que has desbloqueado.</p>
                </div>
            </header>

            <section className="container" style={{ paddingBottom: '60px' }}>

                {/* Estado de carga */}
                {loading ? (
                    <div style={{ textAlign: 'center', paddingTop: '60px' }}>
                        <Loader />
                        <p className="muted" style={{ marginTop: '16px' }}>Cargando tus cupones...</p>
                    </div>

                ) : myCoupons.length === 0 ? (
                    /* Estado vacío */
                    <div className="empty-state">
                        <img src="/assets/empty-box.svg" alt="No hay cupones" />
                        <h3>Aún no tienes cupones</h3>
                        <p>Explora nuestras ofertas y comienza a ahorrar hoy mismo.</p>
                        <button className="nav-auth-btn" onClick={() => navigate("/")}>
                            Ver Ofertas
                        </button>
                    </div>

                ) : (
                    <>
                        {/* Cupones activos */}
                        {activeCoupons.length > 0 && (
                            <div style={{ marginBottom: '40px' }}>
                                <h2 style={{
                                    fontSize: '18px',
                                    fontWeight: '700',
                                    color: 'var(--primary)',
                                    borderLeft: '4px solid var(--accent)',
                                    paddingLeft: '12px',
                                    marginBottom: '20px',
                                }}>
                                    🎫 Disponibles ({activeCoupons.length})
                                </h2>
                                <div className="grid-coupons">
                                    {activeCoupons.map((coupon) => (
                                        <CouponCard key={coupon.id || coupon.couponId} coupon={coupon} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Cupones usados / vencidos */}
                        {usedCoupons.length > 0 && (
                            <div>
                                <h2 style={{
                                    fontSize: '18px',
                                    fontWeight: '700',
                                    color: 'var(--muted)',
                                    borderLeft: '4px solid var(--border-strong)',
                                    paddingLeft: '12px',
                                    marginBottom: '20px',
                                }}>
                                    📋 Historial ({usedCoupons.length})
                                </h2>
                                <div className="grid-coupons">
                                    {usedCoupons.map((coupon) => (
                                        <CouponCard key={coupon.id || coupon.couponId} coupon={coupon} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </section>

            <Footer />
        </main>
    );
}