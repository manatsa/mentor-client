import React from 'react';
import AlertContext from './alert-context ';



const AlertContextProvider = ({ children }) => {

    const [showAlert, setShowAlert] = React.useState(null);
    const [alertTitle, setAlertTitle] = React.useState(null);
    const [alertMessage, setAlertMessage] = React.useState(null);
    const [alertMsgType, setAlertMessageType] = React.useState(null);

    const handleCloseAlert = () => {
        setShowAlert(false)
    }

    const value = {
        showAlert, alertTitle, alertMessage, alertMsgType,
        setShowAlert, handleCloseAlert, setAlertTitle, setAlertMessage, setAlertMessageType
    };

    return (
        <AlertContext.Provider value={value}>
            {children}
        </AlertContext.Provider>
    );
};

export default AlertContextProvider;