/**
 * LogoutButton.js
 * Componente para cerrar la sesión del usuario.
 * Realiza una solicitud al backend para registrar el logout,
 * limpia los datos almacenados localmente y redirige al usuario a la página de inicio de sesión.
 */

import React from 'react';
import { Button } from 'antd'; // Botón de Ant Design
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogoutOutlined } from '@ant-design/icons';

const LogoutButton = () => {
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

    /**
     * Maneja el cierre de sesión.
     * Realiza una solicitud POST al backend para registrar el logout,
     * limpia los datos almacenados localmente y redirige al usuario a la página de inicio de sesión.
     */
    const handleLogout = async () => {
        try {
            const userId = localStorage.getItem('user_id'); // Se obtiene el id del user logeado
            const response = await axios.post(`${API_URL}/api/logout/`, { user_id: userId }, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`,
                }
            });
            console.log(response.data.message); // Mensaje de éxito
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Error desconocido al cerrar sesión.';
            console.error("Error en el logout:", errorMessage);
        } finally {
            // Limpia los datos almacenados localmente
            localStorage.removeItem("token");
            localStorage.removeItem("user_id");
            localStorage.removeItem("role");
            // Redirige al usuario a la página de inicio de sesión
            navigate('/login');
        }
    };

    return (
        <Button type="primary" danger size="large" icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
        </Button>
    );
};

export default LogoutButton;