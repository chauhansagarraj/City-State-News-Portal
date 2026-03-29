import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Home,
} from "lucide-react";

const Sidebar = () => {
  const menu = [
    {
      name: "Dashboard",
      path: "/journalist",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "My Articles",
      path: "/journalist/my-articles",
      icon: <FileText size={20} />,
    },
    {
      name: "Create Article",
      path: "/journalist/articles/create",
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
      
      {/* Title */}
      <div className="p-5 text-xl font-bold border-b border-gray-700">
        Journalist Panel
      </div>

      {/* Menu */}
      <div className="mt-4 flex flex-col gap-2 px-3">
        {menu.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            end={item.path === "/journalist"}
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

export default Sidebar;