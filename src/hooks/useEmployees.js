import { useState } from "react";
import { getEmployees, deleteEmployee, updateEmployee } from "../services/employeeService";

export default function useEmployees() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchEmployees = async () => {
        setLoading(true);
        const data = await getEmployees();
        setEmployees(data);
        setLoading(false);
    };

    const removeEmployee = async (id) => {
        await deleteEmployee(id);
        setEmployees(prev => prev.filter(e => e.id !== id));
    };

    const editEmployee = async (id, data) => {
        await updateEmployee(id, data);
        fetchEmployees();
    };

    return {
        employees,
        loading,
        fetchEmployees,
        removeEmployee,
        editEmployee
    };
}