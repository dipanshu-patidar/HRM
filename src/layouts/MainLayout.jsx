import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

const MainLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main Content */}
            <div
                className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-20"
                    }`}
            >
                <TopNavbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

                <main className="flex-1 p-6 mt-16 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
