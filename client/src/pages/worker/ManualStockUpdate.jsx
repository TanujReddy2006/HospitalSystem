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
      await api.post("/inventory/add", {
        bloodGroup,
        units: Number(units)
      });

      alert("Stock updated successfully!");
      // Reset form
      setBloodGroup("");
      setUnits("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update stock");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="update-layout">
      <div className="update-card">
        {/* Header */}
        <div className="form-header">
          <button className="back-btn" onClick={() => navigate("/hospital-admin")}>
            &larr; Dashboard
          </button>
          <h2>Manual Stock Adjustment</h2>
          <p>Directly add blood units to inventory (e.g., from camps).</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="update-form">
          <div className="form-group">
            <label htmlFor="bloodGroup">Blood Group</label>
            <div className="select-wrapper">
              <select
                id="bloodGroup"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                required
              >
                <option value="">-- Select Type --</option>
                {BLOOD_GROUPS.map((bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="units">Quantity (Units)</label>
            <input
              id="units"
              type="number"
              min="1"
              placeholder="e.g. 10"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              required
            />
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => navigate("/hospital-admin")}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Add to Stock"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}