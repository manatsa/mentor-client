import React from "react";
import LoginContext from './login-context ';

const useLoginContext = () => {
    return React.useContext(LoginContext);
};


export default useLoginContext;