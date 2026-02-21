export default function CouponCard({coupon}){

    return(
            <div key={coupon.couponId} className="coupon-container">
                <h3>{coupon.offer?.title}</h3>
                <p>Código: {coupon.code}</p>
                <p>Estado: {coupon.status}</p>
                <p>Fecha de compra: {coupon.purchaseDate?.toDate().toLocaleDateString()}</p>
            </div>
    );
}
