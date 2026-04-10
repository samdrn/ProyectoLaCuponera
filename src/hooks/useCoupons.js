import { collection, getDoc, query, doc, getDocs, where, Timestamp } from "firebase/firestore";

import { db } from '../services/firebase';
import { useState, useEffect } from 'react';

/**
 * Hook para cargar las ofertas disponibles y los cupones del usuario.
 * La lógica de COMPRA fue migrada a usePayments.js para mantener
 * la separación de responsabilidades.
 */
export default function useCoupons(user) {

    const [offers, setOffers] = useState([]);
    const [myCoupons, setMyCoupons] = useState([]);
    const [loading, setLoading] = useState(true);

    // Carga todas las ofertas disponibles en Firestore
    const fetchOffers = async () => {
        const snapshot = await getDocs(collection(db, "offers"));
        const offersList = snapshot.docs.map(doc => ({
            id: doc.id,
            offerId: doc.id,
            ...doc.data()
        }));
        setOffers(offersList);
    };

    // Carga los cupones del usuario y enriquece cada uno con los datos de su oferta
    const fetchMyCoupons = async () => {
        if (!user) {
            setLoading(false);
            return;
        }

        try {
            const q = query(collection(db, "coupons"), where("userId", "==", user.uid));
            const snapshot = await getDocs(q);

            const couponsList = await Promise.all(
                snapshot.docs.map(async (couponDoc) => {
                    const couponData = couponDoc.data();

                    // Obtener los datos de la oferta asociada al cupón
                    let offerData = null;
                    if (couponData.offerId) {
                        const offerRef = doc(db, "offers", couponData.offerId);
                        const offerSnap = await getDoc(offerRef);
                        offerData = offerSnap.exists() ? offerSnap.data() : null;
                    }

                    return {
                        couponId: couponDoc.id,
                        id: couponDoc.id,
                        ...couponData,
                        offer: offerData,
                    };
                })
            );

            setMyCoupons(couponsList);
        } catch (err) {
            console.error("Error al cargar los cupones:", err);
        } finally {
            setLoading(false);
        }
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
        loading,
        // Exponer refetch para que los componentes puedan recargar tras una compra
        refetchCoupons: fetchMyCoupons,
    };
}
