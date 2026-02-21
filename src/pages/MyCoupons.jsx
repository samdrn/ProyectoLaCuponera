import useAuth from "../hooks/useAuth";
import useCoupons from "../hooks/useCoupons";
import CouponCard from "../components/CouponCard";
import { useNavigate } from "react-router";

export default function MyCoupons(){

    const navigate = useNavigate()

    const { user } = useAuth();

    const { myCoupons, buyCoupon } = useCoupons(user);




    return(
        <>
        <header className="site-header">
            <div className="container header-inner">
            <h2 onClick={() => navigate("/")}>La Cuponera </h2>
            <h2>Tus cupones</h2>
            </div>
        </header>
            <div className="grid-coupons">
                {myCoupons.map(coupon => (
                    <CouponCard coupon={coupon}></CouponCard>
                ))}
            </div>
        </>
    );
}