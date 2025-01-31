import React from 'react';
import { Navigate } from 'react-router-dom';
/**
 * Componente para proteger rutas según el rol del usuario.
 * - children: El componente que se renderizará si el usuario está autorizado.
 * - requiredRole: El rol requerido para acceder a la ruta (puede ser un string o un array).
 */

const ProtectedRoute = ({ children, requiredRole }) => {
    const userRole = localStorage.getItem('role'); // Asumiendo que el rol del usuario está almacenado en localStorage
        // Redirige al login si el usuario no ha iniciado sesión
    if (!userRole) {
        return <Navigate to="/login" />;
    }

    // Verifica si el usuario tiene el rol requerido
    const isAuthorized = (userRole === requiredRole || userRole === 'admin');

    return isAuthorized ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
