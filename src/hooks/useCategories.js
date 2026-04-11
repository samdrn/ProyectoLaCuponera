import { useState } from "react";
import { create, getAll, remove, update } from "../services/categoriesService";

export default function useCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getCategories = async () => {
        setError(null);
        setLoading(true);
        try {
            const data = await getAll();
            setCategories(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const createCategory = async (data) => {
        setError(null);
        setLoading(true);
        try {
            const created = await create(data);
            setCategories((prev) => [...prev, created]);
            return created;
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const updateCategory = async (id, data) => {
        setError(null);
        setLoading(true);
        try {
            const updated = await update(id, data);
            setCategories((prev) => prev.map((c) => (c.id === id ? updated : c)));
            return updated;
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteCategory = async (id) => {
        setError(null);
        setLoading(true);
        try {
            await remove(id);
            setCategories((prev) => prev.filter((c) => c.id !== id));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        categories,
        loading,
        error,
        getCategories,
        createCategory,
        updateCategory,
        deleteCategory,
    };
}