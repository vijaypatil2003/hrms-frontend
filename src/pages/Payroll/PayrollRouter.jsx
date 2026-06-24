import { useAuth } from "../../context/AuthContext";
import PayrollPage from "./PayrollPage";
import AdminPayrollPage from "./AdminPayrollPage";

const PayrollRouter = () => {
  const { user } = useAuth();
  return user?.role === "admin" ? <AdminPayrollPage /> : <PayrollPage />;
};

export default PayrollRouter;
