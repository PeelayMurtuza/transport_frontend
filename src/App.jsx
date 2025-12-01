import { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, Sun, Moon } from "lucide-react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
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

  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <NavBar menuOpen={menuOpen} toggleMenu={toggleMenu} closeMenu={closeMenu} />
          <RoutesSection />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

const NavBar = ({ menuOpen, toggleMenu, closeMenu }) => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme, theme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/login");
  };

  const linkClasses = ({ isActive }) =>
    `block px-3 py-2 font-semibold transition-colors duration-200 ${
      isDark 
        ? `hover:text-blue-400 ${isActive ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-300"}` 
        : `hover:text-blue-600 ${isActive ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-700"}`
    }`;

  return (
    <nav className={`${isDark ? theme.navbar.bg : theme.navbar.bg} border-b ${isDark ? 'border-gray-700' : 'border-gray-300'} shadow-md transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className={`text-2xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'} transition-colors duration-300`}>TransConnect</h1>

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
              <div className={`flex items-center space-x-3 border-l ${isDark ? 'border-gray-700 pl-6' : 'border-gray-400 pl-6'}`}>
                <span className={`text-sm font-semibold ${theme.text.secondary}`}>
                  {user.name} ({user.role})
                </span>
                <button
                  onClick={handleLogout}
                  className={`flex items-center space-x-1 ${theme.button.danger} px-3 py-2 rounded-lg transition-colors duration-200`}
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Theme Toggle and Mobile Menu */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors duration-200 ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-blue-400' : 'bg-gray-200 hover:bg-gray-300 text-blue-600'}`}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className={`md:hidden ${isDark ? 'bg-gray-800 border-t border-gray-700' : 'bg-slate-200 border-t border-gray-300'} transition-all duration-300`}>
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
              <div className={`px-3 py-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-300'}`}>
                <p className={`text-sm font-semibold ${theme.text.secondary} mb-2`}>
                  {user.name} ({user.role})
                </p>
                <button
                  onClick={handleLogout}
                  className={`w-full flex items-center justify-center space-x-1 ${theme.button.danger} px-3 py-2 rounded-lg transition-colors duration-200`}
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
  const { isDark, theme } = useTheme();

  return (
    <div className={`flex justify-center items-center min-h-[85vh] transition-colors duration-300 ${isDark ? theme.bg.primary : theme.bg.secondary}`}>
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