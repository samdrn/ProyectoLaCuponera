import { useState } from "react";
import { useRole } from "../context/RoleContext";
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const { user, userRole } = useRole();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState({ type: "", text: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setMessage({ type: "", text: "" });

        if (newPassword !== confirmPassword) {
            setMessage({ type: "error", text: "Las contraseñas no coinciden" });
            return;
        }

        if (newPassword.length < 6) {
            setMessage({ type: "error", text: "La contraseña debe tener al menos 6 caracteres" });
            return;
        }

        setLoading(true);

        try {

            const currentUser = auth.currentUser;
            if (!currentUser) {
                throw new Error("No estás autenticado");
            }


            const credentiales = EmailAuthProvider.credential(currentUser.email, currentPassword);
            await reauthenticateWithCredential(currentUser, credentiales);
            await updatePassword(currentUser, newPassword);
            setMessage({ type: "success", text: "Contraseña actualizada" });

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {

            if (error.code === "auth/wrong-password") {
                setMessage({ type: "error", text: "Contraseña incorrecta" });
            } else if (error.code === "auth/too-many-requests") {
                setMessage({ type: "error", text: "Demasiados intentos" });
            } else if (error.code === "auth/requires-recent-login") {
                setMessage({ type: "error", text: "Por seguridad, inicia sesión nuevamente" });
            } else if (error.code === "auth/weak-password") {
                setMessage({ type: "error", text: "La contraseña debe tener al menos 6 caracteres" });
            } else {
                setMessage({ type: "error", text: "Error al actualizar la contraseña" });
            }
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="container">
                <p>No tienes acceso a esta página. Inicia sesión para acceder.</p>
            </div>
        );
    }

    return (
        <div className="container">

            <button
            type="button"
            onClick={()=> navigate("/")}
            className="btn btn-primary"
            
            >
                Volver al inicio
            </button>
            <h1>Perfil</h1>

            <p>Email: {user.email}</p>
            <p>Rol: {userRole}</p>

            <h3>Cambiar contraseña</h3>

            {message.text && (
                <div style={{
                    backgroundColor: message.type === "success" ? '#d4edda' : '#fee2e2',
                    color: message.type === "success" ? '#155724' : '#b91c1c',
                    padding: '0.75rem',
                    borderRadius: '0.375rem',
                    marginBottom: '1rem',
                }}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleChangePassword}>
                <div className="form-group">
                    <label htmlFor="currentPassword">Contraseña actual</label>
                    <input
                        type="password"
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="input-password"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="newPassword">Nueva contraseña</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="input-password"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmar contraseña</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="input-password"
                        required
                    />
                </div>
                <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? "Actualizando..." : "Actualizar contraseña"}
                </button>
            </form>
        </div>
    );
}
