import { useState, useEffect } from "react";
import SplashScreen from "./components/SplashScreen";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";
import Trending from "./pages/Trending";
import Settings from "./pages/Settings";
import About from "./pages/About";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Notifications from "./pages/Notifications";
import SearchUsers from "./pages/SearchUsers";
import UserProfile from "./pages/UserProfile";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ChangePassword from "./pages/ChangePassword";
import DeleteAccount from "./pages/DeleteAccount";
import Feedback from "./pages/Feedback";
import AccountInfo from "./pages/AccountInfo";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  if (loading) {
    return <SplashScreen />;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/about" element={<About />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/search" element={<SearchUsers />} />
        <Route path="/user/:username" element={<UserProfile />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/delete-account" element={<DeleteAccount />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/account-info" element={<AccountInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
