import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './utils/firebase';
import AppRoutes from './routes';
import { LoginPage } from './components/LoginPage';
import { useAuthStore } from './store/authStore';
import LoadingSpinner from './components/common/LoadingSpinner';
import './app.css';

const App: React.FC = () => {
  const [initialized, setInitialized] = useState(false); 
  const { isLoggedIn, userStatus, login, logout } = useAuthStore(); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idToken = await user.getIdToken();
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        let status = null;
        if (userDocSnap.exists()) {
          status = userDocSnap.data().Status;
        }
        login(idToken, status);
      } else {
        logout();
      }
      setInitialized(true);
    });

    return () => unsubscribe();
  }, [login, logout]); 

  if (!initialized) {
    return <LoadingSpinner />;
  }

  if (!isLoggedIn) {
    return <LoginPage />;
  }

  if (userStatus !== "관리자") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold">사용자 승인 대기중입니다....</h1>
        </div>
      </div>
    );
  }

  return <AppRoutes />;
};

export default App;