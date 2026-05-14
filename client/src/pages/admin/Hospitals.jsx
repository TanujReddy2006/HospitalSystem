import { useEffect, useState } from "react";
import api from "../../api";
import "./Hospitals.css";

export default function Hospitals() {

  const [hospitals, setHospitals] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchHospitals();

  }, []);

  const fetchHospitals = async () => {

    try {

      const res = await api.get(
        "admin/hospitals"
      );

      setHospitals(
        res.data.hospitals
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="hospitals-page">

      <div className="hospitals-header">

        <h1>
          Registered Hospitals
        </h1>

        <p>
          View all hospitals registered
          in the blood bank network.
        </p>

      </div>

      {loading ? (

        <div className="loading-box">
          Loading hospitals...
        </div>

      ) : hospitals.length === 0 ? (

        <div className="empty-box">
          No hospitals found.
        </div>

      ) : (

        <div className="hospital-grid">

          {hospitals.map((hospital) => (

            <div
              key={hospital._id}
              className="hospital-card"
            >

              <div className="hospital-top">

                <div className="hospital-icon">
                  🏥
                </div>

                <div>

                  <h2>
                    {hospital.name}
                  </h2>

                  <span className="verified-badge">

                    {hospital.isVerified
                      ? "Verified"
                      : "Not Verified"}

                  </span>

                </div>

              </div>

              <div className="hospital-details">

                <div className="detail-item">

                  <span>Email</span>

                  <strong>
                    {hospital.email}
                  </strong>

                </div>

                <div className="detail-item">

                  <span>Phone</span>

                  <strong>
                    {hospital.phone || "N/A"}
                  </strong>

                </div>

                <div className="detail-item">

                  <span>Address</span>

                  <strong>
                    {hospital.address}
                  </strong>

                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}