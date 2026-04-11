import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { registerUser } from "../services/authService";
import useEmployees from "../hooks/useEmployees";

export default function ManageEmployees() {
    const { employees, fetchEmployees, removeEmployee, editEmployee } = useEmployees();

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState({
        names: "",
        email: "",
        password: ""
    });

    useEffect(() => {
        fetchEmployees();
    }, []);

    const openCreate = () => {
        setEditingId(null);
        setForm({ names: "", email: "", password: "" });
        setShowForm(true);
    };

    const openEdit = (emp) => {
        setEditingId(emp.id);
        setForm({
            names: emp.names || "",
            email: emp.email || "",
            password: ""
        });
        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editingId) {
            await editEmployee(editingId, {
                names: form.names,
                email: form.email
            });
        } else {
            await registerUser({
                names: form.names,
                email: form.email,
                password: form.password || "123456",
                role: "employee"
            });
        }

        setShowForm(false);
        fetchEmployees();
    };

    return (
        <>
            <Navbar />

            <div className="container">

                <div className="page-header">
                    <h1>Gestión de Empleados</h1>
                    <p>Administra los empleados del sistema</p>
                </div>

                <button className="btn btn-primary" onClick={openCreate}>
                    + Crear Empleado
                </button>

                <div className="admin-list" style={{ marginTop: "20px" }}>
                    {employees.length === 0 ? (
                        <p>No hay empleados registrados</p>
                    ) : (
                        employees.map(emp => (
                            <div key={emp.id} className="admin-card">

                                <div className="admin-info">
                                    <strong>{emp.names}</strong>
                                    <span className="muted">{emp.email}</span>
                                </div>

                                <div className="admin-actions">
                                    <button
                                        className="btn"
                                        onClick={() => openEdit(emp)}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        className="btn btn-danger"
                                        onClick={() => removeEmployee(emp.id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>

                            </div>
                        ))
                    )}
                </div>

                {showForm && (
                    <div style={{ marginTop: "30px" }}>
                        <form onSubmit={handleSubmit} className="form">

                            <h2 style={{ marginBottom: "20px" }}>
                                {editingId ? "Editar Empleado" : "Crear Empleado"}
                            </h2>

                            <div className="form-group">
                                <label>Nombre</label>
                                <input
                                    value={form.names}
                                    onChange={(e) => setForm({ ...form, names: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    required
                                />
                            </div>

                            {!editingId && (
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        value={form.password}
                                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    />
                                </div>
                            )}

                            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                                <button type="submit" className="btn btn-primary">
                                    Guardar
                                </button>

                                <button
                                    type="button"
                                    className="btn"
                                    onClick={() => setShowForm(false)}
                                >
                                    Cancelar
                                </button>
                            </div>

                        </form>
                    </div>
                )}
            </div>
        </>
    );
}