import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
// Importa los componentes principales
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import Login from './components/login';
import ProtectedRoute from './components/ProtectedRoute';

/**
 * Componente principal de la aplicación.
 * Define las rutas y protege las vistas según el rol del usuario.
 */
function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Ruta pública para el inicio de sesión */}
                    <Route path="/login" element={<Login />} />
                    {/* Rutas protegidas según el rol del usuario */}
                    <Route path="/admin-dashboard" element={
                        <ProtectedRoute requiredRole="admin">
                            <AdminDashboard />
                        </ProtectedRoute>
                    }/>

                    <Route path="/user-dashboard" element={
                        <ProtectedRoute requiredRole='user'>
                            <UserDashboard />
                        </ProtectedRoute>
                    }/>
                    {/* Redirige a la página de inicio de sesión por defecto */}
                    <Route path="/" element={<Login />} /> 
                </Routes>
            </div>
        </Router>
    );
}

export default App;
