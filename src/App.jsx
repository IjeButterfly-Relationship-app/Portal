import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Onboard from "./pages/Onboard";
import FlaggedAccount from "./pages/FlaggedAccount";
import AdminManagement from "./pages/AdminManagement";
import Analytics from "./pages/Analytics";
import DownloadApp from "./pages/DownloadApp";
import CoachVerification from "./pages/CoachVerification";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/onboard" element={<Onboard />} />
        <Route path="/flaggedAccount" element={<FlaggedAccount />} />
        <Route path="/adminManagement" element={<AdminManagement />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/download" element={<DownloadApp />} />
        <Route path="/coach-verification" element={<CoachVerification />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

