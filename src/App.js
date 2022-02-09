import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Footer from './utils/footer';
import Register from './components/users/register';
import Login from './components/users/login/Login';
import ChangePassword from './components/users/change-password';
import ResetPassword from './components/users/admin/reset-password';
import About from './components/general/about';
import Contact from './components/general/contact';
import UsersList from './components/users/users-list';
import Profile from './components/general/profile';

import Administration from './components/admins/administration';
import TeacherAdmin from './components/admins/teacherAdmin';
import StudentAdmin from './components/admins/studentAdmin';

import StudentsList from './components/students/students-list';
import TeachersList from './components/teachers/teachers-list';
import GuardiansList from './components/guardians/guardians-list';
import SubjectList from './components/subjects/subjects-list';
import FinacialsList from './components/financials/financials-list';
import SchoolList from "./components/school/school-list";

import TopicsList from './components/content/topics/topics-list';
import LecturesList from './components/content/lectures/lectures-list';
import ExamplesList from './components/content/examples/examples-list';
import AttachmentsList from './components/content/attachment/attachments-list';
import ExcerisesList from './components/content/exercises/exercises-list';
import TestsList from './components/content/tests/tests-list';
import ExamsList from './components/content/exams/exams-list';

import NewsList from './components/news/news-list';
import CalendarList from './components/calendar/calendar-list';

import Home from './home';
import NoMatch from './404';
import ProtectedRoute from './auth/ProtectedRoute';
import AdminProtectedRoute from './auth/AdminProtectedRoute';
import TeacherProtectedRoute from './auth/TeacherProtectedRoute';
import StudentProtectedRoute from './auth/StudentProtectedRoute';
import AuthProvider from './auth/authProvider';

import 'react-toastify/dist/ReactToastify.css';

import Navigation from './utils/navigation';
import { ToastContainer } from 'react-toastify';






const App = (props) => {


  return (
    <div className="container-fluid-more">
      <AuthProvider>
        <Navigation />
        <Routes>
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/user-profile" element={<Profile />} />


          <Route path="/administration"
            element={
              <AdminProtectedRoute>
                <Administration />
              </AdminProtectedRoute>
            } />


          <Route path="/teacher"
            element={
              <TeacherProtectedRoute>
                <TeacherAdmin />
              </TeacherProtectedRoute>
            } />


          <Route path="/student"
            element={
              <StudentProtectedRoute>
                <StudentAdmin />
              </StudentProtectedRoute>
            } />


          <Route
            path="/users-list"
            element={
              <AdminProtectedRoute>
                <UsersList />
              </AdminProtectedRoute>
            } />
          <Route
            path="/reset-password"
            element={
              <AdminProtectedRoute>
                <ResetPassword />
              </AdminProtectedRoute>
            } />
          <Route
            path="/students-list"
            element={
              <AdminProtectedRoute>
                <StudentsList />
              </AdminProtectedRoute>
            } />

          <Route
            path="/teachers-list"
            element={
              <AdminProtectedRoute>
                <TeachersList />
              </AdminProtectedRoute>
            } />
          <Route
            path="/guardians-list"
            element={
              <AdminProtectedRoute>
                <GuardiansList />
              </AdminProtectedRoute>

            } />
          <Route
            path="/subjects-list"
            element={
              <AdminProtectedRoute>
                <SubjectList />
              </AdminProtectedRoute>
            } />
          <Route
            path="/financials-list"
            element={
              <AdminProtectedRoute>
                <FinacialsList />
              </AdminProtectedRoute>
            } />
          <Route
            path="/schools-list"
            element={
              <AdminProtectedRoute>
                <SchoolList />
              </AdminProtectedRoute>
            } />

          <Route
            path="/topics-list"
            element={
              <TeacherProtectedRoute>
                <TopicsList />
              </TeacherProtectedRoute>
            } />
          <Route
            path="/lectures-list"
            element={
              <TeacherProtectedRoute>
                <LecturesList />
              </TeacherProtectedRoute>
            } />
          <Route
            path="/examples-list"
            element={
              <TeacherProtectedRoute>
                <ExamplesList />
              </TeacherProtectedRoute>
            } />
          <Route
            path="/attachments-list"
            element={
              <TeacherProtectedRoute>
                <AttachmentsList />
              </TeacherProtectedRoute>
            } />
          <Route
            path="/exercises-list"
            element={
              <TeacherProtectedRoute>
                <ExcerisesList />
              </TeacherProtectedRoute>
            } />
          <Route
            path="/tests-list"
            element={
              <TeacherProtectedRoute>
                <TestsList />
              </TeacherProtectedRoute>
            } />
          <Route
            path="/exams-list"
            element={
              <TeacherProtectedRoute>
                <ExamsList />
              </TeacherProtectedRoute>
            } />

          <Route
            path="/student-exercises-list"
            element={
              <StudentProtectedRoute>
                <ExcerisesList />
              </StudentProtectedRoute>
            } />
          <Route
            path="/student-lesson-list"
            element={
              <StudentProtectedRoute>
                <TestsList />
              </StudentProtectedRoute>
            } />
          <Route
            path="/student-exams-list"
            element={
              <StudentProtectedRoute>
                <ExamsList />
              </StudentProtectedRoute>
            } />

          <Route
            path="/news-list"
            element={
              <ProtectedRoute>
                <NewsList />
              </ProtectedRoute>
            } />

          <Route
            path="/events-list"
            element={
              <ProtectedRoute>
                <CalendarList />
              </ProtectedRoute>

            } />

          <Route
            path="/home" element={<Home />} on />

          <Route
            path="/" element={<Home />} on />

          <Route
            path="/" element={<NoMatch />} on />

        </Routes>
        <ToastContainer style={{ margin: '50px' }} />
        <Footer />
      </AuthProvider>
    </div>


  );
}



export default App;
