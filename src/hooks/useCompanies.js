import { useState } from "react";
import { create, getAll, getById, remove, update } from "../services/companiesService";
import { generateCompanyCode } from "../utils/generateCompanyCode";


export default function useCompanies(){


    const [companies, setCompanies] = useState([]);
    const [company, setCompany] = useState(null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createCompany = async (data) => {
        setError(null);
        setLoading(true);

        try{
            const code = generateCompanyCode();

            data["code"] = code

            const created = await create(data);

            setCompanies((prev) => [...prev, created]);
        }

        catch(err){
            setError(err.message);
        }

        finally{
            setLoading(false);
        }

    };

    const getCompanies = async () => {
        setError(null)
        setLoading(true);

        try{
        const data = await getAll()

        setCompanies(data);
        }

        catch(err){
            setError(err.message);
        }

        finally{
            setLoading(false);
        }

    };

    const getCompanyById = async (id) => {

        setError(null);
        setLoading(true);

        try{
            const data = await getById(id);
            setCompany(data);
        }

        catch(err){
            setError(err.message);
        }

        finally{
            setLoading(false);
        }
        
    };

    const updateCompany = async (id, data) => {

        setError(null);
        setLoading(true);

        try{
            await update(id, data);
            
            setCompanies((prev) =>
                prev.map((c) =>
                    c.id === id ? { ...c, ...data } : c
        ));
        }

        catch(err){
            setError(err.message);
        }

        finally{
            setLoading(false);
        }
    };

    const deleteCompany = async (id) => {
        setLoading(true);
        setError(null);

        try{
            await remove(id);

            setCompanies((prev) => prev.filter(c => c.id !== id));
        }

        catch(err){
            setError(err.message);
        }

        finally{
            setLoading(false);
        }
    };

    return {
    companies,
    company,
    loading,
    error,
    getCompanies,
    getCompanyById,
    createCompany,
    updateCompany,
    deleteCompany,
  };
}