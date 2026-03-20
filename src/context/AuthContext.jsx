import { createContext, useEffect, useState } from "react";
import { auth, db } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                try {
                    const docRef = doc(db, "users", currentUser.uid);
                    const docSnap = await getDoc(docRef);
                    
                    if (docSnap.exists()) {
                        setUser({ ...currentUser, ...docSnap.data() });
                    } else {
                        setUser(currentUser);
                    }
                } catch (error) {
                    console.error("Error al obtener usuario:", error);
                    setUser(currentUser);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        
        return unsubscribe;
    }, []);

    

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children} 
        </AuthContext.Provider>
    );
};
