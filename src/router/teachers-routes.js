import React from 'react';
import {Route, Routes} from "react-router-dom";
import TeacherProtectedRoute from "../auth/TeacherProtectedRoute";
import TopicsList from "../components/content/topics/topics-list";
import LecturesList from "../components/content/lectures/lectures-list";
import LectureListItem from "../components/content/lectures/lectures-list-item";
import ExamplesList from "../components/content/examples/examples-list";
import AttachmentsList from "../components/content/attachment/attachments-list";
import ExcerisesList from "../components/content/exercises/exercises-list";
import TestsList from "../components/content/tests/tests-list";
import ExamsList from "../components/content/exams/exams-list";

function TeachersRoutes(props) {
    return (
        <div>
            <Routes>
                <Route
                    path="/topics-list"
                    element={
                        <TeacherProtectedRoute>
                            <TopicsList/>
                        </TeacherProtectedRoute>
                    }/>
                <Route
                    path="/lectures-list"
                    element={
                        <TeacherProtectedRoute>
                            <LecturesList/>
                        </TeacherProtectedRoute>
                    }/>
                <Route path={'/lecture-list-item'}
                       element={
                           <TeacherProtectedRoute>
                               <LectureListItem/>
                           </TeacherProtectedRoute>
                       }/>
                <Route
                    path="/examples-list"
                    element={
                        <TeacherProtectedRoute>
                            <ExamplesList/>
                        </TeacherProtectedRoute>
                    }/>
                <Route
                    path="/attachments-list"
                    element={
                        <TeacherProtectedRoute>
                            <AttachmentsList />
                        </TeacherProtectedRoute>
                    }/>
                <Route
                    path="/exercises-list"
                    element={
                        <TeacherProtectedRoute>
                            <ExcerisesList/>
                        </TeacherProtectedRoute>
                    }/>
                <Route
                    path="/tests-list"
                    element={
                        <TeacherProtectedRoute>
                            <TestsList/>
                        </TeacherProtectedRoute>
                    }/>
                <Route
                    path="/exams-list"
                    element={
                        <TeacherProtectedRoute>
                            <ExamsList/>
                        </TeacherProtectedRoute>
                    }/>
            </Routes>
        </div>
    );
}

export default TeachersRoutes;