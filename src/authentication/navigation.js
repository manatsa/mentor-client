import React from 'react'
import { NavLink, } from 'react-router-dom';
import useAuth from '../auth/useAuth';

const Navigation = () => {
    const { onLogout, user } = useAuth();

    return (
        <nav>
            <NavLink to="/home">Home</NavLink>&nbsp; &nbsp;
            <NavLink to="/dashboard">Dashboard</NavLink> &nbsp; &nbsp;
            <NavLink to="/admin">Admin</NavLink>&nbsp; &nbsp;

            {user?.token && (
                <button type="button" onClick={onLogout}>
                    Sign Out
                </button>
            )}
        </nav>

    );
};

export default Navigation;