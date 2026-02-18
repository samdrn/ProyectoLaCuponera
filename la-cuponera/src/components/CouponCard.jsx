export default function CouponCard({coupon, onBuy}){

    return(
        <div className="coupon-card">
            <img src={coupon.image} alt={coupon.title} />
        
        <h3>{coupon.title}</h3>
        <p>{coupon.description}</p>

        <p>${coupon.offerPrice}{" " }</p>
        <p>{coupon.regularPrice}{" "}</p>

        <button onClick={() => onBuy(coupon)}>Comprar</button>
        </div>
    );
}
