import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!role) {
      navigate("/");
      return;
    }

    if (role === "admin") navigate("/admin/home");
    else if (role === "donor") navigate("/donor/home");
    else if (role === "hospital_admin") navigate("/hospital-admin/home");
    else if (role === "hospital_worker") navigate("/worker/home");
    else navigate("/");
  }, [navigate, role]);

  return <h3>Redirecting to your dashboard...</h3>;
}
