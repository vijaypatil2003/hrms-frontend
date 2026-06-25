import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard/DashboardPage";
import Employees from "./pages/Employees/EmployeesPage";
import Login from "./pages/Auth/LoginPage";
import EmploymentTypesPage from "./pages/Employees/EmploymentTypesPage";
import LeaveRouter from "./pages/Leave/LeaveRouter";
import PayrollRouter from "./pages/Payroll/PayrollRouter";
import NotFound from "./pages/NotFound/NotFound";
import HolidaysPage from "./pages/Holidays/HolidaysPage";
import AttendanceRouter from "./pages/Attendance/AttendanceRouter";

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={user ? "/dashboard" : "/login"} />}
      />
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
            <AttendanceRouter />
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

      <Route
        path="/holidays"
        element={
          <ProtectedRoute>
            <HolidaysPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
