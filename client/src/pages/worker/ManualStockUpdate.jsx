import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import "./ManualStockUpdate.css";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function ManualStockUpdate() {
  const navigate = useNavigate();
  const [bloodGroup, setBloodGroup] = useState("");
  const [units, setUnits] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bloodGroup || !units || units <= 0) {
      alert("Please select a blood group and enter valid units.");
      return;
    }
    setIsLoading(true);
    try {
      await api.post("/inventory/add", { bloodGroup, units: Number(units) });
      alert("Stock updated successfully!");
      setBloodGroup(""); setUnits("");
      navigate("/hospital-admin/home");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update stock");
    } finally { setIsLoading(false); }
  };

  return (
    <div className="update-layout">
      {/* Red Header Bar */}
      <header className="page-header">
        <div className="header-text">
          <h2>Manual Stock Adjustment</h2>
          <p>Directly add blood units to inventory.</p>
        </div>
        <button className="back-btn" onClick={() => navigate("/worker/home")}>Back to Dashboard</button>
      </header>

      {/* Main Container */}
      <main className="form-container">
        <div className="update-card">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Blood Group</label>
              <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} required>
                <option value="">-- Select Type --</option>
                {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
              </select>
            </div>

            <div className="input-group">
              <label>Quantity (Units)</label>
              <input type="number" min="1" placeholder="e.g. 10" value={units} onChange={(e) => setUnits(e.target.value)} required />
            </div>

            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? "Updating..." : "Add to Stock"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}