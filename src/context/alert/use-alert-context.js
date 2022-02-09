import React from "react";
import AlertContext from "./alert-context ";

const useAlertContext = () => {
    return React.useContext(AlertContext);
};


export default useAlertContext;