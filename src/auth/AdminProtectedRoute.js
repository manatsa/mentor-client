import React from 'react';
import {
    Navigate,
    useLocation
} from 'react-router-dom';
import useAuth from './useAuth';


const AdminProtectedRoute = ({ children }) => {
   // const { user, } = useAuth();

    const login=localStorage.getItem('user');
    const user = JSON.parse(login);

    //console.log("Authorities: ",typeof  user?.authorities)
    if (user?.token && user?.authorities.includes('ROLE_ADMIN') ) {
        //console.log('Has ROLE_ADMIN')
        return children;
    }

    return <Navigate to="/login" />;
};

export default AdminProtectedRoute;