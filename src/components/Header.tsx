import React from "react";
import { formatDate } from "../utils/formatDate";
import { Link } from "react-router-dom";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  return (
    <header className="sticky top-0 z-10 px-6 py-4 bg-white shadow-sm flex justify-between items-center">
      <div className="flex items-center">
        <button
          onClick={onToggleSidebar}
          className="text-gray-500 focus:outline-none focus:text-gray-700"
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
        <h1 className="text-xl font-semibold text-gray-800 ml-4">
          <Link to="/" className="hover:text-indigo-600">
            AfterBurnner 관리자 페이지
          </Link>
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">{formatDate(new Date())}</span>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
            <i className="fas fa-user text-white"></i>
          </div>
          <span className="text-sm font-medium">관리자</span>
        </div>
      </div>
    </header>
  );
};
