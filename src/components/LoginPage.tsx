import React from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, googleProvider, db } from "../utils/firebase";
import { useAuthStore } from "../store/authStore";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      let userStatusToSet = "유저";
      interface UserData {
        Status?: string;
        createdAt?: Date;
        [key: string]: unknown;
      }
      let existingData: UserData = {};
      if (userDocSnap.exists()) {
        existingData = userDocSnap.data();
        if (existingData.Status) {
          userStatusToSet = existingData.Status;
        }
      }

      await setDoc(
        userDocRef,
        {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          Status: userStatusToSet,
          createdAt: userDocSnap.exists() ? existingData.createdAt : new Date(),
        },
        { merge: true }
      );

      const updatedUserDocSnap = await getDoc(userDocRef);
      let userStatus = null;
      if (updatedUserDocSnap.exists()) {
        userStatus = updatedUserDocSnap.data().Status;
      }

      useAuthStore.getState().login(await user.getIdToken(), userStatus);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#3C63EA] to-[#FFFFFF]">
      <div className="w-[60%] h-[50vh] max-w-md p-10 bg-[#FFFFFF]/90 backdrop-blur-sm rounded-2xl shadow-2xl shadow-black/10 flex flex-col justify-between">
        {/* Header */}
        <div className="text-center space-y-4">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-20 h-20 mx-auto"
          />
          <h1 className="text-4xl font-extrabold text-[#3C63EA]">
            에프터버너
          </h1>
          <p className="text-[#000000] text-lg">
            관리자 페이지에 오신 것을 환영합니다!
          </p>
        </div>

        {/* Google 로그인 버튼 */}
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3 w-full px-6 py-3 bg-[#FF0000] hover:bg-[#CC0000] transition-colors duration-200 text-[#FFFFFF] font-semibold rounded-full shadow-md shadow-black/20"
        >
          <img
            src="public/google/light/web_light_rd_na@4x.png"
            alt="Google로 로그인"
            className="w-6 h-6 object-contain"
          />
          Google로 로그인
        </button>
      </div>
    </div>
  );
};
