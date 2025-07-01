import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './components/LoginPage';
import Dashboard from './pages/Dashboard';
import ProjectsPage from './pages/ProjectsPage';
import StudyGroupsPage from './pages/StudyGroupsPage';
import NoticesPage from './pages/NoticesPage';
import QuestionsPage from './pages/QuestionsPage';
import MembersPage from './pages/MembersPage';
import AdminLayout from './layouts/AdminLayout';
import { useAuth } from './hooks/useAuth';

const RequireAuth: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AppRoutes: React.FC = () => {
  const { login } = useAuth();
  const handleLogin = () => login('dummy-token');
  return (
    <Routes>
      <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      <Route
        path="/*"
        element={
          <RequireAuth>
            <AdminLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="studies" element={<StudyGroupsPage />} />
        <Route path="notices" element={<NoticesPage />} />
        <Route path="questions" element={<QuestionsPage />} />
        <Route path="members" element={<MembersPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;