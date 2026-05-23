import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api";
import './HospitalAdminHome.css';

export default function HospitalAdminHome() {
  const navigate = useNavigate();
  const [incomingRequest, setIncomingRequest] = useState(null);
  
  // Dynamic stats state initialized to 0
  const [stats, setStats] = useState({
    pendingApprovals: 0,
    activeWorkers: 0,
    totalDonations: 0
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  // Fetch Stats dynamically
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const hospitalId = localStorage.getItem("hospitalId");
        const res = await api.get(`/hospital-admin/stats?hospitalId=${hospitalId}`);
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      }
    };
    fetchStats();
  }, []);

  const rejectRequest = (request) => {
    const rejectedRequests = JSON.parse(localStorage.getItem("rejectedRequests")) || {};
    rejectedRequests[request._id] = Date.now() + 5 * 60 * 1000;
    localStorage.setItem("rejectedRequests", JSON.stringify(rejectedRequests));
    setIncomingRequest(null);
  };

  // Check incoming request every 5 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await api.get(`/blood/incoming?hospitalId=${localStorage.getItem("hospitalId")}`);
        if (res.data.request) {
          const rejectedRequests = JSON.parse(localStorage.getItem("rejectedRequests")) || {};
          const rejectedUntil = rejectedRequests[res.data.request._id];
          
          if (rejectedUntil && Date.now() < rejectedUntil) return;
          
          setIncomingRequest(res.data.request);
        } else {
          setIncomingRequest(null);
        }
      } catch (err) {
        // Suppress polling logs in production
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const acceptRequest = async (requestId) => {
    try {
      await api.post("/blood/accept", {
        requestId,
        hospitalId: localStorage.getItem("hospitalId"),
      });
      setIncomingRequest(null);
      navigate(`/hospital-admin/route-map/${requestId}`);
    } catch (err) {
      alert("Failed to accept");
    }
  };

  return (
    <div className="hospital-layout">
      {/* 🔴 POPUP */}
      {incomingRequest && (
        <div className="popup-overlay">
          <div className="popup-card">
            <h3>Incoming Blood Request</h3>
            <div className="popup-details">
              <p><strong>Hospital:</strong> {incomingRequest.requestedBy?.name}</p>
              <p><strong>Blood Group:</strong> {incomingRequest.bloodGroup}</p>
              <p><strong>Units Needed:</strong> {incomingRequest.units}</p>
            </div>
            <div className="popup-actions">
              <button className="reject-btn" onClick={() => rejectRequest(incomingRequest)}>Reject</button>
              <button className="accept-btn" onClick={() => acceptRequest(incomingRequest._id)}>Accept</button>
            </div>
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <nav className="hospital-nav">
        <div className="nav-brand">
          <div className="brand-logo">H</div>
          <h1>Hospital Portal</h1>
        </div>
        <div className="nav-user">
          <span className="user-role">Hospital Administrator</span>
          {/* New Profile Button */}
          <button onClick={() => navigate("/hospital-admin/profile")} className="profile-btn">
            Profile
          </button>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>

      <main className="dashboard-container">
        <header className="dashboard-header">
          <h2>Dashboard Overview</h2>
          <p>Manage your facility's donations, staff, and inventory logs.</p>
        </header>

        {/* Dynamic Stats Grid */}
        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-value highlight-red">{stats.pendingApprovals}</div>
            <div className="stat-label">Pending Approvals</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.activeWorkers}</div>
            <div className="stat-label">Active Workers</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.totalDonations}</div>
            <div className="stat-label">Total Donations</div>
          </div>
        </section>

        <h3 className="section-title">Management Tools</h3>
        <section className="actions-grid">
          <div className="action-card" onClick={() => navigate("/hospital-admin/approve")}>
            <div className="icon-wrapper red-theme">✔</div>
            <div className="card-content">
              <h3>Approve Donations</h3>
              <p>Review pending blood donation requests.</p>
            </div>
          </div>

          <div className="action-card" onClick={() => navigate("/hospital-admin/create-worker")}>
            <div className="icon-wrapper red-theme">👤</div>
            <div className="card-content">
              <h3>Create Worker</h3>
              <p>Register new staff members.</p>
            </div>
          </div>

          <div className="action-card" onClick={() => navigate("/hospital-admin/inventory-history")}>
            <div className="icon-wrapper red-theme">📋</div>
            <div className="card-content">
              <h3>Inventory History</h3>
              <p>View stock logs.</p>
            </div>
          </div>

          <div className="action-card" onClick={() => navigate("/hospital-admin/blood-stock")}>
            <div className="icon-wrapper red-theme">🩸</div>
            <div className="card-content">
              <h3>Blood Stock</h3>
              <p>View available blood units.</p>
            </div>
          </div>

          <div className="action-card" onClick={() => navigate("/hospital-admin/request-blood")}>
            <div className="icon-wrapper red-theme">🚨</div>
            <div className="card-content">
              <h3>Request Blood</h3>
              <p>Send blood request to nearby hospitals.</p>
            </div>
          </div>
          
          <div className="action-card" onClick={() => navigate("/hospital-admin/request-status")}>
            <div className="icon-wrapper red-theme">📍</div>
            <div className="card-content">
              <h3>Active Requests</h3>
              <p>Track ongoing blood transfers and deliveries.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}