import { useEffect, useState } from "react"
import API from "../services/axios"

const Profile = () => {

  const [user, setUser] = useState({})
  const [formData, setFormData] = useState({})
  const [editing, setEditing] = useState(false)
  const [message, setMessage] = useState("")
const [error, setError] = useState("")
const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    const res = await API.get("/profile/me")
    setUser(res.data.profile)
    setFormData(res.data.profile)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleUpdate = async () => {
  setLoading(true)
  setMessage("")
  setError("")


  try {
    const res = await API.put("/profile/update", formData)

    setMessage(res.data.message || "Profile updated successfully")
    setEditing(false)
    fetchProfile()

  } catch (err) {
    setError(err.response?.data?.message || "Update failed")
  }

  setLoading(false)
}

useEffect(() => {
  if (message || error) {
    const timer = setTimeout(() => {
      setMessage("")
      setError("")
    }, 3000)

    return () => clearTimeout(timer)
  }
}, [message, error])

  return (
    <div className="max-w-md bg-white p-6 rounded shadow">

      <h2 className="text-xl font-bold mb-4">My Profile</h2>

      {editing ? (
        <>
          <input
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            placeholder="Name"
            className="border p-2 w-full mb-2"
          />

          <input
            name="city"
            value={formData.city || ""}
            onChange={handleChange}
            placeholder="City"
            className="border p-2 w-full mb-2"
          />

          <input
            name="state"
            value={formData.state || ""}
            onChange={handleChange}
            placeholder="State"
            className="border p-2 w-full mb-2"
          />

      <button
  onClick={handleUpdate}
  disabled={loading}
  className={`px-4 py-2 rounded text-white ${
    loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
  }`}
>
  {loading ? "Saving..." : "Save"}
</button>
        </>
      ) : (
        <>
          <p><b>Name:</b> {user.name}</p>
          <p><b>City:</b> {user.city}</p>
          <p><b>State:</b> {user.state}</p>

          <button
            onClick={() => setEditing(true)}
            className="mt-3 bg-gray-200 px-3 py-2 rounded"
          >
            Edit
          </button>

          {message && (
  <div className="bg-green-100 text-green-700 p-3 rounded mb-3 text-center">
    {message}
  </div>
)}

{error && (
  <div className="bg-red-100 text-red-700 p-3 rounded mb-3 text-center">
    {error}
  </div>
)}
        </>
      )}

    </div>
  )
}

export default Profile