import { db } from "./firebase";
import {
    addDoc,
    collection,
    deleteDoc,
    getDocs,
    updateDoc,
    doc
} from "firebase/firestore";

// crear categoría
export const create = async (categoryData) => {
    const ref = await addDoc(collection(db, "categories"), categoryData);

    return {
        id: ref.id,
        ...categoryData
    };
};

// eliminar categoría
export const remove = async (id) => {
    await deleteDoc(doc(db, "categories", id));
};

// actualizar categoría
export const update = async (id, categoryData) => {
    await updateDoc(doc(db, "categories", id), categoryData);
};

// obtener todas
export const getAll = async () => {
    const snapshot = await getDocs(collection(db, "categories"));

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};