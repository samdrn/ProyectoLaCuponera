import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./NavBar.css";

const categories = [
  "comida",
  "diversión",
  "belleza",
  "educación",
  "salud",
];

export default function Navbar({ cartItemCount = 0 }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const activeCategory = searchParams.get("category");

  const handleCategoryClick = (category) => {
    navigate(`/?category=${category}`);
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleLogout = () => {
    // Aqui va logica de cerrar sesión
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={handleLogoClick}>
        La Cuponera
      </div>

      <div className="nav-links">
        {categories.map((category) => (
          <button
            key={category}
            className={`nav-button ${
              activeCategory === category ? "active" : ""
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Right Actions */}
      <div className="nav-actions">
        <button className="cart-button" onClick={handleCartClick}>
          Mis cupones
        </button>

        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
