import { db } from "./firebase";
import { addDoc, collection, deleteDoc, getDocs, setDoc } from "firebase/firestore";

export const create = async (categoryData) => {
    return await addDoc(collection(db, "categories"), categoryData);
};

export const remove = async (id) => {
    return await deleteDoc(id);
}

export const update = async (id, categoryData) => {
    return await setDoc(id, categoryData);
}

export const getAll = async () => {
    return await getDocs(collection(db, "categories"))
}