import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Administration from '../components/admins/administration';
import TeacherAdmin from '../components/admins/teacherAdmin';
import StudentAdmin from '../components/admins/studentAdmin';
import useAuth from './useAuth';


const ProtectedRoute = ({ children }) => {
    //const { user, isAdmin, isTeacher, isStudent } = useAuth();

    const login=localStorage.getItem('user');
    const user = JSON.parse(login);

    if (!user?.token) {
        return <Navigate to="/login" />;
    }

    return children
};

export default ProtectedRoute;