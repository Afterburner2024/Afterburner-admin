import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  onLogin: () => void;
}

export const LoginPage: React.FC<Props> = ({ onLogin }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    onLogin();
    navigate('/');
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-indigo-600">사이드프로젝트</h1>
          <p className="mt-2 text-gray-600">관리자 페이지</p>
        </div>
        <button
          onClick={handleClick}
          className="w-full flex items-center justify-center px-4 py-2 space-x-2 text-white bg-red-500 rounded-md hover:bg-red-600"
        >
          <i className="fab fa-google"></i>
          <span>Google로 로그인</span>
        </button>
      </div>
    </div>
  );
};