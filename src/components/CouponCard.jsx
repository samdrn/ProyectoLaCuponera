import { formatDate } from "../utils/formatDate";

/**
 * Tarjeta que muestra un cupón adquirido por el cliente.
 * Recibe el objeto `coupon` que ya incluye los datos de la oferta en `coupon.offer`.
 */
export default function CouponCard({ coupon }) {
    if (!coupon) return null;

    const redeemCode = coupon.code || "SIN-CODIGO";
    const offerData = coupon.offer || {};

    const description = offerData.description || "Cupón de Descuento";
    const price = offerData.offerPrice ?? coupon.amount ?? "0.00";
    const category = offerData.category || coupon.category || "General";

    // Estado del cupón con etiqueta y color
    const statusMap = {
        active: { label: "ACTIVO", color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
        Disponible: { label: "ACTIVO", color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
        canjeado: { label: "CANJEADO", color: "#6b7280", bg: "#f3f4f6", border: "#e5e7eb" },
        redeemed: { label: "CANJEADO", color: "#6b7280", bg: "#f3f4f6", border: "#e5e7eb" },
        expired: { label: "VENCIDO", color: "#b91c1c", bg: "#fff1f2", border: "#fecaca" },
    };
    const statusInfo = statusMap[coupon.status] || { label: coupon.status || "—", color: "#6b7280", bg: "#f3f4f6", border: "#e5e7eb" };

    // Fecha de vencimiento
    const expirationDate = coupon.expirationDate?.toDate
        ? coupon.expirationDate.toDate()
        : coupon.expirationDate
            ? new Date(coupon.expirationDate)
            : null;

    const isExpired = expirationDate && new Date() > expirationDate;

    return (
        <div className="coupon-card-purchased">
            <div className="coupon-main-info">
                <div className="coupon-header-row">
                    <span className="badge-category">{category}</span>
                    <span
                        className="status-badge"
                        style={{
                            color: isExpired ? "#b91c1c" : statusInfo.color,
                            background: isExpired ? "#fff1f2" : statusInfo.bg,
                            border: `1px solid ${isExpired ? "#fecaca" : statusInfo.border}`,
                            borderRadius: '20px',
                            padding: '3px 10px',
                            fontSize: '11px',
                            fontWeight: '700',
                        }}
                    >
                        {isExpired ? "VENCIDO" : statusInfo.label}
                    </span>
                </div>

                <h4 className="coupon-title">{description}</h4>
                <p className="price-tag">
                    Valor del cupón: <span>${price}</span>
                </p>

                {expirationDate && (
                    <p className="muted" style={{ fontSize: '12px', marginTop: '4px' }}>
                        Vence: <strong>{expirationDate.toLocaleDateString('es-SV')}</strong>
                    </p>
                )}
            </div>

            <div className="coupon-card-divider" />

            <div className="coupon-code-section">
                <p className="code-label">CÓDIGO DE CANJE ÚNICO</p>
                <div className="code-box">
                    <code style={{ letterSpacing: '3px', fontWeight: '800' }}>{redeemCode}</code>
                </div>
                <small className="help-text">Muestra este código al empleado en caja</small>
            </div>
        </div>
    );
}