import { useAuth } from "../../context/AuthContext";
import AdminAttendancePage from "./AdminAttendancePage/AdminAttendancePage";
import AttendancePage from "./AttendancePage";

const AttendanceRouter = () => {
  const { user } = useAuth();
  return user?.role === "admin" ? <AdminAttendancePage /> : <AttendancePage />;
};

export default AttendanceRouter;
