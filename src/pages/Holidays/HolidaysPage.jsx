import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../utils/axios";

const HolidaysPage = () => {
  const { user } = useAuth();
  const [holidays, setHolidays] = useState([]);
  const [form, setForm] = useState({ name: "", date: "", description: "" });
  const [error, setError] = useState("");

  const fetchHolidays = async () => {
    const res = await api.get("/holidays");
    setHolidays(res.data);
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/holidays", form);
      setForm({ name: "", date: "", description: "" });
      fetchHolidays();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add holiday");
    }
  };

  const handleDelete = async (id) => {
    await api.delete(`/holidays/${id}`);
    fetchHolidays();
  };

  return (
    <div>
      <h1 className="text-lg font-semibold text-gray-800 mb-4">Holidays</h1>

      {user?.role === "admin" && (
        <form onSubmit={handleSubmit} className="flex gap-3 mb-6 items-end">
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Description
            </label>
            <input
              name="description"
              value={form.description}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
          >
            Add Holiday
          </button>
        </form>
      )}

      <table className="w-full text-sm border border-gray-200 rounded-md">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="text-left px-4 py-2 border-b">Name</th>
            <th className="text-left px-4 py-2 border-b">Date</th>
            <th className="text-left px-4 py-2 border-b">Description</th>
            {user?.role === "admin" && (
              <th className="text-left px-4 py-2 border-b">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {holidays.map((h) => (
            <tr key={h._id}>
              <td className="px-4 py-2 border-b">{h.name}</td>
              <td className="px-4 py-2 border-b">
                {new Date(h.date).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 border-b">{h.description}</td>
              {user?.role === "admin" && (
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => handleDelete(h._id)}
                    className="text-xs bg-red-600 text-white px-2 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HolidaysPage;
