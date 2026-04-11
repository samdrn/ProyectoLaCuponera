import { db } from "./firebase";
import { collection, getDocs, getDoc, doc, query, where } from "firebase/firestore";

// obtiene todos los usuarios con rol "client"
export const getAll = async () => {
    const q = query(collection(db, "users"), where("role", "==", "client"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

// obtiene un cliente por su uid
export const getById = async (uid) => {
    const docSnap = await getDoc(doc(db, "users", uid));
    if (!docSnap.exists()) return null;
    return { id: docSnap.id, ...docSnap.data() };
};