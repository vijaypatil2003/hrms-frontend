const EmployeeTable = ({ employees }) => {
  return (
    <table className="w-full text-sm border border-gray-200 rounded-md overflow-hidden">
      <thead className="bg-gray-50 text-gray-600">
        <tr>
          <th className="text-left px-4 py-2 border-b">Employee ID</th>
          <th className="text-left px-4 py-2 border-b">Name</th>
          <th className="text-left px-4 py-2 border-b">Email</th>
          <th className="text-left px-4 py-2 border-b">Designation</th>
          <th className="text-left px-4 py-2 border-b">Status</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp) => (
          <tr key={emp._id} className="hover:bg-gray-50">
            <td className="px-4 py-2 border-b">{emp.employeeId}</td>
            <td className="px-4 py-2 border-b">{emp.name}</td>
            <td className="px-4 py-2 border-b">{emp.email}</td>
            <td className="px-4 py-2 border-b">{emp.designation}</td>
            <td className="px-4 py-2 border-b">
              <span
                className={`px-2 py-0.5 rounded-md text-xs ${
                  emp.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {emp.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
