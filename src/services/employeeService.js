import { db } from "./firebase";
import { collection, getDocs, query, where, doc, deleteDoc, updateDoc } from "firebase/firestore";

// obtener empleados
export const getEmployees = async () => {
    const q = query(collection(db, "users"), where("role", "==", "employee"));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};

// eliminar empleado
export const deleteEmployee = async (id) => {
    await deleteDoc(doc(db, "users", id));
};

// actualizar empleado
export const updateEmployee = async (id, data) => {
    await updateDoc(doc(db, "users", id), data);
};