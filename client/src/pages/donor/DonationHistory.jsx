import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import "./DonationHistory.css";

export default function DonationHistory() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get("/donations/my-history");
        setHistory(res.data);
      } catch (err) {
        console.error("Failed to fetch history", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // Helper to style status badges
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "completed": return "status-completed";
      case "approved": return "status-approved";
      case "rejected": return "status-rejected";
      default: return "status-pending";
    }
  };

  return (
    <div className="history-layout">
      <div className="history-container">
        
        {/* Header */}
        <div className="page-header">
          <button className="back-btn" onClick={() => navigate("/donor")}>
            &larr; Back to Dashboard
          </button>
          <div className="header-content">
            <h2>My Donation Journey</h2>
            <p>A record of the lives you've impacted.</p>
          </div>
        </div>

        {/* Content */}
        <div className="history-card">
          {loading ? (
            <div className="loading-state">Loading records...</div>
          ) : history.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🩸</div>
              <h3>No Donations Yet</h3>
              <p>You haven't made a donation request yet. Book your first appointment today!</p>
              <button className="book-btn" onClick={() => navigate("/donor/book-donation")}>
                Book Now
              </button>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Hospital</th>
                    <th>Blood Group</th>
                    <th>Units Given</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((d) => (
                    <tr key={d._id}>
                      <td className="date-cell">
                        {new Date(d.createdAt).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="hospital-cell">
                        {d.hospitalId?.name || "Unknown Hospital"}
                        <span className="hospital-addr">{d.hospitalId?.address}</span>
                      </td>
                      <td>
                        <span className="blood-badge">{d.bloodGroup}</span>
                      </td>
                      <td className="units-cell">
                        {d.unitsCollected ? `${d.unitsCollected} ml` : "-"}
                      </td>
                      <td>
                        <span className={`status-badge ${getStatusClass(d.status)}`}>
                          {d.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}   