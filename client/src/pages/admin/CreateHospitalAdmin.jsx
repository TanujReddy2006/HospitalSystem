import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import "./CreateHospitalAdmin.css";

export default function CreateHospitalAdmin() {
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingHospitals, setLoadingHospitals] = useState(true);

  const [form, setForm] = useState({ name: "", email: "", password: "", hospitalId: "" });

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

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.hospitalId) return alert("Please select a hospital");
    setIsLoading(true);
    try {
      await api.post("/admin/create-hospital-admin", { ...form, role: "hospital_admin" });
      alert("Hospital Admin created successfully!");
      navigate("/admin/home");
    } catch (err) {
      alert(err.response?.data?.message || "Error creating admin");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-form-layout">
      {/* Red Header Bar */}
      <header className="page-header">
        <div className="header-text">
          <h2>Create Hospital Admin</h2>
          <p>Assign a manager to a specific facility.</p>
        </div>
        <button className="back-btn" onClick={() => navigate("/admin/home")}>Back to Dashboard</button>
      </header>

      {/* Main Content Card */}
      <main className="form-container">
        <div className="form-card">
          <form onSubmit={handleCreate}>
            <div className="input-group">
              <label>Assign to Hospital</label>
              <select name="hospitalId" value={form.hospitalId} onChange={handleChange} required>
                <option value="">-- Select Hospital --</option>
                {loadingHospitals ? <option disabled>Loading...</option> : 
                  hospitals.map((h) => <option key={h._id} value={h._id}>{h.name}</option>)}
              </select>
            </div>
            <div className="input-group">
              <label>Admin Full Name</label>
              <input name="name" placeholder="John Smith" value={form.name} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>Email Address</label>
              <input name="email" type="email" placeholder="admin@hospital.com" value={form.email} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>Temporary Password</label>
              <input name="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} required />
            </div>
            <button type="submit" className="create-btn" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Admin Account"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}