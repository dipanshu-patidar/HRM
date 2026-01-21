import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Users, ShieldCheck } from "lucide-react";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [activeRole, setActiveRole] = useState("admin"); // 'admin' or 'employee'

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
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-primary p-8 text-center">
                    <h1 className="text-3xl font-bold text-white mb-2">SmartHR</h1>
                    <p className="text-white/90">Human Resource Management System</p>
                </div>

                {/* Role Toggle */}
                <div className="flex p-4 gap-4 justify-center bg-gray-50 border-b border-gray-100">
                    <button
                        onClick={() => setActiveRole("admin")}
                        className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all w-32 ${activeRole === "admin"
                                ? "border-primary bg-orange-50 text-primary"
                                : "border-transparent bg-white hover:bg-gray-100/50 text-gray-500"
                            }`}
                    >
                        <ShieldCheck size={32} className="mb-2" />
                        <span className="font-semibold">Admin</span>
                    </button>
                    <button
                        onClick={() => setActiveRole("employee")}
                        className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all w-32 ${activeRole === "employee"
                                ? "border-primary bg-orange-50 text-primary"
                                : "border-transparent bg-white hover:bg-gray-100/50 text-gray-500"
                            }`}
                    >
                        <Users size={32} className="mb-2" />
                        <span className="font-semibold">Employee</span>
                    </button>
                </div>

                {/* Form */}
                <div className="p-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                        Login as <span className="text-primary capitalize">{activeRole}</span>
                    </h2>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                defaultValue={activeRole === "admin" ? "admin@smarthr.com" : "employee@smarthr.com"}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-primary outline-none transition-all"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                defaultValue="password123"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-primary outline-none transition-all"
                                readOnly
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-colors shadow-md hover:shadow-lg mt-6"
                        >
                            Login
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500">
                            Demo Mode Only. No password required.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
