import React from 'react';
import AuthContext from './auth-context';
import { useNavigate, useLocation } from 'react-router-dom';
import useLoginContext from '../context/login/use-login-context';
import { toast, Zoom } from 'react-toastify';




/* const fakeAuth = (u) =>
    new Promise((resolve) => {
        setTimeout(() => resolve({ name: 'Manatsa Chinyeruse', token: '2342f2f1d131rf12', level: 'admin' }), 1000);
    }); */

/* const login = (user) => {
    return fetch('/authenticate', {
        //return fetch('https://localhost:8443/mentor/user/loginUser', {
        // return fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(data => data.json()).then(data => alert(JSON.stringify(data)))

} */





const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = React.useState(null);
    const { setShowLoginWait, setShowLoginError, showLoginError } = useLoginContext();


    const login = async (user) => {
        return fetch('authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        }).then(data => data.json())
            .catch(e=>{setShowLoginError(true)})

    }


    const handleLogin = async (u) => {
        //console.log("USER BEFORE", u);
        const user = await login(u);
        //console.log(JSON.stringify(user.authorities));
        if (JSON.stringify(user)?.includes('401') || (JSON.stringify(user)?.includes('500')) || !user?.token) {
            setShowLoginError(true)
        }

        setShowLoginWait(false)
        if (!showLoginError) {
            setUser(user);
            //alert(user.activationKey);
            toast(showLoginError && !user.token ? 'There was an error, login was not successful!' : 'You are  logged in as : ' + user?.login, {
                position: 'top-center',
                transition: Zoom,
                type: showLoginError && user ? 'error' : 'success',
                autoClose: 1500,
                toastId: 'loginToast',
                style: { border: '3px solid green' }
            })
            localStorage.setItem('user',JSON.stringify(user))
            const origin = location.state?.from?.pathname || '/home';
            navigate(origin);

        } else {
            navigate("/login")
        }

    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        navigate("/login")
    };

    const value = {
        user,
        setUser,
        onLogin: handleLogin,
        onLogout: handleLogout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;