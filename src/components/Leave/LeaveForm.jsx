import { useState } from "react";
import api from "../../utils/axios";

const LeaveForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    leaveType: "",
    fromDate: "",
    toDate: "",
    isHalfDay: false,
    halfDaySession: "first",
    reason: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/leaves", form);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to apply leave");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 bg-white p-6 rounded-md border border-gray-200"
    >
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <div>
        <label className="block text-sm text-gray-600 mb-1">Leave Type</label>
        <input
          name="leaveType"
          value={form.leaveType}
          onChange={handleChange}
          placeholder="e.g. Casual Leave"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">From Date</label>
        <input
          type="date"
          name="fromDate"
          value={form.fromDate}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">To Date</label>
        <input
          type="date"
          name="toDate"
          value={form.toDate}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          required
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isHalfDay"
          checked={form.isHalfDay}
          onChange={handleChange}
        />
        <label className="text-sm text-gray-600">Half Day</label>
      </div>
      {form.isHalfDay && (
        <div>
          <label className="block text-sm text-gray-600 mb-1">Session</label>
          <select
            name="halfDaySession"
            value={form.halfDaySession}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="first">First Half</option>
            <option value="second">Second Half</option>
          </select>
        </div>
      )}
      <div>
        <label className="block text-sm text-gray-600 mb-1">Reason</label>
        <textarea
          name="reason"
          value={form.reason}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          rows="2"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
      >
        Apply Leave
      </button>
    </form>
  );
};

export default LeaveForm;
