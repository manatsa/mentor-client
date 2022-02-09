import React from 'react';
import ToastContext from './toast-context ';



const ToastContextProvider = ({ children }) => {

    const [showToast, setShowToast] = React.useState(null);
    const [toastTitle, setToastTitle] = React.useState(null);
    const [toastMessage, setToastMessage] = React.useState(null);
    const [toastMsgType, setToastMessageType] = React.useState(null);

    const handleCloseToast = () => {
        setShowToast(false)
    }

    const value = {
        showToast, toastTitle, toastMessage, toastMsgType,
        setShowToast, handleCloseToast: handleCloseToast, setToastTitle, setToastMessage, setToastMessageType
    };

    return (
        <ToastContext.Provider value={value}>
            {children}
        </ToastContext.Provider>
    );
};

export default ToastContextProvider;