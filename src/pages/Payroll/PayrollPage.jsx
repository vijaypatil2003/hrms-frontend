import { useState, useEffect } from "react";
import api from "../../utils/axios";
import PayrollTable from "../../components/Payroll/PayrollTable";

const PayrollPage = () => {
  const [records, setRecords] = useState([]);

  const fetchHistory = async () => {
    const res = await api.get("/payroll/history");
    setRecords(res.data);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div>
      <h1 className="text-lg font-semibold text-gray-800 mb-4">My Payroll</h1>
      <PayrollTable records={records} isAdmin={false} />
    </div>
  );
};

export default PayrollPage;
