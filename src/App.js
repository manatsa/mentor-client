import React from 'react'
import Footer from './utils/footer';
import AuthProvider from './auth/authProvider';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
import Supernav from "./utils/supernav";
import DateFnsUtils from '@date-io/date-fns';
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdminRoutes from "./router/admin-routes";
import CommonRoutes from "./router/common-routes";
import TeachersRoutes from "./router/teachers-routes";
import StudentRoutes from "./router/student-routes";


const App = (props) => {


    return (
        <div className="container-fluid-more">
            <AuthProvider>
                <LocalizationProvider dateAdapter={DateFnsUtils}>
                    <Supernav/>
                    <AdminRoutes />
                    <TeachersRoutes />
                    <StudentRoutes />
                    <CommonRoutes />
                    <ToastContainer style={{margin: '50px'}}/>
                    <Footer/>
                </LocalizationProvider>
            </AuthProvider>
        </div>


    );
}


export default App;
