import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-md text-sm ${
      isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <div className="w-56 h-screen bg-white border-r border-gray-200 p-4">
      <h2 className="text-lg font-bold text-gray-800 mb-6">HRMS</h2>
      <nav className="space-y-1">
        <NavLink to="/dashboard" className={linkClass}>
          Dashboard
        </NavLink>
        {user?.role === "admin" && (
          <NavLink to="/employees" className={linkClass}>
            Employees
          </NavLink>
        )}
        {user?.role === "admin" && (
          <NavLink to="/employment-types" className={linkClass}>
            Employment Types
          </NavLink>
        )}
        <NavLink to="/attendance" className={linkClass}>
          Attendance
        </NavLink>
        <NavLink to="/leaves" className={linkClass}>
          Leaves
        </NavLink>
        {user?.role === "admin" && (
          <NavLink to="/holidays" className={linkClass}>
            Holidays
          </NavLink>
        )}
        <NavLink to="/payroll" className={linkClass}>
          Payroll
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
