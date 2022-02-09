import React from 'react'
import useAuth from '../auth/useAuth';

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div>
            <h2>Dashboard (Protected)</h2>

            <div>Authenticated as {user?.name}</div>
        </div>
    );
};

export default Dashboard;