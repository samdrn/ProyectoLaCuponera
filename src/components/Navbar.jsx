import { useNavigate, useSearchParams } from "react-router-dom";

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
          <button
            className="btn"
            onClick={() => navigate("/coupons")}
          >
            Mis cupones
          </button>

          <button
            className="btn btn-danger"
            onClick={() => navigate("/login")}
          >
            Logout
          </button>
        </div>

      </div>
    </header>
  );
}