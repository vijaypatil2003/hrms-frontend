import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">404</h1>
      <p className="text-sm text-gray-500 mb-4">Page not found</p>
      <Link to="/dashboard" className="text-blue-600 text-sm underline">
        Go to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
