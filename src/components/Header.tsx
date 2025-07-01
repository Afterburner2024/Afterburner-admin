import React from "react";
import { formatDate } from "../utils/formatDate";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-10 px-6 py-4 bg-white shadow-sm flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-800">
        <Link to="/" className="hover:text-indigo-600">
          AfterBurnner 관리자 페이지
        </Link>
        </h1>
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
