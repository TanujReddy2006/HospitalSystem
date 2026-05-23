import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import "./BloodStock.css";

export default function BloodStock() {
  const navigate = useNavigate();
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const res = await api.get("/inventory");
        setStock(res.data);
      } catch (err) {
        console.error("Failed to fetch blood stock", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStock();
  }, []);

  return (
    <div className="stock-layout">
      
      {/* Full-width Red Header Bar */}
      <header className="top-red-bar">
        <h2 className="header-title">Blood Stock</h2>
        <button
          className="header-back-btn"
          onClick={() => navigate("/hospital-admin/home")}
        >
          Back to Dashboard
        </button>
      </header>

      {/* Centered Middle Content */}
      <main className="stock-container">
        {loading ? (
          <p className="loading-text">Loading stock...</p>
        ) : stock.length === 0 ? (
          <div className="empty-state">
            <p>No blood stock available.</p>
          </div>
        ) : (
          <div className="stock-grid">
            {stock.map((item) => (
              <div key={item._id} className="stock-card">
                <div className="blood-group">{item.bloodGroup}</div>
                <div className="units">
                  {item.units} <span>Units</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      
    </div>
  );
}