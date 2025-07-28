import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { useToggle } from '../hooks/useToggle';
import { useAuthStore } from '../store/authStore'; 

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, userStatus, logout } = useAuthStore(); 
  const [isSidebarOpen, toggleSidebar] = useToggle(true);

  useEffect(() => {
    if (
      !isLoggedIn ||
      (userStatus !== "관리자" && userStatus !== "최고관리자")
    ) {

      navigate('/login');
    }
  }, [isLoggedIn, userStatus, navigate]);

  if (!isLoggedIn || (userStatus !== "관리자" && userStatus !== "최고관리자")) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header onToggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={toggleSidebar}
          onLogout={logout}
        />
        <main className="flex-1 p-6 overflow-auto fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
