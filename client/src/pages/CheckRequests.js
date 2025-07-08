import React, { useEffect, useState } from "react";

const CheckRequests = () => {
  const [requests, setRequests] = useState([]);
  const mentor = JSON.parse(localStorage.getItem("user")); // mentor should be logged in

  useEffect(() => {
    if (mentor && mentor.email) {
      fetch(`http://localhost:5000/api/requests/${mentor.email}`)
        .then(res => res.json())
        .then(data => setRequests(data))
        .catch(err => console.error("Error fetching requests:", err));
    }
  }, [mentor]);

  return (
    <div className="check-requests-container">
      <h2>📬 Mentorship Requests</h2>
      {requests.length === 0 ? (
        <p>No requests received yet.</p>
      ) : (
        <ul>
          {requests.map((req, index) => (
            <li key={index}>
              <strong>{req.studentName}</strong> ({req.studentEmail}) contacted you on{" "}
              {new Date(req.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CheckRequests;
