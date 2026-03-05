import { useNavigate, useSearchParams, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { logoutUser } from "../services/authService";

const categories = [
  "Restaurantes",
  "Diversion",
  "Belleza",
  "Educacion",
  "Salud",
];

export default function Navbar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get("category");
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();
      // Si usas un contexto de Auth, asegúrate de limpiar el estado del usuario aquí también
      window.location.reload(); // Truco rápido para refrescar el estado de auth
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        
        {/* LOGO CON SPAN PARA EL NARANJA */}
        <div className="logo" onClick={() => navigate("/")} style={{cursor: 'pointer'}}>
          La<span>Cuponera</span>
        </div>

        {/* CATEGORÍAS COMO ENLACES LIMPIOS */}
        <nav className="nav-categories">
          {categories.map((category) => (
            <button
              key={category}
              className={`nav-cat-link ${activeCategory === category ? "active" : ""}`}
              onClick={() => navigate(`/?category=${category}`)}
            >
              {category}
            </button>
          ))}
        </nav>

        {/* ACCIONES DE USUARIO */}
        <div className="nav-actions">
          {user ? (
            <>
              <Link to="/coupons" className="nav-link-simple">Mis cupones</Link>
              <button className="btn-logout" onClick={handleLogout}>Salir</button>
            </>
          ) : (
            <>
              <button className="btn-login-text" onClick={() => navigate("/login")}>
                Entrar
              </button>
              <button className="nav-auth-btn" onClick={() => navigate("/register")}>
                Crear cuenta
              </button>
            </>
          )}
        </div>

      </div>
    </header>
  );
}