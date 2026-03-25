import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Megaphone,
  PlusCircle,
  Home,
//   Wallet,
} from "lucide-react";

const AdvertiserDashboardSidebar = () => {
  const menu = [
    {
      name: "Dashboard",
      path: "/advertiser",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Campaigns",
      path: "/advertiser/campaign/my",
      icon: <Megaphone size={20} />,
    },
    {
      name: "Create Campaign",
      path: "/advertiser/campaign/create",
      icon: <PlusCircle size={20} />,
    },
    {
      name: "Home",
      path: "/",
      icon: <Home size={20} />,
    },
  ];

  return (
    <div className="h-screen w-64 bg-gray-900 text-white fixed left-0 top-0">
      
      {/* Logo / Title */}
      <div className="p-5 text-xl font-bold border-b border-gray-700">
        Advertiser Panel
      </div>

      {/* Menu */}
      <div className="mt-4 flex flex-col gap-2 px-3">
        {menu.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            end={item.path === "/advertiser"}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-gray-800"
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AdvertiserDashboardSidebar;