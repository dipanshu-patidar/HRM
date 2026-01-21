import React from "react";
import {
    Briefcase,
    Calendar,
    CheckSquare,
    Clock,
    FileText,
    TrendingUp,
    Users
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

// Stat Card Component
const StatCard = ({ icon: Icon, iconBg, title, value, subtext, link }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all group">
            <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconBg} shadow-sm transform group-hover:scale-110 transition-transform`}>
                        <Icon size={24} className="text-white" strokeWidth={2} />
                    </div>

                    <div className="flex-1 min-w-0">
                        <h3 className="text-sm text-gray-500 font-medium mb-1 truncate">{title}</h3>
                        <div className="flex items-baseline gap-2 mb-1">
                            <p className="text-2xl font-bold text-gray-800">{value}</p>
                        </div>
                        {subtext && <p className="text-xs text-gray-400">{subtext}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Activity Chart Component
const ActivityChart = () => {
    const data = [
        { name: 'Mon', hours: 8 },
        { name: 'Tue', hours: 7.5 },
        { name: 'Wed', hours: 9 },
        { name: 'Thu', hours: 8.5 },
        { name: 'Fri', hours: 8 },
        { name: 'Sat', hours: 4 },
        { name: 'Sun', hours: 0 },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Weekly Activity</h3>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                    <Tooltip cursor={{ fill: '#F9FAFB' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                    <Bar dataKey="hours" fill="#F97316" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

// Main Employee Dashboard Component
const EmployeeDashboard = () => {
    const statsData = [
        {
            icon: CheckSquare,
            iconBg: "bg-orange-500",
            title: "Total Tasks",
            value: "12",
            subtext: "3 Pending, 9 Completed",
        },
        {
            icon: Clock,
            iconBg: "bg-blue-500",
            title: "Attendance",
            value: "92%",
            subtext: "22/24 Working Days",
        },
        {
            icon: Briefcase,
            iconBg: "bg-purple-500",
            title: "Projects",
            value: "4",
            subtext: "2 Active, 2 Completed",
        },
        {
            icon: Calendar,
            iconBg: "bg-green-500",
            title: "Leave Balance",
            value: "14",
            subtext: "Available Days",
        },
    ];

    const upcomingHolidays = [
        { name: "Republic Day", date: "26 Jan 2024", day: "Friday" },
        { name: "Holi", date: "25 Mar 2024", day: "Monday" },
        { name: "Good Friday", date: "29 Mar 2024", day: "Friday" },
    ];

    const recentConnects = [
        { name: "Team Meeting", time: "10:00 AM", status: "Upcoming", color: "bg-blue-100 text-blue-600" },
        { name: "Project Review", time: "02:00 PM", status: "Pending", color: "bg-orange-100 text-orange-600" },
        { name: "Client Call", time: "04:30 PM", status: "Done", color: "bg-green-100 text-green-600" },
    ];

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Hello, Employee! 👋</h1>
                <p className="text-sm text-gray-500 mt-1">Here's what's happening with you today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsData.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Activity Chart */}
                <div className="lg:col-span-2 space-y-6">
                    <ActivityChart />

                    {/* Recent Projects / Tasks List */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">My Projects</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="text-xs text-gray-500 border-b border-gray-100">
                                        <th className="py-2 font-medium">Project Name</th>
                                        <th className="py-2 font-medium">Deadline</th>
                                        <th className="py-2 font-medium">Status</th>
                                        <th className="py-2 font-medium">Contribution</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                                        <td className="py-3 font-medium text-gray-800">HRM Dashboard System</td>
                                        <td className="py-3 text-gray-500">20 Feb 2024</td>
                                        <td className="py-3"><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-semibold">Active</span></td>
                                        <td className="py-3">
                                            <div className="w-24 bg-gray-100 rounded-full h-1.5">
                                                <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                                        <td className="py-3 font-medium text-gray-800">E-Commerce App</td>
                                        <td className="py-3 text-gray-500">15 Mar 2024</td>
                                        <td className="py-3"><span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-semibold">Planning</span></td>
                                        <td className="py-3">
                                            <div className="w-24 bg-gray-100 rounded-full h-1.5">
                                                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '15%' }}></div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column: Holidays & Schedule */}
                <div className="space-y-6">
                    {/* Today's Schedule */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Today's Schedule</h3>
                        <div className="space-y-4">
                            {recentConnects.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-800 text-sm">{item.name}</h4>
                                        <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                                    </div>
                                    <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${item.color}`}>
                                        {item.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upcoming Holidays */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-800">Upcoming Holidays</h3>
                            <a href="/employee/holidays" className="text-xs text-orange-500 font-semibold hover:underline">View All</a>
                        </div>
                        <div className="space-y-3">
                            {upcomingHolidays.map((holiday, index) => (
                                <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-green-50 text-green-600 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Calendar size={18} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800 text-sm">{holiday.name}</h4>
                                            <p className="text-xs text-gray-500">{holiday.day}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded">{holiday.date}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
