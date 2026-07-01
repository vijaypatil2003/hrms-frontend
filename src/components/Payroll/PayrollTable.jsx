import { useState } from "react";
import PayrollBreakdown from "./PayrollBreakdown";
import api from "../../utils/axios";

const PayrollTable = ({ records, isAdmin, onRefresh }) => {
  const [selected, setSelected] = useState(null);

  const handleDownload = async (id, month, year) => {
    const res = await api.get(`/payroll/${id}/slip`, { responseType: "blob" });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `salary-slip-${month}-${year}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleReset = async (r) => {
    if (
      !window.confirm(
        `Reset payroll for ${r.employee?.name} - ${r.month}/${r.year}? This cannot be undone.`,
      )
    )
      return;
    try {
      await api.delete("/payroll/reset", {
        data: { employeeId: r.employee._id, month: r.month, year: r.year },
      });
      onRefresh();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to reset payroll");
    }
  };

  return (
    <>
      <table className="w-full text-sm border border-gray-200 rounded-md">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            {isAdmin && (
              <th className="text-left px-4 py-2 border-b">Employee</th>
            )}
            <th className="text-left px-4 py-2 border-b">Month</th>
            <th className="text-left px-4 py-2 border-b">Working Days</th>
            <th className="text-left px-4 py-2 border-b">Present</th>
            <th className="text-left px-4 py-2 border-b">Paid Days</th>
            <th className="text-left px-4 py-2 border-b">Absent</th>
            <th className="text-left px-4 py-2 border-b">Leaves</th>
            <th className="text-left px-4 py-2 border-b">Deduction</th>
            <th className="text-left px-4 py-2 border-b">Net Salary</th>
            <th className="text-left px-4 py-2 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r._id}>
              {isAdmin && (
                <td className="px-4 py-2 border-b">{r.employee?.name}</td>
              )}
              <td className="px-4 py-2 border-b">
                {r.month}/{r.year}
              </td>
              <td className="px-4 py-2 border-b">{r.workingDays}</td>
              <td className="px-4 py-2 border-b">{r.presentDays}</td>
              <td className="px-4 py-2 border-b">{r.paidDays}</td>
              <td className="px-4 py-2 border-b">{r.absentDays}</td>
              <td className="px-4 py-2 border-b">
                {r.leaveBreakdown?.map((lb) => (
                  <div key={lb.leaveType}>
                    {lb.leaveType}: {lb.days}
                  </div>
                ))}
              </td>
              <td className="px-4 py-2 border-b">{r.totalDeduction}</td>
              <td className="px-4 py-2 border-b font-medium">{r.netSalary}</td>
              <td className="px-4 py-2 border-b">
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelected(r)}
                    className="text-xs bg-blue-600 text-white px-2 py-1 rounded-md"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDownload(r._id, r.month, r.year)}
                    className="text-xs bg-green-600 text-white px-2 py-1 rounded-md"
                  >
                    Download
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => handleReset(r)}
                      className="text-xs bg-red-600 text-white px-2 py-1 rounded-md"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <PayrollBreakdown record={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
};

export default PayrollTable;
