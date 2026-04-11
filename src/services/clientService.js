import { db } from "./firebase";
import { collection, getDoc, getDocs } from "firebase/firestore";


export const getAll = async () => {
    const snapshot = getDocs(collection(db, "users")).where("role", "==", "client")

        return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}


export const getById = async (id) => {
    const snapshot = await getDoc(doc(db, "users", id));

        return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}
