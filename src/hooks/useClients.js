import { useState } from "react";
import { getAll, getById } from "../services/clientsService";


export default function useclients(){

    const [clients, setclients] = useState([]);
    const [Client, setClient] = useState(null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const getclients = async () => {
        setError(null)
        setLoading(true);

        try{
        const data = await getAll()

        setclients(data);
        }

        catch(err){
            setError(err.message);
        }

        finally{
            setLoading(false);
        }

    };

    const getClientById = async (id) => {

        setError(null);
        setLoading(true);

        try{
            const data = await getById(id);
            setClient(data);
        }

        catch(err){
            setError(err.message);
        }

        finally{
            setLoading(false);
        }
        
    };

    return {
    clients,
    Client,
    loading,
    error,
    getclients,
    getClientById,
  };
}