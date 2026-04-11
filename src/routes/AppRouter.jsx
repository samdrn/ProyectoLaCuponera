import { BrowserRouter, Routes, Route } from "react-router-dom";

// 🌏 Públicas
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import About from "../pages/About";

// 👤 Cliente
import MyCoupons from "../pages/MyCoupons";
import Profile from "../pages/Profile";

// 🏢 Empresa
import CompanyDashboard from "../pages/CompanyDashboard";
import CreateOffer from "../pages/CreateOffer";
import ManageOffers from "../pages/ManageOffers";

// 👨‍💼 Admin
import AdminDashboard from "../pages/AdminDashboard";
import ManageClients from "../pages/ManageClients";
import ManageCompanies from "../pages/ManageCompanies";
import ManageCategories from "../pages/ManageCategories";
import AdminOffers from "../pages/AdminOffers";
import ManageEmployees from "../pages/ManageEmployees";
import CreateOfferAdmin from "../pages/CreateOfferAdmin";
import AdminCompaniesOffers from "../pages/AdminCompaniesOffers";

// 🎫 Empleado
import EmployeeDashboard from "../pages/EmployeeDashboard";
import RedeemCoupon from "../pages/RedeemCoupon";

// 🔐 Seguridad
import ProtectedRoute from "../components/ProtectedRoute";
import AdminRoute from "./AdminRoute";
import CompanyRoute from "./CompanyRoute";
import EmployeeRoute from "./EmployeeRoute";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>

                {/* 🌏 RUTAS PÚBLICAS */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<About />} />

                {/* 👤 CLIENTE */}
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

                {/* 🎫 EMPLEADO */}
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

                {/* 🏢 EMPRESA */}
                <Route path="/company" element={
                    <ProtectedRoute>
                        <CompanyRoute>
                            <CompanyDashboard />
                        </CompanyRoute>
                    </ProtectedRoute>
                } />

                <Route path="/company/create-offer" element={
                    <ProtectedRoute>
                        <CompanyRoute>
                            <CreateOffer />
                        </CompanyRoute>
                    </ProtectedRoute>
                } />

                <Route path="/company/manage-offers" element={
                    <ProtectedRoute>
                        <CompanyRoute>
                            <ManageOffers />
                        </CompanyRoute>
                    </ProtectedRoute>
                } />

                {/* 👨‍💼 ADMIN */}
                <Route path="/admin_dashboard" element={
                    <ProtectedRoute>
                        <AdminRoute>
                            <AdminDashboard />
                        </AdminRoute>
                    </ProtectedRoute>
                } />

                <Route path="/admin/create-offer" element={
                    <ProtectedRoute>
                        <AdminRoute>
                            <CreateOfferAdmin />
                        </AdminRoute>
                    </ProtectedRoute>
                } />

                <Route path="/admin/offers" element={
                    <ProtectedRoute>
                        <AdminRoute>
                            <AdminOffers />
                        </AdminRoute>
                    </ProtectedRoute>
                } />

                <Route path="/admin/clients" element={
                    <ProtectedRoute>
                        <AdminRoute>
                            <ManageClients />
                        </AdminRoute>
                    </ProtectedRoute>
                } />

                <Route path="/admin/companies" element={
                    <ProtectedRoute>
                        <AdminRoute>
                            <ManageCompanies />
                        </AdminRoute>
                    </ProtectedRoute>
                } />

                <Route path="/admin/categories" element={
                    <ProtectedRoute>
                        <AdminRoute>
                            <ManageCategories />
                        </AdminRoute>
                    </ProtectedRoute>
                } />

                <Route path="/admin/employees" element={
                    <ProtectedRoute>
                        <AdminRoute>
                            <ManageEmployees />
                        </AdminRoute>
                    </ProtectedRoute>
                } />

                <Route path="/admin/companies-offers" element={
                    <ProtectedRoute>
                        <AdminRoute>
                            <AdminCompaniesOffers />
                        </AdminRoute>
                    </ProtectedRoute>
                } />

            </Routes>
        </BrowserRouter>
    );
}