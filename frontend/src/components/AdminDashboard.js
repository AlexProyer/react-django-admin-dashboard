import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import Layout from './Layout';
import {
  Button,
  Table,
  Card,
  Row,
  Col,
  Alert,
} from 'antd'; // Componentes de Ant Design
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

/**
 * Función para formatear la duración de una sesión.
 * @param {string} durationStr - Duración en formato "HH:mm:ss.SSS".
 * @returns {string} - Duración formateada en minutos o segundos.
 */
const parseDuration = (durationStr) => {
  const regex = /(?:(\d+):)?(\d+):(\d+)\.(\d+)/;
  const match = durationStr.match(regex);
  if (!match) return "N/A";
  const hours = parseInt(match[1] || 0, 10);
  const minutes = parseInt(match[2], 10);
  const seconds = parseInt(match[3], 10);

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  if (totalSeconds >= 60) {
    return `${Math.floor(totalSeconds / 60)} min`;
  } else {
    return `${totalSeconds} sec`;
  }
};

/**
 * Componente AdminDashboard.
 * Muestra una lista de usuarios con sus sesiones y clics en botones, junto con un gráfico de barras.
 */
const AdminDashboard = () => {
  const [usersData, setUsersData] = useState([]);
  const [error, setError] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';
  const navigate = useNavigate();

  const goToUserDashboard = () => {
    navigate('/user-dashboard');
  };

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/sessions/`);
        const buttonClicksResponse = await axios.get(`${API_URL}/api/clicks/`);
        const buttonClicksData = buttonClicksResponse.data;

        // Filtrar las sesiones para obtener solo la más reciente por usuario
        const latestSessions = response.data.reduce((acc, userSession) => {
          if (
            !acc[userSession.user] ||
            new Date(userSession.login_time) > new Date(acc[userSession.user].login_time)
          ) {
            acc[userSession.user] = userSession;
          }
          return acc;
        }, {});

        // Formatea los datos con solo las últimas sesiones
        const formattedData = Object.values(latestSessions).map(userSession => {
          const userClicks = buttonClicksData.filter(click => click.user === userSession.user);
          return {
            key: userSession.user, // Clave única para cada fila
            name: userSession.username,
            loginTime: userSession.login_time,
            sessionDuration: userSession.duration,
            button1Clicks: userClicks.filter(click => click.button_number === 1).length,
            button2Clicks: userClicks.filter(click => click.button_number === 2).length,
          };
        });

        setUsersData(formattedData);
      } catch (error) {
        console.error('Error al obtener los datos de usuarios:', error);
        setError('Hubo un problema al cargar los datos. Por favor, intenta más tarde.');
      }
    };

    fetchUsersData();
  }, []);

  // Datos para el gráfico de barras
  const chartData = {
    labels: usersData.map(user => user.name),
    datasets: [
      {
        label: 'Clics en Botón 1',
        data: usersData.map(user => user.button1Clicks),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Clics en Botón 2',
        data: usersData.map(user => user.button2Clicks),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  // Opciones del gráfico
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Clics en los botones por usuario',
      },
    },
  };

  // Columnas de la tabla
  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Inicio de sesión',
      dataIndex: 'loginTime',
      key: 'loginTime',
    },
    {
      title: 'Tiempo',
      dataIndex: 'sessionDuration',
      key: 'sessionDuration',
      render: (duration) => (duration ? parseDuration(duration) : 'N/A'),
    },
    {
      title: 'Botón 1',
      dataIndex: 'button1Clicks',
      key: 'button1Clicks',
    },
    {
      title: 'Botón 2',
      dataIndex: 'button2Clicks',
      key: 'button2Clicks',
    },
  ];

  return (
    <Layout>
      <div style={{ padding: '20px' }}>
        {/* Encabezado */}
        <Row justify="space-between" align="middle" style={{ marginBottom: '20px' }}>
          <Col>
            <h1>Admin Dashboard</h1>
          </Col>
          <Col>
            <Button type="primary" size="large" onClick={goToUserDashboard}>
              Ir al User Dashboard
            </Button>
          </Col>
        </Row>

        {/* Tabla de usuarios */}
        <Card title="Lista de Usuarios" style={{ marginBottom: '20px' }}>
          <Table dataSource={usersData} columns={columns} pagination={false} />
        </Card>

        {/* Gráficos de actividad */}
        <Card title="Gráficos de Actividad">
          <Row justify="center">
            <Col span={20}>
              <Bar data={chartData} options={chartOptions} />
            </Col>
          </Row>
        </Card>

        {/* Mensaje de error */}
        {error && (
          <Alert message={error} type="error" showIcon style={{ marginTop: '20px' }} />
        )}
      </div>
    </Layout>
  );
};

export default AdminDashboard;