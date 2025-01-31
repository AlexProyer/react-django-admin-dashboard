import React, { useState } from 'react';
import axios from 'axios';
import logo from '../logo.svg';
import Layout from './Layout';
import { Button, Card, Alert, Row, Col } from 'antd'; // Componentes de Ant Design
import { useNavigate } from 'react-router-dom';
import './Layout.css'; // Asegúrate de mantener tus estilos globales
/**
 * Componente UserDashboard.
 * Muestra una interfaz para que los usuarios interactúen con dos botones y vean sus clics registrados.
 */
const UserDashboard = () => {
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);
    const [error, setError] = useState(null);
    const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';
    const userId = localStorage.getItem('user_id');
    const navigate = useNavigate();

    const goToAdminDashboard = () => {
        navigate('/admin-dashboard');
    };

    /**
     * Maneja el clic en un botón.
     * Incrementa el contador correspondiente y registra el clic en la API.
     * @param {number} buttonNumber - Número del botón presionado (1 o 2).
     */
    const handleButtonClick = async (buttonNumber) => {
        // Incrementar el contador según el botón presionado
        if (buttonNumber === 1) {
            setCount1(count1 + 1);
        } else {
            setCount2(count2 + 1);
        }

        // Registrar el clic en la API
        try {
            await axios.post(`${API_URL}/api/clicks/`, {
                button_number: buttonNumber,
                user: userId,
            });
        } catch (error) {
            console.error("Error al registrar el clic:", error);
            setError("Hubo un problema al registrar tu clic. Por favor, intenta más tarde.");
        }
    };

    return (
        <Layout>
            <div style={{ padding: '20px' }}>
                {/* Encabezado con logo y descripción */}
                <Row justify="center" align="middle" style={{ marginBottom: '20px' }}>
                    <Col span={6}>
                        <img src={logo} alt="Logo" style={{ width: '100%' }} />
                    </Col>
                    <Col span={18}>
                        <Card title="Consola de Administración" style={{ width: '100%' }}>
                            <h2>Prueba técnica</h2>
                            <p>
                                La Consola de Administración es una herramienta diseñada para gestionar y monitorear la actividad de usuarios en una plataforma web.
                                Permite a los administradores visualizar el tiempo de las sesiones, analizar interacciones con botones específicos y acceder a datos detallados
                                sobre el comportamiento de los usuarios. Los usuarios regulares pueden interactuar con la aplicación mediante botones personalizados,
                                mientras que los administradores tienen acceso a gráficos y estadísticas avanzadas para tomar decisiones informadas.
                            </p>
                        </Card>
                    </Col>
                </Row>

                {/* Botones de interacción */}
                <Row justify="center" gutter={[16, 16]} style={{ marginTop: '20px' }}>
                    <Col>
                        <Button type="primary" onClick={() => handleButtonClick(1)}>
                            Botón 1
                        </Button>
                    </Col>
                    <Col>
                        <Button type="primary" onClick={() => handleButtonClick(2)}>
                            Botón 2
                        </Button>
                    </Col>
                </Row>

                {/* Contadores */}
                <Row justify="center" style={{ marginTop: '20px' }}>
                    <Col>
                        <Card>
                            <p>Contador Botón 1: {count1}</p>
                            <p>Contador Botón 2: {count2}</p>
                        </Card>
                    </Col>
                </Row>

                {/* Mensaje de error */}
                {error && (
                    <Row justify="center" style={{ marginTop: '20px' }}>
                        <Col>
                            <Alert message={error} type="error" showIcon />
                        </Col>
                    </Row>
                )}

                {/* Botón para ir al Admin Dashboard */}
                <Row justify="center" style={{ marginTop: '20px' }}>
                    <Col>
                        <Button type="default" onClick={goToAdminDashboard}>
                            Ir al Admin Dashboard
                        </Button>
                    </Col>
                </Row>
            </div>
        </Layout>
    );
};

export default UserDashboard;