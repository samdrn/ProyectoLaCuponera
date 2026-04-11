import { db } from "./firebase";
import { addDoc, collection, deleteDoc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { query, where } from "firebase/firestore";

// crea una empresa nueva en Firestore
export const create = async (companyData) => {
    const snapshot = await addDoc(collection(db, "companies"), companyData);

        return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};

// elimina una empresa por su id
export const remove = async (id) => {
    const snapshot = await deleteDoc(doc(db, "companies", id));

        return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}

// actualiza una empresa por su id
export const update = async (id, companyData) => {
    const snapshot =  await updateDoc(doc(db, "companies", id), companyData);

        return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}

// obtiene una empresa por id
export const getById = async (id) => {
    const snapshot = await getDoc(doc(db, "companies", id));

        return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}

export const getAll = async () => {
    const snapshot = await getDocs(collection(db, "companies"));
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}

// obtiene empresas filtradas por categoría
export const getByCategory = async (category) => {
    const q = query(collection(db, "companies"), where("category", "==", category))

    const snapshot = await getDocs(q)

        return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}
