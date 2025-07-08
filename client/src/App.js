import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UploadTalent from "./pages/UploadTalent";
import MentorList from "./pages/MentorList";
import ExplorePeers from "./pages/ExplorePeers";
import StudentDashboard from "./pages/StudentDashboard";
import MentorDashboard from "./pages/MentorDashboard";
import ViewSubmissions from "./pages/ViewSubmissions";
import CheckRequests from "./pages/CheckRequests";
import PostOpportunities from "./pages/PostOpportunities";
import ProfileEdit from "./components/ProfileEdit";
import ResetPassword from "./components/ResetPassword";
import AdminStudentList from "./components/AdminStudentList";
import ForgotPassword from './pages/ForgotPassword';
import ConfirmResetPassword from './pages/ConfirmResetPassword';

import { AuthProvider, AuthContext } from './context/AuthContext';

import "./App.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = React.useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>SkillBridge</Link>
      </h2>
      <ul className="nav-links">
        <Link to="/">Home</Link>

        {user?.role === "student" && <Link to="/student-dashboard">Dashboard</Link>}
        {user?.role === "mentor" && <Link to="/mentor-dashboard">Dashboard</Link>}

        {user ? (
          <button onClick={handleLogout} style={{ marginLeft: "20px", background: "none", border: "none", color: "white", cursor: "pointer" }}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </ul>
    </nav>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/mentor-dashboard" element={<MentorDashboard />} />
            <Route path="/upload-talent" element={<UploadTalent />} />
            <Route path="/find-mentors" element={<MentorList />} />
            <Route path="/explore-peers" element={<ExplorePeers />} />
            <Route path="/view-talents" element={<ViewSubmissions />} />
            <Route path="/check-requests" element={<CheckRequests />} />
            <Route path="/post-opportunities" element={<PostOpportunities />} />
            <Route path="/edit-profile" element={<ProfileEdit />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/admin/students" element={<AdminStudentList />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ConfirmResetPassword />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
