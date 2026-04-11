import React from 'react'

export const AdminHeader = () => {
  return (
    <header className="site-header">
    <div className="container header-inner">
        <div className="logo" onClick={() => navigate("/admin_dashboard")} style={{cursor: 'pointer'}}>
            La<span>Cuponera</span>
        </div>
        <button className="log-out-button">Finalizar Sesión</button>
    </div>
    </header>
  )
}
