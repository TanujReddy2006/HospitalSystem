import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Added navigate
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import api from "../../api";
import "./RouteMap.css"; // We will create this

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function RouteMap() {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const [route, setRoute] = useState(null);
  const [routeInfo, setRouteInfo] = useState({ from: "", to: "", distance: "" });

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        if (!requestId) return;
        const res = await api.get(`/blood/route?requestId=${requestId}`);
        setRoute(res.data.routeCoordinates);
        // Assuming your API returns these fields. If not, adjust based on your API response
        setRouteInfo({
            from: res.data.from || "Source",
            to: res.data.to || "Destination",
            distance: res.data.distance || "N/A"
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchRoute();
  }, [requestId]);

  return (
    <div className="route-map-wrapper">
      <header className="route-header">
        <h2>Blood Delivery Route</h2>
        <button onClick={() => navigate(-1)} className="back-btn">Back</button>
      </header>

      <div className="map-content">
        {route && (
          <MapContainer center={route[0]} zoom={13} style={{ height: "500px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={route[0]} />
            <Marker position={route[route.length - 1]} />
            <Polyline positions={route} color="red" weight={5} />
          </MapContainer>
        )}

        <div className="route-info-card">
          <h3>Route Details</h3>
          <p><strong>From:</strong> {routeInfo.from}</p>
          <p><strong>To:</strong> {routeInfo.to}</p>
          <p><strong>Total Distance:</strong> {routeInfo.distance} km</p>
        </div>
      </div>
    </div>
  );
}