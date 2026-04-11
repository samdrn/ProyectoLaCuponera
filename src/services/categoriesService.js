import { db } from "./firebase";
import { addDoc, collection, deleteDoc, getDocs, updateDoc } from "firebase/firestore";

// crea categoría
export const create = async (categoryData) => {
    const snapshot = await addDoc(collection(db, "categories"), categoryData);

        return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};

// elimina categoría por id
export const remove = async (id) => {
    const snapshot = await deleteDoc(doc(db, "categories", id));

        return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}

// actualiza categoría por id
export const update = async (id, categoryData) => {
    const snapshot =  await updateDoc(doc(db, "categories", id), categoryData);

        return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}

// obtiene todas las categorías
export const getAll = async () => {
    const snapshot = await getDocs(collection(db, "categories"));
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}
