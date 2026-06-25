import { useState, useEffect } from "react";
import api from "../../utils/axios";
import PayrollForm from "../../components/Payroll/PayrollForm";
import PayrollTable from "../../components/Payroll/PayrollTable";

const AdminPayrollPage = () => {
  const [records, setRecords] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    api.get("/employees").then((res) => setEmployees(res.data));
  }, []);

  const fetchHistory = async () => {
    const params = {};
    if (employee) params.employee = employee;
    const res = await api.get("/payroll/history", { params });
    setRecords(res.data);
  };

  useEffect(() => {
    fetchHistory();
  }, [employee]);

  return (
    <div>
      <h1 className="text-lg font-semibold text-gray-800 mb-4">Payroll</h1>

      <div className="flex gap-3 mb-4">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
        >
          {showForm ? "Close" : "Run Payroll"}
        </button>
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
      </div>

      {showForm && (
        <PayrollForm
          onSuccess={() => {
            setShowForm(false);
            fetchHistory();
          }}
        />
      )}

      <PayrollTable records={records} isAdmin={true} />
    </div>
  );
};

export default AdminPayrollPage;
