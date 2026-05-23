  import { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import api from "../../api";
  import "./ApproveDonation.css";

  export default function ApproveDonation() {
    const navigate = useNavigate();
    const [donations, setDonations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchDonations = async () => {
        try {
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

    const handleReject = async (id) => {
      if (!window.confirm("Are you sure you want to reject this donation?")) return;

      try {
        await api.put(`/donations/${id}/reject`);
        setDonations((prev) => prev.filter((donation) => donation._id !== id));
        alert("Donation rejected.");
      } catch (err) {
        alert("Failed to reject donation.");
      }
    };

    const handleApprove = async (id) => {
      if (!window.confirm("Are you sure you want to approve this donation?")) return;

      try {
        await api.put(`/donations/${id}/approve`);
        setDonations((prev) => prev.filter((donation) => donation._id !== id));
        alert("Donation approved.");
      } catch (err) {
        alert("Failed to approve donation.");
      }
    };

    return (
      <div className="approval-layout">
        
        {/* FULL-WIDTH RED HEADER */}
        <header className="page-header">
          <div className="header-text">
            <h2>Pending Approvals</h2>

          </div>
          <button className="back-btn" onClick={() => navigate("/hospital-admin/home")}>
            Back to Dashboard
          </button>
        </header>

        {/* CENTERED TABLE CONTAINER */}
        <div className="approval-container">
          <div className="table-card">
            {isLoading ? (
              <div className="loading-state">Loading pending requests...</div>
            ) : donations.length === 0 ? (
              <div className="empty-state">
                <h3>No Pending Requests</h3>
                <p>There are currently no donation requests requiring approval.</p>
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
                            {d.donorId?.name?.charAt(0) || "D"}
                          </div>
                          {d.donorId?.name || "Unknown"}
                        </td>
                        <td>
                          <span className="blood-badge">{d.bloodGroup}</span>
                        </td>
                        <td className="text-muted">None</td>
                        <td className="text-muted">
                          {new Date(d.donationDate).toLocaleDateString()}
                        </td>
                        <td className="action-buttons">
                          <button
                            className="approve-btn"
                            onClick={() => handleApprove(d._id)}
                          >
                            Approve
                          </button>
                          <button
                            className="reject-btn"
                            onClick={() => handleReject(d._id)}
                          >
                            Reject
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