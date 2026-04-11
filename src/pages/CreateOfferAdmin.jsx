import { useState } from "react";
import Navbar from "../components/Navbar";
import { createOffer } from "../services/offersService";
import { Timestamp } from "firebase/firestore";

export default function CreateOfferAdmin() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

        try {
            setLoading(true);
            setError(null);

            const offerData = {
                title: form.title,
                description: form.description,
                category: form.category,
                companyId: "VAitF5ebz9Vz7p2lFmKg",

                offerPrice: Number(form.offerPrice),
                regularPrice: Number(form.regularPrice),
                limitCoupons: Number(form.limitCoupons),

                startDate: Timestamp.fromDate(new Date(form.startDate)),
                endDate: Timestamp.fromDate(new Date(form.endDate)),
                couponEndDate: Timestamp.fromDate(new Date(form.couponEndDate)),

                status: "approved",
                soldCoupons: 0,
                remaining: true,
                createdAt: Timestamp.now()
            };

            await createOffer(offerData);

            alert("Oferta creada correctamente ✅");

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

        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <div className="container">
                <h2>Crear Oferta (Admin)</h2>

                <form onSubmit={handleSubmit} className="form">

                    <div className="form-group">
                        <label>Título</label>
                        <input name="title" placeholder="Ej: Pizza 2x1" value={form.title} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Descripción</label>
                        <input name="description" placeholder="Describe la promoción" value={form.description} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Categoría</label>
                        <select name="category" value={form.category} onChange={handleChange} required>
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
                        <input type="number" name="regularPrice" placeholder="Ej: 20" value={form.regularPrice} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Precio oferta</label>
                        <input type="number" name="offerPrice" placeholder="Ej: 10" value={form.offerPrice} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Límite de cupones</label>
                        <input type="number" name="limitCoupons" placeholder="Ej: 100" value={form.limitCoupons} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Inicio</label>
                        <input type="date" name="startDate" value={form.startDate} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Fin</label>
                        <input type="date" name="endDate" value={form.endDate} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Vencimiento del cupón</label>
                        <input type="date" name="couponEndDate" value={form.couponEndDate} onChange={handleChange} required />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "Creando..." : "Crear Oferta"}
                    </button>

                </form>

                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
        </>
    );
}