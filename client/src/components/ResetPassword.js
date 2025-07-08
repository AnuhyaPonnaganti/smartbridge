import React, { useState } from 'react';

const ResetPassword = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/userProfile/reset-password/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword })
      });

      const data = await response.json();
      if (response.ok) setMessage("Password reset successful");
      else setMessage(data.error || "Reset failed");
    } catch (err) {
      console.error(err);
      setMessage("Error occurred");
    }
  };

  return (
    <div className="reset-password-container">
      <h2>🔑 Reset Password</h2>
      <input
        type="password"
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleReset}>Reset</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
