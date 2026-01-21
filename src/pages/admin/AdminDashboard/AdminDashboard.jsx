import React from "react";
import {
    Users,
    Briefcase,
    UserCheck,
    CheckSquare,
    DollarSign,
    TrendingUp,
    UserPlus,
    Award,
    ArrowUpRight,
    ArrowDownRight
} from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Stat Card Component
const StatCard = ({ icon: Icon, iconBg, title, value, comparison, percentage, isPositive, link }) => {
    return (
        <div className="admindashboard-stat-card bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all group">
            <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconBg} shadow-sm transform group-hover:scale-110 transition-transform`}>
                        <Icon size={24} className="text-white" strokeWidth={2} />
                    </div>

                    <div className="flex-1 min-w-0">
                        <h3 className="text-sm text-gray-500 font-medium mb-1 truncate">{title}</h3>
                        <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                            <p className="text-2xl font-bold text-gray-800">{value}</p>
                            {comparison && <span className="text-sm text-gray-400 font-medium">{comparison}</span>}
                        </div>

                        <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
                            {percentage && (
                                <div className="flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
                                    {isPositive ? (
                                        <ArrowUpRight size={14} className="text-green-500" />
                                    ) : (
                                        <ArrowDownRight size={14} className="text-red-500" />
                                    )}
                                    <span className={`text-xs font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                                        {percentage}
                                    </span>
                                </div>
                            )}

                            {link && (
                                <a href="#" className="text-xs font-semibold text-primary hover:text-orange-600 transition-colors">
                                    {link} →
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Attendance Overview Component
const AttendanceOverview = () => {
    const attendanceData = [
        { name: "Present", value: 45, color: "#10B981" },
        { name: "Late", value: 15, color: "#0D9488" },
        { name: "Permission", value: 8, color: "#F59E0B" },
        { name: "Absent", value: 12, color: "#EF4444" },
    ];

    const total = attendanceData.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="admindashboard-attendance-card bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Attendance Overview</h3>

            <div className="flex flex-col items-center mb-6">
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                        <Pie
                            data={attendanceData}
                            cx="50%"
                            cy="50%"
                            startAngle={180}
                            endAngle={0}
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={2}
                            dataKey="value"
                        >
                            {attendanceData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <div className="text-center -mt-16">
                    <p className="text-sm text-gray-500">Total Attendance</p>
                    <p className="text-3xl font-bold text-gray-800">{total}</p>
                </div>
            </div>

            <div className="space-y-3 mb-6">
                {attendanceData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }}></div>
                            <span className="text-sm text-gray-600">{item.name}</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-800">
                            {((item.value / total) * 100).toFixed(1)}%
                        </span>
                    </div>
                ))}
            </div>

            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs font-semibold text-gray-600 shadow-sm">
                                {String.fromCharCode(64 + i)}
                            </div>
                        ))}
                    </div>
                    <span className="text-sm text-gray-600 font-medium">Total Absentees: 12</span>
                </div>
                <a href="#" className="text-sm text-primary hover:text-orange-600 font-bold transition-colors bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-100 sm:border-none sm:bg-transparent sm:px-0 sm:py-0">
                    View Details →
                </a>
            </div>
        </div>
    );
};

// Sales Overview Component
const SalesOverview = () => {
    const salesData = [
        { month: "Jan", income: 4000, expenses: 2400 },
        { month: "Feb", income: 3000, expenses: 1398 },
        { month: "Mar", income: 2000, expenses: 3800 },
        { month: "Apr", income: 2780, expenses: 3908 },
        { month: "May", income: 1890, expenses: 4800 },
        { month: "Jun", income: 2390, expenses: 3800 },
        { month: "Jul", income: 3490, expenses: 4300 },
        { month: "Aug", income: 4200, expenses: 3200 },
        { month: "Sep", income: 3800, expenses: 2900 },
        { month: "Oct", income: 4100, expenses: 3400 },
        { month: "Nov", income: 3900, expenses: 3100 },
        { month: "Dec", income: 4500, expenses: 3600 },
    ];

    return (
        <div className="admindashboard-sales-card bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <h3 className="text-lg font-bold text-gray-800">Sales Overview</h3>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
                    <span className="text-xs text-gray-400 font-medium whitespace-nowrap order-2 sm:order-1">Last Updated at 11:30PM</span>
                    <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-gray-50 w-full sm:w-auto order-1 sm:order-2">
                        <option>All Departments</option>
                        <option>HR</option>
                        <option>Sales</option>
                        <option>Marketing</option>
                    </select>
                </div>
            </div>

            <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <span className="text-sm text-gray-600">Income</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <span className="text-sm text-gray-600">Expenses</span>
                </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9CA3AF" />
                    <YAxis tick={{ fontSize: 12 }} stroke="#9CA3AF" />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                    />
                    <Bar dataKey="income" fill="#F26522" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="expenses" fill="#E5E7EB" radius={[8, 8, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

// Main Admin Dashboard Component
const AdminDashboard = () => {
    const statsData = [
        {
            icon: UserCheck,
            iconBg: "bg-blue-500",
            title: "Attendance Overview",
            value: "120",
            comparison: "/ 154",
            percentage: "+8.2%",
            isPositive: true,
            link: "View All"
        },
        {
            icon: Briefcase,
            iconBg: "bg-purple-500",
            title: "Total No of Projects",
            value: "45",
            comparison: null,
            percentage: "+12.5%",
            isPositive: true,
            link: "View Details"
        },
        {
            icon: Users,
            iconBg: "bg-green-500",
            title: "Total No of Clients",
            value: "89",
            comparison: null,
            percentage: "+5.3%",
            isPositive: true,
            link: "View All"
        },
        {
            icon: CheckSquare,
            iconBg: "bg-orange-500",
            title: "Total No of Tasks",
            value: "234",
            comparison: "/ 320",
            percentage: "-2.1%",
            isPositive: false,
            link: "View Details"
        },
        {
            icon: DollarSign,
            iconBg: "bg-teal-500",
            title: "Earnings",
            value: "$45.2k",
            comparison: null,
            percentage: "+18.7%",
            isPositive: true,
            link: "View All"
        },
        {
            icon: TrendingUp,
            iconBg: "bg-indigo-500",
            title: "Profit This Week",
            value: "$12.8k",
            comparison: null,
            percentage: "+9.4%",
            isPositive: true,
            link: "View Details"
        },
        {
            icon: UserPlus,
            iconBg: "bg-pink-500",
            title: "Job Applicants",
            value: "67",
            comparison: null,
            percentage: "+15.2%",
            isPositive: true,
            link: "View All"
        },
        {
            icon: Award,
            iconBg: "bg-yellow-500",
            title: "New Hire",
            value: "24",
            comparison: null,
            percentage: "+6.8%",
            isPositive: true,
            link: "View Details"
        }
    ];

    return (
        <div className="admindashboard-container space-y-6">
            {/* Page Header */}
            <div className="admindashboard-header">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-sm text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
            </div>

            {/* Stat Cards Grid */}
            <div className="admindashboard-stats-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsData.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            {/* Charts Section */}
            <div className="admindashboard-charts-grid grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AttendanceOverview />
                <SalesOverview />
            </div>
        </div>
    );
};

export default AdminDashboard;
