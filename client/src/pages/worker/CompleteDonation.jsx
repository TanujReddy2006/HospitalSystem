import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Added for navigation
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

    if (!units || units <= 0) {
      alert("Please enter a valid number of units.");
      return;
    }

    if (!bloodGroup) {
      alert("Please verify and select the blood group.");
      return;
    }

    try {
      await api.put(`/donations/${id}/complete`, {
        units: Number(units),
        bloodGroup
      });

      setDonations((prev) => prev.filter((d) => d._id !== id));
      alert("Inventory updated successfully!");
    } catch (err) {
      alert("Failed to complete donation. Please try again.");
    }
  };

  return (
    <div className="worker-layout">
      <div className="worker-container">
        
        {/* Header Section */}
        <div className="page-header">
          <button className="back-btn" onClick={() => navigate("/worker")}>
            &larr; Dashboard
          </button>
          <h2>Process Donations</h2>
          <p>Verify blood details and update inventory units.</p>
        </div>

        {/* Content Section */}
        {isLoading ? (
          <div className="loading-state">Loading tasks...</div>
        ) : donations.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">✅</div>
            <h3>All Caught Up!</h3>
            <p>No approved donations waiting for processing.</p>
          </div>
        ) : (
          <div className="donation-grid">
            {donations.map((d) => (
              <div key={d._id} className="donation-card">
                
                {/* Card Header */}
                <div className="card-header">
                  <div className="donor-avatar">
                    {d.donorId?.name?.charAt(0) || "D"}
                  </div>
                  <div className="donor-info">
                    <h3>{d.donorId?.name || "Unknown Donor"}</h3>
                    <span className="info-badge">
                      Original: <strong>{d.bloodGroup}</strong>
                    </span>
                  </div>
                </div>

                {/* Card Body (Inputs) */}
                <div className="card-body">
                  <div className="input-group">
                    <label>Verify Blood Group</label>
                    <div className="select-wrapper">
                      <select
                        className="form-input"
                        value={bloodGroupMap[d._id] || ""}
                        onChange={(e) =>
                          setBloodGroupMap({
                            ...bloodGroupMap,
                            [d._id]: e.target.value
                          })
                        }
                      >
                        <option value="">-- Select --</option>
                        {BLOOD_GROUPS.map((bg) => (
                          <option key={bg} value={bg}>{bg}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Units Collected (ml/bag)</label>
                    <input
                      className="form-input"
                      type="number"
                      min="1"
                      placeholder="e.g. 1"
                      value={unitsMap[d._id] || ""}
                      onChange={(e) =>
                        setUnitsMap({
                          ...unitsMap,
                          [d._id]: e.target.value
                        })
                      }
                    />
                  </div>
                </div>

                {/* Card Footer (Action) */}
                <div className="card-footer">
                  <button
                    className="complete-btn"
                    onClick={() => handleComplete(d._id)}
                  >
                    Confirm & Update Stock
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}