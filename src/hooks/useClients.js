import { useState } from "react";
import { getAll, getById } from "../services/clientService";

export default function useClients() {
    const [clients, setClients] = useState([]);
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getClients = async () => {
        setError(null);
        setLoading(true);
        try {
            const data = await getAll();
            setClients(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getClientById = async (id) => {
        setError(null);
        setLoading(true);
        try {
            const data = await getById(id);
            setClient(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        clients,
        client,
        loading,
        error,
        getClients,
        getClientById,
    };
}