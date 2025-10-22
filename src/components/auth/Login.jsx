import React, { useState } from "react";

function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:8000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            setMessage(data.message);
            if (res.ok) localStorage.setItem("token", data.token);
        } catch (err) {
            setMessage("Error: " + err.message);
        }
    };

    return (
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
                >
                    Login
                </button>
            </form>
            {message && (
                <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
            )}
        </div>
    );
};

export default Login;
