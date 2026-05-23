import { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import "./CreateWorker.css";

export default function CreateWorker() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
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
      {/* Red Header Bar */}
      <header className="page-header">
        <div className="header-text">
          <h2>Create Hospital Worker</h2>
          <p>Register a new staff member to the system.</p>
        </div>
        <button className="back-btn" onClick={() => navigate("/hospital-admin/home")}>
          Back to Dashboard
        </button>
      </header>

      {/* Centered Form Card */}
      <main className="worker-container">
        <div className="worker-card">
          <div className="form-group">
            <label>Full Name</label>
            <input name="name" placeholder="John Doe" onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input name="email" type="email" placeholder="staff@hospital.com" onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Temporary Password</label>
            <input name="password" type="password" placeholder="••••••••" onChange={handleChange} />
          </div>

          <button className="create-btn" onClick={handleCreate}>
            Create Worker
          </button>
        </div>
      </main>
    </div>
  );
}