import React from "react";
import { useAuth } from "../context/AuthContext";
import { Bell, Search, Menu, LogOut, ChevronDown } from "lucide-react";

const TopNavbar = ({ toggleSidebar, isSidebarOpen }) => {
    const { user, logout } = useAuth();

    return (
        <header className="h-16 bg-gradient-to-r from-primary to-orange-500 shadow-md flex items-center justify-between px-6 fixed top-0 right-0 z-40 transition-all duration-300 w-full lg:w-[calc(100%-256px)]"
            style={{ width: isSidebarOpen ? 'calc(100% - 16rem)' : 'calc(100% - 5rem)' }}>
            {/* Left: Toggle & Search */}
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleSidebar}
                    className="bg-white/10 hover:bg-white/20 p-2 rounded-lg text-white transition-colors"
                >
                    <Menu size={20} />
                </button>
                <div className="hidden md:flex items-center bg-white/10 rounded-full px-4 py-1.5 border border-white/10">
                    <Search size={16} className="text-white/70" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent border-none outline-none text-white text-sm ml-2 placeholder-white/60 w-64"
                    />
                </div>
            </div>

            {/* Right: Actions & Profile */}
            <div className="flex items-center gap-6">
                <button className="relative text-white/90 hover:text-white transition-colors">
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-primary"></span>
                </button>

                <div className="flex items-center gap-3 pl-6 border-l border-white/10">
                    <div className="text-right hidden md:block">
                        <h4 className="text-sm font-semibold text-white">{user?.name}</h4>
                        <p className="text-xs text-white/70 capitalize">{user?.role}</p>
                    </div>
                    <div className="relative group cursor-pointer">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-white/20">
                            <span className="text-primary font-bold text-lg">{user?.name?.charAt(0)}</span>
                        </div>

                        {/* Dropdown */}
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg py-2 hidden group-hover:block border border-gray-100">
                            <div className="px-4 py-2 border-b border-gray-50 mb-1">
                                <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                                <p className="text-xs text-gray-500">{user?.email}</p>
                            </div>
                            <button
                                onClick={logout}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                            >
                                <LogOut size={16} /> Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TopNavbar;
