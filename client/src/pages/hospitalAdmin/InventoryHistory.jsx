import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import "./InventoryHistory.css";

export default function InventoryHistory() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get("/inventory/history");
        setHistory(res.data);
      } catch (err) {
        console.error("Failed to fetch inventory history");
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="history-layout">
      <div className="history-container">
        
        {/* Header Section */}
        <div className="page-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            &larr; Back
          </button>
          <div className="header-content">
            <h2>Inventory Log</h2>
            <p>Track all blood units added to the inventory.</p>
          </div>
        </div>

        {/* Table Section */}
        <div className="table-card">
          {isLoading ? (
            <div className="loading-state">Loading records...</div>
          ) : history.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📂</div>
              <h3>No History Found</h3>
              <p>No inventory movements have been recorded yet.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Date & Time</th>
                    <th>Blood Group</th>
                    <th>Units Added</th>
                    <th>Processed By</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((h) => (
                    <tr key={h._id}>
                      <td className="date-cell">
                        <span className="date">
                          {new Date(h.createdAt).toLocaleDateString()}
                        </span>
                        <span className="time">
                          {new Date(h.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </td>
                      <td>
                        {/* Visual Badge for Blood Group */}
                        <span className={`blood-badge ${h.bloodGroup?.replace('+', 'p').replace('-', 'n')}`}>
                          {h.bloodGroup}
                        </span>
                      </td>
                      <td className="units-cell">
                        <strong>+{h.unitsAdded}</strong> units
                      </td>
                      <td className="staff-cell">
                        <div className="staff-avatar">
                          {h.completedBy?.name?.charAt(0) || "S"}
                        </div>
                        {h.completedBy?.name || "Unknown Staff"}
                      </td>
                      <td>
                        <span className="status-badge success">Stocked</span>
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