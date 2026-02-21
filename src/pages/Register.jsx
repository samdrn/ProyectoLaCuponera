import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

export default function Register() {
    const [formData, setFormData] = useState({
        names: "",
        lastnames: "",
        phone: "",
        email: "",
        address: "",
        dui: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        
        // Validación básica
        if (formData.password.length < 6) {
            return setError("La contraseña debe tener al menos 6 caracteres.");
        }

        setLoading(true);

        try {
            await registerUser(formData);
            navigate("/");
        } catch (err) {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
                setError("El correo electrónico ya está registrado.");
            } else if (err.code === 'auth/weak-password') {
                setError("La contraseña es muy débil.");
            } else {
                setError("Error al registrar: " + err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '500px', marginTop: '2rem' }}>
            <h2>Registrarse</h2>
            
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

            <form onSubmit={handleSubmit} className="row" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                    name="names"
                    className="input"
                    placeholder="Nombres"
                    required
                    onChange={handleChange}
                />
                <input
                    name="lastnames"
                    className="input"
                    placeholder="Apellidos"
                    required
                    onChange={handleChange}
                />
                <input
                    name="phone"
                    className="input"
                    placeholder="Teléfono"
                    required
                    onChange={handleChange}
                />
                <input
                    name="dui"
                    className="input"
                    placeholder="Número de DUI"
                    required
                    onChange={handleChange}
                />
                <input
                    name="address"
                    className="input"
                    placeholder="Dirección"
                    required
                    onChange={handleChange}
                />
                <input
                    name="email"
                    className="input"
                    type="email"
                    placeholder="Correo electrónico"
                    required
                    onChange={handleChange}
                />
                <input
                    name="password"
                    className="input"
                    type="password"
                    placeholder="Contraseña"
                    required
                    onChange={handleChange}
                />

                <button 
                    className="btn btn-primary" 
                    disabled={loading}
                    style={{ opacity: loading ? 0.7 : 1 }}
                >
                    {loading ? "Registrando..." : "Registrarse"}
                </button>
            </form>
        </div>
    );
}