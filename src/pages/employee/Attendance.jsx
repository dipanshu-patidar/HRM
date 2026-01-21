import React, { useState } from "react";
import { Clock, Calendar, CheckCircle, AlertCircle, ChevronDown, FileText } from "lucide-react";
import ExportButton from "../../components/common/ExportButton";

const Attendance = () => {
    // Mock Data for Table
    const attendanceData = [
        { id: 1, date: "02 Sep 2024", checkIn: "09:12 AM", status: "Present", checkOut: "09:17 PM", break: "14 Min", late: "12 Min", overtime: "-", production: "8.35Hrs" },
        { id: 2, date: "06 Jul 2024", checkIn: "09:00 AM", status: "Present", checkOut: "07:13 PM", break: "32 Min", late: "-", overtime: "75 Min", production: "9.15 Hrs" },
        { id: 3, date: "06 Sep 2024", checkIn: "09:12 AM", status: "Present", checkOut: "09:17 PM", break: "14 Min", late: "12 Min", overtime: "-", production: "8.35Hrs" },
        { id: 4, date: "03 Sep 2024", checkIn: "09:12 AM", status: "Present", checkOut: "09:17 PM", break: "14 Min", late: "12 Min", overtime: "-", production: "8.35Hrs" },
    ];

    const [isPunchedIn, setIsPunchedIn] = useState(true);

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans text-gray-800">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">My Attendance</h1>
                    <div className="text-sm text-gray-500 mt-1">
                        <span className="hover:text-primary cursor-pointer">Dashboard</span> / <span className="text-gray-400">Attendance</span>
                    </div>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0 items-center">
                    <ExportButton />
                </div>
            </div>

            {/* Top Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
                {/* Punch Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center text-center">
                    <h3 className="text-gray-500 font-medium mb-1">Good Morning, Employee</h3>
                    <div className="text-gray-800 font-bold mb-4">08:35 AM, 11 Mar 2025</div>
                    <div className="w-24 h-24 rounded-full bg-blue-100 mb-4 overflow-hidden border-4 border-white shadow-sm">
                        <img src="https://ui-avatars.com/api/?name=Employee&background=0D8ABC&color=fff" alt="User" className="w-full h-full object-cover" />
                    </div>
                    <div className="bg-[#FF6B00] text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-2">Production : 3.45 hrs</div>
                    <div className="text-xs text-gray-400 mb-4">Punch In at 10.00 AM</div>
                    <button
                        onClick={() => setIsPunchedIn(!isPunchedIn)}
                        className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 rounded-lg transition-colors"
                    >
                        {isPunchedIn ? "Punch Out" : "Punch In"}
                    </button>
                </div>

                {/* Stat Cards */}
                <div className="col-span-1 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Card 1 */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 relative overflow-hidden">
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                                <Clock size={18} />
                            </div>
                        </div>
                        <div className="mb-2">
                            <span className="text-2xl font-bold text-gray-800">8.36</span> <span className="text-gray-400 text-lg">/ 9</span>
                        </div>
                        <div className="text-gray-500 text-sm mb-2">Total Hours Today</div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 relative overflow-hidden">
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
                                <Clock size={18} />
                            </div>
                        </div>
                        <div className="mb-2">
                            <span className="text-2xl font-bold text-gray-800">10</span> <span className="text-gray-400 text-lg">/ 40</span>
                        </div>
                        <div className="text-gray-500 text-sm mb-2">Total Hours Week</div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 relative overflow-hidden">
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                                <Calendar size={18} />
                            </div>
                        </div>
                        <div className="mb-2">
                            <span className="text-2xl font-bold text-gray-800">75</span> <span className="text-gray-400 text-lg">/ 98</span>
                        </div>
                        <div className="text-gray-500 text-sm mb-2">Total Hours Month</div>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 relative overflow-hidden">
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center text-pink-600">
                                <Clock size={18} />
                            </div>
                        </div>
                        <div className="mb-2">
                            <span className="text-2xl font-bold text-gray-800">16</span> <span className="text-gray-400 text-lg">/ 28</span>
                        </div>
                        <div className="text-gray-500 text-sm mb-2">Overtime this Month</div>
                        <div className="flex items-center text-red-500 text-xs font-medium">
                            <AlertCircle size={12} className="mr-1" />
                            6% Last Month
                        </div>
                    </div>
                </div>
            </div>

            {/* Attendance Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-800">Attendance Log</h2>
                    <div className="flex gap-2">
                        {/* Filters if needed */}
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-700 text-sm font-semibold border-b border-gray-200">
                                <th className="p-4">Date</th>
                                <th className="p-4">Check In</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Check Out</th>
                                <th className="p-4">Break</th>
                                <th className="p-4">Late</th>
                                <th className="p-4">Overtime</th>
                                <th className="p-4">Production</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {attendanceData.map((record) => (
                                <tr key={record.id} className="hover:bg-gray-50 transition-colors text-sm text-gray-600">
                                    <td className="p-4 font-medium text-gray-800">{record.date}</td>
                                    <td className="p-4">{record.checkIn}</td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 bg-green-100 text-green-600 rounded-md text-xs font-bold border border-green-200">{record.status}</span>
                                    </td>
                                    <td className="p-4">{record.checkOut}</td>
                                    <td className="p-4">{record.break}</td>
                                    <td className="p-4">{record.late}</td>
                                    <td className="p-4">{record.overtime}</td>
                                    <td className="p-4 font-bold text-gray-800">{record.production}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Attendance;
