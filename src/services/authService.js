import { auth, db } from "./firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    updatePassword,
    EmailAuthProvider,
    reauthenticateWithCredential
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

export const registerUser = async (userData) => {
    const { email, password, role, companyId, ...extraData } = userData;

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // ahora permite roles dinámicos sin romper el flujo actual
    await setDoc(doc(db, "users", user.uid), {
        email,
        ...extraData,
        role: role || "client",
        companyId: companyId || null,
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
    await reauthenticateWithCredential(user, credentiales); // 🔥 FIX (era auth)
    await updatePassword(user, newPassword);

    return true;
};

export const getUserRole = async (uid) => {
    try {
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