import { useState } from "react";
import CouponCard from "../components/CouponCard";
import BuyModal from "../components/BuyModal";
import useAuth from "../hooks/useAuth";
import useCoupons from "../hooks/useCoupons";

export default function MyCoupons(){

    const { user } = useAuth();

    const { myCoupons, buyCoupon, offers } = useCoupons(user);

    const [selectedOffer, setSelectedOffer] = useState(null);

    const handleBuyClick = (offer) => {setSelectedOffer(offer)};

    const handleConfirmBuy = async() => { await buyCoupon(selectedOffer); setSelectedOffer(null)};

    return(

        <div>
            <h1>Cupones disponibles</h1>

            <div className="offers-container">
                {offers.map(offer=>(
                    <CouponCard key={offer.offerId} coupon={offer} onBuy={handleBuyClick}/>
                ))}
            </div>

            <h1>Tus cupones</h1>

            <div>
                {myCoupons.map(coupon => (

                    <div key={coupon.couponId} className="coupon-container">
                        <h3>{coupon.offer?.title}</h3>
                        <p>Código: {coupon.code}</p>
                        <p>Estado: {coupon.status}</p>
                        <p>Fecha de compra: {coupon.purchaseDate?.toDate().toLocaleDateString()}</p>
                    </div>
                ))}
            </div>

            <BuyModal coupon={selectedOffer} onConfirm={handleConfirmBuy} onClose={()=>setSelectedOffer(null)}/>
        </div>
    );
}