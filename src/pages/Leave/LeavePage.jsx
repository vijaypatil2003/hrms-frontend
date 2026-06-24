import { useState, useEffect } from "react";
import api from "../../utils/axios";
import LeaveForm from "../../components/Leave/LeaveForm";
import LeaveTable from "../../components/Leave/LeaveTable";

const LeavePage = () => {
  const [balance, setBalance] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchBalance = async () => {
    const res = await api.get("/leaves/balance");
    setBalance(res.data);
  };

  const fetchLeaves = async () => {
    const res = await api.get("/leaves/me");
    setLeaves(res.data);
  };

  useEffect(() => {
    fetchBalance();
    fetchLeaves();
  }, []);

  return (
    <div>
      <h1 className="text-lg font-semibold text-gray-800 mb-4">Leave</h1>

      <div className="flex gap-4 mb-6">
        {balance.map((b) => (
          <div
            key={b.leaveType}
            className="bg-white border border-gray-200 rounded-md p-4 w-48"
          >
            <p className="text-sm text-gray-500">{b.leaveType}</p>
            <p className="text-lg font-semibold text-gray-800">
              {b.remaining} left
            </p>
            <p className="text-xs text-gray-500">
              {b.used} used of {b.available}
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm mb-4"
      >
        {showForm ? "Close" : "Apply Leave"}
      </button>

      {showForm && (
        <LeaveForm
          onSuccess={() => {
            setShowForm(false);
            fetchLeaves();
            fetchBalance();
          }}
        />
      )}

      <LeaveTable leaves={leaves} isAdmin={false} onUpdate={fetchLeaves} />
    </div>
  );
};

export default LeavePage;
