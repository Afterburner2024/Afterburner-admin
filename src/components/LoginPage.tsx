import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../utils/firebase';
import { useAuthStore } from '../store/authStore';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log(user);

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      let userStatusToSet = "유저";

      let existingData: any = {};
      if (userDocSnap.exists()) {
        existingData = userDocSnap.data();
        if (existingData.Status) {
          userStatusToSet = existingData.Status;
        }
      }

      // Firestore에 사용자 정보 저장 (Status는 기존 값 유지 또는 기본값 "유저" 설정)
      await setDoc(userDocRef, {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        Status: userStatusToSet, 
        createdAt: userDocSnap.exists() ? existingData.createdAt : new Date(),
      }, { merge: true }); // 기존 문서가 있으면 병합

      const updatedUserDocSnap = await getDoc(userDocRef);
      let userStatus = null;
      if (updatedUserDocSnap.exists()) {
        userStatus = updatedUserDocSnap.data().Status;
      }

      useAuthStore.getState().login(await user.getIdToken(), userStatus);

      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-indigo-600">사이드프로젝트</h1>
          <p className="mt-2 text-gray-600">관리자 페이지</p>
        </div>
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center px-4 py-2 space-x-2 text-white bg-red-500 rounded-md hover:bg-red-600"
        >
          <i className="fab fa-google"></i>
          <span>Google로 로그인</span>
        </button>
      </div>
    </div>
  );
};