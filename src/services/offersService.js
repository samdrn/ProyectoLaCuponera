import { db } from "./firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export const getApprovedOffers = async () => {
    const q = query(
        collection(db, "offers"),
        where("status", "==", "approved")
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        id: doc.id, ...doc.data()
    }));
};