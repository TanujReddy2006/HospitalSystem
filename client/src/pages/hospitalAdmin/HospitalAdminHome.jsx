import { useNavigate } from "react-router-dom";
import './HospitalAdminHome.css';

export default function HospitalAdminHome() {
  const navigate = useNavigate();

  // Placeholder stats to make the dashboard look realistic
  const stats = {
    pendingApprovals: 12,
    activeWorkers: 8,
    totalDonations: 145
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="hospital-layout">
      {/* 1. Top Navigation */}
      <nav className="hospital-nav">
        <div className="nav-brand">
          <div className="brand-logo">H</div>
          <h1>Hospital Portal</h1>
        </div>
        <div className="nav-user">
          <span className="user-role">Hospital Administrator</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>

      <main className="dashboard-container">
        {/* 2. Welcome & Stats */}
        <header className="dashboard-header">
          <h2>Dashboard Overview</h2>
          <p>Manage your facility's donations and staff members.</p>
        </header>

        <section className="stats-grid">
          <div className="stat-card urgent">
            <div className="stat-value">{stats.pendingApprovals}</div>
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

        {/* 3. Action Cards */}
        <h3 className="section-title">Management Tools</h3>
        <section className="actions-grid">
          
          {/* Card 1: Approve Donations */}
          <div 
            className="action-card" 
            onClick={() => navigate("/hospital-admin/approve")}
          >
            <div className="icon-wrapper green">
              {/* Checkmark Clipboard Icon */}
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                <path d="M9 14l2 2 4-4"></path>
              </svg>
            </div>
            <div className="card-content">
              <h3>Approve Donations</h3>
              <p>Review pending blood donation requests and update inventory.</p>
              <span className="link-text">Review Queue &rarr;</span>
            </div>
          </div>

          {/* Card 2: Create Worker */}
          <div 
            className="action-card" 
            onClick={() => navigate("/hospital-admin/create-worker")}
          >
            <div className="icon-wrapper teal">
              {/* User Plus Icon */}
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <line x1="20" y1="8" x2="20" y2="14"></line>
                <line x1="23" y1="11" x2="17" y2="11"></line>
              </svg>
            </div>
            <div className="card-content">
              <h3>Create Worker</h3>
              <p>Register new staff members to handle daily operations.</p>
              <span className="link-text">Add Staff &rarr;</span>
            </div>
          </div>

        </section>
      </main>
    </div>
  );
}