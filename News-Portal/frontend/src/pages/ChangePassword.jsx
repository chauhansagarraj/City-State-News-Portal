import { useState , useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changePassword , clearStatus } from "../store/slices/authSlice"

const ChangePassword = () => {

  const dispatch = useDispatch()
  const { loading, message, error } = useSelector(state => state.auth)

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match")
      return
    }

    dispatch(changePassword({
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword
    }))
  }
useEffect(() => {
  if (message) {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    })
  }

  if (message || error) {
    const timer = setTimeout(() => {
      dispatch(clearStatus())
    }, 3000)

    return () => clearTimeout(timer)
  }
}, [message, error, dispatch])
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-red-600 mb-2">
          Change Password
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Update your account password securely
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Current Password */}
          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={formData.currentPassword}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* New Password */}
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Confirm Password */}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Success Message */}
          {message && (
            <div className="bg-green-100 text-green-700 p-3 rounded-lg">
              {message}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition duration-200"
          >
            {loading ? "Updating..." : "Change Password"}
          </button>

        </form>

      </div>

    </div>
  )
}

export default ChangePassword