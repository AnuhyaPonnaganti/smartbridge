import { useNavigate } from "react-router-dom";
import Chat from "../components/Chat"; // ✅ Import Chat Component
import "./Dashboard.css"; // Ensure this CSS file exists

const MentorDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h2>👩‍🏫 Welcome, {user?.name}!</h2>
      <p>Support young talents by offering guidance and opportunities.</p>

      <div className="dashboard-grid">
        <div className="card">
          <h3>View Student Talents</h3>
          <p>See uploaded skills and reach out to guide passionate learners.</p>
          <button onClick={() => navigate("/view-talents")}>View Submissions</button>
        </div>

        <div className="card">
          <h3>Respond to Requests</h3>
          <p>Help students who are looking for mentorship in your field.</p>
          <button onClick={() => navigate("/check-requests")}>Check Requests</button>
        </div>

        <div className="card">
          <h3>Post Opportunities</h3>
          <p>Share internships, events, or learning resources with the community.</p>
          <button onClick={() => navigate("/post-opportunities")}>Post Now</button>
        </div>

        <div className="card">
          <h3>Edit Profile</h3>
          <p>Update your name, email or personal bio info.</p>
          <button onClick={() => navigate("/edit-profile")}>Edit Profile</button>
        </div>

        <div className="card">
          <h3>Reset Password</h3>
          <p>Change your account password securely.</p>
          <button onClick={() => navigate("/reset-password")}>Reset Password</button>
        </div>
      </div>

      <hr style={{ margin: "40px 0" }} />

      <h3>💬 Chat</h3>
      <p>Talk to students in real-time!</p>
      <Chat user={user} />
    </div>
  );
};

export default MentorDashboard;
