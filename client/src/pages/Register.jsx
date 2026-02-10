// Register.js
import { useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom"; // Recommended for navigation
import './Register.css';

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); // Stop page reload
    setIsLoading(true);
    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
        role: "donor" // 🔒 Still hardcoded logic
      });

      alert("Donor registered successfully!");
      navigate("/"); // Smooth redirect
    } catch (err) {
      alert(err.response?.data?.message || "User already exists");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <div className="register-header">
          <h2 className="register-title">Donor Registration</h2>
          <p className="register-subtitle">Join our community to save lives.</p>
        </div>

        <form className="register-form" onSubmit={handleRegister}>
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="e.g. Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register as Donor"}
          </button>

          <div className="form-footer">
            <p>Already registered? <Link to="/login">Login here</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}