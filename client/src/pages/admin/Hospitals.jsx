import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import "./Hospitals.css";

export default function Hospitals() {
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const res = await api.get("admin/hospitals");
      setHospitals(res.data.hospitals);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hospitals-layout">
      {/* Red Header Bar */}
      <header className="page-header">
        <div className="header-text">
          <h2>Registered Hospitals</h2>
          <p>View all hospitals in the LifeLink network.</p>
        </div>
        <button className="back-btn" onClick={() => navigate("/admin/home")}>Back to Dashboard</button>
      </header>

      <main className="hospitals-container">
        {loading ? (
          <div className="loading-state">Loading hospitals...</div>
        ) : hospitals.length === 0 ? (
          <div className="empty-state">No hospitals registered yet.</div>
        ) : (
          <div className="hospital-grid">
            {hospitals.map((hospital) => (
              <div key={hospital._id} className="hospital-card">
                <div className="hospital-top">
                  <div className="hospital-icon">🏥</div>
                  <div>
                    <h3>{hospital.name}</h3>
                    <span className={`verified-badge ${hospital.isVerified ? 'yes' : 'no'}`}>
                      {hospital.isVerified ? "Verified" : "Not Verified"}
                    </span>
                  </div>
                </div>
                <div className="hospital-details">
                  <p><strong>Email:</strong> {hospital.email}</p>
                  <p><strong>Phone:</strong> {hospital.phone || "N/A"}</p>
                  <p><strong>Address:</strong> {hospital.address}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}