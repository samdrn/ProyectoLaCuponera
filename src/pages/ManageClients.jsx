import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useClients from "../hooks/useClients";

export default function ManageClients() {
    const { clients, loading, error, getClients } = useClients();
    const [search, setSearch] = useState("");

    useEffect(() => {
        getClients();
    }, []);

    const filtered = clients.filter((c) => {
        const term = search.toLowerCase();
        return (
            (c.names || c.name || "").toLowerCase().includes(term) ||
            (c.email || "").toLowerCase().includes(term)
        );
    });

    return (
        <div className="app-layout">
            <Navbar />

            <main className="site-main">
                <div className="container" style={{ paddingTop: "40px", paddingBottom: "60px" }}>

                    {/* Encabezado */}
                    <div style={{ marginBottom: "32px", borderLeft: "6px solid var(--accent)", paddingLeft: "20px" }}>
                        <h1 style={{ fontSize: "32px", fontWeight: "900", color: "var(--primary)", margin: 0 }}>
                            Gestión de <span style={{ color: "var(--accent)" }}>Clientes</span>
                        </h1>
                        <p style={{ color: "var(--muted)", marginTop: "6px" }}>
                            Consulta todos los usuarios registrados con rol de cliente.
                        </p>
                    </div>

                    {/* Barra de búsqueda */}
                    <div style={{ display: "flex", gap: "12px", marginBottom: "24px", alignItems: "center" }}>
                        <input
                            className="input"
                            style={{ maxWidth: "380px" }}
                            placeholder="Buscar por nombre o correo..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <span style={{ color: "var(--muted)", fontSize: "14px" }}>
                            {filtered.length} cliente{filtered.length !== 1 ? "s" : ""}
                        </span>
                    </div>

                    {/* Errores */}
                    {error && (
                        <div style={{ background: "#fff1f2", border: "1px solid #fecaca", color: "#991b1b", borderRadius: "12px", padding: "12px 16px", marginBottom: "20px" }}>
                            ⚠️ {error}
                        </div>
                    )}

                    {/* Tabla */}
                    {loading ? (
                        <p className="muted" style={{ textAlign: "center", paddingTop: "40px" }}>Cargando clientes...</p>
                    ) : filtered.length === 0 ? (
                        <div style={{ textAlign: "center", paddingTop: "60px" }}>
                            <p style={{ fontSize: "48px" }}>👤</p>
                            <h3 style={{ color: "var(--muted)" }}>No se encontraron clientes</h3>
                        </div>
                    ) : (
                        <div style={{ overflowX: "auto" }}>
                            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                <thead>
                                    <tr style={{ borderBottom: "2px solid var(--border)" }}>
                                        {["Nombre", "Correo", "Teléfono", "DUI", "Registrado"].map((h) => (
                                            <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontSize: "12px", fontWeight: "800", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map((client) => (
                                        <tr
                                            key={client.id}
                                            style={{ borderBottom: "1px solid var(--border)", transition: "background 0.15s" }}
                                            onMouseEnter={(e) => e.currentTarget.style.background = "var(--surface-2)"}
                                            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                                        >
                                            <td style={{ padding: "14px 16px", fontWeight: "600" }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                    <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--primary-soft)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", color: "var(--primary)", fontSize: "14px" }}>
                                                        {(client.names || client.name || "?")[0].toUpperCase()}
                                                    </div>
                                                    {client.names || client.name || "—"}
                                                </div>
                                            </td>
                                            <td style={{ padding: "14px 16px", color: "var(--muted)", fontSize: "14px" }}>{client.email || "—"}</td>
                                            <td style={{ padding: "14px 16px", fontSize: "14px" }}>{client.phone || client.telefono || "—"}</td>
                                            <td style={{ padding: "14px 16px", fontSize: "14px" }}>{client.dui || "—"}</td>
                                            <td style={{ padding: "14px 16px", color: "var(--muted)", fontSize: "13px" }}>
                                                {client.createdAt
                                                    ? new Date(client.createdAt).toLocaleDateString("es-SV")
                                                    : "—"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
