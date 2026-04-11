import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useCompanies from "../hooks/useCompanies";

const INITIAL_FORM = { name: "", category: "", email: "", phone: "", address: "" };

export default function ManageCompanies() {
    const { companies, loading, error, getCompanies, createCompany, updateCompany, deleteCompany } = useCompanies();

    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(INITIAL_FORM);
    const [formSaving, setFormSaving] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        getCompanies();
    }, []);

    const filtered = companies.filter((c) => {
        const term = search.toLowerCase();
        return (
            (c.name || "").toLowerCase().includes(term) ||
            (c.category || "").toLowerCase().includes(term) ||
            (c.code || "").toLowerCase().includes(term)
        );
    });

    const openCreate = () => {
        setEditingId(null);
        setForm(INITIAL_FORM);
        setShowForm(true);
    };

    const openEdit = (company) => {
        setEditingId(company.id);
        setForm({
            name: company.name || "",
            category: company.category || "",
            email: company.email || "",
            phone: company.phone || "",
            address: company.address || "",
        });
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingId(null);
        setForm(INITIAL_FORM);
    };

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name.trim()) return;
        setFormSaving(true);

        if (editingId) {
            await updateCompany(editingId, form);
        } else {
            await createCompany({ ...form });
        }

        await getCompanies(); // refrescar lista
        setFormSaving(false);
        closeForm();
    };

    const handleDelete = async (id) => {
        await deleteCompany(id);
        setDeletingId(null);
    };

    const fieldLabel = { name: "Nombre", category: "Categoría", email: "Correo", phone: "Teléfono", address: "Dirección" };
    const fieldPlaceholder = { name: "Ej: Pizza Nostra", category: "Ej: Restaurantes", email: "empresa@correo.com", phone: "7000-0000", address: "Col. Escalón, San Salvador" };

    return (
        <div className="app-layout">
            <Navbar />

            <main className="site-main">
                <div className="container" style={{ paddingTop: "40px", paddingBottom: "60px" }}>

                    {/* Encabezado */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px" }}>
                        <div style={{ borderLeft: "6px solid var(--accent)", paddingLeft: "20px" }}>
                            <h1 style={{ fontSize: "32px", fontWeight: "900", color: "var(--primary)", margin: 0 }}>
                                Gestión de <span style={{ color: "var(--accent)" }}>Empresas</span>
                            </h1>
                            <p style={{ color: "var(--muted)", marginTop: "6px", margin: "6px 0 0" }}>
                                Administra las empresas afiliadas al sistema.
                            </p>
                        </div>
                        <button className="nav-auth-btn" onClick={openCreate} style={{ height: "44px", whiteSpace: "nowrap" }}>
                            + Nueva Empresa
                        </button>
                    </div>

                    {/* Búsqueda */}
                    <div style={{ display: "flex", gap: "12px", marginBottom: "24px", alignItems: "center" }}>
                        <input
                            className="input"
                            style={{ maxWidth: "380px" }}
                            placeholder="Buscar por nombre, categoría o código..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <span style={{ color: "var(--muted)", fontSize: "14px" }}>
                            {filtered.length} empresa{filtered.length !== 1 ? "s" : ""}
                        </span>
                    </div>

                    {/* Error */}
                    {error && (
                        <div style={{ background: "#fff1f2", border: "1px solid #fecaca", color: "#991b1b", borderRadius: "12px", padding: "12px 16px", marginBottom: "20px" }}>
                            ⚠️ {error}
                        </div>
                    )}

                    {/* Modal formulario */}
                    {showForm && (
                        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && closeForm()}>
                            <div className="modal" style={{ maxWidth: "520px" }}>
                                <h2>{editingId ? "Editar Empresa" : "Nueva Empresa"}</h2>
                                <p className="muted">
                                    {editingId ? "Modifica los datos de la empresa." : "Completa los datos. Se generará un código único automáticamente."}
                                </p>
                                <form onSubmit={handleSubmit}>
                                    {Object.keys(INITIAL_FORM).map((field) => (
                                        <div key={field} className="form-group" style={{ marginBottom: "14px" }}>
                                            <label>{fieldLabel[field]}{field === "name" ? " *" : ""}</label>
                                            <input
                                                className="input"
                                                name={field}
                                                placeholder={fieldPlaceholder[field]}
                                                value={form[field]}
                                                onChange={handleChange}
                                                required={field === "name"}
                                                disabled={formSaving}
                                            />
                                        </div>
                                    ))}
                                    <div className="modal-actions" style={{ marginTop: "8px" }}>
                                        <button type="button" className="btn btn-secondary" onClick={closeForm} disabled={formSaving}>
                                            Cancelar
                                        </button>
                                        <button type="submit" className="btn btn-primary" disabled={formSaving || !form.name.trim()}>
                                            {formSaving ? "Guardando..." : editingId ? "Actualizar" : "Crear Empresa"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Modal confirmación borrado */}
                    {deletingId && (
                        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setDeletingId(null)}>
                            <div className="modal" style={{ maxWidth: "380px", textAlign: "center" }}>
                                <div style={{ fontSize: "48px", marginBottom: "8px" }}>🗑️</div>
                                <h2>¿Eliminar empresa?</h2>
                                <p className="muted">Esta acción eliminará la empresa del sistema. No se puede deshacer.</p>
                                <div className="modal-actions" style={{ justifyContent: "center", marginTop: "16px" }}>
                                    <button className="btn btn-secondary" onClick={() => setDeletingId(null)}>Cancelar</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(deletingId)}>Sí, eliminar</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Lista / tabla de empresas */}
                    {loading ? (
                        <p className="muted" style={{ textAlign: "center", paddingTop: "40px" }}>Cargando empresas...</p>
                    ) : filtered.length === 0 ? (
                        <div style={{ textAlign: "center", paddingTop: "60px" }}>
                            <p style={{ fontSize: "48px" }}>🏢</p>
                            <h3 style={{ color: "var(--muted)" }}>No se encontraron empresas</h3>
                            <p className="muted">Crea la primera empresa afiliada.</p>
                        </div>
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                            {filtered.map((company) => (
                                <div
                                    key={company.id}
                                    style={{
                                        background: "var(--surface)",
                                        border: "1px solid var(--border)",
                                        borderRadius: "16px",
                                        padding: "20px 24px",
                                        boxShadow: "var(--shadow-sm)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        gap: "16px",
                                    }}
                                >
                                    {/* Info empresa */}
                                    <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: 1, minWidth: 0 }}>
                                        <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "var(--primary-soft)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "900", color: "var(--primary)", fontSize: "18px", flexShrink: 0 }}>
                                            {(company.name || "E")[0].toUpperCase()}
                                        </div>
                                        <div style={{ minWidth: 0 }}>
                                            <div style={{ fontWeight: "800", fontSize: "16px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                                {company.name || "Sin nombre"}
                                            </div>
                                            <div style={{ display: "flex", gap: "10px", marginTop: "4px", flexWrap: "wrap" }}>
                                                {company.category && (
                                                    <span style={{ fontSize: "12px", background: "var(--accent-soft)", color: "var(--accent)", borderRadius: "20px", padding: "2px 10px", fontWeight: "700" }}>
                                                        {company.category}
                                                    </span>
                                                )}
                                                {company.code && (
                                                    <span style={{ fontSize: "12px", background: "var(--primary-soft)", color: "var(--primary)", borderRadius: "20px", padding: "2px 10px", fontWeight: "700", fontFamily: "monospace" }}>
                                                        {company.code}
                                                    </span>
                                                )}
                                                {company.email && (
                                                    <span style={{ fontSize: "12px", color: "var(--muted)" }}>{company.email}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Acciones */}
                                    <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
                                        <button className="btn" onClick={() => openEdit(company)} style={{ fontSize: "13px" }}>
                                            ✏️ Editar
                                        </button>
                                        <button className="btn btn-danger" onClick={() => setDeletingId(company.id)} style={{ fontSize: "13px" }}>
                                            🗑️ Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
