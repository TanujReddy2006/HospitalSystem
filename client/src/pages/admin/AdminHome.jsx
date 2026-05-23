import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminHome.css";

export default function AdminHome() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalHospitals: 0,
    totalAdmins: 0,
    pendingRequests: 0
  });

  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/admin/dashboard-stats",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setStats(response.data);

    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-layout">
      {/* HEADER */}
      <header className="page-header">
        <div className="header-text">
          <h2>Admin Portal</h2>
          <p>System Overview & Administrative Controls</p>
        </div>

        <button className="back-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main className="dashboard-container">

        {/* STATS */}
        <section className="stats-grid">

          <div className="stat-card">
            <div className="stat-value">
              {loading ? "..." : stats.totalHospitals}
            </div>
            <div className="stat-label">
              Active Hospitals
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-value">
              {loading ? "..." : stats.totalAdmins}
            </div>
            <div className="stat-label">
              Registered Admins
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-value">
              {loading ? "..." : stats.pendingRequests}
            </div>
            <div className="stat-label">
              Pending Requests
            </div>
          </div>

        </section>

        {/* ACTIONS */}
        <h3 className="section-title">
          Quick Actions
        </h3>

        <section className="actions-grid">

          <div
            className="action-card"
            onClick={() => navigate("/admin/create-hospital")}
          >
            <div className="icon-wrapper blue">🏥</div>

            <div className="card-content">
              <h3>Add New Hospital</h3>
              <p>Register a new medical facility.</p>
            </div>
          </div>

          <div
            className="action-card"
            onClick={() => navigate("/admin/create-hospital-admin")}
          >
            <div className="icon-wrapper purple">👤</div>

            <div className="card-content">
              <h3>Create Admin</h3>
              <p>Assign a new administrator.</p>
            </div>
          </div>

          <div
            className="action-card"
            onClick={() => navigate("/admin/hospitals")}
          >
            <div className="icon-wrapper green">📋</div>

            <div className="card-content">
              <h3>View Hospitals</h3>
              <p>Browse registered facilities.</p>
            </div>
          </div>

        </section>
      </main>
    </div>
  );
}