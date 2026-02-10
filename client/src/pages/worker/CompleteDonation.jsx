import { useEffect, useState } from "react";
import api from "../../api";
import "./CompleteDonation.css"; // Import the CSS file

export default function CompleteDonation() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchApproved = async () => {
      try {
        const res = await api.get("/donations/approved"); // Ensure this endpoint returns only approved donations
        setDonations(res.data);
      } catch (err) {
        console.error("Failed to fetch donations", err);
      }
    };
    fetchApproved();
  }, []);

  const handleComplete = async (id) => {
    if (!window.confirm("Are you sure you want to mark this donation as completed?")) return;

    try {
      await api.put(`/donations/${id}/complete`);
      setDonations((prev) => prev.filter((d) => d._id !== id));
      // Optional: replace alert with a toast notification if available
      alert("Donation marked as completed");
    } catch (err) {
      alert("Failed to update status");
    }
  };

  return (
    <div className="complete-layout">
      <div className="complete-container">
        
        <div className="page-header">
          <h2>Approved Donations</h2>
          <p>Mark donations as completed once the process is finished.</p>
        </div>

        {donations.length === 0 ? (
          <div className="empty-state">
            <p>No approved donations pending completion.</p>
          </div>
        ) : (
          <div className="donation-grid">
            {donations.map((d) => (
              <div key={d._id} className="donation-card">
                
                <div className="card-header">
                  <span className="blood-badge">{d.bloodGroup}</span>
                  {/* You could add a date here if available, e.g., <small>Today</small> */}
                </div>

                <div className="donor-info">
                  <h3>{d.donorId?.name || "Unknown Donor"}</h3>
                  <p>Donor ID: {d.donorId?._id?.slice(-6) || "N/A"}</p>
                </div>

                <button 
                  className="complete-btn" 
                  onClick={() => handleComplete(d._id)}
                >
                  Mark Completed
                </button>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}