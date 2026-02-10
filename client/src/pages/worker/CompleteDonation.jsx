import { useState } from "react";
import api from "../../api";

export default function CompleteDonation() {
  const [donationId, setDonationId] = useState("");

  const handleComplete = async () => {
    await api.put(`/donations/${donationId}/complete`);
    alert("Donation completed");
  };

  return (
    <div>
      <h2>Complete Donation</h2>
      <input placeholder="Donation ID" onChange={e => setDonationId(e.target.value)} />
      <button onClick={handleComplete}>Complete</button>
    </div>
  );
}
