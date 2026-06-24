import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
      <button
        onClick={handleLogout}
        className="text-sm bg-red-600 text-white px-3 py-1.5 rounded-md hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
