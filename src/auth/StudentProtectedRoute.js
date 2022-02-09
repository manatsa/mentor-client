import React from 'react';
import {
    Navigate,
    useLocation
} from 'react-router-dom';
import useAuth from './useAuth';


const StudentProtectedRoute = ({ children }) => {
    //const { user } = useAuth();
    const login=localStorage.getItem('user');
    const user = JSON.parse(login);

    let auths = user?.authorities;//.map(a => a.name);


    if (user?.token && (auths.includes('ROLE_ADMIN') || auths.includes('ROLE_TEACHER') || auths.includes('ROLE_STUDENT') || auths.includes('ROLE_HEAD'))) {
        return children;
    }

    return <Navigate to="/login" />;
};

export default StudentProtectedRoute;