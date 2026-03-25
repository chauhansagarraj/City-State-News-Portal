import AdvertiserDashboardSidebar from "./AdvertiserDashboardSidebar";
// import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex">
      
      {/* Sidebar */}
      <AdvertiserDashboardSidebar />

      {/* Main Content */}
      <div className="ml-64 w-full bg-gray-100 min-h-screen">
        
        {/* Navbar */}
        {/* <Navbar /> */}

        {/* Page Content */}
        <div className="p-6">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default DashboardLayout;