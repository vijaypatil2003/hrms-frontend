const PayrollTable = ({ records, isAdmin }) => {
  return (
    <table className="w-full text-sm border border-gray-200 rounded-md">
      <thead className="bg-gray-50 text-gray-600">
        <tr>
          {isAdmin && (
            <th className="text-left px-4 py-2 border-b">Employee</th>
          )}
          <th className="text-left px-4 py-2 border-b">Month</th>
          <th className="text-left px-4 py-2 border-b">Working Days</th>
          <th className="text-left px-4 py-2 border-b">Paid Days</th>
          <th className="text-left px-4 py-2 border-b">Absent</th>
          <th className="text-left px-4 py-2 border-b">Leaves</th>
          <th className="text-left px-4 py-2 border-b">Deduction</th>
          <th className="text-left px-4 py-2 border-b">Net Salary</th>
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
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PayrollTable;
