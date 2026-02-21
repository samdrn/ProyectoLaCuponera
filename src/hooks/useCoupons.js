
import { collection, getDoc, query, doc, getDocs, where, Timestamp } from "firebase/firestore";

import { db } from '../services/firebase';
import { generateCouponCode } from '../utils/generateCouponCode';
import { useState, useEffect } from 'react';
import { updateDataBase } from "../utils/updateDataBase";

export default function useCoupons(user){

    const [offers, setOffers] = useState([]);
    const [myCoupons, setMyCoupons] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOffers = async () => {

        const ofertas = await getDocs (collection(db, "offers"));

        const offersList = ofertas.docs.map(doc =>({
            offerId: doc.id,
            ...doc.data()
        }));

        setOffers(offersList);
    };

    const fetchMyCoupons = async () => {

        if (!user) return;

        const q = query(collection(db, "coupons"), where("userId", "==", user.uid));

        const ofertas = await getDocs(q);

        const couponsList = await Promise.all(
            ofertas.docs.map(async (couponDoc) => {
                const couponData = couponDoc.data();

                const offerRef = doc(db, "offers", couponData.offerId);
                const offerData = await getDoc(offerRef);

                return {
                    couponId: couponDoc.id,
                    ...couponData,
                    offer: offerData.exists() ? offerData.data() : null
                };
            })
        );
        
        setMyCoupons(couponsList);

        setLoading(false);
    };

    const buyCoupon = async (offer) => {
        console.log("Comprando cupón para oferta:", offer);

        if(!user) throw new Error("Usuario no autenticado");

        const newCoupon = {

            code: generateCouponCode(offer.company),

            offerId: offer.id,

            purchaseDate: Timestamp.now(),

            expirationDate: offer.couponEndDate,

            status: "Disponible",

            userId: user.uid


        };

        await updateDataBase(offer, newCoupon);



        fetchMyCoupons();
    
    };

    useEffect(() => {
        fetchOffers();
    }, []);

    useEffect(() => {
        fetchMyCoupons();
    }, [user]);

    return {
        offers,
        myCoupons,
        buyCoupon,
        loading
    };
}
