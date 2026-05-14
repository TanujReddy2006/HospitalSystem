import { useEffect, useState } from "react";
import api from "../../api";
import './RequestStatus.css';
import { useNavigate } from "react-router-dom";
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

      const hospitalId =
        localStorage.getItem("hospitalId");

      const res = await api.get(
        `/blood/my-requests/${hospitalId}`
      );

      setRequests(res.data.requests);

    } catch (error) {

      console.log(error);
    }
  };

  const cancelRequest = async (requestId) => {

    try {

      await api.post(
        "/blood/cancel-request",
        { requestId }
      );

      fetchRequests();

    } catch (error) {

      alert("Failed to cancel");
    }
  };

  return (

    <div className="request-status-page">

      <h1>Active Blood Requests</h1>

      {requests.length === 0 && (
        <p>No active requests</p>
      )}

      {requests.map((request) => (

        <div
          key={request._id}
          className="request-card"
        >

          <h3>
            {request.bloodGroup} Blood
          </h3>

          <p>
            Units: {request.units}
          </p>

          <p>
            Status:
            <strong>
              {request.status}
            </strong>
          </p>

          {request.acceptedBy && (

  <div className="accepted-box">

    <h4>
      Accepted Hospital
    </h4>

    <p>
      {request.acceptedBy.name}
    </p>

    <p>
      {request.acceptedBy.address}
    </p>

    <p>
      {request.acceptedBy.phone}
    </p>

    <button
  onClick={() => {

    navigate(
      `/hospital-admin/route-map/${request._id}`
    );
  }}
>
  View Route
</button> 

  </div>
)}

          {request.status === "pending" && (

            <button
              onClick={() =>
                cancelRequest(
                  request._id
                )
              }
            >
              Cancel Request
            </button>
          )}

        </div>
      ))}

    </div>
  );
}