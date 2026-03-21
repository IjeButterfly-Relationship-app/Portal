import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Dashboard from "./pages/AdminDashbord";
import Onboard from "./pages/Onboard";
import ModeratorDashboard from "./pages/ModeratorDashboard";
import FlaggedAccount from "./pages/FlaggedAccount";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/onboard" element={<Onboard />} />
        <Route path="/moderatordashboard" element={<ModeratorDashboard />} />
        <Route path="/flaggedAccount" element={<FlaggedAccount />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

