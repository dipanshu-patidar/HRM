import React from "react";

const AdminDashboard = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {["Total Employees", "Projects", "Clients", "Tasks"].map((item, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-gray-500 text-sm font-medium">{item}</h3>
                        <p className="text-3xl font-bold text-gray-800 mt-2">{10 + idx * 5}</p>
                    </div>
                ))}
            </div>

            {/* Content Placeholder */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-96 flex items-center justify-center text-gray-400">
                Chart / Graph Placeholder
            </div>
        </div>
    );
};

export default AdminDashboard;
