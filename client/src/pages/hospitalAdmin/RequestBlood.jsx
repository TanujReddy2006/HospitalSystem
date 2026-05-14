import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import './RequestBlood.css';
export default function RequestBlood() {

  const navigate = useNavigate();

  const [bloodGroup, setBloodGroup] = useState("A+");

  const [units, setUnits] = useState(1);

  const handleSubmit = async () => {

    const hospitalId = localStorage.getItem("hospitalId");

    if (!hospitalId) {

      alert("Hospital ID not found. Please login again.");

      return;
    }

    try {

      await api.post("/blood/request", {

        hospitalId,

        bloodGroup,

        units,

      });

      alert("Request sent successfully!");

      navigate("/hospital-admin/request-status");

    } catch (err) {

      console.log(err.response?.data);

      alert(
        err.response?.data?.message || "Failed to send request"
      );
    }
  };

  return (

  <div className="request-blood-page">

    <div className="request-blood-card">

      <h2>Request Blood</h2>

      <div className="form-group">

        <label>
          Blood Group
        </label>

        <select
          value={bloodGroup}
          onChange={(e) =>
            setBloodGroup(e.target.value)
          }
        >

          {[
            "A+",
            "A-",
            "B+",
            "B-",
            "AB+",
            "AB-",
            "O+",
            "O-"
          ].map(bg => (

            <option key={bg}>
              {bg}
            </option>
          ))}

        </select>

      </div>

      <div className="form-group">

        <label>
          Units Required
        </label>

        <input
          type="number"
          min="1"
          value={units}
          onChange={(e) =>
            setUnits(e.target.value)
          }
        />

      </div>

      <button onClick={handleSubmit}>
        Send Emergency Request
      </button>

    </div>

  </div>
);
}