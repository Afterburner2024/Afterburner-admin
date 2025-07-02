import React from "react";
import { Link } from "react-router-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<Props> = ({ isOpen, onClose, onLogout }) => (
  <>
    <aside
      className={`
        bg-indigo-800 text-white w-64 flex-shrink-0 transition-all duration-300
        fixed inset-y-0 left-0 z-30 transform md:relative md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:-ml-64'}
      `}
    >
      <div className="p-4 border-b border-indigo-700">
        <h2 className="text-2xl font-bold">AfterBurnner</h2>
        <p className="text-sm text-indigo-300">관리자 페이지</p>
      </div>
      <nav className="p-4 space-y-1">
        {[
          ["대시보드", "/", "fa-tachometer-alt"],
          ["사이드프로젝트", "/projects", "fa-project-diagram"],
          ["스터디 그룹", "/studies", "fa-users"],
          ["공지사항", "/notices", "fa-bullhorn"],
          ["질문게시판", "/questions", "fa-comments"],
          ["회원관리", "/members", "fa-user-cog"],
        ].map(([label, path, icon]) => (
          <Link
            key={label as string}
            to={path as string}
            className="flex items-center px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            <i className={`mr-3 fas ${icon}`}></i>
            <span>{label}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-indigo-700">
        <button
          onClick={onLogout}
          className="flex items-center w-full px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          <i className="mr-3 fas fa-sign-out-alt"></i>
          <span>로그아웃</span>
        </button>
      </div>
    </aside>

    {/* Mobile overlay */}
    {isOpen && (
      <div
        className="fixed inset-0 z-20 bg-black opacity-50 md:hidden"
        onClick={onClose}
      ></div>
    )}
  </>
);
