import { useNavigate } from "react-router-dom";
import Chat from "../components/Chat";
import "./Dashboard.css";

const StudentDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h2>🎓 Welcome, {user?.name}!</h2>
      <p>Discover mentors, showcase your talents, and grow your future.</p>

      <div className="dashboard-grid">
        <div className="card">
          <h3>Upload Talent</h3>
          <p>Showcase your skills by uploading talent submissions.</p>
          <button onClick={() => navigate("/upload-talent")}>Upload Now</button>
        </div>

        <div className="card">
          <h3>Find Mentors</h3>
          <p>Connect with mentors in your area of interest and grow faster.</p>
          <button onClick={() => navigate("/find-mentors")}>Find Mentors</button>
        </div>

        <div className="card">
          <h3>Explore Peers</h3>
          <p>See what your peers are up to and stay inspired together.</p>
          <button onClick={() => navigate("/explore-peers")}>Explore</button>
        </div>

        <div className="card">
          <h3>Edit Profile</h3>
          <p>Update your personal profile information and bio.</p>
          <button onClick={() => navigate("/edit-profile")}>Edit Profile</button>
        </div>

        <div className="card">
          <h3>Reset Password</h3>
          <p>Securely change your password to keep your account safe.</p>
          <button onClick={() => navigate("/reset-password")}>Reset Password</button>
        </div>
      </div>

      <hr style={{ margin: "40px 0" }} />

      <h3>💬 Chat</h3>
      <p>Start a conversation with peers or mentors!</p>
      <Chat user={user} />
    </div>
  );
};

export default StudentDashboard;
