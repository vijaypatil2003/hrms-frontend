import { useState, useEffect } from "react";
import api from "../../utils/axios";

const AttendancePage = () => {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState("");

  const fetchLogs = async () => {
    const res = await api.get("/attendance/me");
    setLogs(res.data);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handlePunchIn = async () => {
    setError("");
    try {
      await api.post("/attendance/punch-in");
      fetchLogs();
    } catch (err) {
      setError(err.response?.data?.message || "Punch in failed");
    }
  };

  const handlePunchOut = async () => {
    setError("");
    try {
      await api.post("/attendance/punch-out");
      fetchLogs();
    } catch (err) {
      setError(err.response?.data?.message || "Punch out failed");
    }
  };

  const formatTime = (t) => (t ? new Date(t).toLocaleTimeString() : "-");

  return (
    <div>
      <h1 className="text-lg font-semibold text-gray-800 mb-4">Attendance</h1>

      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

      <div className="flex gap-3 mb-6">
        <button
          onClick={handlePunchIn}
          className="bg-green-600 text-white px-4 py-2 rounded-md text-sm"
        >
          Punch In
        </button>
        <button
          onClick={handlePunchOut}
          className="bg-red-600 text-white px-4 py-2 rounded-md text-sm"
        >
          Punch Out
        </button>
      </div>

      <table className="w-full text-sm border border-gray-200 rounded-md">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="text-left px-4 py-2 border-b">Date</th>
            <th className="text-left px-4 py-2 border-b">Punches</th>
            <th className="text-left px-4 py-2 border-b">Work Hours</th>
            <th className="text-left px-4 py-2 border-b">Break (mins)</th>
            <th className="text-left px-4 py-2 border-b">Late</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log._id}>
              <td className="px-4 py-2 border-b">
                {new Date(log.date).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 border-b">
                {log.punches.map((p, i) => (
                  <div key={i}>
                    {formatTime(p.inTime)} - {formatTime(p.outTime)}
                  </div>
                ))}
              </td>
              <td className="px-4 py-2 border-b">
                {log.totalWorkHours.toFixed(2)}
              </td>
              <td className="px-4 py-2 border-b">
                {log.totalBreakMins.toFixed(0)}
              </td>
              <td className="px-4 py-2 border-b">
                {log.isLate ? "Yes" : "No"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendancePage;
