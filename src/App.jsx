import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Employees } from "./pages/Employees";
import { Attendance } from "./pages/Attendance";
import { Cameras } from "./pages/Cameras";
import { NotFound } from "./pages/NotFound";
import PrivateRoute from "./routes/PrivateRoute";
import MainLayout from "./layouts/MainLayout";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/employees"
        element={
          <PrivateRoute>
            <MainLayout>
              <Employees />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/attendance"
        element={
          <PrivateRoute>
            <MainLayout>
              <Attendance />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/cameras"
        element={
          <PrivateRoute>
            <MainLayout>
              <Cameras />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
