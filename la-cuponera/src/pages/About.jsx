import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Modal from "../components/Modal";

export default function About() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  // Simula carga de datos (como si viniera de una API)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader label="Cargando información..." />;
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h1 className="h1">Sobre la cuponera</h1>
          <p className="muted">
            Esta app te ayuda a encontrar, guardar y usar cupones de forma rápida.
          </p>

          <div className="hr" />

          <div className="grid" style={{ gap: "12px" }}>
            <div>
              <h2 className="h2">¿Qué puedes hacer aquí?</h2>
              <ul>
                <li>Buscar cupones por tienda o categoría.</li>
                <li>Guardar tus cupones favoritos.</li>
                <li>Ver detalles y condiciones antes de usarlos.</li>
              </ul>
            </div>

            <div className="row space-between">
              <button className="btn btn-primary" onClick={() => setOpen(true)}>
                Ver más detalles
              </button>

              <span className="badge badge-success">Versión demo</span>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={open}
        title="Detalles de la cuponera"
        onClose={() => setOpen(false)}
        footer={
          <div className="row" style={{ justifyContent: "flex-end" }}>
            <button className="btn" onClick={() => setOpen(false)}>
              Cerrar
            </button>
          </div>
        }
      >
        <p className="muted" style={{ marginTop: 0 }}>
          Aquí puedes explicar mejor tu proyecto:
        </p>

        <ul style={{ marginTop: 0 }}>
          <li>Cómo se agregan los cupones (API o datos locales).</li>
          <li>Cómo se validan fechas de expiración.</li>
          <li>Cómo funciona “Mis cupones”.</li>
        </ul>

        <div className="hr" />

        <p style={{ margin: 0 }}>
          Tip: si tienes una sección de soporte, puedes poner aquí un link o un
          correo.
        </p>
      </Modal>
    </div>
  );
}
