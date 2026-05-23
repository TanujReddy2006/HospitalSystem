import { useEffect, useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import './RequestStatus.css';

export default function RequestStatus() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchRequests();
    }, 3000);
    fetchRequests();
    return () => clearInterval(interval);
  }, []);

  const fetchRequests = async () => {
    try {
      const hospitalId = localStorage.getItem("hospitalId");
      const res = await api.get(`/blood/my-requests/${hospitalId}`);
      setRequests(res.data.requests);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelRequest = async (requestId) => {
    try {
      await api.post("/blood/cancel-request", { requestId });
      fetchRequests();
    } catch (error) {
      alert("Failed to cancel");
    }
  };

  return (
    <div className="request-status-page">
      {/* Red Header Bar */}
      <header className="page-header">
        <div className="header-text">
          <h2>Active Blood Requests</h2>
          <p>Monitor your current donation requests.</p>
        </div>
        <button className="back-btn" onClick={() => navigate("/hospital-admin/home")}>
          Back to Dashboard
        </button>
      </header>

      {/* Main Content */}
      <main className="request-container">
        {requests.length === 0 ? (
          <div className="empty-state">No active requests found.</div>
        ) : (
          requests.map((request) => (
            <div key={request._id} className="request-card">
              <div className="card-info">
                <h3>{request.bloodGroup} Blood</h3>
                <p>Units: <strong>{request.units}</strong></p>
                <p>Status: <span className={`status-tag ${request.status}`}>{request.status}</span></p>
              </div>

              {request.acceptedBy && (
                <div className="accepted-box">
                  <h4>Accepted Hospital</h4>
                  <p>{request.acceptedBy.name}</p>
                  <p>{request.acceptedBy.address}</p>
                  <p>{request.acceptedBy.phone}</p>
                  <button className="route-btn" onClick={() => navigate(`/hospital-admin/route-map/${request._id}`)}>
                    View Route
                  </button>
                </div>
              )}

              {request.status === "pending" && (
                <button className="cancel-btn" onClick={() => cancelRequest(request._id)}>
                  Cancel Request
                </button>
              )}
            </div>
          ))
        )}
      </main>
    </div>
  );
}