import { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
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
    <AuthProvider>
      <BrowserRouter className="bg-red-500">
        <NavBar linkClasses={linkClasses} menuOpen={menuOpen} toggleMenu={toggleMenu} closeMenu={closeMenu} />
        <RoutesSection />
      </BrowserRouter>
    </AuthProvider>
  );
};

const NavBar = ({ linkClasses, menuOpen, toggleMenu, closeMenu }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/login");
  };

  return (
    <nav className="bg-slate-300 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">TransConnect</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {!user ? (
            <>
              <NavLink to="/" className={linkClasses}>
                Home
              </NavLink>
              <NavLink to="/login" className={linkClasses}>
                Login
              </NavLink>
              <NavLink to="/register" className={linkClasses}>
                Register
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/" className={linkClasses}>
                Home
              </NavLink>
              {user.role === "agent" && (
                <NavLink to="/agent" className={linkClasses}>
                  Agent Dashboard
                </NavLink>
              )}
              {user.role === "driver" && (
                <NavLink to="/driver" className={linkClasses}>
                  Driver Dashboard
                </NavLink>
              )}
              <NavLink to="/communication" className={linkClasses}>
                Communication
              </NavLink>
              <div className="flex items-center space-x-3 border-l border-gray-400 pl-6">
                <span className="text-sm font-semibold text-gray-700">
                  {user.name} ({user.role})
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors duration-200"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </>
          )}
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
          {!user ? (
            <>
              <NavLink to="/" onClick={closeMenu} className={linkClasses}>
                Home
              </NavLink>
              <NavLink to="/login" onClick={closeMenu} className={linkClasses}>
                Login
              </NavLink>
              <NavLink to="/register" onClick={closeMenu} className={linkClasses}>
                Register
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/" onClick={closeMenu} className={linkClasses}>
                Home
              </NavLink>
              {user.role === "agent" && (
                <NavLink to="/agent" onClick={closeMenu} className={linkClasses}>
                  Agent Dashboard
                </NavLink>
              )}
              {user.role === "driver" && (
                <NavLink to="/driver" onClick={closeMenu} className={linkClasses}>
                  Driver Dashboard
                </NavLink>
              )}
              <NavLink to="/communication" onClick={closeMenu} className={linkClasses}>
                Communication
              </NavLink>
              <div className="px-3 py-3 border-t border-gray-300">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  {user.name} ({user.role})
                </p>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors duration-200"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

const RoutesSection = () => {
  return (
    <div className="flex justify-center items-center min-h-[85vh] bg-gray-50">
      <div className="w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/communication" element={<Communication />} />
          
          {/* Protected Routes */}
          <Route
            path="/agent/*"
            element={
              <ProtectedRoute>
                <AgentHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/driver/*"
            element={
              <ProtectedRoute>
                <DriverHome />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;