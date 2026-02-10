import { useNavigate } from "react-router-dom";

export default function WorkerHome() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Worker Home</h2>

      <button onClick={() => navigate("/worker/complete")}>
        Complete Donation
      </button>

      <button onClick={() => navigate("/")}>
        Logout
      </button>
    </div>
  );
}
