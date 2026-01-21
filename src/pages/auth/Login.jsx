import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, User, ShieldCheck } from "lucide-react";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [activeRole, setActiveRole] = useState("admin"); // 'admin' or 'employee'
    const [email, setEmail] = useState("admin@gmail.com");
    const [password, setPassword] = useState("admin123");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const orangeColor = "#F26522";

    const handleRoleChange = (role) => {
        setActiveRole(role);
        if (role === "admin") {
            setEmail("admin@gmail.com");
            setPassword("admin123");
        } else {
            setEmail("employee@gmail.com");
            setPassword("employee123");
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        login(activeRole);
        if (activeRole === "admin") {
            navigate("/admin/dashboard");
        } else {
            navigate("/employee/dashboard");
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-white overflow-hidden font-sans">

            {/* Left Side - Illustration & Text (Hidden on mobile) */}
            <div className="hidden md:flex md:w-5/12 relative items-center justify-center p-12 overflow-hidden" style={{ backgroundColor: "#f08856" }}>
                {/* Decorative Elements */}
                <div className="absolute top-[10%] right-[15%] w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-[20%] left-[10%] w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>

                {/* 3D-like Coil/Element Mockup */}
                <div className="absolute bottom-[-50px] left-[30%] opacity-20 transform rotate-45 pointer-events-none">
                    <svg width="200" height="400" viewBox="0 0 200 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M50 0C50 50 150 50 150 100C150 150 50 150 50 200C50 250 150 250 150 300C150 350 50 350 50 400" stroke="white" strokeWidth="20" strokeLinecap="round" />
                    </svg>
                </div>

                <div className="relative z-10 w-full max-w-lg bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-2xl">
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
                        Empowering individuals with smooth HRM administration.
                    </h1>

                    <div className="rounded-2xl overflow-hidden mb-8 shadow-lg bg-white/5 p-2">
                        <img
                            src="https://img.freepik.com/free-vector/team-programmers-working-program-code-with-laptops-teamwork-male-female-professional-testers-coders-flat-vector-illustration-software-development-programming-lesson-concept_74855-22051.jpg?w=360"
                            alt="Team working"
                            className="w-full h-auto rounded-xl grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                        />
                    </div>

                    <p className="text-white/80 text-lg font-medium leading-relaxed italic">
                        "Manage your staff effectively and easily streamline operations."
                    </p>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full md:w-7/12 flex flex-col items-center justify-center p-8 md:p-16 bg-white relative">

                {/* Floating Logo Top Right */}
                <div className="absolute top-8 right-8 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md" style={{ backgroundColor: orangeColor }}>S</div>
                    <span className="text-xl font-black text-gray-800 tracking-tighter">Smart<span style={{ color: orangeColor }}>HRM</span></span>
                </div>

                <div className="w-full max-w-md space-y-8">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Sign In</h2>
                        <p className="text-gray-500 font-medium">Please enter your details to sign in</p>
                    </div>

                    {/* Role Selector Buttons */}
                    <div className="flex gap-4 p-1.5 bg-gray-50 rounded-2xl border border-gray-100">
                        <button
                            onClick={() => handleRoleChange("admin")}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${activeRole === 'admin' ? 'bg-white shadow-md text-gray-900 border border-gray-100' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <ShieldCheck size={18} className={activeRole === 'admin' ? '' : 'opacity-40'} style={{ color: activeRole === 'admin' ? orangeColor : 'inherit' }} />
                            Admin
                        </button>
                        <button
                            onClick={() => handleRoleChange("employee")}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${activeRole === 'employee' ? 'bg-white shadow-md text-gray-900 border border-gray-100' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <User size={18} className={activeRole === 'employee' ? '' : 'opacity-40'} style={{ color: activeRole === 'employee' ? orangeColor : 'inherit' }} />
                            Employee
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                            <div className="relative group">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-4 pr-12 py-3.5 bg-gray-50 border-2 border-transparent rounded-2xl text-sm font-bold text-gray-800 focus:bg-white focus:border-gray-100 focus:ring-4 focus:ring-orange-500/5 transition-all outline-none"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-orange-500 transition-colors">
                                    <Mail size={18} />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
                            <div className="relative group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-4 pr-12 py-3.5 bg-gray-50 border-2 border-transparent rounded-2xl text-sm font-bold text-gray-800 focus:bg-white focus:border-gray-100 focus:ring-4 focus:ring-orange-500/5 transition-all outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between px-1">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <div className="relative w-5 h-5">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                    />
                                    <div
                                        className={`w-5 h-5 rounded-md border-2 transition-all duration-200 peer-checked:border-0`}
                                        style={{
                                            backgroundColor: rememberMe ? orangeColor : 'transparent',
                                            borderColor: rememberMe ? orangeColor : '#e5e7eb'
                                        }}
                                    ></div>
                                    <svg className="absolute inset-0 w-3 h-3 m-auto text-white opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                                <span className="text-sm font-bold text-gray-500 group-hover:text-gray-700 transition-colors">Remember Me</span>
                            </label>
                            <button type="button" className="text-sm font-bold transition-colors" style={{ color: orangeColor }}>Forgot Password?</button>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 rounded-2xl text-white font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-xl shadow-orange-500/20 active:scale-[0.98]"
                            style={{ backgroundColor: orangeColor }}
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Footer Links */}
                    <div className="space-y-6 pt-4">
                        <div className="text-center">
                            <p className="text-sm font-bold text-gray-400">
                                Don't have an account? <button className="transition-colors" style={{ color: orangeColor }}>Create Account</button>
                            </p>
                        </div>

                        <div className="text-center">
                            <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">&copy; 2024 SmartHRM • All Rights Reserved</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
