import { useState, useEffect } from "react";
import api from "../../utils/axios";
import PayrollForm from "../../components/Payroll/PayrollForm";
import PayrollTable from "../../components/Payroll/PayrollTable";

const AdminPayrollPage = () => {
  const [records, setRecords] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchHistory = async () => {
    const res = await api.get("/payroll/history");
    setRecords(res.data);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div>
      <h1 className="text-lg font-semibold text-gray-800 mb-4">Payroll</h1>

      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm mb-4"
      >
        {showForm ? "Close" : "Run Payroll"}
      </button>

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
