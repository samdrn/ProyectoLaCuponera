export default function CouponCard({ coupon }) {
  if (!coupon) return null;

  // 1. Los datos del cupón (donde está el código real de canje)
  // Según tu captura, el campo se llama 'code'
  const redeemCode = coupon.code || "SIN-CODIGO";

  // 2. Los datos de la oferta (donde está el título y precio)
  // Si tu hook useCoupons ya une la oferta al cupón, estará en coupon.offer
  const offerData = coupon.offer || {}; 
  
  const description = offerData.description || "Cupón de Descuento";
  const price = offerData.offerPrice || "0.00";
  const category = offerData.category || "General";

  return (
    <div className="coupon-card-purchased">
      <div className="coupon-main-info">
        <div className="coupon-header-row">
          <span className="badge-category">{category}</span>
          <span className="status-badge">
            {coupon.status === 'Disponible' ? 'ACTIVO' : coupon.status}
          </span>
        </div>
        
        <h4 className="coupon-title">{description}</h4>
        <p className="price-tag">Valor del cupón: <span>${price}</span></p>
      </div>

      <div className="coupon-card-divider"></div>

      <div className="coupon-code-section">
        <p className="code-label">CÓDIGO DE CANJE ÚNICO</p>
        <div className="code-box">
          {/* AQUÍ cargamos el código real de la colección 'coupons' */}
          <code>{redeemCode}</code>
        </div>
        <small className="help-text">Muestra este código al empleado en caja</small>
      </div>
    </div>
  );
}