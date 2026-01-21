import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Bell, Search, Menu, LogOut, ChevronDown, User } from "lucide-react";
import { Link } from "react-router-dom";

const TopNavbar = ({ toggleSidebar, isSidebarOpen }) => {
    const { user, logout } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen]);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    // Determine profile path based on role
    const profilePath = user?.role === 'employee' ? '/employee/profile' : '/admin/employees/details'; // Fallback for admin or others

    return (
        <header className="h-16 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-6 fixed top-0 right-0 z-40 transition-all duration-300 w-full lg:w-[calc(100%-256px)]"
            style={{ width: isSidebarOpen ? 'calc(100% - 16rem)' : 'calc(100% - 5rem)' }}>
            {/* Left: Toggle & Search */}
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleSidebar}
                    className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg text-gray-700 transition-colors"
                >
                    <Menu size={20} />
                </button>
                <div className="hidden md:flex items-center bg-gray-50 rounded-full px-4 py-1.5 border border-gray-200">
                    <Search size={16} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent border-none outline-none text-gray-700 text-sm ml-2 placeholder-gray-400 w-64"
                    />
                </div>
            </div>

            {/* Right: Actions & Profile */}
            <div className="flex items-center gap-6">
                <button className="relative text-gray-600 hover:text-gray-800 transition-colors">
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="flex items-center gap-3 pl-6 border-l border-gray-200" ref={dropdownRef}>
                    <div
                        className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 rounded-xl transition-all"
                        onClick={toggleDropdown}
                    >
                        <div className="text-right hidden md:block">
                            <h4 className="text-sm font-semibold text-gray-800">{user?.name}</h4>
                            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                        </div>

                        <div className="flex items-center gap-1">
                            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center overflow-hidden border-2 border-orange-100 shadow-sm">
                                <span className="text-white font-bold text-lg">{user?.name?.charAt(0)}</span>
                            </div>
                            <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </div>
                    </div>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-6 top-16 mt-2 w-60 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                            {/* Mobile User Info */}
                            <div className="px-4 py-3 border-b border-gray-50 mb-1 md:hidden bg-gray-50/50 mx-2 rounded-lg">
                                <h4 className="text-sm font-semibold text-gray-800">{user?.name}</h4>
                                <p className="text-xs text-gray-500">{user?.email}</p>
                            </div>

                            <div className="px-2">
                                <Link
                                    to={profilePath}
                                    className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-primary rounded-lg transition-colors group"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    <User size={18} className="text-gray-400 group-hover:text-primary transition-colors" />
                                    My Profile
                                </Link>
                                <button
                                    onClick={() => {
                                        setIsDropdownOpen(false);
                                        logout();
                                    }}
                                    className="w-full text-left flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors group mt-1"
                                >
                                    <LogOut size={18} className="text-red-400 group-hover:text-red-600 transition-colors" />
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default TopNavbar;
