const monthNames = [
  "",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const PayrollBreakdown = ({ record, onClose }) => {
  const perDaySalary = (record.grossSalary / record.workingDays).toFixed(2);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-md p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-semibold text-gray-800">
            Payroll - {monthNames[record.month]} {record.year}
          </h2>
          <button onClick={onClose} className="text-sm text-gray-500">
            Close
          </button>
        </div>

        <div className="text-sm text-gray-700 space-y-2">
          <p>Working Days: {record.workingDays}</p>
          <p>Per Day Salary: ₹{perDaySalary}</p>

          {record.leaveBreakdown?.map((lb) => (
            <p key={lb.leaveType}>
              Leave Taken: {lb.days} days ({lb.leaveType})
            </p>
          ))}

          <p>Days Without Attendance: {record.absentDays}</p>
          <p>Covered by Leave Balance: {record.leaveBalanceCovered} days</p>
          <p>Unpaid Absent Days: {record.salaryDeductionDays}</p>

          <hr className="my-2" />

          <p>
            Deduction: {record.salaryDeductionDays} x ₹{perDaySalary} = ₹
            {record.totalDeduction}
          </p>
          <p className="font-medium text-gray-900">
            Net Salary: ₹{record.grossSalary} - ₹{record.totalDeduction} = ₹
            {record.netSalary}
          </p>

          <p className="text-xs text-gray-500 mt-3">
            Note: Your leave balance covered some of your absences, so only{" "}
            {record.salaryDeductionDays} days affected your salary this month.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PayrollBreakdown;
