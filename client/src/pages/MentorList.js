import React, { useEffect, useState } from "react";
import "./MentorList.css";

const MentorList = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/mentors")
      .then(res => res.json())
      .then(data => {
        setMentors(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading mentors:", err);
        setLoading(false);
      });
  }, []);

  const handleContactClick = (mentorEmail, mentorName) => {
    const subject = encodeURIComponent("Mentorship Request from SkillBridge");
    const body = encodeURIComponent("Hi, I'm interested in your mentorship. Could we connect?");
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${mentorEmail}&su=${subject}&body=${body}`;

    window.open(gmailLink, "_blank");

    const student = JSON.parse(localStorage.getItem("user"));
    if (student) {
      fetch("http://localhost:5000/api/requests/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName: student.name,
          studentEmail: student.email,
          mentorEmail,
        }),
      })
        .then(res => res.json())
        .then(data => console.log("Request logged:", data))
        .catch(err => console.error("Logging failed:", err));
    }
  };

  if (loading) return <p>Loading mentors...</p>;
  if (!mentors.length) return <p>No mentors available yet.</p>;

  return (
    <div className="mentor-list-container">
      <h2>🔍 Find a Mentor</h2>
      <div className="mentor-cards">
        {mentors.map((m) => (
          <div className="mentor-card" key={m._id}>
            <h3>{m.name}</h3>
            <p><strong>Expertise:</strong> {m.expertise}</p>
            <p>{m.bio}</p>
            <button onClick={() => handleContactClick(m.email, m.name)}>
              Contact
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorList;