import { db } from "./firebase";
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";

// obtener todos los clientes
export const getAll = async () => {
    const q = query(
        collection(db, "users"),
        where("role", "==", "client")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};

// obtener cliente por id
export const getById = async (id) => {
    const snapshot = await getDoc(doc(db, "users", id));

    if (!snapshot.exists()) return null;

    return {
        id: snapshot.id,
        ...snapshot.data()
    };
};