import { db } from "./firebase";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    updateDoc,
    getDoc,
    query,
    where,
} from "firebase/firestore";

// crea una empresa nueva en Firestore
export const create = async (companyData) => {
    const docRef = await addDoc(collection(db, "companies"), companyData);
    return { id: docRef.id, ...companyData };
};

// elimina una empresa por su id
export const remove = async (id) => {
    return await deleteDoc(doc(db, "companies", id));
};

// actualiza una empresa por su id
export const update = async (id, companyData) => {
    const ref = doc(db, "companies", id);
    await updateDoc(ref, companyData);
    return { id, ...companyData };
};

// obtiene todas las empresas
export const getAll = async () => {
    const snapshot = await getDocs(collection(db, "companies"));
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

// obtiene una empresa por id
export const getById = async (id) => {
    const docSnap = await getDoc(doc(db, "companies", id));
    if (!docSnap.exists()) return null;
    return { id: docSnap.id, ...docSnap.data() };
};

// obtiene empresas filtradas por categoría
export const getByCategory = async (category) => {
    const q = query(collection(db, "companies"), where("category", "==", category));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};