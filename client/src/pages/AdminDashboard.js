import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/students")
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(err => console.error("Error loading students:", err));
  }, []);

  return (
    <div>
      <h2>Student List</h2>
      <ul>
        {students.map(student => (
          <li key={student._id}>
            {student.name} - {student.email} - {student.interests} - {student.bio}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;