import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './components/LoginPage';
import Dashboard from './pages/Dashboard';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import StudyGroupsPage from './pages/StudyGroupsPage';
import StudyGroupDetailPage from './pages/StudyGroupDetailPage';
import NoticesPage from './pages/NoticesPage';
import NoticeDetailPage from './pages/NoticeDetailPage';
import QuestionsPage from './pages/QuestionsPage';
import QuestionDetailPage from './pages/QuestionDetailPage'; // Import QuestionDetailPage
import MembersPage from './pages/MembersPage';
import MemberDetailPage from './pages/MemberDetailPage';
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
        <Route path="projects/:id" element={<ProjectDetailPage />} />
        <Route path="studies" element={<StudyGroupsPage />} />
        <Route path="studies/:id" element={<StudyGroupDetailPage />} />
        <Route path="notices" element={<NoticesPage />} />
        <Route path="notices/:id" element={<NoticeDetailPage />} />
        <Route path="questions" element={<QuestionsPage />} />
        <Route path="questions/:id" element={<QuestionDetailPage />} /> {/* Add question detail route */}
        <Route path="members" element={<MembersPage />} />
        <Route path="members/:id" element={<MemberDetailPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;