/* eslint-disable no-unused-vars */
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import NavbarHeader from "./components/NavbarHeader";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import {Toaster} from 'react-hot-toast'
import { useThemeStore } from "./store/useThemeStore";




function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  //fetching theme state from theme store 
  const{theme}= useThemeStore()


  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(authUser);

  //adding loading state
  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div className="h-[auto]" data-theme={theme}>
      <NavbarHeader />

      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>


      <Toaster/>
    </div>
  );
}

export default App;
