import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  FileText,
  Clock,
  MessageSquare,
  Megaphone,
  BarChart3,
  Home,
  MapPin,
  TrendingUp,
} from "lucide-react";

const AdminDashboardSidebar = () => {
  const linkClass =
    "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all";

  const activeClass = "bg-blue-600 text-white shadow";
  const inactiveClass = "text-gray-700 hover:bg-gray-200";

  return (
    <div className="w-64 h-screen bg-white shadow-lg p-4 fixed overflow-y-auto">
      
      {/* Logo */}
      <h1 className="text-2xl font-bold text-blue-600 mb-6">
        Admin Panel
      </h1>

      {/* DASHBOARD */}
      <Section title="Main">
        <SidebarLink to="/admin" icon={<LayoutDashboard size={18} />} label="Dashboard" />
      </Section>

      {/* USERS */}
      <Section title="User Management">
        <SidebarLink to="/admin/manage-users" icon={<Users size={18} />} label="All Users" />
        {/* <SidebarLink to="/admin/pending-users" icon={<UserCheck size={18} />} label="Pending Approvals" /> */}
      </Section>

      {/* ARTICLES */}
      <Section title="Articles">
        {/* <SidebarLink to="/admin/pending-articles" icon={<Clock size={18} />} label="Pending Articles" /> */}
        <SidebarLink to="/admin/manage-articles" icon={<FileText size={18} />} label="All Articles" />
      </Section>

      {/* COMMENTS */}
      <Section title="Moderation">
        <SidebarLink to="/admin/manage-comments" icon={<MessageSquare size={18} />} label="Manage Comments" />
      </Section>

      {/* CAMPAIGNS */}
      <Section title="Campaigns">
        {/* <SidebarLink to="/admin/campaigns" icon={<Megaphone size={18} />} label="All Campaigns" /> */}
        <SidebarLink to="/admin/manage-campaigns" icon={<Clock size={18} />} label="Manage Campaigns" />
      </Section>

      {/* ANALYTICS */}
      <Section title="Analytics">
        <SidebarLink to="/admin/manage-revenue" icon={<TrendingUp size={18} />} label="Revenue" />
        <SidebarLink to="/admin/top-campaigns/revenue" icon={<BarChart3 size={18} />} label="Top Campaigns" />
        {/* <SidebarLink to="/admin/location" icon={<MapPin size={18} />} label="Location Analytics" /> */}
      </Section>

      {/* GENERAL */}
      <Section title="General">
        <SidebarLink to="/" icon={<Home size={18} />} label="Home" />
      </Section>
    </div>
  );
};

export default AdminDashboardSidebar;





//  Reusable Components

const Section = ({ title, children }) => (
  <div className="mb-5">
    <h2 className="text-xs font-semibold text-gray-400 uppercase mb-2 px-2">
      {title}
    </h2>
    <div className="flex flex-col gap-1">{children}</div>
  </div>
);

const SidebarLink = ({ to, icon, label }) => {
  const linkClass =
    "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all";

  const activeClass = "bg-blue-600 text-white shadow";
  const inactiveClass = "text-gray-700 hover:bg-gray-200";

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${linkClass} ${isActive ? activeClass : inactiveClass}`
      }
    >
      {icon}
      {label}
    </NavLink>
  );
};