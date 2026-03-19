import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { message, error, loading , isAuthenticated } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await dispatch(loginUser(formData));
        if (res.meta.requestStatus === "fulfilled") {
            navigate("/");
        }
    };

    // useEffect   (() => {
    //     if (isAuthenticated) {
    //         navigate("/");
    //     }
    //     });


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">

            <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">

                <h1 className="text-3xl font-bold text-center text-red-600 mb-6">
                    CityState News
                </h1>

                <h2 className="text-xl font-semibold text-center mb-6">
                    Login to your account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                    />

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

                         {loading ? "Logging in..." : "Login"}
                    </button>
                       

                </form>

                <p className="text-center mt-4 text-gray-600">
                    Don't have an account?{" "}
                    <a href="/register" className="text-red-600 font-semibold">
                        Register
                    </a>
                </p>

            </div>

        </div>
    );
};

export default Login;