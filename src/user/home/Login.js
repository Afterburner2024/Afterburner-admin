// src/home/Login.js
import React from 'react';
import { GOOGLE_AUTH_URL } from '../constants';
import googleLogo from '../img/google-logo.png';

const Login = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        
            <div className="bg-white shadow-md rounded-lg px-8 py-10 mt-6 w-full max-w-sm">
                <h2 className="text-3xl font-semibold text-center text-gray-800">로그인</h2>
                <p className="text-center text-gray-500 mt-2 mb-8">관리자 아이디로 로그인 해주세요.</p>
                <a href={GOOGLE_AUTH_URL} className="flex items-center justify-center bg-blue-500 text-white rounded-lg p-3 hover:bg-blue-600">
                    <img src={googleLogo} alt="Google" className="w-6 h-6 mr-2" />
                    구글 로그인
                </a>
                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-400">아이디 연동 및 로그인 문의 : <a href="mailto:acdongedb@gmail.com" className="underline">acdongedb@gmail.com</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;