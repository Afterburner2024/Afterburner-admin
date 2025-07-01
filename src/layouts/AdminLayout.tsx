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
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
        onLogout={logout}
      />
      <div
        className={`flex-1 flex flex-col overflow-hidden transition-all ${
          isSidebarOpen ? "md:ml-64" : "md:ml-0"
        }`}
      >
        <Header />
        <main className="p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
