import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from './context/AuthContext.jsx'
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </AuthProvider>
)
