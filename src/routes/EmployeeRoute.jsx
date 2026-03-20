import { Navigate } from "react-router-dom";
import { useRole } from "../context/RoleContext";
import ProtectedRoute from "../components/ProtectedRoute";

export default function EmployeeRoute({ children }) {
    const { hasRole, loading } = useRole();

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!hasRole("employee")) {
        return <Navigate to="/" replace />;
    }

    return <ProtectedRoute>{ children }</ProtectedRoute>;
}