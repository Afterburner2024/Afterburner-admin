import React from "react";
import { Link } from "react-router-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<Props> = ({ isOpen, onClose, onLogout }) => (
  <>
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-indigo-800 text-white transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} transition`}
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
    </div>
    {/* 모바일에서 닫기 버튼 */}
    <button
      onClick={onClose}
      className="fixed top-4 left-4 p-2 bg-white rounded-md md:hidden"
    >
      <i className={`fas ${isOpen ? "fa-times" : "fa-bars"}`}></i>
    </button>
  </>
);
