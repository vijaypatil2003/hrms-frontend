import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../utils/axios";
import Calendar from "../../components/Dashboard/Calendar";

const Dashboard = () => {
  const { user } = useAuth();
  const [today, setToday] = useState(null);
  const [balance, setBalance] = useState([]);
  const [stats, setStats] = useState({ totalEmployees: 0, pendingLeaves: 0 });

  useEffect(() => {
    api.get("/attendance/me").then((res) => {
      const todayDate = new Date().toDateString();
      const log = res.data.find(
        (l) => new Date(l.date).toDateString() === todayDate,
      );
      setToday(log);
    });

    if (user?.role !== "admin") {
      api.get("/leaves/balance").then((res) => setBalance(res.data));
    } else {
      api
        .get("/employees")
        .then((res) =>
          setStats((s) => ({ ...s, totalEmployees: res.data.length })),
        );
      api
        .get("/leaves", { params: { status: "pending" } })
        .then((res) =>
          setStats((s) => ({ ...s, pendingLeaves: res.data.length })),
        );
    }
  }, [user]);

  return (
    <div>
      <h1 className="text-lg font-semibold text-gray-800 mb-1">
        Welcome, {user?.name}
      </h1>
      <p className="text-sm text-gray-500 mb-6">Role: {user?.role}</p>

      {user?.role === "admin" && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 border border-blue-100 rounded-md p-4">
            <p className="text-sm text-gray-500">Total Employees</p>
            <p className="text-lg font-semibold text-gray-800">
              {stats.totalEmployees}
            </p>
          </div>
          <div className="bg-yellow-50 border border-yellow-100 rounded-md p-4">
            <p className="text-sm text-gray-500">Pending Leaves</p>
            <p className="text-lg font-semibold text-gray-800">
              {stats.pendingLeaves}
            </p>
          </div>
        </div>
      )}

      {user?.role !== "admin" && (
        <>
          <div
            className={`grid gap-4 mb-6`}
            style={{
              gridTemplateColumns: `repeat(${2 + balance.length}, minmax(0, 1fr))`,
            }}
          >
            <div className="bg-green-50 border border-green-100 rounded-md p-4">
              <p className="text-sm text-gray-500">Today's Work Hours</p>
              <p className="text-lg font-semibold text-gray-800">
                {today ? today.totalWorkHours.toFixed(2) : "0.00"}
              </p>
            </div>
            <div className="bg-orange-50 border border-orange-100 rounded-md p-4">
              <p className="text-sm text-gray-500">Today's Break</p>
              <p className="text-lg font-semibold text-gray-800">
                {today ? today.totalBreakMins.toFixed(0) : "0"} mins
              </p>
            </div>
            {balance.map((b) => (
              <div
                key={b.leaveType}
                className="bg-purple-50 border border-purple-100 rounded-md p-4"
              >
                <p className="text-sm text-gray-500">{b.leaveType}</p>
                <p className="text-lg font-semibold text-gray-800">
                  {b.remaining} left
                </p>
              </div>
            ))}
          </div>

          <Calendar />
        </>
      )}
    </div>
  );
};

export default Dashboard;
