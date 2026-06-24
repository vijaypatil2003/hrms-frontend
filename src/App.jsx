import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
// import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard/DashboardPage";
import Employees from "./pages/Employees/EmployeesPage";
import Login from "./pages/Auth/LoginPage";
import EmploymentTypesPage from "./pages/Employees/EmploymentTypesPage";
import AttendancePage from "./pages/Attendance/AttendancePage";
import LeaveRouter from "./pages/Leave/LeaveRouter";
import PayrollRouter from "./pages/Payroll/PayrollRouter";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/employees"
        element={
          <ProtectedRoute adminOnly>
            <Employees />
          </ProtectedRoute>
        }
      />

      <Route
        path="/employment-types"
        element={
          <ProtectedRoute adminOnly>
            <EmploymentTypesPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/attendance"
        element={
          <ProtectedRoute>
            <AttendancePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/leaves"
        element={
          <ProtectedRoute>
            <LeaveRouter />
          </ProtectedRoute>
        }
      />

      <Route
        path="/payroll"
        element={
          <ProtectedRoute>
            <PayrollRouter />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
