import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import "./CompleteDonation.css";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function CompleteDonation() {
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const [unitsMap, setUnitsMap] = useState({});
  const [bloodGroupMap, setBloodGroupMap] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApproved = async () => {
      try {
        const res = await api.get("/donations/approved");
        setDonations(res.data);
      } catch (err) {
        console.error("Error fetching tasks", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchApproved();
  }, []);

  const handleComplete = async (id) => {
    const units = unitsMap[id];
    const bloodGroup = bloodGroupMap[id];

    if (!units || units <= 0) return alert("Please enter valid units.");
    if (!bloodGroup) return alert("Please select a blood group.");

    try {
      await api.put(`/donations/${id}/complete`, { units: Number(units), bloodGroup });
      setDonations((prev) => prev.filter((d) => d._id !== id));
      alert("Inventory updated successfully!");
    } catch (err) {
      alert("Failed to complete donation.");
    }
  };

  return (
    <div className="worker-layout">
      {/* Red Header Bar */}
      <header className="page-header">
        <div className="header-text">
          <h2>Process Donations</h2>
          <p>Verify blood details and update inventory units.</p>
        </div>
        <button className="back-btn" onClick={() => navigate("/worker/home")}>Back to Dashboard</button>
      </header>

      <main className="donation-container">
        {isLoading ? (
          <div className="loading-state">Loading tasks...</div>
        ) : donations.length === 0 ? (
          <div className="empty-state">All caught up! No approved donations waiting.</div>
        ) : (
          <div className="donation-grid">
            {donations.map((d) => (
              <div key={d._id} className="donation-card">
                <div className="card-header">
                  <h3>{d.donorId?.name || "Unknown Donor"}</h3>
                  <span className="info-badge">Original: {d.bloodGroup}</span>
                </div>
                
                <div className="card-body">
                  <div className="input-group">
                    <label>Verify Blood Group</label>
                    <select value={bloodGroupMap[d._id] || ""} onChange={(e) => setBloodGroupMap({...bloodGroupMap, [d._id]: e.target.value})}>
                      <option value="">-- Select --</option>
                      {BLOOD_GROUPS.map((bg) => <option key={bg} value={bg}>{bg}</option>)}
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Units Collected</label>
                    <input type="number" placeholder="e.g. 1" value={unitsMap[d._id] || ""} onChange={(e) => setUnitsMap({...unitsMap, [d._id]: e.target.value})} />
                  </div>
                </div>

                <button className="complete-btn" onClick={() => handleComplete(d._id)}>Confirm & Update Stock</button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}