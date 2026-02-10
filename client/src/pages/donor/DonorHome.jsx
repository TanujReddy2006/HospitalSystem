import { useNavigate } from "react-router-dom";
import './DonorHome.css';

export default function DonorHome() {
  const navigate = useNavigate();

  // Placeholder data - In real app, fetch this from API
  const donorStats = {
    bloodType: "O+",
    livesSaved: 3,
    lastDonation: "2023-10-15",
    nextEligibleDate: "Available Now"
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="donor-layout">
      {/* 1. Navigation Bar */}
      <nav className="donor-nav">
        <div className="nav-brand">
          <span className="brand-icon">🩸</span>
          <h1>LifeLink</h1>
        </div>
        <div className="nav-profile">
          <span className="welcome-text">Welcome, Donor</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>

      <main className="donor-container">
        {/* 2. Welcome & Status Section */}
        <header className="donor-header">
          <h2>Your Impact Dashboard</h2>
          <p>Thank you for being a hero. Here is your donation summary.</p>
        </header>

        {/* 3. Stats Grid */}
        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🩸</div>
            <div className="stat-info">
              <h3>{donorStats.bloodType}</h3>
              <p>Blood Type</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">❤️</div>
            <div className="stat-info">
              <h3>{donorStats.livesSaved}</h3>
              <p>Lives Saved</p>
            </div>
          </div>

          <div className="stat-card highlight">
            <div className="stat-icon">📅</div>
            <div className="stat-info">
              <h3>{donorStats.nextEligibleDate}</h3>
              <p>Status</p>
            </div>
          </div>
        </section>

        {/* 4. Main Actions */}
        <h3 className="section-title">What would you like to do?</h3>
        <section className="actions-grid">
          
          {/* Primary Action: Book Donation */}
          <div 
            className="action-card primary" 
            onClick={() => navigate("/donor/book-donation")}
          >
            <div className="action-icon-wrapper">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <div className="action-content">
              <h3>Book Appointment</h3>
              <p>Find a hospital and schedule your next donation.</p>
              <span className="action-link">Book Now &rarr;</span>
            </div>
          </div>

          {/* Secondary Action: History (Placeholder) */}
          <div className="action-card secondary">
            <div className="action-icon-wrapper">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <div className="action-content">
              <h3>Donation History</h3>
              <p>View your past donations and medical reports.</p>
              <span className="action-link">View Records &rarr;</span>
            </div>
          </div>

        </section>
      </main>
    </div>
  );
}