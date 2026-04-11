import { db } from "./firebase";
import {
    addDoc,
    collection,
    deleteDoc,
    getDoc,
    getDocs,
    updateDoc,
    doc,
    query,
    where
} from "firebase/firestore";

// crear empresa
export const create = async (companyData) => {
    const ref = await addDoc(collection(db, "companies"), companyData);

    return {
        id: ref.id,
        ...companyData
    };
};

// eliminar empresa
export const remove = async (id) => {
    await deleteDoc(doc(db, "companies", id));
};

// actualizar empresa
export const update = async (id, companyData) => {
    await updateDoc(doc(db, "companies", id), companyData);
};

// obtener por id
export const getById = async (id) => {
    const snapshot = await getDoc(doc(db, "companies", id));

    if (!snapshot.exists()) return null;

    return {
        id: snapshot.id,
        ...snapshot.data()
    };
};

// obtener todas
export const getAll = async () => {
    const snapshot = await getDocs(collection(db, "companies"));

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};

// por categoría
export const getByCategory = async (category) => {
    const q = query(
        collection(db, "companies"),
        where("category", "==", category)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};