import { useNavigate } from "react-router-dom";
import "./WorkerHome.css";

export default function WorkerHome() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="worker-layout">
      {/* Red Header Bar */}
      <header className="page-header">
        <div className="header-text">
          <h2>Worker Dashboard</h2>
          <p>Manage blood donation and inventory activities.</p>
        </div>
        <button className="back-btn" onClick={handleLogout}>Logout</button>
      </header>

      {/* Action Cards */}
      <main className="dashboard-container">
        <section className="actions-grid">
          <div className="action-card" onClick={() => navigate("/worker/complete")}>
            <div className="icon-wrapper blue">✓</div>
            <div className="card-content">
              <h3>Complete Donations</h3>
              <p>Process approved donations and record blood units.</p>
            </div>
          </div>

          <div className="action-card" onClick={() => navigate("/worker/manual-stock")}>
            <div className="icon-wrapper red">🩸</div>
            <div className="card-content">
              <h3>Manual Stock Update</h3>
              <p>Add blood units for emergency cases.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}