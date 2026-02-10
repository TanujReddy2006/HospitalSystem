import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import './CreateHospital.css';

export default function CreateHospital() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Initialize state clearly
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setIsLoading(true);

    try {
      await api.post("/hospitals", form);
      alert("Hospital registered successfully!");
      navigate("/admin/home"); // Redirect back to dashboard
    } catch (err) {
      console.error(err);
      alert("Failed to create hospital. Please check the details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-page-wrapper">
      <div className="form-card">
        {/* Header Section */}
        <div className="form-header">
          <button className="back-btn" onClick={() => navigate("/admin/home")}>
            &larr; Back
          </button>
          <h2>Register New Hospital</h2>
          <p>Enter the details of the medical facility below.</p>
        </div>

        {/* The Form */}
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-grid">
            
            {/* Name */}
            <div className="input-group">
              <label htmlFor="name">Hospital Name</label>
              <input
                id="name"
                name="name"
                placeholder="e.g. City General Hospital"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="input-group">
              <label htmlFor="email">Official Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="contact@hospital.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone */}
            <div className="input-group">
              <label htmlFor="phone">Contact Number</label>
              <input
                id="phone"
                name="phone"
                placeholder="+1 234 567 890"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* Address (Spans full width) */}
            <div className="input-group full-width">
              <label htmlFor="address">Physical Address</label>
              <textarea
                id="address"
                name="address"
                placeholder="Street, City, Zip Code"
                rows="3"
                value={form.address}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => navigate("/admin")}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-btn" 
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Create Hospital"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}