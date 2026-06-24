import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="p-6">
      <h1 className="text-lg font-semibold text-gray-800">
        Welcome, {user?.name}
      </h1>
      <p className="text-sm text-gray-600">Role: {user?.role}</p>
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md text-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
