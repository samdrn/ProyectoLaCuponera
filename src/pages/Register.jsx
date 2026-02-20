import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await registerUser(email, password);
        navigate("/");
    };

    return (
        <div className="container">
            <h2>Registrarse</h2>

            <form onSubmit={handleSubmit}>
                <input
                className="input"
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />

                <input
                className="input"
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />

                <button className="btn btn-primary">Registrarse</button>
            </form>
        </div>
    );
}   