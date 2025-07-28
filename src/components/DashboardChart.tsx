import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useRecentMembers } from '../hooks/useRecentMembers';
import { useRecentProjects } from '../hooks/useRecentProjects';
import { useRecentStudies } from '../hooks/useRecentStudies';
import { useRecentNotices } from '../hooks/useRecentNotices';

export const DashboardChart: React.FC = () => {
  const { data: members = [] } = useRecentMembers();
  const { data: projects = [] } = useRecentProjects();
  const { data: studies = [] } = useRecentStudies();
  const { data: notices = [] } = useRecentNotices();

  const stats = [
    { name: '회원', value: members.length },
    { name: '프로젝트', value: projects.length },
    { name: '스터디', value: studies.length },
    { name: '공지', value: notices.length },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md fade-in">
      <h2 className="text-lg font-semibold mb-4">최근 데이터 요약</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={stats} aria-label="dashboard stats">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="value" fill="#6366F1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardChart;
