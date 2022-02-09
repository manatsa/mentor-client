import React from 'react';
import LoginContext from './login-context ';


const LoginContextProvider = ({ children }) => {

    const [showLoginWait, setShowLoginWait] = React.useState(false);
    const [showLoginError, setShowLoginError] = React.useState(false);


    const value = {
        showLoginWait, showLoginError, setShowLoginError, setShowLoginWait
    };

    return (
        <LoginContext.Provider value={value}>
            {children}
        </LoginContext.Provider>
    );
};

export default LoginContextProvider;