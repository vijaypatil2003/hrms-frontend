import { useState, useEffect } from "react";
import api from "../../../utils/axios";

const AdminAttendancePage = () => {
  const [logs, setLogs] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  useEffect(() => {
    api.get("/employees").then((res) => setEmployees(res.data));
  }, []);

  const fetchLogs = async () => {
    const params = {};
    if (employee) params.employee = employee;
    if (from) params.from = from;
    if (to) params.to = to;
    const res = await api.get("/attendance", { params });
    setLogs(res.data);
  };

  useEffect(() => {
    fetchLogs();
  }, [employee, from, to]);

  const formatTime = (t) => (t ? new Date(t).toLocaleTimeString() : "-");

  return (
    <div>
      <h1 className="text-lg font-semibold text-gray-800 mb-4">
        Attendance Records
      </h1>

      <div className="flex gap-3 mb-4">
        <select
          value={employee}
          onChange={(e) => setEmployee(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
        >
          <option value="">All Employees</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
      </div>

      <table className="w-full text-sm border border-gray-200 rounded-md">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="text-left px-4 py-2 border-b">Employee</th>
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
              <td className="px-4 py-2 border-b">{log.employee?.name}</td>
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

export default AdminAttendancePage;
