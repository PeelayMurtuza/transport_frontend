import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import './App.css'
import Home from "./Home";

const App = () => {
  return (
    <BrowserRouter>
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">TransConnect</h1>
          <div className="space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-semibold hover:text-blue-500 ${
                  isActive ? "text-blue-600 border-b-2 border-blue-600" : ""
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `font-semibold hover:text-blue-500 ${
                  isActive ? "text-blue-600 border-b-2 border-blue-600" : ""
                }`
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `font-semibold hover:text-blue-500 ${
                  isActive ? "text-blue-600 border-b-2 border-blue-600" : ""
                }`
              }
            >
              Register
            </NavLink>
            
          </div>
        </div>
      </nav>

      {/* Routes */}
      <div className="flex justify-center items-center min-h-[85vh] bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
