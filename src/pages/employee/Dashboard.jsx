import React from "react";

const EmployeeDashboard = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Employee Dashboard</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-4">Welcome Back!</h3>
                        <p className="text-gray-600">You have 3 pending tasks for today.</p>
                    </div>
                </div>

                {/* Right Column */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-4">My Leave Stats</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Casual Leave</span>
                            <span className="font-medium">4 / 12</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: '33%' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
