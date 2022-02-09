import React from 'react';
import {
    Navigate,
    useLocation
} from 'react-router-dom';
import useAuth from './useAuth';


const TeacherProtectedRoute = ({ children }) => {
    //const { user, isAdmin, isTeacher, isStudent } = useAuth();
    const login=localStorage.getItem('user');
    const user = JSON.parse(login);
    const auths = user?.authorities;//.map(a => a.name);

    console.log('TEACHER ROUTES:',auths.includes('ROLE_ADMIN'))


    if (user?.token && (auths.includes('ROLE_ADMIN') || auths.includes('ROLE_TEACHER') || auths.includes('ROLE_HEAD'))) {
        return children;
    }

    return <Navigate to="/login" />;
};

export default TeacherProtectedRoute;