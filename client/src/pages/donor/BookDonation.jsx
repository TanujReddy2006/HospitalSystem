import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import './BookDonation.css';

export default function BookDonation() {
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hospitalId, setHospitalId] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [donationDate, setDonationDate] = useState("");

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const res = await api.get("/hospitals");
        setHospitals(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching hospitals", err);
        setLoading(false);
      }
    };
    fetchHospitals();
  }, []);

  const handleBook = async (e) => {
    e.preventDefault();
    if (!hospitalId || !bloodGroup || !donationDate) {
      alert("Please fill in all fields");
      return;
    }
    try {
      await api.post("/donations", { hospitalId, bloodGroup, date: donationDate });
      alert("Donation appointment booked successfully!");
      navigate("/donor/home");
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="booking-layout">
      {/* Red Header Bar */}
      <header className="page-header">
        <div className="header-text">
          <h2>Schedule Donation</h2>
          <p>Choose a location and time to save a life.</p>
        </div>
        <button className="back-btn" onClick={() => navigate("/donor/home")}>
          Back to Dashboard
        </button>
      </header>

      {/* Main Container */}
      <main className="booking-container">
        <div className="booking-card">
          <form onSubmit={handleBook}>
            <div className="input-group">
              <label>Select Hospital</label>
              <select value={hospitalId} onChange={(e) => setHospitalId(e.target.value)} required>
                <option value="">-- Choose a location --</option>
                {hospitals.map((h) => (
                  <option key={h._id} value={h._id}>{h.name} ({h.address})</option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label>Your Blood Group</label>
              <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} required>
                <option value="">-- Select Type --</option>
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
              </select>
            </div>

            <div className="input-group">
              <label>Preferred Date</label>
              <input type="date" value={donationDate} onChange={(e) => setDonationDate(e.target.value)} required min={new Date().toISOString().split("T")[0]} />
            </div>

            <button type="submit" className="book-btn">Confirm Appointment</button>
          </form>
        </div>
      </main>
    </div>
  );
}