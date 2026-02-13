import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Employees } from "./pages/Employees";
import { Attendance } from "./pages/Attendance";
import { Cameras } from "./pages/Cameras";
import { NotFound } from "./pages/NotFound";
function App() {
  return (
     <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/employees" element={<Employees />} />
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/cameras" element={<Cameras />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
