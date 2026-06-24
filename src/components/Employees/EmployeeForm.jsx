import { useState, useEffect } from "react";
import api from "../../utils/axios";

const EmployeeForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    dateOfJoining: "",
    designation: "",
    salary: "",
    employmentType: "",
  });
  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/employment-types").then((res) => setEmploymentTypes(res.data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/employees", form);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create employee");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 bg-white p-6 rounded-md border border-gray-200"
    >
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <div>
        <label className="block text-sm text-gray-600 mb-1">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Password</label>
        <input
          type="password"
          name="password"
          autoComplete="new-password"
          value={form.password}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Phone</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">
          Date of Joining
        </label>
        <input
          type="date"
          name="dateOfJoining"
          value={form.dateOfJoining}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Designation</label>
        <input
          name="designation"
          value={form.designation}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Salary</label>
        <input
          type="number"
          name="salary"
          value={form.salary}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">
          Employment Type
        </label>
        <select
          name="employmentType"
          value={form.employmentType}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          required
        >
          <option value="">Select</option>
          {employmentTypes.map((type) => (
            <option key={type._id} value={type._id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
      >
        Create Employee
      </button>
    </form>
  );
};

export default EmployeeForm;
