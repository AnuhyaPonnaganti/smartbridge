import React, { useEffect, useState } from "react";
import "./ExplorePeers.css";

const ExplorePeers = () => {
  const [peers, setPeers] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!currentUser?.email) return;

    fetch(`http://localhost:5000/api/students/explore/${currentUser.email}`)
      .then(res => res.json())
      .then(data => {
        setPeers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load peers:", err);
        setLoading(false);
      });
  }, [currentUser?.email]);

  return (
    <div className="explore-peers-container">
      <h2>🌐 Explore Peers</h2>
      {loading ? (
        <p>Loading students...</p>
      ) : peers.length === 0 ? (
        <p>No other students found.</p>
      ) : (
        <div className="peers-list">
          {peers.map((peer, i) => (
            <div className="peer-card" key={i}>
              <h3>{peer.name}</h3>
              <p><strong>Email:</strong> {peer.email}</p>
              {peer.bio && <p><strong>Bio:</strong> {peer.bio}</p>}
              {peer.interests && <p><strong>Interests:</strong> {peer.interests}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


export default ExplorePeers;