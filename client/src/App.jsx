import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import BookDonation from "./pages/donor/BookDonation";
import ApproveDonation from "./pages/hospitalAdmin/ApproveDonation";
import CreateHospital from "./pages/admin/CreateHospital";
import CompleteDonation from "./pages/worker/CompleteDonation";
import AdminHome from "./pages/admin/AdminHome";
import DonorHome from "./pages/donor/DonorHome";
import HospitalAdminHome from "./pages/hospitalAdmin/HospitalAdminHome";
import WorkerHome from "./pages/worker/WorkerHome";
import CreateHospitalAdmin from "./pages/admin/CreateHospitalAdmin";
import CreateWorker from "./pages/hospitalAdmin/CreateWorker";
function App() {
  return (
    <Routes>
      <Route path="/" element={<DonorHome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin/create-hospital" element={<CreateHospital />} />
      <Route path="/donor/book-donation" element={<BookDonation />} />
      <Route path="/hospital-admin/approve" element={<ApproveDonation />} />
      <Route path="/worker/complete" element={<CompleteDonation />} />
      <Route path="/admin/home" element={<AdminHome />} />
      <Route path="/donor/home" element={<DonorHome />} />
      <Route path="/hospital-admin/home" element={<HospitalAdminHome />} />
      <Route path="/worker/home" element={<WorkerHome />} />
      <Route path="/admin/create-hospital-admin" element={<CreateHospitalAdmin />}/>
      <Route path="/hospital-admin/create-worker"element={<CreateWorker />}
/>


    </Routes>
  );
}

export default App;
