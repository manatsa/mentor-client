import React from "react";
import ToastContext from "./toast-context ";

const useToastContext = () => {
    return React.useContext(ToastContext);
};


export default useToastContext;