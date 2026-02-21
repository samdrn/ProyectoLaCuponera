import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

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