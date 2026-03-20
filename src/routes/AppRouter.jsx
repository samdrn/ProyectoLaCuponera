import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MyCoupons from "../pages/MyCoupons";
import Profile from "../pages/Profile";
import About from "../pages/About";

import Navbar from "../components/Navbar";
//aun quedas paginas de agregar, pero se hace hasta que los demás hayan terminado


import ProtectedRoute from "../components/ProtectedRoute";
import AdminRoute from "./AdminRoute";
import CompanyRoute from "./CompanyRoute";
import EmployeeRoute from "./EmployeeRoute";

export default function AppRouter() {
    return (
        <BrowserRouter>
        
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />

            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/coupons" element={<ProtectedRoute><MyCoupons/></ProtectedRoute>} />

        </Routes>
        </BrowserRouter>
    );
}