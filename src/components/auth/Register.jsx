import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await fetch("http://localhost:8000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (res.ok) {
                setMessage("Registered successfully! Redirecting to login...");
                setTimeout(() => navigate("/login"), 1500);
            } else {
                setMessage(`${data.message}`);
            }
        } catch (err) {
            setMessage("Server error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full  ">
            <div className="text-center mb-6">
                <div className="flex justify-center mb-3">
                    <div className="bg-blue-600 p-3 rounded-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="white"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 13.5V6.75A2.25 2.25 0 015.25 4.5h13.5A2.25 2.25 0 0121 6.75v6.75m-18 0v4.5A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18v-4.5m-18 0h18"
                            />
                        </svg>
                    </div>
                </div>
                <h1 className="text-xl font-semibold text-gray-800">TransConnect</h1>
                <p className="text-gray-500">Transportation Management System</p>
            </div>

            <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-md">

                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Create Account
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                    Register as a customer or agent
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Account Type
                        </label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Role</option>
                            <option value="customer">Customer</option>
                            <option value="agent">Agent</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white font-medium py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                {message && (
                    <p className="text-sm text-center mt-4 text-gray-700">{message}</p>
                )}
            </div>
        </div>
    );
};

export default Register;
