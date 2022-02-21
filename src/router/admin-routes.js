import React from 'react';
import {Route, Routes} from "react-router-dom";
import AdminProtectedRoute from "../auth/AdminProtectedRoute";
import UsersList from "../components/users/users-list";
import ResetPassword from "../components/users/admin/reset-password";
import StudentsList from "../components/students/students-list";
import StudentListItem from "../components/students/student-list-item";
import TeachersList from "../components/teachers/teachers-list";
import GuardiansList from "../components/guardians/guardians-list";
import SubjectList from "../components/subjects/subjects-list";
import FinacialsList from "../components/financials/financials-list";
import SchoolList from "../components/school/school-list";

function AdminRoutes(props) {
    return (
        <div>
            <Routes>
                <Route
                    path="/users-list"
                    element={
                        <AdminProtectedRoute>
                            <UsersList/>
                        </AdminProtectedRoute>
                    }/>
                <Route
                    path="/reset-password"
                    element={
                        <AdminProtectedRoute>
                            <ResetPassword/>
                        </AdminProtectedRoute>
                    }/>
                <Route
                    path="/students-list"
                    element={
                        <AdminProtectedRoute>
                            <StudentsList/>
                        </AdminProtectedRoute>
                    }/>

                <Route
                    path={"student-list-item"}
                    element={
                        <AdminProtectedRoute>
                            <StudentListItem />
                        </AdminProtectedRoute>} />

                <Route
                    path="/teachers-list"
                    element={
                        <AdminProtectedRoute>
                            <TeachersList/>
                        </AdminProtectedRoute>
                    }/>
                <Route
                    path="/guardians-list"
                    element={
                        <AdminProtectedRoute>
                            <GuardiansList/>
                        </AdminProtectedRoute>

                    }/>
                <Route
                    path="/subjects-list"
                    element={
                        <AdminProtectedRoute>
                            <SubjectList/>
                        </AdminProtectedRoute>
                    }/>
                <Route
                    path="/financials-list"
                    element={
                        <AdminProtectedRoute>
                            <FinacialsList/>
                        </AdminProtectedRoute>
                    }/>
                <Route
                    path="/schools-list"
                    element={
                        <AdminProtectedRoute>
                            <SchoolList/>
                        </AdminProtectedRoute>
                    }/>
            </Routes>
        </div>
    );
}

export default AdminRoutes;