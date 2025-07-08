import React, { useEffect, useState } from "react";
import "./ProfileEdit.css";

const ProfileEdit = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ interests: "", bio: "" });

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    setUser(currentUser);
    if (currentUser) {
      setForm({
        interests: currentUser.interests || "",
        bio: currentUser.bio || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      const res = await fetch(`http://localhost:5000/api/userProfile/update/${user.email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Profile updated!");
        const updatedUser = { ...user, ...form };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      } else {
        alert(`❌ Update failed: ${data.error}`);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("🚨 Error updating profile.");
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      {user ? (
        <form onSubmit={handleSubmit} className="edit-form">
          <label>
            Name:
            <input type="text" value={user.name} disabled />
          </label>

          <label>
            Email:
            <input type="email" value={user.email} disabled />
          </label>

          <label>
            Interests:
            <input
              type="text"
              name="interests"
              value={form.interests}
              onChange={handleChange}
              placeholder="Your interests"
              required
            />
          </label>

          <label>
            Bio:
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Your bio"
              rows="4"
              required
            />
          </label>

          <button type="submit">Update</button>
        </form>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};

export default ProfileEdit;
