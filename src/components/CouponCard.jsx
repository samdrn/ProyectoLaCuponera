export default function CouponCard({ coupon }) {
  if (!coupon) return null;

  // 💡 Imprimimos en consola para ver la estructura real (puedes borrarlo luego)
  console.log("Datos del cupón:", coupon);

  // Intentamos sacar la info de la oferta (ajusta 'offer' si tu objeto es diferente)
  // Normalmente es coupon.offer.description o similar
  const info = coupon.offer || coupon; 
  
  const description = info.description || "Cupón de Beneficio";
  const price = info.offerPrice || info.regularPrice || "0";
  const category = info.category || "General";
  
  // Usamos el ID del documento o el ID interno
  const couponId = (coupon.id || info.id || "000000").toString().substring(0, 8).toUpperCase();

  return (
    <div className="coupon-card-purchased">
      <div className="coupon-main-info">
        <div className="coupon-header-row">
          <span className="badge-category">{category}</span>
          <span className="status-badge">ADQUIRIDO</span>
        </div>
        
        <h4 className="coupon-title">{description}</h4>
        <p className="price-tag">Valor del cupón: <span>${price}</span></p>
      </div>

      <div className="coupon-card-divider"></div>

      <div className="coupon-code-section">
        <p className="code-label">CÓDIGO DE CANJE ÚNICO</p>
        <div className="code-box">
          <code>#{couponId}</code>
        </div>
        <small className="help-text">Presenta este código en caja</small>
      </div>
    </div>
  );
}
