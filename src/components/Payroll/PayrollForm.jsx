import { useState, useEffect } from "react";
import api from "../../utils/axios";

const PayrollForm = ({ onSuccess }) => {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/employees").then((res) => setEmployees(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/payroll/run", { employeeId, month: Number(month), year: Number(year) });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to run payroll");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 items-end bg-white p-6 rounded-md border border-gray-200">
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <div>
        <label className="block text-sm text-gray-600 mb-1">Employee</label>
        <select value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 text-sm" required>
          <option value="">Select</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Month</label>
        <input type="number" min="1" max="12" value={month} onChange={(e) => setMonth(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 text-sm w-20" required />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Year</label>
        <input type="number" value={year} onChange={(e) => setYear(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 text-sm w-24" required />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
        Run Payroll
      </button>
    </form>
  );
};

export default PayrollForm;