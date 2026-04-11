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
      navigate("/");
      window.location.reload(); 
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        
        <div className="logo" onClick={() => navigate("/")} style={{cursor: 'pointer'}}>
          La<span>Cuponera</span>
        </div>

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

        <div className="nav-actions">
          {user ? (
            <>
              {/* 🔧 ADMIN */}
              {user.role === 'admin' && (
                <Link 
                  to="/admin_dashboard" 
                  className="nav-link-simple" 
                  style={{color: 'var(--accent)', fontWeight: 'bold'}}
                >
                  Panel Admin
                </Link>
              )}

              {/* 🏢 EMPRESA 🔥 NUEVO */}
              {user.role === 'companyAdmin' && (
                <Link 
                  to="/company" 
                  className="nav-link-simple" 
                  style={{color: 'var(--accent)', fontWeight: 'bold'}}
                >
                  Panel Empresa
                </Link>
              )}

              {/* 🎫 EMPLEADO */}
              {user.role === 'employee' && (
                <Link 
                  to="/employee" 
                  className="nav-link-simple" 
                  style={{color: 'var(--accent)', fontWeight: 'bold'}}
                >
                  Canje de Cupones
                </Link>
              )}

              {/* 👤 CLIENTE */}
              {user.role === 'client' && (
                <Link to="/coupons" className="nav-link-simple">
                  Mis cupones
                </Link>
              )}

              <Link to="/profile" className="nav-link-simple">Mi Perfil</Link>
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