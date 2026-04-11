import { useState } from "react";
import Navbar from "../components/Navbar";
import useAuth from "../hooks/useAuth";
import useOffers from "../hooks/useOffers";

export default function CreateOfferAdmin() {

    const { user } = useAuth();
    const { createNewOffer, loading, error } = useOffers(user);

    const [form, setForm] = useState({
        title: "",
        description: "",
        category: "",
        offerPrice: "",
        regularPrice: "",
        limitCoupons: "",
        startDate: "",
        endDate: "",
        couponEndDate: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.startDate > form.endDate) {
            alert("La fecha de inicio no puede ser mayor que la fecha final");
            return;
        }

        if (form.endDate > form.couponEndDate) {
            alert("La fecha límite del cupón debe ser posterior a la oferta");
            return;
        }

        console.log("📤 ADMIN CREANDO:", form);

        const adminOffer = {
            ...form,
            status: "approved",
            companyId: "ADMIN"
        };

        await createNewOffer(adminOffer);

        alert("Oferta creada correctamente (Admin) ✅");

        setForm({
            title: "",
            description: "",
            category: "",
            offerPrice: "",
            regularPrice: "",
            limitCoupons: "",
            startDate: "",
            endDate: "",
            couponEndDate: ""
        });
    };

    return (
        <>
            <Navbar />

            <div className="container">
                <h2>Crear Oferta (Admin)</h2>

                <form onSubmit={handleSubmit} className="form">

                    <div className="form-group">
                        <label>Título de la oferta</label>
                        <input
                            name="title"
                            placeholder="Ej: Pizza 2x1"
                            value={form.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Descripción</label>
                        <input
                            name="description"
                            placeholder="Descripción de la promoción"
                            value={form.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Categoría</label>
                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecciona una categoría</option>
                            <option value="Restaurantes">Restaurantes</option>
                            <option value="Diversion">Diversión</option>
                            <option value="Belleza">Belleza</option>
                            <option value="Educacion">Educación</option>
                            <option value="Salud">Salud</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Precio normal</label>
                        <input
                            type="number"
                            name="regularPrice"
                            placeholder="Ej: 20"
                            value={form.regularPrice}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Precio con descuento</label>
                        <input
                            type="number"
                            name="offerPrice"
                            placeholder="Ej: 10"
                            value={form.offerPrice}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Cantidad de cupones disponibles</label>
                        <input
                            type="number"
                            name="limitCoupons"
                            placeholder="Ej: 100"
                            value={form.limitCoupons}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Fecha de inicio de la oferta</label>
                        <input
                            type="date"
                            name="startDate"
                            value={form.startDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Fecha de finalización de la oferta</label>
                        <input
                            type="date"
                            name="endDate"
                            value={form.endDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Fecha límite para usar el cupón</label>
                        <input
                            type="date"
                            name="couponEndDate"
                            value={form.couponEndDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? "Creando..." : "Crear Oferta"}
                    </button>

                </form>

                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
        </>
    );
}