import { useState, useEffect } from "react";
import api from "../../utils/axios";
import LeaveTable from "../../components/Leave/LeaveTable";
// import LeaveTable from "../../components/Leave/LeaveTable";

const AdminLeavePage = () => {
  const [leaves, setLeaves] = useState([]);
  const [status, setStatus] = useState("pending");

  const fetchLeaves = async () => {
    const params = {};
    if (status) params.status = status;
    const res = await api.get("/leaves", { params });
    setLeaves(res.data);
  };

  useEffect(() => {
    fetchLeaves();
  }, [status]);

  return (
    <div>
      <h1 className="text-lg font-semibold text-gray-800 mb-4">
        Leave Requests
      </h1>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 text-sm mb-4"
      >
        <option value="">All</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>

      <LeaveTable leaves={leaves} isAdmin={true} onUpdate={fetchLeaves} />
    </div>
  );
};

export default AdminLeavePage;
