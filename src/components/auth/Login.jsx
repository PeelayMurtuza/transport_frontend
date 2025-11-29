import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Login() {
    const navigate = useNavigate();
    const { login, sampleCredentials, role } = useAuth();
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-300 via-purple-300 to-slate-200 flex items-center justify-center p-3 sm:p-4 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-80 sm:h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0">
                {[...Array(15)].map((_, i) => (
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

            <div className={`w-full max-w-xs sm:max-w-sm md:max-w-md bg-white/10 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 p-4 sm:p-6 md:p-8 relative transform transition-all duration-500 ${
                shake ? 'animate-shake' : 'hover:scale-[1.02]'
            }`}>
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl sm:rounded-3xl blur-xl -z-10"></div>
                
                {/* Header with Enhanced Animation */}
                <div className="text-center mb-6 sm:mb-8 transform transition-all duration-700 hover:scale-105">
                    <div className="relative inline-block">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-2xl transform rotate-0 hover:rotate-12 transition-transform duration-500">
                            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white transform hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur-lg opacity-50 animate-pulse"></div>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent animate-gradient-x">
                        Welcome Back
                    </h2>
                    <p className="text-gray-300 mt-2 sm:mt-3 text-sm sm:text-lg animate-fade-in">Continue your journey with us</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    {/* Enhanced Email Field */}
                    <div className="space-y-2 sm:space-y-3 transform transition-all duration-300 hover:scale-[1.02]">
                        <label className="text-xs sm:text-sm font-semibold text-gray-300 flex items-center">
                            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                Email Address
                            </span>
                        </label>
                        <div className="relative group">
                            <div className={`absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg sm:rounded-xl blur opacity-25 group-hover:opacity-75 transition-all duration-300 ${
                                isFocused.email ? 'opacity-50' : ''
                            }`}></div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none transition-all duration-300">
                                    <svg className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                                        isFocused.email ? 'text-cyan-400 scale-110' : 'text-gray-400'
                                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    onChange={handleChange}
                                    onFocus={handleFocus('email')}
                                    onBlur={handleBlur('email')}
                                    required
                                    className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 text-sm sm:text-base bg-gray-900/50 border border-gray-700/50 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all duration-300 backdrop-blur-lg text-white placeholder-gray-400"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Password Field */}
                    <div className="space-y-2 sm:space-y-3 transform transition-all duration-300 hover:scale-[1.02]">
                        <label className="text-xs sm:text-sm font-semibold text-gray-300 flex items-center">
                            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                Password
                            </span>
                        </label>
                        <div className="relative group">
                            <div className={`absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg sm:rounded-xl blur opacity-25 group-hover:opacity-75 transition-all duration-300 ${
                                isFocused.password ? 'opacity-50' : ''
                            }`}></div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none transition-all duration-300">
                                    <svg className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                                        isFocused.password ? 'text-cyan-400 scale-110' : 'text-gray-400'
                                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    type={isPasswordVisible ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    onChange={handleChange}
                                    onFocus={handleFocus('password')}
                                    onBlur={handleBlur('password')}
                                    required
                                    className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 text-sm sm:text-base bg-gray-900/50 border border-gray-700/50 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all duration-300 backdrop-blur-lg text-white placeholder-gray-400"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center transition-all duration-300 hover:scale-110"
                                >
                                    <svg className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                                        isPasswordVisible ? 'text-cyan-400' : 'text-gray-400 hover:text-cyan-400'
                                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        {isPasswordVisible ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        ) : (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        )}
                                    </svg>
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
                                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-700/50 border border-gray-600 rounded-md group-hover:border-cyan-400 transition-all duration-300 flex items-center justify-center">
                                    <svg className="w-2 h-2 sm:w-3 sm:h-3 text-cyan-400 opacity-0 transform scale-0 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                            <span className="text-xs sm:text-sm text-gray-300 group-hover:text-cyan-100 transition-colors duration-300">Remember me</span>
                        </label>
                        <a href="#" className="text-xs sm:text-sm bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-semibold hover:scale-105 transform transition-all duration-300">
                            Forgot password?
                        </a>
                    </div>

                    {/* Enhanced Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold transition-all duration-500 transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed shadow-2xl text-sm sm:text-base"
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
                    <p className="text-gray-400 text-xs sm:text-sm">
                        New to our platform?{" "}
                        <a href="/register" className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-bold hover:scale-105 transform transition-all duration-300 inline-block">
                            Create an account
                        </a>
                    </p>
                </div>

                {/* Sample Credentials Section */}
                <div className="mt-6 sm:mt-8">
                    <button
                        type="button"
                        onClick={() => setShowSampleCredentials(!showSampleCredentials)}
                        className="w-full text-xs sm:text-sm text-gray-400 hover:text-cyan-300 transition-colors duration-300 py-2 text-center"
                    >
                        {showSampleCredentials ? '▼ Hide' : '▶ Show'} Sample Credentials
                    </button>
                    
                    {showSampleCredentials && (
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                            {/* Customer Sample */}
                            <div className="bg-gray-900/50 border border-cyan-500/30 rounded-lg p-2 sm:p-3 text-center">
                                <p className="text-xs font-semibold text-cyan-300 mb-2">Customer</p>
                                <p className="text-xs text-gray-300 mb-1">Email: customer@example.com</p>
                                <p className="text-xs text-gray-300 mb-3">Pass: customer123</p>
                                <button
                                    type="button"
                                    onClick={() => fillSampleCredentials('customer')}
                                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white text-xs py-1 rounded transition-colors duration-300"
                                >
                                    Use
                                </button>
                            </div>

                            {/* Agent Sample */}
                            <div className="bg-gray-900/50 border border-blue-500/30 rounded-lg p-2 sm:p-3 text-center">
                                <p className="text-xs font-semibold text-blue-300 mb-2">Agent</p>
                                <p className="text-xs text-gray-300 mb-1">Email: agent@example.com</p>
                                <p className="text-xs text-gray-300 mb-3">Pass: agent123</p>
                                <button
                                    type="button"
                                    onClick={() => fillSampleCredentials('agent')}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-1 rounded transition-colors duration-300"
                                >
                                    Use
                                </button>
                            </div>

                            {/* Driver Sample */}
                            <div className="bg-gray-900/50 border border-purple-500/30 rounded-lg p-2 sm:p-3 text-center">
                                <p className="text-xs font-semibold text-purple-300 mb-2">Driver</p>
                                <p className="text-xs text-gray-300 mb-1">Email: driver@example.com</p>
                                <p className="text-xs text-gray-300 mb-3">Pass: driver123</p>
                                <button
                                    type="button"
                                    onClick={() => fillSampleCredentials('driver')}
                                    className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xs py-1 rounded transition-colors duration-300"
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
                            ? "bg-red-500/10 text-red-300 border-red-500/30 animate-pulse" 
                            : "bg-green-500/10 text-green-300 border-green-500/30 animate-bounce-in"
                    }`}>
                        <div className="flex items-center justify-center space-x-2">
                            {message.includes("Error") ? (
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            ) : (
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
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

export default Login;