import { useState, useEffect } from "react";
import api from "../../utils/axios";

const statusStyles = {
  present: "bg-green-100 text-green-700",
  absent: "bg-red-100 text-red-700",
  paidLeave: "bg-blue-100 text-blue-700",
  unpaidLeave: "bg-orange-100 text-orange-700",
  holiday: "bg-purple-100 text-purple-700",
  halfDay: "bg-yellow-100 text-yellow-700",
};

const dotColors = {
  present: "bg-green-500",
  absent: "bg-red-500",
  paidLeave: "bg-blue-500",
  unpaidLeave: "bg-orange-500",
  holiday: "bg-purple-500",
  halfDay: "bg-yellow-500",
};

const Calendar = () => {
  const [attendance, setAttendance] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [viewDate, setViewDate] = useState(new Date());

  const today = new Date();
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  useEffect(() => {
    api.get("/attendance/me").then((res) => setAttendance(res.data));
    api.get("/leaves/me").then((res) => setLeaves(res.data));
    api.get("/holidays").then((res) => setHolidays(res.data));
  }, []);

  const goPrevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const goNextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const getStatus = (date) => {
    const dateStr = date.toDateString();

    const holiday = holidays.find(
      (h) => new Date(h.date).toDateString() === dateStr,
    );
    if (holiday)
      return { type: "holiday", label: "Holiday", detail: holiday.name };

    const leave = leaves.find((l) => {
      if (l.status !== "approved") return false;
      const from = new Date(l.fromDate);
      const to = new Date(l.toDate);
      return (
        date >= new Date(from.toDateString()) &&
        date <= new Date(to.toDateString())
      );
    });
    if (leave) {
      if (leave.isHalfDay)
        return { type: "halfDay", label: "Half Day", detail: leave.leaveType };
      if (leave.leaveType === "Unpaid Leave")
        return {
          type: "unpaidLeave",
          label: "Unpaid Leave",
          detail: leave.leaveType,
        };
      return {
        type: "paidLeave",
        label: "Paid Leave",
        detail: leave.leaveType,
      };
    }

    const log = attendance.find(
      (a) => new Date(a.date).toDateString() === dateStr,
    );
    if (log)
      return {
        type: "present",
        label: "Present",
        detail: `${log.totalWorkHours.toFixed(2)} hrs worked`,
      };

    const day = date.getDay();
    if (day === 0 || day === 6) return null;

    if (date < today)
      return {
        type: "absent",
        label: "Absent",
        detail: "No attendance recorded",
      };

    return null;
  };

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const isToday = (day) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  return (
    <div className="bg-white border border-gray-200 rounded-md p-5">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goPrevMonth}
          className="text-sm text-gray-500 px-2 py-1 hover:bg-gray-100 rounded-md"
        >
          Prev
        </button>
        <h2 className="text-sm font-semibold text-gray-700">
          {viewDate.toLocaleString("default", { month: "long" })} {year}
        </h2>
        <button
          onClick={goNextMonth}
          className="text-sm text-gray-500 px-2 py-1 hover:bg-gray-100 rounded-md"
        >
          Next
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-xs text-gray-400 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="text-center font-medium">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={`blank-${i}`} />
        ))}
        {days.map((day) => {
          const date = new Date(year, month, day);
          const status = getStatus(date);
          return (
            <div
              key={day}
              onClick={() => setSelectedDay({ date, status })}
              className={`h-11 flex flex-col items-center justify-center rounded-lg text-sm cursor-pointer transition ${
                status
                  ? statusStyles[status.type]
                  : "text-gray-600 hover:bg-gray-50"
              } ${isToday(day) ? "ring-2 ring-blue-400" : ""}`}
            >
              {day}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3 mt-4 text-xs text-gray-500">
        {Object.entries({
          present: "Present",
          absent: "Absent",
          paidLeave: "Paid Leave",
          unpaidLeave: "Unpaid Leave",
          holiday: "Holiday",
          halfDay: "Half Day",
        }).map(([key, label]) => (
          <span key={key} className="flex items-center gap-1">
            <span className={`w-2.5 h-2.5 rounded-full ${dotColors[key]}`} />
            {label}
          </span>
        ))}
      </div>

      {selectedDay && (
        <div className="mt-4 bg-gray-50 border border-gray-200 rounded-md p-3 text-sm">
          <p className="font-medium text-gray-800">
            {selectedDay.date.toDateString()}
          </p>
          {selectedDay.status ? (
            <>
              <p className="text-gray-600">{selectedDay.status.label}</p>
              <p className="text-gray-500 text-xs">
                {selectedDay.status.detail}
              </p>
            </>
          ) : (
            <p className="text-gray-500">No record</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Calendar;
