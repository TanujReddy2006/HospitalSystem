import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import api from "../../api";
import "./CreateHospital.css";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function LocationMarker({ setForm }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      setForm((prev) => ({
        ...prev,
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      }));
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={markerIcon} />
  );
}

export default function CreateHospital() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    lat: null,
    lng: null,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await api.post("/hospitals", form);
      alert("Hospital registered successfully!");
      navigate("/admin/home");
    } catch (err) {
      console.error(err);
      alert("Failed to create hospital.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-page-wrapper">
      <div className="form-card">
        <div className="form-header">
          <h2>Register New Hospital</h2>
          <p>Click on map to select exact location</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-grid">
            
            <div className="input-group">
              <label>Name</label>
              <input name="name" value={form.name} onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label>Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} required />
            </div>

            <div className="input-group full-width">
              <label>Address</label>
              <textarea name="address" value={form.address} onChange={handleChange} required />
            </div>

            <div className="input-group full-width">
              <label>Select Location</label>

              <MapContainer
                center={[17.385044, 78.486671]} // Default: Hyderabad
                zoom={13}
                style={{ height: "300px", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; OpenStreetMap contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker setForm={setForm} />
              </MapContainer>

              {form.lat && (
                <p>
                  Selected: {form.lat.toFixed(5)}, {form.lng.toFixed(5)}
                </p>
              )}
            </div>

          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Registering..." : "Create Hospital"}
          </button>
        </form>
      </div>
    </div>
  );
}
