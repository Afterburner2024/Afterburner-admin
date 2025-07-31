import React, { useEffect, useState } from "react";
import { formatDate } from "../utils/formatDate";
import { Link } from "react-router-dom";
import { auth } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const [displayName, setDisplayName] = useState<string | null>(
    auth.currentUser?.displayName ?? null
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setDisplayName(user?.displayName ?? null);
    });

    return () => unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 z-10 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md flex justify-between items-center">
      <div className="flex items-center">
        <button
          onClick={onToggleSidebar}
          className="text-white hover:text-yellow-300 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
        <h1 className="text-xl font-semibold ml-4">
          <Link to="/" className="hover:text-yellow-300 transition-colors">
            AfterBurnner 관리자 페이지
          </Link>
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm opacity-80">{formatDate(new Date())}</span>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <i className="fas fa-user"></i>
          </div>
          <span className="text-sm font-medium">{displayName ?? "관리자"}</span>
        </div>
      </div>
    </header>
  );
};
