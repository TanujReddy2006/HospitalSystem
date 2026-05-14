import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import L from "leaflet";

import markerIcon2x
from "leaflet/dist/images/marker-icon-2x.png";

import markerIcon
from "leaflet/dist/images/marker-icon.png";

import markerShadow
from "leaflet/dist/images/marker-shadow.png";

import api from "../../api";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function RouteMap() {
  const { requestId } = useParams();

  const [route, setRoute] = useState(null);

  useEffect(() => {

    const fetchRoute = async () => {

  try {

    if (!requestId) {

      console.log("No request ID");

      return;
    }

    const res = await api.get(
      `/blood/route?requestId=${requestId}`
    );

    setRoute(
      res.data.routeCoordinates
    );

  } catch (error) {

    console.log(error);
  }
};
    fetchRoute();

  }, []);

  return (

    <div style={{ height: "500px" }}>

      {route && (

        <MapContainer
          center={route[0]}
          zoom={13}
          style={{
            height: "100%",
            width: "100%"
          }}
        >

          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={route[0]} />

          <Marker
            position={
              route[route.length - 1]
            }
          />

          <Polyline positions={route} />

        </MapContainer>
      )}

    </div>
  );
}