import React, { useState } from "react";
import "./UploadTalent.css"; // Reusing form styles

const PostOpportunities = () => {
  const [form, setForm] = useState({ title: "", description: "", link: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/opportunities/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Opportunity posted successfully!");
        setForm({ title: "", description: "", link: "" });
      } else {
        alert(`❌ Post failed: ${data.error}`);
      }
    } catch (err) {
      alert("🚨 Error posting opportunity");
      console.error(err);
    }
  };

  return (
    <div className="upload-container">
      <h2>Post an Opportunity</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Opportunity Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Opportunity Description"
          value={form.description}
          onChange={handleChange}
          required
        ></textarea>
        <input
          name="link"
          placeholder="Relevant Link (optional)"
          value={form.link}
          onChange={handleChange}
        />
        <button type="submit">Post Opportunity</button>
      </form>
    </div>
  );
};

export default PostOpportunities;
