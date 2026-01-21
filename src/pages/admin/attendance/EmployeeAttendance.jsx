import React, { useState } from "react";
import { Clock, Calendar, CheckCircle, AlertCircle, X, ChevronDown, Download, FileText, Search, Play, Pause } from "lucide-react";

const EmployeeAttendance = () => {
    // Mock Data for Table
    const attendanceData = [
        { id: 1, date: "02 Sep 2024", checkIn: "09:12 AM", status: "Present", checkOut: "09:17 PM", break: "14 Min", late: "12 Min", overtime: "-", production: "8.35Hrs" },
        { id: 2, date: "06 Jul 2024", checkIn: "09:00 AM", status: "Present", checkOut: "07:13 PM", break: "32 Min", late: "-", overtime: "75 Min", production: "9.15 Hrs" },
        { id: 3, date: "06 Sep 2024", checkIn: "09:12 AM", status: "Present", checkOut: "09:17 PM", break: "14 Min", late: "12 Min", overtime: "-", production: "8.35Hrs" },
        { id: 4, date: "03 Sep 2024", checkIn: "09:12 AM", status: "Present", checkOut: "09:17 PM", break: "14 Min", late: "12 Min", overtime: "-", production: "8.35Hrs" },
    ];

    const [isPunchedIn, setIsPunchedIn] = useState(true);
    const [isExportOpen, setIsExportOpen] = useState(false);

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans text-gray-800">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Employee Attendance</h1>
                    <div className="text-sm text-gray-500 mt-1">
                        <span className="hover:text-primary cursor-pointer">Employee</span> / <span className="text-gray-400">Employee Attendance</span>
                    </div>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0 items-center">
                    <button className="bg-[#FF6B00] p-2 text-white rounded-lg shadow-sm hover:bg-[#e66000] transition-colors"><Clock size={18} /></button>
                    <button className="bg-white border border-gray-200 p-2 text-gray-500 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"><Calendar size={18} /></button>

                    <div className="relative">
                        <button
                            onClick={() => setIsExportOpen(!isExportOpen)}
                            className="bg-[#FF6B00] hover:bg-[#e66000] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm ml-2"
                        >
                            <Download size={18} />
                            Export
                            <ChevronDown size={14} />
                        </button>

                        {isExportOpen && (
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
                                <button className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors font-medium">
                                    <FileText size={16} />
                                    Export as PDF
                                </button>
                                <button className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors border-t border-gray-50 font-medium">
                                    <FileText size={16} />
                                    Export as Excel
                                </button>
                            </div>
                        )}
                    </div>

                    <button className="bg-[#FF6B00] hover:bg-[#e66000] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm">
                        <FileText size={18} />
                        Report
                    </button>
                </div>
            </div>

            {/* Top Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
                {/* Punch Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center text-center">
                    <h3 className="text-gray-500 font-medium mb-1">Good Morning, Adrian</h3>
                    <div className="text-gray-800 font-bold mb-4">08:35 AM, 11 Mar 2025</div>
                    <div className="w-24 h-24 rounded-full bg-blue-100 mb-4 overflow-hidden border-4 border-white shadow-sm">
                        <img src="https://ui-avatars.com/api/?name=Adrian&background=0D8ABC&color=fff" alt="User" className="w-full h-full object-cover" />
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
                        <div className="flex items-center text-green-500 text-xs font-medium">
                            <CheckCircle size={12} className="mr-1" />
                            5% This Week
                        </div>
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
                        <div className="flex items-center text-green-500 text-xs font-medium">
                            <CheckCircle size={12} className="mr-1" />
                            7% Last Week
                        </div>
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
                        <div className="flex items-center text-red-500 text-xs font-medium">
                            <AlertCircle size={12} className="mr-1" />
                            8% Last Month
                        </div>
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

                    {/* Progress Bar Section (spanning across stats) */}
                    <div className="md:col-span-2 lg:col-span-4 bg-white rounded-xl shadow-sm border border-gray-100 p-5 mt-2">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                                <div className="text-gray-400 text-xs mb-1">• Total Working hours</div>
                                <div className="text-xl font-bold text-gray-800">12h 36m</div>
                            </div>
                            <div>
                                <div className="text-green-500 text-xs mb-1">• Productive Hours</div>
                                <div className="text-xl font-bold text-gray-800">08h 36m</div>
                            </div>
                            <div>
                                <div className="text-yellow-500 text-xs mb-1">• Break hours</div>
                                <div className="text-xl font-bold text-gray-800">22m 15s</div>
                            </div>
                            <div>
                                <div className="text-blue-500 text-xs mb-1">• Overtime</div>
                                <div className="text-xl font-bold text-gray-800">02h 15m</div>
                            </div>
                        </div>

                        {/* Progress Bar Visualization */}
                        <div className="relative h-4 w-full bg-gray-100 rounded-full flex overflow-hidden mb-2">
                            <div className="h-full bg-green-500" style={{ width: '40%' }}></div>
                            <div className="h-full bg-yellow-500" style={{ width: '15%' }}></div>
                            <div className="h-full bg-green-500" style={{ width: '30%' }}></div>
                            <div className="h-full bg-yellow-500" style={{ width: '5%' }}></div>
                            <div className="h-full bg-green-500" style={{ width: '5%' }}></div>
                            <div className="h-full bg-blue-500" style={{ width: '5%' }}></div>
                        </div>

                        {/* Time labels for progress bar */}
                        <div className="flex justify-between text-[10px] text-gray-400 uppercase font-medium">
                            <span>06:00</span>
                            <span>07:00</span>
                            <span>08:00</span>
                            <span>09:00</span>
                            <span>10:00</span>
                            <span>11:00</span>
                            <span>12:00</span>
                            <span>01:00</span>
                            <span>02:00</span>
                            <span>03:00</span>
                            <span>04:00</span>
                            <span>05:00</span>
                            <span>06:00</span>
                            <span>07:00</span>
                            <span>08:00</span>
                            <span>09:00</span>
                            <span>10:00</span>
                            <span>11:00</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Attendance Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-lg font-bold text-gray-800">Employee Attendance</h2>
                    <div className="flex flex-wrap gap-2">
                        <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                            01/15/2026 - 01/21/2026
                            <ChevronDown size={14} />
                        </button>
                        <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                            Select Status
                            <ChevronDown size={14} />
                        </button>
                        <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                            Sort By : Last 7 Days
                            <ChevronDown size={14} />
                        </button>
                    </div>
                </div>

                {/* Filters Row 2 - Search & Rows */}
                <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4 bg-gray-50/50">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Row Per Page</span>
                        <select className="border border-gray-300 rounded-md text-sm cursor-pointer focus:outline-none focus:border-primary p-1">
                            <option>10</option>
                            <option>20</option>
                        </select>
                        <span className="text-sm text-gray-600">Entries</span>
                    </div>
                    <div className="relative w-full sm:w-64">
                        <input
                            type="text"
                            placeholder="Search"
                            className="pl-3 pr-10 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary w-full bg-white"
                        />
                        <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 text-sm font-semibold border-b border-gray-200">
                                <th className="p-4">Date</th>
                                <th className="p-4">Check In</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Check Out</th>
                                <th className="p-4">Break</th>
                                <th className="p-4">Late</th>
                                <th className="p-4">Overtime</th>
                                <th className="p-4 text-right">Production Hours</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {attendanceData.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors text-sm text-gray-600">
                                    <td className="p-4 font-medium text-gray-800">{item.date}</td>
                                    <td className="p-4">{item.checkIn}</td>
                                    <td className="p-4">
                                        <span className="bg-green-100 text-green-600 border border-green-200 px-3 py-1 rounded-full text-xs font-semibold gap-1 inline-flex items-center">
                                            • {item.status}
                                        </span>
                                    </td>
                                    <td className="p-4">{item.checkOut}</td>
                                    <td className="p-4">{item.break}</td>
                                    <td className="p-4">{item.late}</td>
                                    <td className="p-4">{item.overtime}</td>
                                    <td className="p-4 text-right">
                                        <span className="bg-green-500 text-white px-3 py-1 rounded-md text-xs font-semibold shadow-sm inline-block">
                                            {item.production}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default EmployeeAttendance;
