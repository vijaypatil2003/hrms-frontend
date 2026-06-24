import { useState, useEffect } from "react";
import api from "../../utils/axios";

const EmploymentTypesPage = () => {
  const [types, setTypes] = useState([]);
  const [newType, setNewType] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [policies, setPolicies] = useState([]);
  const [leaveType, setLeaveType] = useState("");
  const [annualDays, setAnnualDays] = useState("");

  const fetchTypes = async () => {
    const res = await api.get("/employment-types");
    setTypes(res.data);
  };

  const fetchPolicies = async (typeId) => {
    const res = await api.get(`/leave-policies/${typeId}`);
    setPolicies(res.data);
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  const handleAddType = async (e) => {
    e.preventDefault();
    await api.post("/employment-types", { name: newType });
    setNewType("");
    fetchTypes();
  };

  const handleSelectType = (type) => {
    setSelectedType(type);
    fetchPolicies(type._id);
  };

  const handleAddPolicy = async (e) => {
    e.preventDefault();
    await api.post("/leave-policies", {
      employmentType: selectedType._id,
      leaveType,
      annualDays,
    });
    setLeaveType("");
    setAnnualDays("");
    fetchPolicies(selectedType._id);
  };

  return (
    <div>
      <h1 className="text-lg font-semibold text-gray-800 mb-4">
        Employment Types
      </h1>

      <form onSubmit={handleAddType} className="flex gap-3 mb-6">
        <input
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
          placeholder="e.g. Full Time"
          className="border border-gray-300 rounded-md px-3 py-2 text-sm w-64"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
        >
          Add Type
        </button>
      </form>

      <div className="flex gap-6">
        <div className="w-56">
          {types.map((type) => (
            <div
              key={type._id}
              onClick={() => handleSelectType(type)}
              className={`px-3 py-2 rounded-md text-sm cursor-pointer mb-1 ${
                selectedType?._id === type._id
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-gray-200 text-gray-700"
              }`}
            >
              {type.name}
            </div>
          ))}
        </div>

        {selectedType && (
          <div className="flex-1">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">
              Leave Policy - {selectedType.name}
            </h2>

            <table className="w-full text-sm border border-gray-200 rounded-md mb-4">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="text-left px-4 py-2 border-b">Leave Type</th>
                  <th className="text-left px-4 py-2 border-b">Annual Days</th>
                </tr>
              </thead>
              <tbody>
                {policies.map((p) => (
                  <tr key={p._id}>
                    <td className="px-4 py-2 border-b">{p.leaveType}</td>
                    <td className="px-4 py-2 border-b">{p.annualDays}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <form onSubmit={handleAddPolicy} className="flex gap-3">
              <input
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                placeholder="Leave Type e.g. Casual Leave"
                className="border border-gray-300 rounded-md px-3 py-2 text-sm w-48"
                required
              />
              <input
                type="number"
                value={annualDays}
                onChange={(e) => setAnnualDays(e.target.value)}
                placeholder="Annual Days"
                className="border border-gray-300 rounded-md px-3 py-2 text-sm w-32"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
              >
                Add Policy
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmploymentTypesPage;
