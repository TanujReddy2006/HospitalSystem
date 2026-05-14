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
import InventoryHistory from "./pages/hospitalAdmin/InventoryHistory";
import BloodStock from "./pages/hospitalAdmin/BloodStock";
import ManualStockUpdate from "./pages/worker/ManualStockUpdate";
import DonationHistory from "./pages/donor/DonationHistory";
import RequestBlood from "./pages/hospitalAdmin/RequestBlood";
import RequestStatus from "./pages/hospitalAdmin/RequestStatus";
import "leaflet/dist/leaflet.css";
import RouteMap from "./pages/hospitalAdmin/RouteMap";
import Hospitals from "./pages/admin/Hospitals";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DonorHome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin/create-hospital" element={<CreateHospital />} />
      <Route path="/admin/hospitals" element={<Hospitals />} />
      <Route path="/donor/book-donation" element={<BookDonation />} />
      <Route path="/hospital-admin/approve" element={<ApproveDonation />} />
      <Route path="/worker/complete" element={<CompleteDonation />} />
      <Route path="/admin/home" element={<AdminHome />} />
      <Route path="/donor/home" element={<DonorHome />} />
      <Route path="/hospital-admin/home" element={<HospitalAdminHome />} />
      <Route path="/worker/home" element={<WorkerHome />} />
      <Route path="/admin/create-hospital-admin" element={<CreateHospitalAdmin />}/>
      <Route path="/hospital-admin/create-worker"element={<CreateWorker />}/>
      <Route path="/hospital-admin/inventory-history" element={<InventoryHistory />}/>
      <Route path="/hospital-admin/blood-stock"element={<BloodStock />}/>
      <Route path="/worker/manual-stock" element={<ManualStockUpdate />}/>
      <Route path="/donor/history"element={<DonationHistory />}/>
      <Route path="/hospital-admin/request-blood"element={<RequestBlood/>}/>
      <Route path="/hospital-admin/request-status"element={<RequestStatus/>}/>
      <Route path="/hospital-admin/route-map/:requestId" element={<RouteMap />}
/>


    </Routes>
  );
}

export default App;
