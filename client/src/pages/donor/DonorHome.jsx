import { useNavigate } from "react-router-dom";
import './DonorHome.css';

export default function DonorHome() {
  const navigate = useNavigate();
  
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const isLoggedInDonor = token && role === "donor";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // ==========================================
  // VIEW 1: PUBLIC LANDING PAGE (Not Logged In)
  // ==========================================
  if (!isLoggedInDonor) {
    return (
      <div className="landing-layout">
        {/* Navbar with Login at Top Right */}
        <nav className="landing-nav">
          <div className="nav-brand">
            <span className="brand-icon">🩸</span>
            <h1>LifeLink</h1>
          </div>
          <button className="nav-login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        </nav>

        {/* Hero Section */}
        <main className="landing-container">
          <section className="hero-section">
            <h1>Give the Gift of Life</h1>
            <p className="hero-text">
              Every drop counts. By donating blood, you aren't just giving a part of yourself; 
              you are giving someone else a future. It is a simple, safe procedure that takes 
              less than an hour but provides a lifetime of hope for patients in need.
            </p>
            <button className="cta-btn" onClick={() => navigate("/register")}>
              Become a Donor
            </button>
          </section>

          {/* Info Cards (Paragraphs, not bullets) */}
          <section className="features-grid">
            <div className="feature-card">
              <h3>Why It Matters</h3>
              <p>
                Blood cannot be manufactured; it can only come from generous donors like you. 
                Your contribution ensures that hospitals have the necessary supply to treat 
                trauma patients, surgical cases, and those battling chronic illnesses.
              </p>
            </div>

            <div className="feature-card">
              <h3>Safe & Simple</h3>
              <p>
                Our donation process is streamlined for your comfort. From a quick health 
                screening to the final refreshment, we prioritize your well-being. 
                Most healthy adults between 18 and 60 are eligible to donate.
              </p>
            </div>

            <div className="feature-card">
              <h3>Community Impact</h3>
              <p>
                Join a network of everyday heroes. One single donation can save up to three lives. 
                Track your impact, see real-time needs, and be part of a movement that 
                keeps our community healthy and strong.
              </p>
            </div>
          </section>
        </main>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: LOGGED-IN DASHBOARD
  // ==========================================
  const donorStats = {
    bloodType: "O+",
    livesSaved: 3,
    lastDonation: "Oct 15, 2023",
    status: "Eligible"
  };

  return (
    <div className="dashboard-layout">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <span className="brand-icon">🩸</span>
          <h1>LifeLink</h1>
        </div>
        <div className="nav-user">
          <span>Welcome, Donor</span>
          <button onClick={handleLogout} className="logout-link">Logout</button>
        </div>
      </nav>

      <main className="dashboard-container">
        <div className="welcome-banner">
          <h2>Your Impact Dashboard</h2>
          <p>Thank you for being a hero. Manage your donations below.</p>
        </div>

        <div className="stats-row">
          <div className="stat-box">
            <span className="stat-label">Blood Type</span>
            <span className="stat-value">{donorStats.bloodType}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Lives Saved</span>
            <span className="stat-value">{donorStats.livesSaved}</span>
          </div>
          <div className="stat-box status-box">
            <span className="stat-label">Status</span>
            <span className="stat-value status-active">{donorStats.status}</span>
          </div>
        </div>

        <div className="action-row">
          <div className="action-card" onClick={() => navigate("/donor/book-donation")}>
            <h3>📅 Book Appointment</h3>
            <p>Schedule a visit to a nearby hospital.</p>
          </div>
          <div className="action-card secondary" onClick={() => navigate("/donor/history")}>
            <h3>📜 Donation History</h3>
            <p>View your past records.</p>
          </div>
        </div>
      </main>
    </div>
  );
}