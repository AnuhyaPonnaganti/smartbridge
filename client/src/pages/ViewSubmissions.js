import React, { useEffect, useState } from "react";
import "./ViewSubmissions.css";

const ViewSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/talents/all")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSubmissions(data);
        } else {
          console.error("Unexpected response:", data);
        }
      })
      .catch((err) => console.error("Error fetching submissions:", err));
  }, []);

  return (
    <div className="submissions-container">
      <h2 className="submissions-title">Student Submissions</h2>
      {submissions.length === 0 ? (
        <p className="no-submissions">No submissions yet.</p>
      ) : (
        <div className="card-grid">
          {submissions.map((item, index) => (
            <div className="submission-card" key={index}>
              <h3>{item.title}</h3>
              <p><strong>Description:</strong> {item.description}</p>
              <p><strong>Student:</strong> {item.studentName || "N/A"}</p>
              <p><strong>Email:</strong> {item.studentEmail || "N/A"}</p>
              {item.fileUrl ? (
                <a className="view-link" href={item.fileUrl} target="_blank" rel="noreferrer">
                  📎 View Uploaded File
                </a>
              ) : (
                <p style={{ color: "gray" }}>No file uploaded.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewSubmissions;
