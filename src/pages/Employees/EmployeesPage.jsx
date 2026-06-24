import { useState, useEffect } from "react";
import EmployeeTable from "../../components/Employees/EmployeeTable";
import EmployeeForm from "../../components/Employees/EmployeeForm";
import api from "../../utils/axios";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [showForm, setShowForm] = useState(false);

  const fetchEmployees = async () => {
    const params = {};
    if (search) params.search = search;
    if (status) params.status = status;
    const res = await api.get("/employees", { params });
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, [search, status]);

  return (
    <div>
      <h1 className="text-lg font-semibold text-gray-800 mb-4">Employees</h1>
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm mb-4"
      >
        {showForm ? "Close" : "Add Employee"}
      </button>
      {showForm && (
        <EmployeeForm
          onSuccess={() => {
            setShowForm(false);
            fetchEmployees();
          }}
        />
      )}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by name, email, ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm w-64"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <EmployeeTable employees={employees} />
    </div>
  );
};

export default Employees;
