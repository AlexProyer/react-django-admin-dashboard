/**
 * AuthContext.js
 * Contexto de autenticación para manejar el estado global de inicio de sesión.
 */

import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

// Crea el contexto de autenticación
const AuthContext = createContext();

/**
 * Proveedor de autenticación.
 * Envuelve a los componentes hijos y proporciona el estado de autenticación y funciones relacionadas.
 */
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

    /**
     * Inicia sesión con las credenciales proporcionadas.
     * @param {Object} credentials - Credenciales del usuario (username y password).
     */
    const login = async (credentials) => {
        const response = await axios.post(`${API_URL}/api/login`, credentials);
        setUser(response.data.user); // Asigna el usuario a `user`
    };

    /**
     * Cierra la sesión del usuario.
     */
    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
