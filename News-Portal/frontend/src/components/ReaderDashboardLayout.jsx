import { Link, Outlet, useLocation } from "react-router-dom"

const ReaderDashboardLayout = () => {
  const location = useLocation()

  const linkClass = (path) =>
    `block px-4 py-2 rounded-lg ${
      location.pathname.includes(path)
        ? "bg-blue-500 text-white"
        : "text-gray-700 hover:bg-gray-200"
    }`

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-4 space-y-4">

        <h2 className="text-xl font-bold text-blue-600 mb-6">
          Reader Panel
        </h2>

        <Link to="/" className={linkClass("home")}>
          🏠 Home
        </Link>

        <Link to="/reader/profile" className={linkClass("profile")}>
          👤 Profile
        </Link>

        <Link to="/auth/changePassword" className={linkClass("ChangePassword")}>
          🔐 Change Password
        </Link>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>

    </div>
  )
}

export default ReaderDashboardLayout