import { useAuth } from "../../context/AuthContext";
import LeavePage from "./LeavePage";
import AdminLeavePage from "./AdminLeavePage";

const LeaveRouter = () => {
  const { user } = useAuth();
  return user?.role === "admin" ? <AdminLeavePage /> : <LeavePage />;
};

export default LeaveRouter;
