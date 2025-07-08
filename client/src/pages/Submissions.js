import React, { useEffect, useState } from 'react';
import './Submissions.css';

const Submissions = () => {
  const [talents, setTalents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/talents/all')
      .then(res => res.json())
      .then(data => {
        setTalents(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading talents:', err);
        setError('Error loading talents.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading submissions…</p>;
  if (error) return <p className="error">{error}</p>;
  if (talents.length === 0) return <p>No submissions yet.</p>;

  return (
    <div className="view-container">
      <h2>Student Submissions</h2>
      <div className="card-grid">
        {talents.map(t => (
          <div className="card" key={t._id}>
            <h3>{t.title}</h3>
            <p>By: {t.userId?.name || 'Unknown'}</p>
            <p>{t.description}</p>
            {t.mediaUrl && (
              <img src={t.mediaUrl} alt={t.title} className="talent-media" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Submissions;
