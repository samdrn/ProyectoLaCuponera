import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, resetPassword } from "../services/authService";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [resetEmail, setResetEmail] = useState("");
    const [showResetModal, setShowResetModal] = useState(false);
    const [resetMessage, setResetMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await loginUser(email, password);
            navigate("/");
        } catch (err) {
            console.error(err);
            // Manejo básico de errores comunes de Firebase
            if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                setError("Correo o contraseña incorrectos.");
            } else if (err.code === 'auth/too-many-requests') {
                setError("Demasiados intentos fallidos. Intenta más tarde.");
            } else if (err.code === 'auth/invalid-email') {
                setError("Correo electrónico no válido.");
            } else {
                setError("Ocurrió un error al iniciar sesión. Intenta nuevamente.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setResetMessage("");
        setLoading(true);

        try {
            await resetPassword(resetEmail);
            setResetMessage("Se ha enviado un correo electrónico para restablecer la contraseña.");

            setTimeout(() => {
                setShowResetModal(false);
                setResetEmail("");
                setResetMessage("");
            }, 3000);
        } catch (err) {
            console.error(err);
            // Manejo básico de errores comunes de Firebase
            if (err.code === 'auth/user-not-found') {
                setResetMessage("Correo electrónico no encontrado.");
            } else {
                setResetMessage("Error al enviar el correo electrónico.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '400px', marginTop: '2rem' }}>
            <h2>Iniciar sesión</h2>

            {error && (
                <div style={{
                    backgroundColor: '#fee2e2',
                    color: '#b91c1c',
                    padding: '0.75rem',
                    borderRadius: '0.375rem',
                    marginBottom: '1rem',
                    border: '1px solid #f87171'
                }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                    className="input"
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    className="input"
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={loading}
                    style={{ opacity: loading ? 0.7 : 1 }}
                >
                    {loading ? "Entrando..." : "Entrar"}
                </button>

                <button
                    type="button"
                    onClick={() => setShowResetModal(true)}
                    disabled={loading}
                    style={{ opacity: loading ? 0.7 : 1 }}
                >
                    ¿Olvidaste tu contraseña?
                </button>

                <div>
                    ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
                </div>
            </form>

            {showResetModal && (
                <div style={{
                    marginTop: '2rem',
                    padding: '1rem',
                    border: '1px solid #ccc',
                    borderRadius: '0.375rem'
                }}>
                    <h3>Restablecer contraseña</h3>

                    {resetMessage && (
                        <div style={{
                            backgroundColor: resetMessage.includes("enviado") ? '#d4edda' : '#fee2e2',
                            color: resetMessage.includes("enviado") ? '#155724' : '#b91c1c',
                            padding: '0.75rem',
                            borderRadius: '0.375rem',
                            marginBottom: '1rem',
                        }}>
                            {resetMessage}
                        </div>
                    )}

                    <form onSubmit={handleResetPassword} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <input
                            className="input"
                            type="email"
                            placeholder="Correo electrónico"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                            required
                        />
                        <button
                            className="btn btn-primary"
                            type="submit"
                            disabled={loading}
                            style={{ opacity: loading ? 0.7 : 1 }}
                        >
                            {loading ? "Enviando..." : "Enviar"}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setShowResetModal(false);
                                setResetEmail("");
                                setResetMessage("");
                            }}
                        >
                            Cancelar
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}