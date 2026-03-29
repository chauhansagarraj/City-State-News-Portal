import { Outlet } from "react-router-dom";
import AdminDashboardSidebar from "./AdminDashboardSidebar";

const AdminLayout = () => {
  return (
    <div className="flex">
      
      <AdminDashboardSidebar />

      <div className="ml-64 p-6 w-full bg-gray-100 min-h-screen">
        <Outlet />
      </div>

    </div>
  );
};

export default AdminLayout;