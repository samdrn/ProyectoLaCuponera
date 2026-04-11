import { useState } from "react";
import {
    getAll,
    getById,
    updateClient,
    deleteClient
} from "../services/clientService";

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

    // UPDATE
    const updateClientData = async (id, data) => {
        await updateClient(id, data);

        setClients(prev =>
            prev.map(c =>
                c.id === id ? { ...c, ...data } : c
            )
        );
    };

    // DELETE
    const deleteClientData = async (id) => {
        await deleteClient(id);

        setClients(prev =>
            prev.filter(c => c.id !== id)
        );
    };

    return {
        clients,
        client,
        loading,
        error,
        getClients,
        getClientById,
        updateClientData,
        deleteClientData
    };
}