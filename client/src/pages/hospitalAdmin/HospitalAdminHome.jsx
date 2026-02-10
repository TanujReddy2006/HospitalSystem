import { useNavigate } from "react-router-dom";
import './HospitalAdminHome.css';

export default function HospitalAdminHome() {
  const navigate = useNavigate();

  // Placeholder stats
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
          <p>Manage your facility's donations, staff, and inventory logs.</p>
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
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                <path d="M9 14l2 2 4-4"></path>
              </svg>
            </div>
            <div className="card-content">
              <h3>Approve Donations</h3>
              <p>Review pending blood donation requests.</p>
              <span className="link-text">Review Queue &rarr;</span>
            </div>
          </div>

          {/* Card 2: Create Worker */}
          <div 
            className="action-card" 
            onClick={() => navigate("/hospital-admin/create-worker")}
          >
            <div className="icon-wrapper teal">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <line x1="20" y1="8" x2="20" y2="14"></line>
                <line x1="23" y1="11" x2="17" y2="11"></line>
              </svg>
            </div>
            <div className="card-content">
              <h3>Create Worker</h3>
              <p>Register new staff members for operations.</p>
              <span className="link-text">Add Staff &rarr;</span>
            </div>
          </div>

          {/* Card 3: Inventory History (NEW) */}
          <div 
            className="action-card" 
            onClick={() => navigate("/hospital-admin/inventory-history")}
          >
            <div className="icon-wrapper blue">
              {/* Clipboard List / History Icon */}
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <div className="card-content">
              <h3>Inventory History</h3>
              <p>View logs of all blood units added to stock.</p>
              <span className="link-text">View Logs &rarr;</span>
            </div>
          </div>
          <div 
  className="action-card" 
  onClick={() => navigate("/hospital-admin/blood-stock")}
>
  <div className="icon-wrapper red">
    {/* Blood Drop Icon */}
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"></path>
    </svg>
  </div>

  <div className="card-content">
    <h3>Blood Stock</h3>
    <p>View available blood units by blood group.</p>
    <span className="link-text">View Stock &rarr;</span>
  </div>
</div>  

        </section>
      </main>
    </div>
  );
}