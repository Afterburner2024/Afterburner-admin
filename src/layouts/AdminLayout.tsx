import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { useToggle } from '../hooks/useToggle';
import { useAuth } from '../hooks/useAuth';

const AdminLayout: React.FC = () => {
  const { logout } = useAuth();
  const [isSidebarOpen, toggleSidebar] = useToggle(true);
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header onToggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={toggleSidebar}
          onLogout={logout}
        />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
