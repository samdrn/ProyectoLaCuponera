import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { auth, db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
//import { onAuthStateChanged } from "firebase/auth";
//import { getUserRole } from "../services/authService";


export const RoleContext = createContext();


export const useRole = () => {
    const context = useContext(RoleContext);
    if (!context) {
        throw new Error("useRole debe usarse dentro de RoleContextProvider");
    }
    return context;
};


export default function RoleContextProvider({ children }) {
    const { user, loading: authLoading } = useContext(AuthContext);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUserRole = async () => {

            if (authLoading) return;

            if (user) {
                try {
                    const userDoc = await getDoc(doc(db, "users", user.uid));

                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setRole(userData.role || "client");
                    } else {
                        setRole("client");
                    }
                } catch (error) {
                    console.error("Error al obtener el usuario:", error);
                    setRole(null);
                }
            } else {
                setRole(null);
            }
            setLoading(false);
        };

        getUserRole();

    }, [user, authLoading]);

    const value = {
        user,
        userRole: role,
        loading: loading || authLoading,

        isAuthenticated: !!user, hasRole: (roles) => {
            if (!role) return false;
            if (Array.isArray(roles)) {
                return roles.includes(role);
            }
            return role === roles;
        }
    };

    return (
        <RoleContext.Provider value={value}>
            {children}
        </RoleContext.Provider>
    );
};
