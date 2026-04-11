import { db } from "./firebase";
import {
    collection,
    getDocs,
    query,
    where,
    doc,
    getDoc,
    updateDoc,
    deleteDoc
} from "firebase/firestore";

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

// obtener por id
export const getById = async (id) => {
    const snapshot = await getDoc(doc(db, "users", id));

    if (!snapshot.exists()) return null;

    return {
        id: snapshot.id,
        ...snapshot.data()
    };
};

// actualizar cliente
export const updateClient = async (id, data) => {
    await updateDoc(doc(db, "users", id), data);
};

// eliminar cliente
export const deleteClient = async (id) => {
    await deleteDoc(doc(db, "users", id));
};