import { useNavigate, useSearchParams } from "react-router-dom";
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
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        
        <h2
          style={{ cursor: "pointer", margin: 0 }}
          onClick={() => navigate("/")}
        >
          La Cuponera
        </h2>

        <div className="row">
          {categories.map((category) => (
            <button
              key={category}
              className={`btn ${
                activeCategory === category ? "btn-primary" : ""
              }`}
              onClick={() => navigate(`/?category=${category}`)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="row">
          {user ? (
            <>
              <button
                className="btn"
                onClick={() => navigate("/coupons")}
              >
                Mis cupones
              </button>

              <button
                className="btn btn-danger"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="btn"
                onClick={() => navigate("/login")}
              >
                Iniciar Sesión
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/register")}
              >
                Registrarse
              </button>
            </>
          )}
        </div>

      </div>
    </header>
  );
}