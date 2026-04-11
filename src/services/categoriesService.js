import { db } from "./firebase";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    updateDoc,
    getDoc,
} from "firebase/firestore";

// crea categoría
export const create = async (categoryData) => {
    const docRef = await addDoc(collection(db, "categories"), categoryData);
    return { id: docRef.id, ...categoryData };
};

// elimina categoría por id
export const remove = async (id) => {
    return await deleteDoc(doc(db, "categories", id));
};

// actualiza categoría por id
export const update = async (id, categoryData) => {
    const ref = doc(db, "categories", id);
    await updateDoc(ref, categoryData);
    return { id, ...categoryData };
};

// obtiene todas las categorías
export const getAll = async () => {
    const snapshot = await getDocs(collection(db, "categories"));
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};