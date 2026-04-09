import { db } from "./firebase";
import { addDoc, collection, deleteDoc, getDoc, getDocs, setDoc } from "firebase/firestore";

export const create = async (companyData) => {
    return await addDoc(collection(db, "companies"), companyData);
};

export const remove = async (id) => {
    return await deleteDoc(id);
}

export const update = async (id, companyData) => {
    return await setDoc(id, companyData);
}

export const getAll = async () => {
    return await getDocs(collection(db, "companies"))
}

export const getById = async (id) => {
    return await getDoc(id)
}

export const getByCategory = async (category) => {
    const q = query(collection(db, "companies"), where("category", "==", category))

    return await getDocs(q)
}