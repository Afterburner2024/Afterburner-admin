import React from 'react';
import { RecentMembersTable } from '../components/RecentMembersTable';
import { RecentProjectsTable } from '../components/RecentProjectsTable';
import { RecentStudiesTable } from '../components/RecentStudiesTable';
import { NoticesList } from '../components/NoticesList';
import DashboardChart from '../components/DashboardChart';
import MemberStatsChart from '../components/MemberStatsChart';

const Dashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <RecentMembersTable />
      <RecentProjectsTable />
      <RecentStudiesTable />
      <NoticesList />
      <div className="md:col-span-2">
        <DashboardChart />
      </div>
      <div className="md:col-span-2">
        <MemberStatsChart />
      </div>
    </div>
  );
};

export default Dashboard;