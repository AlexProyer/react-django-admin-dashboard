/**
 * Punto de entrada de la aplicación React.
 * Renderiza el componente principal (App) y configura herramientas para medir el rendimiento.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Importa estilos globales
import App from './App';
import { ConfigProvider } from 'antd'; // Componente para configurar el tema global
import reportWebVitals from './reportWebVitals';

// Crea el nodo raíz de la aplicación
const root = ReactDOM.createRoot(document.getElementById('root'));

// Configuración del tema global de Ant Design
const themeConfig = {
  token: {
    colorPrimary: '#007bff', // Cambia el color primario
    borderRadius: 4, // Ajusta el radio de borde predeterminado
    fontSize: 16, // Tamaño de fuente base
  },
};

// Renderiza la aplicación dentro de React.StrictMode y ConfigProvider
root.render(
  <React.StrictMode>
    <ConfigProvider theme={themeConfig}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);

// reportWebVitals se utiliza para medir el rendimiento de la aplicación.
// Puedes pasar una función (por ejemplo, console.log) para registrar los resultados,
// o enviarlos a un endpoint de análisis para monitorear el rendimiento en producción.
reportWebVitals();