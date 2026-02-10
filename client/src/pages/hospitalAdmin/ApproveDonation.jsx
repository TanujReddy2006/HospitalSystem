import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import './ApproveDonation.css';

export default function ApproveDonation() {
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Fetch Pending Donations on Load
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        // Assuming endpoint returns only status="pending" or we filter it
        const res = await api.get("/donations/pending"); 
        setDonations(res.data);
      } catch (err) {
        console.error("Error fetching donations", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDonations();
  }, []);

  // 2. Handle Approval
  const handleApprove = async (id) => {
    if (!window.confirm("Are you sure you want to approve this donation?")) return;

    try {
      await api.put(`/donations/${id}/approve`);
      
      // UI Update: Remove the approved item from the list immediately
      setDonations((prev) => prev.filter((donation) => donation._id !== id));
      alert("Donation approved and inventory updated.");
    } catch (err) {
      alert("Failed to approve donation.");
    }
  };

  return (
    <div className="approval-layout">
      <div className="approval-container">
        {/* Header */}
        <div className="page-header">
          <button className="back-btn" onClick={() => navigate("/hospital-admin")}>
            &larr; Dashboard
          </button>
          <h2>Pending Approvals</h2>
          <p>Review and accept blood donations from donors.</p>
        </div>

        {/* Content Area */}
        <div className="table-card">
          {isLoading ? (
            <div className="loading-state">Loading pending requests...</div>
          ) : donations.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">✅</div>
              <h3>All Caught Up!</h3>
              <p>There are no pending donation requests at this time.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="approval-table">
                <thead>
                  <tr>
                    <th>Donor Name</th>
                    <th>Blood Group</th>
                    <th>Disease</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((d) => (
                    <tr key={d._id}>
                      <td className="donor-name">
                        <div className="avatar-circle">
                          {d.donorName?.charAt(0) || "D"}
                        </div>
                        {d.donorName || "Unknown Donor"}
                      </td>
                      <td>
                        <span className={`blood-badge ${d.bloodGroup?.replace('+', 'p').replace('-', 'n')}`}>
                          {d.bloodGroup}
                        </span>
                      </td>
                      <td className="text-muted">{d.disease || "None"}</td>
                      <td className="text-muted">
                        {new Date(d.date).toLocaleDateString()}
                      </td>
                      <td>
                        <button 
                          className="approve-btn"
                          onClick={() => handleApprove(d._id)}
                        >
                          Approve
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}