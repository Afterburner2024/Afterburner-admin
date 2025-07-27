import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ProjectsPage from './pages/Project/ProjectsPage';
import ProjectDetailPage from './pages/Project/ProjectDetailPage';
import StudyGroupsPage from './pages/Study/StudyGroupsPage';
import StudyGroupDetailPage from './pages/Study/StudyGroupDetailPage';
import NoticesPage from './pages/Notices/NoticesPage';
import NoticeDetailPage from './pages/Notices/NoticeDetailPage';
import NoticeCreatePage from './pages/Notices/NoticeCreatePage';
import NoticeEditPage from './pages/Notices/NoticeEditPage';
import QuestionsPage from './pages/Question/QuestionsPage';
import QuestionDetailPage from './pages/Question/QuestionDetailPage';
import MembersPage from './pages/Member/MembersPage';
import MemberDetailPage from './pages/Member/MemberDetailPage';
import AdminsPage from './pages/Admin/AdminsPage';
import AdminLayout from './layouts/AdminLayout';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="projects/:id" element={<ProjectDetailPage />} />
        <Route path="studies" element={<StudyGroupsPage />} />
        <Route path="studies/:id" element={<StudyGroupDetailPage />} />
        <Route path="notices" element={<NoticesPage />} />
        <Route path="notices/create" element={<NoticeCreatePage />} />
        <Route path="notices/:id" element={<NoticeDetailPage />} />
        <Route path="notices/edit/:id" element={<NoticeEditPage />} />
        <Route path="questions" element={<QuestionsPage />} />
        <Route path="questions/:id" element={<QuestionDetailPage />} />
        <Route path="members" element={<MembersPage />} />
        <Route path="members/:id" element={<MemberDetailPage />} />
        <Route path="admins" element={<AdminsPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;