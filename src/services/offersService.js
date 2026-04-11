import { db } from "./firebase";
import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where,
    Timestamp,
} from "firebase/firestore";

// obtiene TODAS las ofertas (para el admin, sin filtros)
export const getAllOffers = async () => {
    const snapshot = await getDocs(collection(db, "offers"));
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

// obtiene las ofertas aprobadas y vigentes (para el home público)
export const getApprovedOffers = async () => {
    const q = query(
        collection(db, "offers"),
        where("status", "==", "approved"),
        where("remaining", "==", true)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

// crea una oferta nueva
export const createOffer = async (offerData) => {
    const docRef = await addDoc(collection(db, "offers"), {
        ...offerData,
        ammountSold: 0,
        remaining: true,
        status: "pending", // pendiente de aprobación por defecto
        createdAt: Timestamp.now(),
    });
    return { id: docRef.id, ...offerData };
};

// actualiza campos de una oferta
export const updateOffer = async (id, offerData) => {
    const ref = doc(db, "offers", id);
    await updateDoc(ref, offerData);
    return { id, ...offerData };
};

// cambia solo el status de una oferta (approved / rejected / pending)
export const updateOfferStatus = async (id, status) => {
    const ref = doc(db, "offers", id);
    await updateDoc(ref, { status });
    return { id, status };
};

// elimina una oferta
export const deleteOffer = async (id) => {
    return await deleteDoc(doc(db, "offers", id));
};