import useAuth from "../hooks/useAuth";
import Footer from "../components/Footer";

import React from 'react'

export default function AdminDashboard() {

    const user = useAuth()
  return (
    <>
    <header className="site-header">
    <div className="container header-inner">
        <div className="logo" onClick={() => navigate("/")} style={{cursor: 'pointer'}}>
            La<span>Cuponera</span>
        </div>
        <button className="log-out-button">Finalizar Sesión</button>
    </div>
    </header>
    <h1>Bienvenido {user.names}</h1>
    <div className="dashboard-link-container">

        <div className="dashboard-link" onClick={() =>navigate('/empresas')}>
            <img src={`/assets/empresas.svg`} alt="icono de empresas" className="dashboard-link-image"/>
            <h3>Empresas</h3>
        </div>


        <div className="dashboard-link" onClick={() =>navigate('/categorias')}>
            <img src={`/assets/categorias.svg`} alt="icono de categorias" className="dashboard-link-image"/>
            <h3>Categorías</h3>
        </div>


        <div className="dashboard-link" onClick={() =>navigate('/ofertas')}>
            <img src={`/assets/ofertas.svg`} alt="icono de ofertas" className="dashboard-link-image"/>
            <h3>Ofertas</h3>
        </div>


        <div className="dashboard-link" onClick={() =>navigate('/empleados')}>
            <img src={`/assets/empleados.svg`} alt="icono de empleados" className="dashboard-link-image"/>
            <h3>Empleados</h3>
        </div>


        <div className="dashboard-link" onClick={() =>navigate('/clientes')}>
            <img src={`/assets/clientes.svg`} alt="icono de clientes" className="dashboard-link-image"/>
            <h3>Clientes</h3>
        </div>

    </div>
    <Footer/>
    </>
    )
}
