import { useNavigate } from "react-router-dom";
import "./WorkerHome.css";

export default function WorkerHome() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="worker-home-layout">
      <div className="worker-container">

        {/* Header Section */}
        <header className="dashboard-header">
          <div className="header-title">
            <h1>Worker Dashboard</h1>
            <p>Manage blood donation and inventory activities</p>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </header>

        {/* Dashboard Actions */}
        <main className="dashboard-grid">

          {/* Card 1: Complete Donations */}
          <div
            className="action-card"
            onClick={() => navigate("/worker/complete")}
          >
            <div className="icon-wrapper">
              <span>✓</span>
            </div>
            <h3>Complete Donations</h3>
            <p>
              View approved donations and mark them as completed
              with blood group and units.
            </p>
          </div>

          {/* Card 2: Manual Stock Update */}
          <div
            className="action-card"
            onClick={() => navigate("/worker/manual-stock")}
          >
            <div className="icon-wrapper">
              <span>🩸</span>
            </div>
            <h3>Manual Stock Update</h3>
            <p>
              Add blood units manually for special or emergency cases.
            </p>
          </div>

        </main>
      </div>
    </div>
  );
}
