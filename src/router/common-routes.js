import React from 'react';
import {Route, Routes} from "react-router-dom";
import Register from "../utils/auto-chip-input/aut-chip-input";
import Login from "../components/users/login/Login";
import About from "../components/general/about";
import Contact from "../components/general/contact";
import ChangePassword from "../components/users/change-password";
import Profile from "../components/users/profile/profile";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import ProtectedRoute from "../auth/ProtectedRoute";
import NewsList from "../components/news/news-list";
import CalendarList from "../components/calendar/calendar-list";
import Home from "../home";
import NoMatch from "../404";

function CommonRoutes(props) {
    return (
        <div>
            <Routes>
                <Route path="/signup" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/contact-us" element={<Contact/>}/>
                <Route path="/change-password" element={<ChangePassword/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route
                    path="/news-list"
                    element={
                        <ProtectedRoute>
                            <NewsList/>
                        </ProtectedRoute>
                    }/>

                <Route
                    path="/events-list"
                    element={
                        <ProtectedRoute>
                            <CalendarList/>
                        </ProtectedRoute>

                    }/>

                <Route
                    path="/home" element={<Home/>} />

                <Route
                    path="/" element={<Home/>} />

                <Route
                    path="*" element={<NoMatch/>} exact={true}/>

            </Routes>
        </div>
    );
}

export default CommonRoutes;