import { Navigate } from "react-router-dom";

import { useRole } from "../context/RoleContext";

export default function ProtectedRoute({ children }) {
    const { user, loading } = useRole();

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace/>;
    }

    return children;
}
