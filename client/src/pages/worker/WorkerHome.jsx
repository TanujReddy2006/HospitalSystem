  import { useNavigate } from "react-router-dom";
  import "./WorkerHome.css"; // Ensure you import the CSS file

  export default function WorkerHome() {
    const navigate = useNavigate();

    const handleLogout = () => {
      // Add any token clearing logic here if needed (e.g., localStorage.removeItem('token'))
      navigate("/");
    };

    return (
      <div className="worker-home-layout">
        <div className="worker-container">
          
          {/* Header Section */}
          <header className="dashboard-header">
            <div className="header-title">
              <h1>Worker Dashboard</h1>
              <p>Manage blood donation activities</p>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </header>

          {/* Dashboard Actions Grid */}
          <main className="dashboard-grid">
            
            {/* Card 1: Complete Donations */}
            <div 
              className="action-card" 
              onClick={() => navigate("/worker/complete")}
            >
              <div className="icon-wrapper">
                {/* Simple Unicode checkmark, or replace with an SVG icon */}
                <span>✓</span> 
              </div>
              <h3>Complete Donations</h3>
              <p>View approved donations and mark them as completed.</p>
            </div>

            {/* You can add more cards here in the future, e.g., "View History" */}
            
          </main>
        </div>
      </div>
    );
  }