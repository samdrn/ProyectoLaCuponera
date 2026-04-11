import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useCategories from "../hooks/useCategories";

export default function ManageCategories() {
    const { categories, loading, error, getCategories, createCategory, updateCategory, deleteCategory } = useCategories();

    // estado del formulario de creación/edición
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formName, setFormName] = useState("");
    const [formSaving, setFormSaving] = useState(false);

    // confirmación de borrado
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        getCategories();
    }, []);

    const openCreate = () => {
        setEditingId(null);
        setFormName("");
        setShowForm(true);
    };

    const openEdit = (cat) => {
        setEditingId(cat.id);
        setFormName(cat.name || "");
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingId(null);
        setFormName("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formName.trim()) return;
        setFormSaving(true);

        if (editingId) {
            await updateCategory(editingId, { name: formName.trim() });
        } else {
            await createCategory({ name: formName.trim() });
        }

        setFormSaving(false);
        closeForm();
    };

    const handleDelete = async (id) => {
        await deleteCategory(id);
        setDeletingId(null);
    };

    return (
        <div className="app-layout">
            <Navbar />

            <main className="site-main">
                <div className="container" style={{ paddingTop: "40px", paddingBottom: "60px" }}>

                    {/* Encabezado */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px" }}>
                        <div style={{ borderLeft: "6px solid var(--accent)", paddingLeft: "20px" }}>
                            <h1 style={{ fontSize: "32px", fontWeight: "900", color: "var(--primary)", margin: 0 }}>
                                Gestión de <span style={{ color: "var(--accent)" }}>Categorías</span>
                            </h1>
                            <p style={{ color: "var(--muted)", marginTop: "6px", margin: "6px 0 0" }}>
                                Crea, edita o elimina las categorías del sistema.
                            </p>
                        </div>
                        <button
                            className="nav-auth-btn"
                            onClick={openCreate}
                            style={{ height: "44px", whiteSpace: "nowrap" }}
                        >
                            + Nueva Categoría
                        </button>
                    </div>

                    {/* Errores */}
                    {error && (
                        <div style={{ background: "#fff1f2", border: "1px solid #fecaca", color: "#991b1b", borderRadius: "12px", padding: "12px 16px", marginBottom: "20px" }}>
                            ⚠️ {error}
                        </div>
                    )}

                    {/* Modal formulario */}
                    {showForm && (
                        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && closeForm()}>
                            <div className="modal" style={{ maxWidth: "420px" }}>
                                <h2>{editingId ? "Editar Categoría" : "Nueva Categoría"}</h2>
                                <p className="muted">Ingresa el nombre de la categoría.</p>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group" style={{ marginBottom: "20px" }}>
                                        <label>Nombre de la categoría</label>
                                        <input
                                            className="input"
                                            placeholder="Ej: Restaurantes, Belleza..."
                                            value={formName}
                                            onChange={(e) => setFormName(e.target.value)}
                                            required
                                            autoFocus
                                            disabled={formSaving}
                                        />
                                    </div>
                                    <div className="modal-actions">
                                        <button type="button" className="btn btn-secondary" onClick={closeForm} disabled={formSaving}>
                                            Cancelar
                                        </button>
                                        <button type="submit" className="btn btn-primary" disabled={formSaving || !formName.trim()}>
                                            {formSaving ? "Guardando..." : editingId ? "Actualizar" : "Crear"}
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
                                <h2>¿Eliminar categoría?</h2>
                                <p className="muted">Esta acción no se puede deshacer.</p>
                                <div className="modal-actions" style={{ justifyContent: "center", marginTop: "16px" }}>
                                    <button className="btn btn-secondary" onClick={() => setDeletingId(null)}>Cancelar</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(deletingId)}>Sí, eliminar</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Lista de categorías */}
                    {loading ? (
                        <p className="muted" style={{ textAlign: "center", paddingTop: "40px" }}>Cargando categorías...</p>
                    ) : categories.length === 0 ? (
                        <div style={{ textAlign: "center", paddingTop: "60px" }}>
                            <p style={{ fontSize: "48px" }}>🏷️</p>
                            <h3 style={{ color: "var(--muted)" }}>No hay categorías aún</h3>
                            <p className="muted">Crea la primera para organizar las empresas del sistema.</p>
                        </div>
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            {categories.map((cat) => (
                                <div
                                    key={cat.id}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        background: "var(--surface)",
                                        border: "1px solid var(--border)",
                                        borderRadius: "14px",
                                        padding: "16px 20px",
                                        boxShadow: "var(--shadow-sm)",
                                    }}
                                >
                                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                                        <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "var(--accent-soft)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>
                                            🏷️
                                        </div>
                                        <span style={{ fontWeight: "700", fontSize: "16px" }}>{cat.name}</span>
                                    </div>
                                    <div style={{ display: "flex", gap: "10px" }}>
                                        <button
                                            className="btn"
                                            onClick={() => openEdit(cat)}
                                            style={{ fontSize: "13px" }}
                                        >
                                            ✏️ Editar
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => setDeletingId(cat.id)}
                                            style={{ fontSize: "13px" }}
                                        >
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
