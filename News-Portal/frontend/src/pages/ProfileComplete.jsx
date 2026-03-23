// frontend/src/components/ProfileCompletion.jsx

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import API from "../services/axios";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { Navigate } from "react-router-dom";
const ProfileCompletion = () => {
  const { user } = useSelector((state) => state.auth);

  const [form, setForm] = useState({});
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [profileSubmitted, setProfileSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch existing profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/profile/me");

        if (res.data?.profile) {
          setForm(res.data.profile);
          setProfileSubmitted(true);
          setIsEditing(false);
        }
      } catch (error) {
        console.log("Profile not found yet");
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <p className="text-center mt-10">Please login first.</p>;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data = new FormData();

      Object.keys(form).forEach((key) => {
        data.append(key, form[key]);
      });

      if (file) {
        data.append("idProofImage", file);
      }

      const endpoint = profileSubmitted
        ? "/profile/update"
        : "/profile/complete";

      const res = await API.put(endpoint, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(res.data.message);

      setProfileSubmitted(true);
      setIsEditing(false);

    } catch (error) {
      setMessage(error.response?.data?.message || "Error submitting profile");
    }

    setLoading(false);
  };
if (user?.role === "reader") {
  return <Navigate to="/reader/profile" />
}
  return (
    <>
      <Header />
      <Navbar />

      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">

          <h2 className="text-2xl font-bold mb-4 text-center">

            
          
            {user.role === "journalist" 
              ? "Journalist Profile"
              : "Advertiser Profile"}
          </h2>

          <p className="text-gray-600 mb-6 text-center">
            Complete your profile to get admin approval
          </p>

          {profileSubmitted && !isEditing && (
            <div className="flex justify-center mb-4">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
              >
                Edit Profile
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Journalist Fields */}

            {user.role === "journalist" && (
              <>
                <input
                  name="pressCardNumber"
                  value={form.pressCardNumber || ""}
                  onChange={handleChange}
                  disabled={profileSubmitted && !isEditing}
                  placeholder="Press Card Number"
                  className="w-full border rounded p-3"
                />

                <input
                  name="organizationName"
                  value={form.organizationName || ""}
                  onChange={handleChange}
                  disabled={profileSubmitted && !isEditing}
                  placeholder="Organization Name"
                  className="w-full border rounded p-3"
                />

                <input
                  name="experienceYears"
                  type="number"
                  value={form.experienceYears || ""}
                  onChange={handleChange}
                  disabled={profileSubmitted && !isEditing}
                  placeholder="Years of Experience"
                  className="w-full border rounded p-3"
                />

                <input
                  name="governmentIDNumber"
                  value={form.governmentIDNumber || ""}
                  onChange={handleChange}
                  disabled={profileSubmitted && !isEditing}
                  placeholder="Government ID Number"
                  className="w-full border rounded p-3"
                />

                <input
                  name="organizationNumber"
                  value={form.organizationNumber || ""}
                  onChange={handleChange}
                  disabled={profileSubmitted && !isEditing}
                  placeholder="Organization Number"
                  className="w-full border rounded p-3"
                />
              </>
            )}

            {/* Advertiser Fields */}

            {user.role === "advertiser" && (
              <>
                <input
                  name="companyName"
                  value={form.companyName || ""}
                  onChange={handleChange}
                  disabled={profileSubmitted && !isEditing}
                  placeholder="Company Name"
                  className="w-full border rounded p-3"
                />

                <input
                  name="gstNumber"
                  value={form.gstNumber || ""}
                  onChange={handleChange}
                  disabled={profileSubmitted && !isEditing}
                  placeholder="GST Number"
                  className="w-full border rounded p-3"
                />

                <input
                  name="companyWebsite"
                  value={form.companyWebsite || ""}
                  onChange={handleChange}
                  disabled={profileSubmitted && !isEditing}
                  placeholder="Company Website"
                  className="w-full border rounded p-3"
                />

                <input
                  name="governmentIDNumber"
                  value={form.governmentIDNumber || ""}
                  onChange={handleChange}
                  disabled={profileSubmitted && !isEditing}
                  placeholder="Government ID Number"
                  className="w-full border rounded p-3"
                />
              </>
            )}

            {/* File Upload */}

            <div className="flex flex-col">
              <label className="mb-2 font-medium">Upload ID Proof</label>

              <input
                type="file"
                accept="image/*"
                onChange={handleFile}
                disabled={profileSubmitted && !isEditing}
                className="border p-2 rounded"
              />
            </div>

            {/* Submit Button */}

            <button
              type="submit"
              disabled={loading || (profileSubmitted && !isEditing)}
              className={`w-full py-3 rounded text-white font-semibold ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {loading
                ? "Submitting..."
                : isEditing
                ? "Update Profile"
                : "Submit Profile"}
            </button>

          </form>

          {message && (
            <p className="mt-4 text-center text-green-600 font-medium">
              {message}
            </p>
          )}

        </div>
      </div>
    </>
  );
};

export default ProfileCompletion;