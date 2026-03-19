import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/AdminDashbord";
import Onboard from "./pages/Onboard";
import FlaggedAccount from "./pages/FlaggedAccount";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/onboard" element={<Onboard />} />
        <Route path="/moderatordashboard" element={<Dashboard />} />
        <Route path="/FlaggedAccount" element={<FlaggedAccount />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
