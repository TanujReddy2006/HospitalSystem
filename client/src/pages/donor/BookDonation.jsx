import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import './BookDonation.css';

export default function BookDonation() {
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState([]); // Store list of hospitals
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [hospitalId, setHospitalId] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [donationDate, setDonationDate] = useState(""); // Added date for better UX

  // 1. Fetch Hospitals on Component Mount
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const res = await api.get("/hospitals"); // Assuming you have this endpoint
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
      await api.post("/donations", { 
        hospitalId, 
        bloodGroup, 
        date: donationDate 
      });
      alert("Donation appointment booked successfully!");
      navigate("/donor");
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="booking-wrapper">
      <div className="booking-card">
        {/* Header */}
        <div className="booking-header">
          <button className="back-btn" onClick={() => navigate("/donor")}>
            &larr; Back to Dashboard
          </button>
          <h2>Schedule Donation</h2>
          <p>Choose a hospital and time to save a life.</p>
        </div>

        <form onSubmit={handleBook} className="booking-form">
          
          {/* Hospital Selection (Dropdown) */}
          <div className="input-group">
            <label htmlFor="hospital">Select Hospital</label>
            <div className="select-wrapper">
              <select 
                id="hospital"
                value={hospitalId} 
                onChange={(e) => setHospitalId(e.target.value)}
                required
              >
                <option value="">-- Choose a location --</option>
                {loading ? (
                  <option disabled>Loading hospitals...</option>
                ) : (
                  hospitals.map((hospital) => (
                    <option key={hospital._id} value={hospital._id}>
                      {hospital.name} ({hospital.address})
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>

          {/* Blood Group Selection (Dropdown) */}
          <div className="input-group">
            <label htmlFor="bloodGroup">Your Blood Group</label>
            <div className="select-wrapper">
              <select 
                id="bloodGroup"
                value={bloodGroup} 
                onChange={(e) => setBloodGroup(e.target.value)}
                required
              >
                <option value="">-- Select Type --</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>

          {/* Date Picker */}
          <div className="input-group">
            <label htmlFor="date">Preferred Date</label>
            <input 
              type="date" 
              id="date"
              value={donationDate}
              onChange={(e) => setDonationDate(e.target.value)}
              required
              min={new Date().toISOString().split("T")[0]} // Prevent past dates
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="book-btn">
            Confirm Appointment
          </button>
        </form>
      </div>
    </div>
  );
}