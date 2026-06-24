import api from "../../utils/axios";

const statusColor = {
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const LeaveTable = ({ leaves, isAdmin, onUpdate }) => {
  const handleApprove = async (id) => {
    await api.put(`/leaves/${id}/approve`);
    onUpdate();
  };

  const handleReject = async (id) => {
    await api.put(`/leaves/${id}/reject`);
    onUpdate();
  };

  return (
    <table className="w-full text-sm border border-gray-200 rounded-md">
      <thead className="bg-gray-50 text-gray-600">
        <tr>
          {isAdmin && (
            <th className="text-left px-4 py-2 border-b">Employee</th>
          )}
          <th className="text-left px-4 py-2 border-b">Leave Type</th>
          <th className="text-left px-4 py-2 border-b">From</th>
          <th className="text-left px-4 py-2 border-b">To</th>
          <th className="text-left px-4 py-2 border-b">Reason</th>
          <th className="text-left px-4 py-2 border-b">Status</th>
          {isAdmin && <th className="text-left px-4 py-2 border-b">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {leaves.map((leave) => (
          <tr key={leave._id}>
            {isAdmin && (
              <td className="px-4 py-2 border-b">{leave.employee?.name}</td>
            )}
            <td className="px-4 py-2 border-b">{leave.leaveType}</td>
            <td className="px-4 py-2 border-b">
              {new Date(leave.fromDate).toLocaleDateString()}
            </td>
            <td className="px-4 py-2 border-b">
              {new Date(leave.toDate).toLocaleDateString()}
            </td>
            <td className="px-4 py-2 border-b">{leave.reason}</td>
            <td className="px-4 py-2 border-b">
              <span
                className={`px-2 py-0.5 rounded-md text-xs ${statusColor[leave.status]}`}
              >
                {leave.status}
              </span>
            </td>
            {isAdmin && (
              <td className="px-4 py-2 border-b">
                {leave.status === "pending" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(leave._id)}
                      className="text-xs bg-green-600 text-white px-2 py-1 rounded-md"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(leave._id)}
                      className="text-xs bg-red-600 text-white px-2 py-1 rounded-md"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LeaveTable;
