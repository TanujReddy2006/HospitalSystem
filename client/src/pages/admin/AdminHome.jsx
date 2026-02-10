import { useNavigate } from "react-router-dom";
import './AdminHome.css';

export default function AdminHome() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear data and redirect
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="admin-layout">
      {/* Top Navigation Bar */}
      <nav className="admin-nav">
        <div className="nav-brand">
          <h1>AdminPortal</h1>
        </div>
        <div className="nav-user">
          <span className="user-badge">System Administrator</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>

      {/* Main Dashboard Content */}
      <main className="dashboard-container">
        <header className="dashboard-header">
          <h2>Dashboard Overview</h2>
          <p>Manage hospitals, administrators, and system settings.</p>
        </header>

        {/* Quick Stats Section (Placeholders for future data) */}
        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">12</div>
            <div className="stat-label">Active Hospitals</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">45</div>
            <div className="stat-label">Registered Admins</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">8</div>
            <div className="stat-label">Pending Requests</div>
          </div>
        </section>

        {/* Primary Actions Grid */}
        <h3 className="section-title">Quick Actions</h3>
        <section className="actions-grid">
          
          {/* Card 1: Create Hospital */}
          <div 
            className="action-card" 
            onClick={() => navigate("/admin/create-hospital")}
          >
            <div className="icon-wrapper blue">
              {/* Hospital Icon SVG */}
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20m-5-5h10M4 7h16M9 2v20m6-20v20" />
              </svg>
            </div>
            <div className="card-content">
              <h3>Add New Hospital</h3>
              <p>Register a new medical facility into the system.</p>
            </div>
          </div>

          {/* Card 2: Create Admin */}
          <div 
            className="action-card" 
            onClick={() => navigate("/admin/create-hospital-admin")}
          >
            <div className="icon-wrapper purple">
              {/* User Plus Icon SVG */}
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <line x1="20" y1="8" x2="20" y2="14" />
                <line x1="23" y1="11" x2="17" y2="11" />
              </svg>
            </div>
            <div className="card-content">
              <h3>Create Hospital Admin</h3>
              <p>Assign an administrator to manage a specific hospital.</p>
            </div>
          </div>

        </section>
      </main>
    </div>
  );
}