import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./utils/firebase";
import AppRoutes from "./routes";
import { LoginPage } from "./components/LoginPage";
import { useAuthStore } from "./store/authStore";
import LoadingSpinner from "./components/common/LoadingSpinner";
import { USER_STATUS } from "./types/user";
import "./app.css";
import ApprovalWaitingPage from "./components/ApprovalWaiting";
import { fetchCsrfToken } from "./utils/apiClient";

const App: React.FC = () => {
  const [initialized, setInitialized] = useState(false);
  const { isLoggedIn, userStatus, login, logout } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        let status = null;
        if (userDocSnap.exists()) {
          status = userDocSnap.data().Status;
        }
        login(status);
      } else {
        logout();
      }
      setInitialized(true);
    });

    return () => unsubscribe();
  }, [login, logout]);

  useEffect(() => {
    fetchCsrfToken();
  }, []);


  if (!initialized) {
    return <LoadingSpinner />;
  }

  if (!isLoggedIn) {
    return <LoginPage />;
  }


  if (
    userStatus !== USER_STATUS.ADMIN &&
    userStatus !== USER_STATUS.SuperAdmin
  ) {
    return <ApprovalWaitingPage />;
  }

  return <AppRoutes />;
};

export default App;
