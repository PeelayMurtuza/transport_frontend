import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon, Mail, Lock, Eye, EyeOff, User, Key, Check, AlertCircle } from "lucide-react";
export default function Login() {
    const navigate = useNavigate();
    const { login, sampleCredentials } = useAuth();
    const { theme, isDark, toggleTheme } = useTheme();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isFocused, setIsFocused] = useState({ email: false, password: false });
    const [shake, setShake] = useState(false);
    const [showSampleCredentials, setShowSampleCredentials] = useState(false);

    useEffect(() => {
        if (message.includes("Error")) {
            setShake(true);
            const timer = setTimeout(() => setShake(false), 500);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
        setIsLoading(true);
        setMessage("");

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const result = login(formData.email, formData.password);
        
        if (result.success) {
            setMessage("Login successful! Redirecting...");
            setTimeout(() => {
                // Redirect based on role
                if (result.role === 'agent') {
                    navigate('/agent');
                } else if (result.role === 'driver') {
                    navigate('/driver');
                } else {
                    navigate('/');
                }
            }, 1000);
        } else {
            setMessage(result.error);
            setShake(true);
            setTimeout(() => setShake(false), 500);
        }
        
        setIsLoading(false);
    };

    const fillSampleCredentials = (roleType) => {
        setFormData({
            email: sampleCredentials[roleType].email,
            password: sampleCredentials[roleType].password
        });
        setMessage("");
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    // Theme-based colors
    const getInputClasses = (focused) => `
        w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 text-sm sm:text-base 
        ${theme.input.bg} ${theme.input.border} 
        rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent 
        transition-all duration-300 ${theme.input.text} ${theme.input.placeholder}
        ${focused ? 'ring-2 ring-blue-500/20' : ''}
    `;

    const getButtonClasses = (isPrimary = true) => `
        w-full group relative overflow-hidden 
        ${isPrimary ? theme.button.primary : theme.button.secondary}
        py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold 
        transition-all duration-500 transform hover:scale-[1.02] 
        disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed 
        ${theme.shadow.md} text-sm sm:text-base
    `;

    return (
        <div className={`min-h-screen flex items-center justify-center p-3 sm:p-4 relative overflow-hidden transition-colors duration-500 ${
            isDark 
                ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900/20' 
                : 'bg-gradient-to-br from-slate-100 via-blue-50 to-slate-50'
        }`}>
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className={`absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 ${
                    isDark ? 'bg-blue-600' : 'bg-blue-400'
                } rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse transition-colors duration-500`}></div>
                <div className={`absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 ${
                    isDark ? 'bg-purple-600' : 'bg-purple-400'
                } rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000 transition-colors duration-500`}></div>
                <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-80 sm:h-80 ${
                    isDark ? 'bg-cyan-600' : 'bg-cyan-400'
                } rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000 transition-colors duration-500`}></div>
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className={`absolute w-1 h-1 sm:w-2 sm:h-2 ${
                            isDark ? 'bg-white/10' : 'bg-black/10'
                        } rounded-full animate-float transition-colors duration-500`}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${10 + Math.random() * 10}s`
                        }}
                    />
                ))}
            </div>

            <div className={`w-full max-w-xs sm:max-w-sm md:max-w-md ${
                theme.card.bg
            } backdrop-blur-lg rounded-2xl sm:rounded-3xl ${
                theme.shadow.lg
            } ${theme.border.primary} border p-4 sm:p-6 md:p-8 relative transform transition-all duration-500 ${
                shake ? 'animate-shake' : 'hover:scale-[1.02]'
            }`}>
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${
                    isDark ? 'from-blue-500/10 to-purple-500/10' : 'from-blue-400/10 to-purple-400/10'
                } rounded-2xl sm:rounded-3xl blur-xl -z-10 transition-colors duration-500`}></div>
                
                {/* Header with Enhanced Animation */}
                <div className="text-center mb-6 sm:mb-8 transform transition-all duration-700 hover:scale-105">
                    <div className="relative inline-block">
                        <div className={`w-16 h-16 sm:w-20 sm:h-20 ${
                            isDark ? 'bg-gradient-to-r from-cyan-500 to-blue-600' : 'bg-gradient-to-r from-cyan-400 to-blue-500'
                        } rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-2xl transform rotate-0 hover:rotate-12 transition-transform duration-500`}>
                            <Key className={`w-8 h-8 sm:w-10 sm:h-10 text-white transform hover:scale-110 transition-transform duration-300`} />
                        </div>
                        <div className={`absolute inset-0 ${
                            isDark ? 'bg-gradient-to-r from-cyan-500 to-blue-600' : 'bg-gradient-to-r from-cyan-400 to-blue-500'
                        } rounded-2xl blur-lg opacity-50 animate-pulse transition-colors duration-500`}></div>
                    </div>
                    <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${
                        isDark 
                            ? 'bg-gradient-to-r from-cyan-400 to-blue-400' 
                            : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                    } bg-clip-text text-transparent animate-gradient-x transition-colors duration-500`}>
                        Welcome Back
                    </h2>
                    <p className={`${theme.text.secondary} mt-2 sm:mt-3 text-sm sm:text-lg animate-fade-in transition-colors duration-500`}>
                        Continue your journey with us
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    {/* Enhanced Email Field */}
                    <div className="space-y-2 sm:space-y-3 transform transition-all duration-300 hover:scale-[1.02]">
                        <label className="text-xs sm:text-sm font-semibold flex items-center">
                            <span className={`${
                                isDark 
                                    ? 'bg-gradient-to-r from-cyan-400 to-blue-400' 
                                    : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                            } bg-clip-text text-transparent transition-colors duration-500`}>
                                Email Address
                            </span>
                        </label>
                        <div className="relative group">
                            <div className={`absolute inset-0 ${
                                isDark 
                                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500' 
                                    : 'bg-gradient-to-r from-cyan-400 to-blue-400'
                            } rounded-lg sm:rounded-xl blur opacity-25 group-hover:opacity-75 transition-all duration-500 ${
                                isFocused.email ? 'opacity-50' : ''
                            }`}></div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none transition-all duration-300">
                                    <Mail className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                                        isFocused.email 
                                            ? (isDark ? 'text-cyan-400' : 'text-cyan-500') 
                                            : theme.text.tertiary
                                    }`} />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    onChange={handleChange}
                                    onFocus={handleFocus('email')}
                                    onBlur={handleBlur('email')}
                                    required
                                    className={getInputClasses(isFocused.email)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Password Field */}
                    <div className="space-y-2 sm:space-y-3 transform transition-all duration-300 hover:scale-[1.02]">
                        <label className="text-xs sm:text-sm font-semibold flex items-center">
                            <span className={`${
                                isDark 
                                    ? 'bg-gradient-to-r from-cyan-400 to-blue-400' 
                                    : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                            } bg-clip-text text-transparent transition-colors duration-500`}>
                                Password
                            </span>
                        </label>
                        <div className="relative group">
                            <div className={`absolute inset-0 ${
                                isDark 
                                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500' 
                                    : 'bg-gradient-to-r from-cyan-400 to-blue-400'
                            } rounded-lg sm:rounded-xl blur opacity-25 group-hover:opacity-75 transition-all duration-500 ${
                                isFocused.password ? 'opacity-50' : ''
                            }`}></div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none transition-all duration-300">
                                    <Lock className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                                        isFocused.password 
                                            ? (isDark ? 'text-cyan-400' : 'text-cyan-500') 
                                            : theme.text.tertiary
                                    }`} />
                                </div>
                                <input
                                    type={isPasswordVisible ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    onChange={handleChange}
                                    onFocus={handleFocus('password')}
                                    onBlur={handleBlur('password')}
                                    required
                                    className={`${getInputClasses(isFocused.password)} pr-10 sm:pr-12`}
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center transition-all duration-300 hover:scale-110"
                                >
                                    {isPasswordVisible ? (
                                        <EyeOff className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                                            theme.text.tertiary
                                        } hover:${isDark ? 'text-cyan-400' : 'text-cyan-500'}`} />
                                    ) : (
                                        <Eye className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                                            theme.text.tertiary
                                        } hover:${isDark ? 'text-cyan-400' : 'text-cyan-500'}`} />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between transform transition-all duration-300 hover:scale-[1.01]">
                        <label className="flex items-center space-x-2 cursor-pointer group">
                            <div className="relative">
                                <input 
                                    type="checkbox" 
                                    className="sr-only" 
                                />
                                <div className={`w-4 h-4 sm:w-5 sm:h-5 ${theme.input.bg} ${
                                    theme.border.primary
                                } border rounded-md group-hover:border-blue-500 transition-all duration-300 flex items-center justify-center`}>
                                    <Check className={`w-2 h-2 sm:w-3 sm:h-3 ${
                                        isDark ? 'text-cyan-400' : 'text-blue-500'
                                    } opacity-0 transform scale-0 transition-all duration-200`} />
                                </div>
                            </div>
                            <span className={`text-xs sm:text-sm ${theme.text.secondary} group-hover:${
                                isDark ? 'text-cyan-100' : 'text-blue-600'
                            } transition-colors duration-300`}>
                                Remember me
                            </span>
                        </label>
                        <a href="#" className={`text-xs sm:text-sm ${
                            isDark 
                                ? 'bg-gradient-to-r from-cyan-400 to-blue-400' 
                                : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                        } bg-clip-text text-transparent font-semibold hover:scale-105 transform transition-all duration-300`}>
                            Forgot password?
                        </a>
                    </div>

                    {/* Enhanced Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={getButtonClasses()}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative flex items-center justify-center space-x-2 sm:space-x-3">
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 sm:w-6 sm:h-6 border-2 sm:border-3 border-white border-t-transparent rounded-full animate-spin" />
                                    <span className="text-sm sm:text-lg">Authenticating...</span>
                                </>
                            ) : (
                                <>
                                    <span className="text-sm sm:text-lg">Sign In</span>
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </>
                            )}
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    </button>
                </form>

                {/* Enhanced Sign Up Link */}
                <div className="mt-6 sm:mt-8 text-center transform transition-all duration-300 hover:scale-105">
                    <p className={`${theme.text.secondary} text-xs sm:text-sm`}>
                        New to our platform?{" "}
                        <a href="/register" className={`${
                            isDark 
                                ? 'bg-gradient-to-r from-cyan-400 to-blue-400' 
                                : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                        } bg-clip-text text-transparent font-bold hover:scale-105 transform transition-all duration-300 inline-block`}>
                            Create an account
                        </a>
                    </p>
                </div>

                {/* Sample Credentials Section */}
                <div className="mt-6 sm:mt-8">
                    <button
                        type="button"
                        onClick={() => setShowSampleCredentials(!showSampleCredentials)}
                        className={`w-full text-xs sm:text-sm ${theme.text.tertiary} hover:${
                            isDark ? 'text-cyan-300' : 'text-blue-500'
                        } transition-colors duration-300 py-2 text-center`}
                    >
                        {showSampleCredentials ? '▼ Hide' : '▶ Show'} Sample Credentials
                    </button>
                    
                    {showSampleCredentials && (
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                            {/* Customer Sample */}
                            <div className={`${
                                isDark ? 'bg-gray-800/50' : 'bg-blue-50'
                            } border ${
                                isDark ? 'border-cyan-500/30' : 'border-blue-200'
                            } rounded-lg p-2 sm:p-3 text-center transition-colors duration-300`}>
                                <div className="flex items-center justify-center mb-2">
                                    <User className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                        isDark ? 'text-cyan-300' : 'text-blue-500'
                                    } mr-2`} />
                                    <p className={`text-xs font-semibold ${
                                        isDark ? 'text-cyan-300' : 'text-blue-600'
                                    }`}>
                                        Customer
                                    </p>
                                </div>
                                <p className={`text-xs ${
                                    isDark ? 'text-gray-300' : 'text-gray-700'
                                } mb-1 transition-colors duration-300`}>
                                    customer@example.com
                                </p>
                                <p className={`text-xs ${
                                    isDark ? 'text-gray-300' : 'text-gray-700'
                                } mb-3 transition-colors duration-300`}>
                                    customer123
                                </p>
                                <button
                                    type="button"
                                    onClick={() => fillSampleCredentials('customer')}
                                    className={`w-full ${
                                        isDark ? 'bg-cyan-600 hover:bg-cyan-700' : 'bg-blue-500 hover:bg-blue-600'
                                    } text-white text-xs py-1 rounded transition-all duration-300 hover:scale-105`}
                                >
                                    Use
                                </button>
                            </div>

                            {/* Agent Sample */}
                            <div className={`${
                                isDark ? 'bg-gray-800/50' : 'bg-purple-50'
                            } border ${
                                isDark ? 'border-blue-500/30' : 'border-purple-200'
                            } rounded-lg p-2 sm:p-3 text-center transition-colors duration-300`}>
                                <div className="flex items-center justify-center mb-2">
                                    <User className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                        isDark ? 'text-blue-300' : 'text-purple-500'
                                    } mr-2`} />
                                    <p className={`text-xs font-semibold ${
                                        isDark ? 'text-blue-300' : 'text-purple-600'
                                    }`}>
                                        Agent
                                    </p>
                                </div>
                                <p className={`text-xs ${
                                    isDark ? 'text-gray-300' : 'text-gray-700'
                                } mb-1 transition-colors duration-300`}>
                                    agent@example.com
                                </p>
                                <p className={`text-xs ${
                                    isDark ? 'text-gray-300' : 'text-gray-700'
                                } mb-3 transition-colors duration-300`}>
                                    agent123
                                </p>
                                <button
                                    type="button"
                                    onClick={() => fillSampleCredentials('agent')}
                                    className={`w-full ${
                                        isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-purple-500 hover:bg-purple-600'
                                    } text-white text-xs py-1 rounded transition-all duration-300 hover:scale-105`}
                                >
                                    Use
                                </button>
                            </div>

                            {/* Driver Sample */}
                            <div className={`${
                                isDark ? 'bg-gray-800/50' : 'bg-emerald-50'
                            } border ${
                                isDark ? 'border-purple-500/30' : 'border-emerald-200'
                            } rounded-lg p-2 sm:p-3 text-center transition-colors duration-300`}>
                                <div className="flex items-center justify-center mb-2">
                                    <User className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                        isDark ? 'text-purple-300' : 'text-emerald-500'
                                    } mr-2`} />
                                    <p className={`text-xs font-semibold ${
                                        isDark ? 'text-purple-300' : 'text-emerald-600'
                                    }`}>
                                        Driver
                                    </p>
                                </div>
                                <p className={`text-xs ${
                                    isDark ? 'text-gray-300' : 'text-gray-700'
                                } mb-1 transition-colors duration-300`}>
                                    driver@example.com
                                </p>
                                <p className={`text-xs ${
                                    isDark ? 'text-gray-300' : 'text-gray-700'
                                } mb-3 transition-colors duration-300`}>
                                    driver123
                                </p>
                                <button
                                    type="button"
                                    onClick={() => fillSampleCredentials('driver')}
                                    className={`w-full ${
                                        isDark ? 'bg-purple-600 hover:bg-purple-700' : 'bg-emerald-500 hover:bg-emerald-600'
                                    } text-white text-xs py-1 rounded transition-all duration-300 hover:scale-105`}
                                >
                                    Use
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Enhanced Message Display */}
                {message && (
                    <div className={`mt-4 sm:mt-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl text-center font-semibold backdrop-blur-lg border transform transition-all duration-500 text-xs sm:text-sm ${
                        message.includes("Error") 
                            ? `${isDark ? 'bg-red-900/20' : 'bg-red-50'} ${
                                isDark ? 'text-red-300' : 'text-red-600'
                            } ${isDark ? 'border-red-700/30' : 'border-red-200'} animate-pulse` 
                            : `${isDark ? 'bg-green-900/20' : 'bg-green-50'} ${
                                isDark ? 'text-green-300' : 'text-green-600'
                            } ${isDark ? 'border-green-700/30' : 'border-green-200'} animate-bounce-in`
                    }`}>
                        <div className="flex items-center justify-center space-x-2">
                            {message.includes("Error") ? (
                                <AlertCircle className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                    isDark ? 'text-red-300' : 'text-red-500'
                                }`} />
                            ) : (
                                <Check className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                    isDark ? 'text-green-300' : 'text-green-500'
                                }`} />
                            )}
                            <span>{message}</span>
                        </div>
                    </div>
                )}
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
                .animate-float { animation: float 10s ease-in-out infinite; }
                .animate-gradient-x { 
                    background-size: 200% 200%;
                    animation: gradient 3s ease infinite; 
                }
                .animate-shake { animation: shake 0.5s ease-in-out; }
                .animate-bounce-in { animation: bounce-in 0.6s ease-out; }
                .animation-delay-2000 { animation-delay: 2s; }
                .animation-delay-4000 { animation-delay: 4s; }
                
                /* Mobile optimizations */
                @media (max-width: 360px) {
                    .container {
                        padding: 1rem;
                    }
                    input {
                        font-size: 16px; /* Prevents zoom on iOS */
                    }
                }
                
                /* Very small devices */
                @media (max-width: 320px) {
                    .container {
                        padding: 0.75rem;
                    }
                }
            `}</style>
        </div>
    );
}
