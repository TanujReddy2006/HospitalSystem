import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import './CreateHospitalAdmin.css';

export default function CreateHospitalAdmin() {
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingHospitals, setLoadingHospitals] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    hospitalId: ""
  });

  // 1. Fetch Hospitals for the dropdown
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const res = await api.get("/hospitals");
        setHospitals(res.data);
      } catch (err) {
        console.error("Failed to load hospitals");
      } finally {
        setLoadingHospitals(false);
      }
    };
    fetchHospitals();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.hospitalId) {
      alert("Please select a hospital");
      return;
    }
    
    setIsLoading(true);
    try {
      await api.post("/admin/create-hospital-admin", {
        ...form,
        role: "hospital_admin"
      });

      alert("Hospital Admin created successfully!");
      navigate("/admin/home"); // Return to dashboard
    } catch (err) {
      alert(err.response?.data?.message || "Error creating admin");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-form-wrapper">
      <div className="admin-form-card">
        {/* Header */}
        <div className="form-header">
          <button className="back-link" onClick={() => navigate("/admin/home")}>
            &larr; Back to Dashboard
          </button>
          <h2>Create Hospital Admin</h2>
          <p>Assign a manager to a specific hospital facility.</p>
        </div>

        <form onSubmit={handleCreate} className="admin-form">
          <div className="form-grid">
            
            {/* Hospital Selection (Dropdown) */}
            <div className="input-group full-width">
              <label htmlFor="hospitalId">Assign to Hospital</label>
              <div className="select-wrapper">
                <select
                  id="hospitalId"
                  name="hospitalId"
                  value={form.hospitalId}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select Hospital --</option>
                  {loadingHospitals ? (
                    <option disabled>Loading...</option>
                  ) : (
                    hospitals.map((h) => (
                      <option key={h._id} value={h._id}>
                        {h.name} ({h.address})
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>

            {/* Name */}
            <div className="input-group">
              <label htmlFor="name">Admin Full Name</label>
              <input
                id="name"
                name="name"
                placeholder="e.g. John Smith"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="admin@hospital.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="input-group full-width">
              <label htmlFor="password">Temporary Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create a strong password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          {/* Actions */}
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
              className="create-btn"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Admin Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}