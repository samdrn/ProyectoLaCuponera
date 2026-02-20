import React from "react";

export default function Loader({ label = "Cargando...", size = "md", fullScreen = false }) {
  const px = size === "sm" ? 16 : size === "lg" ? 40 : 26;

  const content = (
    <div className="loader">
      <span
        className="spinner"
        style={{ width: px, height: px }}
        aria-hidden="true"
      />
      {label ? <p className="loader-text">{label}</p> : null}
    </div>
  );

  if (!fullScreen) return content;

  return <div className="loader-overlay">{content}</div>;
}

