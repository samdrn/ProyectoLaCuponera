import { db } from "./firebase";
import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    doc,
    updateDoc,
    deleteDoc
} from "firebase/firestore";

/**
 * crear oferta
 */
export const createOffer = async (offerData) => {
    try {
        const docRef = await addDoc(collection(db, "offers"), offerData);

        return {
            id: docRef.id,
            ...offerData
        };
    } catch (error) {
        console.error("Error creando oferta:", error);
        throw error;
    }
};

/**
 * ofertas por empresa
 */
export const getOffersByCompany = async (companyId) => {
    const q = query(
        collection(db, "offers"),
        where("companyId", "==", companyId)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};

/**
 * admin obtiene todas
 */
export const getAllOffers = async () => {
    const snapshot = await getDocs(collection(db, "offers"));

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};

/**
 * actualizar estado
 */
export const updateOfferStatus = async (offerId, status) => {
    const ref = doc(db, "offers", offerId);

    await updateDoc(ref, { status });
};

/**
 * eliminar oferta
 */
export const deleteOffer = async (offerId) => {
    await deleteDoc(doc(db, "offers", offerId));
};

/**
 * obtiene ofertas aprobadas para clientes
 */
export const getApprovedOffers = async () => {
    const q = query(
        collection(db, "offers"),
        where("status", "==", "approved"),
        where("remaining", "==", true)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};

/**
 * eliminar oferta (soft delete)
 */
export const deleteOfferByAdmin = async (offerId) => {
    const ref = doc(db, "offers", offerId);

    await updateDoc(ref, {
        status: "deleted"
    });
};

/**
 * actualizar oferta (admin)
 */
export const updateOffer = async (offerId, updatedData) => {
    const ref = doc(db, "offers", offerId);

    await updateDoc(ref, updatedData);
};