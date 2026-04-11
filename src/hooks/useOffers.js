import { useState } from "react";
import {
    getAllOffers,
    createOffer,
    updateOffer,
    updateOfferStatus,
    deleteOffer,
} from "../services/offersService";

export default function useOffers() {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getOffers = async () => {
        setError(null);
        setLoading(true);
        try {
            const data = await getAllOffers();
            setOffers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const addOffer = async (data) => {
        setError(null);
        setLoading(true);
        try {
            const created = await createOffer(data);
            setOffers((prev) => [...prev, created]);
            return created;
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const editOffer = async (id, data) => {
        setError(null);
        setLoading(true);
        try {
            const updated = await updateOffer(id, data);
            setOffers((prev) => prev.map((o) => (o.id === id ? { ...o, ...updated } : o)));
            return updated;
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const changeStatus = async (id, status) => {
        setError(null);
        try {
            await updateOfferStatus(id, status);
            setOffers((prev) =>
                prev.map((o) => (o.id === id ? { ...o, status } : o))
            );
        } catch (err) {
            setError(err.message);
        }
    };

    const removeOffer = async (id) => {
        setError(null);
        setLoading(true);
        try {
            await deleteOffer(id);
            setOffers((prev) => prev.filter((o) => o.id !== id));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        offers,
        loading,
        error,
        getOffers,
        addOffer,
        editOffer,
        changeStatus,
        removeOffer,
    };
}
