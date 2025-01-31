import React from 'react';
import { Layout as AntLayout, Button } from 'antd'; // Componentes de Ant Design
import LogoutButton from './LogoutButton'; // Botón de logout

const { Header, Content } = AntLayout;

/**
 * Componente Layout.
 * Proporciona una estructura común para todas las páginas, incluyendo un encabezado y un botón de logout opcional.
 */
const Layout = ({ children, showLogout = true }) => {
    return (
        <AntLayout style={{ minHeight: '100vh' }}>
            {/* Encabezado común */}
            <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
                <h1 style={{ color: '#fff', margin: 0 }}>Consola de Administración</h1>
                {showLogout && <LogoutButton />}
            </Header>

            {/* Contenido de la página */}
            <Content style={{ padding: '20px' }}>{children}</Content>
        </AntLayout>
    );
};

export default Layout;