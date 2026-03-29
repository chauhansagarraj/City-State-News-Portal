import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/slices/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const dispatch = useDispatch();
    const { message, error, loading } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "reader",
        phone: "",
        city: ""
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

   const handleSubmit = async (e) => {
  e.preventDefault();

    const isValid = validate();
  if (!isValid) return;

  const res = await dispatch(registerUser(formData));

  if (res.meta.requestStatus === "fulfilled") {
    navigate("/");
  }
};
const validate = () => {
  let newErrors = {};

  // Email validation
  if (!formData.email) {
    newErrors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
    newErrors.email = "Invalid email format";
  }

  // Password validation
  if (!formData.password) {
    newErrors.password = "Password is required";
  } else if (formData.password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
  }
  else if (!/^(?=.*[A-Z])(?=.*[0-9]).{6,}$/.test(formData.password)) {
  newErrors.password =
    "Password must contain 1 uppercase letter and 1 number";
}

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};
  
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">

            <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">

                <h1 className="text-3xl font-bold text-center text-red-600 mb-6">
                    CityState News
                </h1>

                <h2 className="text-xl font-semibold text-center mb-6">
                    Create Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        onChange={handleChange}
                        className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                    />

             <input
  type="email"
  name="email"
  placeholder="Email"
  onChange={handleChange}
  className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
/>
{errors.email && (
  <p className="text-red-500 text-sm">{errors.email}</p>
)}

                <input
  type="password"
  name="password"
  placeholder="Password"
  onChange={handleChange}
  className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
/>
{errors.password && (
  <p className="text-red-500 text-sm">{errors.password}</p>
)}

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        onChange={handleChange}
                        className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                    />

                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        onChange={handleChange}
                        className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                    />

                    <select
                        name="role"
                        onChange={handleChange}
                        className="w-full border p-3 rounded"
                    >
                        <option value="reader">Reader</option>
                        <option value="journalist">Journalist</option>
                        <option value="advertiser">Advertiser</option>
                    </select>

                    {message && (
                        <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
                            {message}
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700 transition"
                    >   
                     {loading ? "Registering..." : "Register"}
                    </button>

                </form>

            </div>

        </div>
    );
};

export default Register;