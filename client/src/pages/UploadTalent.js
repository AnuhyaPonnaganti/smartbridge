import React, { useState } from "react";
import "./UploadTalent.css";

const UploadTalent = () => {
  const [form, setForm] = useState({ title: "", description: "", file: null });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setForm({ ...form, file: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user._id) {
      alert("❌ User not logged in.");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("media", form.file);
    formData.append("userId", user._id);

    try {
      const res = await fetch("http://localhost:5000/api/talents/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("📤 Upload Response:", data);

      if (res.ok) {
        alert("✅ Talent uploaded successfully!");
        setForm({ title: "", description: "", file: null });
      } else {
        alert(`❌ Upload failed: ${data.error || data.details}`);
      }
    } catch (err) {
      alert("🚨 Error uploading talent");
      console.error(err);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Your Talent</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="file"
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UploadTalent;