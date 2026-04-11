import { useState } from "react";
import {
    createOffer,
    getOffersByCompany,
    deleteOffer
} from "../services/offersService";
import { Timestamp } from "firebase/firestore";

export default function useOffers(user) {

    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * crear oferta
     */
    const createNewOffer = async (data) => {
        setLoading(true);
        setError(null);

        try {
            if (!user?.companyId) {
                throw new Error("Usuario sin empresa asignada");
            }

            const offerData = {
                title: data.title,
                description: data.description,
                category: data.category,

                companyId: user.companyId,
                company: data.company || "",

                offerPrice: Number(data.offerPrice),
                regularPrice: Number(data.regularPrice),
                limitCoupons: Number(data.limitCoupons),

                startDate: data.startDate,
                endDate: data.endDate,
                couponEndDate: data.couponEndDate,

                status: "pending",
                soldCoupons: 0,
                remaining: true,

                createdAt: Timestamp.now()
            };

            const created = await createOffer(offerData);

            if (created) {
                setOffers(prev => [...prev, created]);
            }

        } catch (err) {
            console.error("Error al crear oferta:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    /**
     * obtener ofertas de la empresa
     */
    const fetchMyOffers = async () => {
        try {
            if (!user?.companyId) return;

            setLoading(true);
            setError(null);

            const data = await getOffersByCompany(user.companyId);

            setOffers(Array.isArray(data) ? data : []);

        } catch (err) {
            console.error("Error al obtener ofertas:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    /**
     * eliminar oferta (solo pending)
     */
    const removeOffer = async (offerId) => {
        try {
            await deleteOffer(offerId);

            setOffers(prev => prev.filter(o => o.id !== offerId));
        } catch (err) {
            console.error("Error eliminando oferta:", err);
        }
    };

    return {
        offers,
        loading,
        error,
        createNewOffer,
        fetchMyOffers,
        removeOffer
    };
}