import React from 'react';
import {Route, Routes} from "react-router-dom";
import StudentProtectedRoute from "../auth/StudentProtectedRoute";
import ExcerisesList from "../components/content/exercises/exercises-list";
import TestsList from "../components/content/tests/tests-list";
import ExamsList from "../components/content/exams/exams-list";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

function StudentRoutes(props) {
    return (
        <div>
            <Routes>
                <Route
                    path="/student-exercises-list"
                    element={
                        <StudentProtectedRoute>
                            <ExcerisesList/>
                        </StudentProtectedRoute>
                    }/>
                <Route
                    path="/student-lesson-list"
                    element={
                        <StudentProtectedRoute>
                            <TestsList/>
                        </StudentProtectedRoute>
                    }/>
                <Route
                    path="/student-exams-list"
                    element={
                        <StudentProtectedRoute>
                            <ExamsList/>
                        </StudentProtectedRoute>
                    }/>

            </Routes>
        </div>
    );
}

export default StudentRoutes;