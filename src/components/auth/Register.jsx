import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Register() {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isFocused, setIsFocused] = useState({ email: false, password: false, role: false });
    const [selectedRole, setSelectedRole] = useState("");
    const [shake, setShake] = useState(false);

    useEffect(() => {
        if (message && message.includes("error")) {
            setShake(true);
            const timer = setTimeout(() => setShake(false), 600);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.name === 'role') {
            setSelectedRole(e.target.value);
        }
        setMessage("");
    };

    const handleFocus = (field) => () => {
        setIsFocused(prev => ({ ...prev, [field]: true }));
    };

    const handleBlur = (field) => () => {
        setIsFocused(prev => ({ ...prev, [field]: false }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            const result = register(formData.email, formData.password, formData.role);
            
            if (result.success) {
                setMessage("Account created successfully! Redirecting to your dashboard...");
                setTimeout(() => {
                    // Redirect based on role
                    if (result.role === 'agent') {
                        navigate('/agent');
                    } else if (result.role === 'driver') {
                        navigate('/driver');
                    } else {
                        navigate('/');
                    }
                }, 1500);
            } else {
                setMessage(result.error);
                setShake(true);
                setTimeout(() => setShake(false), 600);
            }
        } catch (err) {
            setMessage("An error occurred. Please try again.");
            setShake(true);
            setTimeout(() => setShake(false), 600);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-300 via-purple-300 to-slate-200 flex items-center justify-center p-2 sm:p-3 md:p-4 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-80 sm:h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-white/10 rounded-full animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${10 + Math.random() * 10}s`
                        }}
                    />
                ))}
            </div>

            <div className={`w-full max-w-xs sm:max-w-sm md:max-w-md bg-white/10 backdrop-blur-2xl rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl border border-white/20 p-4 sm:p-6 md:p-8 relative transform transition-all duration-500 ${
                shake ? 'animate-shake' : 'hover:scale-[1.02]'
            }`}>
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-cyan-500/10 rounded-xl sm:rounded-2xl md:rounded-3xl blur-xl -z-10"></div>
                
                {/* Enhanced Header */}
                <div className="text-center mb-4 sm:mb-6 md:mb-8 transform transition-all duration-700 hover:scale-105">
                    <div className="relative inline-block">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-r from-green-400 to-cyan-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4 shadow-2xl transform rotate-0 hover:rotate-12 transition-transform duration-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="white"
                                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 transform hover:scale-110 transition-transform duration-300"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 13.5V6.75A2.25 2.25 0 015.25 4.5h13.5A2.25 2.25 0 0121 6.75v6.75m-18 0v4.5A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18v-4.5m-18 0h18"
                                />
                            </svg>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-cyan-800 rounded-xl sm:rounded-2xl blur-lg opacity-50 animate-pulse"></div>
                    </div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-200 to-cyan-200 bg-clip-text text-transparent animate-gradient-x">
                        TransConnect
                    </h1>
                    <p className="text-gray-300 mt-1 sm:mt-2 md:mt-3 text-xs sm:text-sm md:text-lg animate-fade-in">Modern Transportation System</p>
                </div>

                {/* Form Container */}
                <div className="bg-gray-900/30 backdrop-blur-lg rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 border border-white/10 transform transition-all duration-500 hover:scale-[1.01]">
                    <div className="text-center mb-4 sm:mb-6">
                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
                            Create Account
                        </h2>
                        <p className="text-gray-400 mt-1 sm:mt-2 text-xs sm:text-sm">Join as a customer or agent</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-6">
                        {/* Enhanced Email Field */}
                        <div className="space-y-1 sm:space-y-2 md:space-y-3 transform transition-all duration-300 hover:scale-[1.02]">
                            <label className="text-xs sm:text-sm font-semibold text-gray-300 flex items-center">
                                <span className="bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
                                    Email Address
                                </span>
                            </label>
                            <div className="relative group">
                                <div className={`absolute inset-0 bg-gradient-to-r from-green-500 to-cyan-500 rounded-lg sm:rounded-xl blur opacity-25 group-hover:opacity-75 transition-all duration-300 ${
                                    isFocused.email ? 'opacity-50' : ''
                                }`}></div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none transition-all duration-300">
                                        <svg className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 transition-all duration-300 ${
                                            isFocused.email ? 'text-green-400 scale-110' : 'text-gray-400'
                                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onFocus={handleFocus('email')}
                                        onBlur={handleBlur('email')}
                                        required
                                        className="w-full pl-8 sm:pl-10 md:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base bg-gray-900/50 border border-gray-700/50 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-white placeholder-gray-400"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Password Field */}
                        <div className="space-y-1 sm:space-y-2 md:space-y-3 transform transition-all duration-300 hover:scale-[1.02]">
                            <label className="text-xs sm:text-sm font-semibold text-gray-300 flex items-center">
                                <span className="bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
                                    Password
                                </span>
                            </label>
                            <div className="relative group">
                                <div className={`absolute inset-0 bg-gradient-to-r from-green-500 to-cyan-500 rounded-lg sm:rounded-xl blur opacity-25 group-hover:opacity-75 transition-all duration-300 ${
                                    isFocused.password ? 'opacity-50' : ''
                                }`}></div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none transition-all duration-300">
                                        <svg className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 transition-all duration-300 ${
                                            isFocused.password ? 'text-green-400 scale-110' : 'text-gray-400'
                                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <input
                                        name="password"
                                        type="password"
                                        placeholder="Create a password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        onFocus={handleFocus('password')}
                                        onBlur={handleBlur('password')}
                                        required
                                        className="w-full pl-8 sm:pl-10 md:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base bg-gray-900/50 border border-gray-700/50 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-white placeholder-gray-400"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Role Selection */}
                        <div className="space-y-1 sm:space-y-2 md:space-y-3 transform transition-all duration-300 hover:scale-[1.02]">
                            <label className="text-xs sm:text-sm font-semibold text-gray-300 flex items-center">
                                <span className="bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
                                    Account Type
                                </span>
                            </label>
                            <div className="relative group">
                                <div className={`absolute inset-0 bg-gradient-to-r from-green-500 to-cyan-500 rounded-lg sm:rounded-xl blur opacity-25 group-hover:opacity-75 transition-all duration-300 ${
                                    isFocused.role ? 'opacity-50' : ''
                                }`}></div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none transition-all duration-300">
                                        <svg className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 transition-all duration-300 ${
                                            isFocused.role ? 'text-green-100 scale-110' : 'text-black'
                                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        onFocus={handleFocus('role')}
                                        onBlur={handleBlur('role')}
                                        required
                                        className="w-full pl-8 sm:pl-10 md:pl-12 pr-8 sm:pr-10 md:pr-12 py-2 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base bg-gray-900/50 border border-gray-700/50 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-white appearance-none cursor-pointer"
                                    >
                                        <option value="" className="bg-gray-800 text-xs sm:text-sm">Select Role</option>
                                        <option value="customer" className="bg-gray-800 text-xs sm:text-sm">Customer</option>
                                        <option value="agent" className="bg-gray-800 text-xs sm:text-sm">Agent</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center pointer-events-none">
                                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Role Description Cards */}
                        {selectedRole && (
                            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3 md:gap-4 animate-fade-in">
                                <div className={`p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-300 ${
                                    selectedRole === 'customer' 
                                        ? 'bg-amber-300 border-green-500/50 scale-105' 
                                        : 'bg-amber-200 border-gray-700/50 opacity-60'
                                }`}>
                                    <div className="flex items-center space-x-1 sm:space-x-2">
                                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-cyan-800 rounded-full"></div>
                                        <span className="text-xs sm:text-sm font-semibold text-gray-900">Customer</span>
                                    </div>
                                    <p className="text-xs text-black mt-1 sm:mt-2 leading-tight">Book transportation services and manage your shipments</p>
                                </div>
                                <div className={`p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-300 ${
                                    selectedRole === 'agent' 
                                        ? 'bg-amber-300 border-cyan-500/50 scale-105' 
                                        : 'bg-amber-300 border-gray-700/50 opacity-60'
                                }`}>
                                    <div className="flex items-center space-x-1 sm:space-x-2">
                                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-cyan-800 rounded-full"></div>
                                        <span className="text-xs sm:text-sm font-semibold text-gray-900">Agent</span>
                                    </div>
                                    <p className="text-xs text-gray-900 mt-1 sm:mt-2 leading-tight">Manage transportation operations and customer requests</p>
                                </div>
                            </div>
                        )}

                        {/* Enhanced Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full group relative overflow-hidden bg-gradient-to-r from-green-500 to-cyan-600 text-white py-2 sm:py-3 md:py-4 rounded-lg sm:rounded-xl md:rounded-2xl font-bold transition-all duration-500 transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed shadow-2xl text-xs sm:text-sm md:text-base"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative flex items-center justify-center space-x-1 sm:space-x-2 md:space-x-3">
                                {loading ? (
                                    <>
                                        <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 border-2 sm:border-3 border-white border-t-transparent rounded-full animate-spin" />
                                        <span className="text-xs sm:text-sm md:text-lg">Creating Account...</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-xs sm:text-sm md:text-lg">Create Account</span>
                                        <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </>
                                )}
                            </div>
                            <div className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                        </button>
                    </form>

                    {/* Enhanced Login Link */}
                    <div className="mt-4 sm:mt-5 md:mt-6 text-center transform transition-all duration-300 hover:scale-105">
                        <p className="text-gray-400 text-xs sm:text-sm">
                            Already have an account?{" "}
                            <Link 
                                to="/login" 
                                className="bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent font-bold hover:scale-105 transform transition-all duration-300 inline-block text-xs sm:text-sm"
                            >
                                Sign in here
                            </Link>
                        </p>
                    </div>

                    {/* Enhanced Message Display */}
                    {message && (
                        <div className={`mt-4 sm:mt-5 md:mt-6 p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl md:rounded-2xl text-center font-semibold backdrop-blur-lg border transform transition-all duration-500 text-xs sm:text-sm ${
                            message.includes("error") 
                                ? "bg-red-500/10 text-red-300 border-red-500/30 animate-pulse" 
                                : "bg-green-500/10 text-green-300 border-green-500/30 animate-bounce-in"
                        }`}>
                            <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                                {message.includes("error") ? (
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ) : (
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                )}
                                <span>{message}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Add custom animations to tailwind config */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-10px) rotate(180deg); }
                }
                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-3px); }
                    75% { transform: translateX(3px); }
                }
                @keyframes bounce-in {
                    0% { transform: scale(0.3); opacity: 0; }
                    50% { transform: scale(1.05); }
                    70% { transform: scale(0.9); }
                    100% { transform: scale(1); opacity: 1; }
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-float { animation: float 10s ease-in-out infinite; }
                .animate-gradient-x { 
                    background-size: 200% 200%;
                    animation: gradient 3s ease infinite; 
                }
                .animate-shake { animation: shake 0.5s ease-in-out; }
                .animate-bounce-in { animation: bounce-in 0.6s ease-out; }
                .animate-fade-in { animation: fadeIn 0.5s ease-out; }
                .animation-delay-2000 { animation-delay: 2s; }
                .animation-delay-4000 { animation-delay: 4s; }
                
                /* Extra small devices (phones under 320px) */
                @media (max-width: 320px) {
                    .container {
                        padding: 0.5rem;
                    }
                    input, select {
                        font-size: 14px; /* Prevents zoom on iOS */
                    }
                }
                
                /* Very small height devices */
                @media (max-height: 600px) {
                    .min-h-screen {
                        min-height: 100vh;
                        padding: 1rem 0;
                    }
                }
            `}</style>
        </div>
    );
}

export default Register;