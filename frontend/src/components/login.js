import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './Layout';
import { Form, Input, Button, Alert } from 'antd';
import './Layout.css';
import { useNavigate } from 'react-router-dom';

/**
 * Componente Login.
 * Permite a los usuarios iniciar sesión y redirige a diferentes dashboards según su rol.
 */
const Login = () => {
    const [error, setError] = useState(''); // Usa useState para manejar el estado del error
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

    // Evita que usuarios autenticados entren a /login
    useEffect(() => {
        const token = localStorage.getItem('token');
        const user_type = localStorage.getItem('role');
        if (token && user_type) {
            navigate(user_type === 'admin' ? '/admin-dashboard' : '/user-dashboard');
        }
    }, [navigate]);

    /**
     * Maneja el envío del formulario usando Ant Design.
     * Realiza una solicitud POST al backend para autenticar al usuario.
     * @param {Object} values - Datos del formulario (username y password).
     */
    const onFinish = async (values) => {
        setError('');
        try {
            const response = await axios.post(`${API_URL}/api/login/`, values);

            // Valida la respuesta del backend
            if (!response.data || !response.data.token || !response.data.user_id || !response.data.user_type) {
                throw new Error('Respuesta inválida del servidor.');
            }

            const { user_type, token, user_id } = response.data;

            // Limpia datos previos en localStorage
            localStorage.removeItem('role');
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');

            // Guarda sesión en localStorage
            localStorage.setItem('role', user_type);
            localStorage.setItem('token', token);
            localStorage.setItem('user_id', user_id);

            // Redirige según el tipo de usuario
            navigate(user_type === 'admin' ? '/admin-dashboard' : '/user-dashboard');
        } catch (error) {
            setError(error.response?.data?.error || 'Error de inicio de sesión. Inténtalo de nuevo.');
        }
    };

    return (
        <Layout showLogout={false}>
            <div style={{ maxWidth: 400, margin: '50px auto', padding: '20px', background: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Login</h2>
                {error && <Alert message={error} type="error" style={{ marginBottom: '15px' }} />}
                <Form onFinish={onFinish} layout="vertical">
                    <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Por favor, ingresa tu nombre de usuario.' }]}>
                        <Input placeholder="Username" />
                    </Form.Item>
                    <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Por favor, ingresa tu contraseña.' }]}>
                        <Input.Password placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Iniciar Sesión
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Layout>
    );
};

export default Login;