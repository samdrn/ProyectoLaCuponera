import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MyCoupons from "../pages/MyCoupons";
import Profile from "../pages/Profile";
import About from "../pages/About";

// Importa tus nuevas páginas de Empleado (Adrián)
import EmployeeDashboard from "../pages/EmployeeDashboard";
import RedeemCoupon from "../pages/RedeemCoupon";

// Componentes de Layout y Seguridad
import Navbar from "../components/Navbar";
import ProtectedRoute from "../components/ProtectedRoute";
import EmployeeRoute from "./EmployeeRoute";
// Nota: Importar AdminRoute y CompanyRoute cuando tus compañeros entreguen sus páginas

export default function AppRouter() {
    return (
        <BrowserRouter>
            {/* 🚀 El Navbar se pone AQUÍ una sola vez para TODO el sitio */}
            

            <Routes>
                {/* 🌏 Rutas Públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<About />} />

                {/* 👤 Rutas de Cliente (Logueado) */}
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                } />
                <Route path="/coupons" element={
                    <ProtectedRoute>
                        <MyCoupons />
                    </ProtectedRoute>
                } />

                {/* 🎫 RUTAS DE ADRIÁN (Empleado - Canje) */}
                {/* 
                    Usamos EmployeeRoute para que el sistema verifique en Firestore 
                    si el usuario logueado tiene el rol de "employee".
                */}
                <Route path="/employee" element={
                    <ProtectedRoute>
                        <EmployeeRoute>
                            <EmployeeDashboard />
                        </EmployeeRoute>
                    </ProtectedRoute>
                } />

                <Route path="/redeem" element={
                    <ProtectedRoute>
                        <EmployeeRoute>
                            <RedeemCoupon />
                        </EmployeeRoute>
                    </ProtectedRoute>
                } />

                {/* 🚧 Espacio para Rutas de Administración y Empresas (Pendientes) */}
                {/* <Route path="/admin" element={<AdminRoute>...</AdminRoute>} /> */}
                {/* <Route path="/company" element={<CompanyRoute>...</CompanyRoute>} /> */}

            </Routes>
        </BrowserRouter>
    );
}