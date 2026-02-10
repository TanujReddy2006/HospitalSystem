import { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import "./CreateWorker.css"; // Make sure to import the CSS

export default function CreateWorker() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    // Simple validation
    if (!form.name || !form.email || !form.password) {
        alert("Please fill in all fields");
        return;
    }

    try {
      await api.post("/hospital-admin/create-worker", form);
      alert("Worker created successfully");
      navigate("/hospital-admin/home");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create worker");
    }
  };

  return (
    <div className="worker-layout">
      <div className="worker-card">
        
        <div className="worker-header">
          <h2>Create Hospital Worker</h2>
          <p>Register a new staff member</p>
        </div>

        <div className="form-group">
          <input 
            className="form-input"
            name="name" 
            placeholder="Full Name" 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <input 
            className="form-input"
            name="email" 
            type="email"
            placeholder="Email Address" 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <input
            className="form-input"
            name="password"
            type="password"
            placeholder="Temporary Password"
            onChange={handleChange}
          />
        </div>

        <button className="create-btn" onClick={handleCreate}>
          Create Worker
        </button>

      </div>
    </div>
  );
}