import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useClients from "../hooks/useClients";

export default function ManageClients() {
    const {
        clients,
        loading,
        error,
        getClients,
        updateClientData,
        deleteClientData
    } = useClients();

    const [search, setSearch] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({});

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

    const startEdit = (client) => {
        setEditingId(client.id);
        setForm(client);
    };

    const saveEdit = async () => {
        await updateClientData(editingId, form);
        setEditingId(null);
    };

    return (
        <div className="app-layout">
            <Navbar />

            <main className="site-main">
                <div className="container" style={{ paddingTop: "40px", paddingBottom: "60px" }}>

                    <div style={{ marginBottom: "32px", borderLeft: "6px solid var(--accent)", paddingLeft: "20px" }}>
                        <h1 style={{ fontSize: "32px", fontWeight: "900", color: "var(--primary)" }}>
                            Gestión de <span style={{ color: "var(--accent)" }}>Clientes</span>
                        </h1>
                    </div>

                    <input
                        className="input"
                        placeholder="Buscar por nombre o correo..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    {loading ? (
                        <p>Cargando...</p>
                    ) : (
                        <table style={{ width: "100%", marginTop: "20px" }}>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Correo</th>
                                    <th>Teléfono</th>
                                    <th>DUI</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filtered.map(client => (
                                    <tr key={client.id}>

                                        {editingId === client.id ? (
                                            <>
                                                <td>
                                                    <input
                                                        value={form.names || ""}
                                                        onChange={(e) =>
                                                            setForm({ ...form, names: e.target.value })
                                                        }
                                                    />
                                                </td>

                                                <td>
                                                    <input
                                                        value={form.email || ""}
                                                        onChange={(e) =>
                                                            setForm({ ...form, email: e.target.value })
                                                        }
                                                    />
                                                </td>

                                                <td>
                                                    <input
                                                        value={form.phone || ""}
                                                        onChange={(e) =>
                                                            setForm({ ...form, phone: e.target.value })
                                                        }
                                                    />
                                                </td>

                                                <td>
                                                    <input
                                                        value={form.dui || ""}
                                                        onChange={(e) =>
                                                            setForm({ ...form, dui: e.target.value })
                                                        }
                                                    />
                                                </td>

                                                <td>
                                                    <button onClick={saveEdit}>Guardar</button>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td>{client.names}</td>
                                                <td>{client.email}</td>
                                                <td>{client.phone}</td>
                                                <td>{client.dui}</td>

                                                <td>
                                                    <button onClick={() => startEdit(client)}>
                                                        Editar
                                                    </button>

                                                    <button onClick={() => deleteClientData(client.id)}>
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </>
                                        )}

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}