import React from "react";
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './context/AuthContext.jsx';
import RoleContextProvider from "./context/RoleContext.jsx";
import App from './App.jsx';

import "./styles/variables.css";
import "./styles/globals.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RoleContextProvider>
      <App />
    </RoleContextProvider>
  </AuthProvider>
);