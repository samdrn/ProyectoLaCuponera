import { useState } from "react";
import { useRole } from "../context/RoleContext";
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { auth } from "../services/firebase";
import Navbar from "../components/Navbar";
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
            if (!currentUser) throw new Error("No estás autenticado");

            const credentiales = EmailAuthProvider.credential(currentUser.email, currentPassword);
            await reauthenticateWithCredential(currentUser, credentiales);
            await updatePassword(currentUser, newPassword);
            setMessage({ type: "success", text: "Contraseña actualizada con éxito" });

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            console.error(error);
            if (error.code === "auth/wrong-password") {
                setMessage({ type: "error", text: "La contraseña actual es incorrecta" });
            } else {
                setMessage({ type: "error", text: "Error al actualizar la contraseña" });
            }
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="app-layout">
                <Navbar />
                <main className="site-main">
                    <div className="container" style={{textAlign: 'center', paddingTop: '50px'}}>
                        <p className="muted">Inicia sesión para acceder a tu perfil.</p>
                        <button onClick={() => navigate("/login")} className="btn-primary" style={{marginTop: '20px'}}>Ir al Login</button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="app-layout">
            {/* 1. NAVBAR INTEGRADO */}
            <Navbar />

            <main className="site-main">
                <div className="container" style={{ maxWidth: '600px', paddingTop: '40px' }}>
                    
                    {/* 2. ENCABEZADO DE PÁGINA */}
                    <div style={{ marginBottom: '35px', borderLeft: '6px solid var(--accent)', paddingLeft: '20px' }}>
                        <h1 style={{ fontSize: '32px', fontWeight: '900', color: 'var(--primary)', margin: 0 }}>
                            Mi <span>Perfil</span>
                        </h1>
                        <p style={{ color: 'var(--muted)', marginTop: '5px' }}>Gestiona tu cuenta y seguridad.</p>
                    </div>

                    {/* 3. INFORMACIÓN DE USUARIO (TICKET STYLE) */}
                    <div className="card-body" style={{ 
                        background: 'var(--surface)', 
                        border: '1px solid var(--border)', 
                        borderRadius: '18px',
                        padding: '25px',
                        marginBottom: '30px',
                        boxShadow: 'var(--shadow-sm)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <p style={{ margin: 0, fontSize: '13px', color: 'var(--muted)', fontWeight: '700' }}>EMAIL REGISTRADO</p>
                                <p style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>{user.email}</p>
                            </div>
                            <span className="status-badge" style={{ background: 'var(--primary-soft)', color: 'var(--primary)' }}>
                                {userRole?.toUpperCase() || 'CLIENTE'}
                            </span>
                        </div>
                    </div>

                    {/* 4. FORMULARIO DE SEGURIDAD */}
                    <div className="card-body" style={{ 
                        background: 'var(--surface)', 
                        border: '1px solid var(--border)', 
                        borderRadius: '24px',
                        padding: '35px',
                        boxShadow: 'var(--shadow-lg)'
                    }}>
                        <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '20px', fontWeight: '800' }}>Cambiar Contraseña</h3>

                        {message.text && (
                            <div style={{
                                backgroundColor: message.type === "success" ? '#f0fdf4' : '#fef2f2',
                                color: message.type === "success" ? '#166534' : '#b91c1c',
                                padding: '12px',
                                borderRadius: '12px',
                                marginBottom: '20px',
                                border: `1px solid ${message.type === "success" ? '#bbf7d0' : '#fee2e2'}`,
                                fontWeight: '600',
                                textAlign: 'center'
                            }}>
                                {message.text}
                            </div>
                        )}

                        <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div className="form-group">
                                <label>Contraseña Actual</label>
                                <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="input-password"
                                    required
                                    style={{ height: '45px' }}
                                />
                            </div>
                            <div className="form-group">
                                <label>Nueva Contraseña</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="input-password"
                                    required
                                    style={{ height: '45px' }}
                                />
                            </div>
                            <div className="form-group">
                                <label>Confirmar Nueva Contraseña</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="input-password"
                                    required
                                    style={{ height: '45px' }}
                                />
                            </div>

                            <button type="submit" className="btn-primary" disabled={loading} style={{ height: '50px', marginTop: '10px' }}>
                                {loading ? "Procesando..." : "Actualizar Contraseña"}
                            </button>
                        </form>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '30px' }}>
                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="nav-link-simple"
                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: '700' }}
                        >
                            ← Volver al inicio
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}