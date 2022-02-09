import React from 'react';
import GeneralContext from './general-context ';



const GeneralContextProvider = ({ children }) => {

    const [roles, setRoles] = React.useState([]);
    /*const [toastTitle, setToastTitle] = React.useState(null);
    const [toastMessage, setToastMessage] = React.useState(null);
    const [toastMsgType, setToastMessageType] = React.useState(null); */

    /* const handleCloseToast = () => {
        setShowToast(false)
    } */

    const value = {
        roles, setRoles
        /*  showToast, toastTitle, toastMessage, toastMsgType,
         setShowToast, handleCloseToast: handleCloseToast, setToastTitle, setToastMessage, setToastMessageType */
    };

    return (
        <GeneralContext.Provider value={value}>
            {children}
        </GeneralContext.Provider>
    );
};

export default GeneralContextProvider;