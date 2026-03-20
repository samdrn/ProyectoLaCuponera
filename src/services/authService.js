import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

export const registerUser = async (userData) => {
    const { email, password, ...extraData } = userData;
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Guardar información extendida en Firestore
    await setDoc(doc(db, "users", user.uid), {
        email,
        ...extraData,
        role: "client",
        createdAt: new Date().toISOString()
    });

    return user;
};

export const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = () => {
    return signOut(auth);
};

export const resetPassword = async (email) => {
    return sendPasswordResetEmail(auth, email);
};

export const changePassword = async (currentPassword, newPassword) => {
    const user = auth.currentUser;
    if (!user) {
        throw new Error("No estás autenticado");
    }
    const credentiales = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(auth, credentiales);
    await updatePassword(auth, newPassword);

    return true;
};

export const getUserRole = async (uid) => {
    try{
        const userDoc = await getDoc(doc(db, "users", uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            return userData.role || "client";
        }
        return "client";
    } catch (error) {
        console.error("Error al obtener el rol del usuario:", error);
        throw error;
    }
};

export const updateUserRole = async (uid, newRole) => {
    try {
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, { role: newRole });
        return true;
    } catch (error) {
        console.error("Error al actualizar el rol del usuario:", error);
        throw error;
    }
};

