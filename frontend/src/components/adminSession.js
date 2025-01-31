import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const AdminSession = () => {
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/sessions/');
                setSessions(response.data); // Asegúrate de que esto sea el array correcto
            } catch (error) {
                console.error('Error fetching the sessions:', error);
            }
        };

        fetchSessions();
    }, []);

    return (
        <div>
            <h1>User Sessions</h1>
            <ul>
                {sessions.map(session => (
                    <li key={session.id}>
                        User: {session.user}, Login Time: {session.login_time}, Duration: {session.duration}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminSession;
