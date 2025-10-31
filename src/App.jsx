import { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./Home";
import AgentHome from "./components/agent/AgentHome";
import DriverHome from "./components/Driver/DriverHome";
import Communication from "./components/Communication";
import "./App.css";

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const linkClasses = ({ isActive }) =>
    `block px-3 py-2 font-semibold transition-colors duration-200 hover:text-blue-500 ${
      isActive ? "text-blue-600 border-b-2 border-blue-600" : ""
    }`;

  return (
    <BrowserRouter className="bg-red-500">
      {/* Navbar */}
      <nav className="bg-slate-300 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">TransConnect</h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <NavLink to="/" className={linkClasses}>
              Home
            </NavLink>
            <NavLink to="/login" className={linkClasses}>
              Login
            </NavLink>
            <NavLink to="/register" className={linkClasses}>
              Register
            </NavLink>
            <NavLink to="/agent" className={linkClasses}>
              Agent
            </NavLink>
            <NavLink to="/driver" className={linkClasses}>
              Driver
            </NavLink>
            <NavLink to="/communication" className={linkClasses}>
              Communication
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-blue-600 focus:outline-none"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden bg-slate-200 border-t border-gray-300 transition-all duration-300">
            <NavLink to="/" onClick={closeMenu} className={linkClasses}>
              Home
            </NavLink>
            <NavLink to="/login" onClick={closeMenu} className={linkClasses}>
              Login
            </NavLink>
            <NavLink to="/register" onClick={closeMenu} className={linkClasses}>
              Register
            </NavLink>
            <NavLink to="/agent" onClick={closeMenu} className={linkClasses}>
              Agent
            </NavLink>
            <NavLink to="/driver" onClick={closeMenu} className={linkClasses}>
              Driver
            </NavLink>
            <NavLink
              to="/communication"
              onClick={closeMenu}
              className={linkClasses}
            >
              Communication
            </NavLink>
          </div>
        )}
      </nav>

      {/* Routes Section */}
      <div className="flex justify-center items-center min-h-[85vh] bg-gray-50  ">
        <div className="w-full ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/agent/*" element={<AgentHome />} />
            <Route path="/driver/*" element={<DriverHome />} />
            <Route path="/communication" element={<Communication />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
