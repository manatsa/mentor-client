import React from 'react';
import useAuth from '../auth/useAuth';


const Login = () => {

    //const AuthProvider = React.createContext();
    const { onLogin } = useAuth();
    return (
        <div align="center">
            <button type="button" onClick={onLogin}>Login </button>
        </div>
    )
}

export default Login;
