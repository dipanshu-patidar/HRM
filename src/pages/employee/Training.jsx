import React, { useState } from "react";
import { GraduationCap, BookOpen, Clock, CheckCircle, Play, ExternalLink, Download, Search, ChevronRight } from "lucide-react";

const Training = () => {
    const [activeTab, setActiveTab] = useState("My Courses");

    const [myCourses] = useState([
        { id: 1, title: "Advanced React Patterns", trainer: "Sarah Wilson", duration: "12 Hours", progress: 75, status: "In Progress", category: "Development", date: "2025-10-01" },
        { id: 2, title: "UI/UX Fundamentals", trainer: "Michael Chen", duration: "8 Hours", progress: 100, status: "Completed", category: "Design", date: "2025-08-15" },
        { id: 3, title: "System Architecture", trainer: "Robert Brown", duration: "15 Hours", progress: 30, status: "In Progress", category: "Engineering", date: "2025-10-10" },
    ]);

    const [availableTrainings] = useState([
        { id: 1, title: "Cloud Infrastructure (AWS)", duration: "20 Hours", category: "DevOps", level: "Advanced", type: "Internal" },
        { id: 2, title: "Leadership & Management", duration: "10 Hours", category: "Soft Skills", level: "Intermediate", type: "External" },
        { id: 3, title: "Cyber Security Essentials", duration: "6 Hours", category: "Security", level: "Beginner", type: "Internal" },
    ]);

    const stats = [
        { label: "Enrolled Courses", value: "5", icon: BookOpen, color: "text-blue-500", bg: "bg-blue-50" },
        { label: "Hours Learned", value: "32.5h", icon: Clock, color: "text-purple-500", bg: "bg-purple-50" },
        { label: "Completed", value: "3", icon: CheckCircle, color: "text-green-500", bg: "bg-green-50" },
        { label: "Certificates", value: "3", icon: GraduationCap, color: "text-orange-500", bg: "bg-orange-50" },
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans text-gray-800">
            {/* Header */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Training & Development</h1>
                    <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                        <GraduationCap size={14} className="text-gray-400" />
                        <span className="hover:text-primary cursor-pointer">Dashboard</span> / <span className="text-gray-400">Training</span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-50 transition-colors">
                        <Download size={16} /> Certificates
                    </button>
                    <button className="bg-primary hover:bg-[#e66000] text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-sm">
                        Request Training
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${stat.bg}`}>
                            <stat.icon className={stat.color} size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                            <p className="text-xl font-bold text-gray-800">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tabs & Search */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex bg-gray-100 p-1 rounded-xl w-fit">
                        {["My Courses", "Browse Catalog"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === tab ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full md:w-64">
                        <input
                            type="text"
                            placeholder="Search courses..."
                            className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full bg-gray-50/50"
                        />
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                {/* Training List */}
                <div className="p-4">
                    {activeTab === "My Courses" ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {myCourses.map((course) => (
                                <div key={course.id} className="p-5 border border-gray-100 rounded-xl hover:shadow-md transition-shadow bg-gray-50/30">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100">{course.category}</span>
                                            <h3 className="text-base font-bold text-gray-800 mt-2">{course.title}</h3>
                                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                                <GraduationCap size={12} /> {course.trainer}
                                            </p>
                                        </div>
                                        <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${course.status === 'Completed' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
                                            {course.status}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-1.5">
                                            <div className="flex justify-between text-[11px] text-gray-600 font-medium">
                                                <span>Progress</span>
                                                <span className="font-bold text-gray-800">{course.progress}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                                                <div
                                                    className={`h-full transition-all duration-700 ${course.status === 'Completed' ? 'bg-green-500' : 'bg-primary'}`}
                                                    style={{ width: `${course.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                                            <div className="flex items-center gap-3">
                                                <span className="flex items-center gap-1 font-medium"><Clock size={12} /> {course.duration}</span>
                                                <span className="flex items-center gap-1 font-medium"><BookOpen size={12} /> {course.date}</span>
                                            </div>
                                            <button className={`flex items-center gap-1 font-bold ${course.status === 'Completed' ? 'text-green-600 hover:underline' : 'text-primary hover:underline'}`}>
                                                {course.status === 'Completed' ? 'Review' : 'Continue'} <ChevronRight size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-600 text-[12px] font-bold uppercase tracking-wider">
                                        <th className="p-4">Course Name</th>
                                        <th className="p-4">Duration</th>
                                        <th className="p-4">Level</th>
                                        <th className="p-4">Category</th>
                                        <th className="p-4">Type</th>
                                        <th className="p-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {availableTrainings.map((course) => (
                                        <tr key={course.id} className="hover:bg-gray-50 transition-colors group">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                                        <Play size={18} />
                                                    </div>
                                                    <span className="text-sm font-bold text-gray-800">{course.title}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-sm text-gray-600 font-medium">{course.duration}</td>
                                            <td className="p-4">
                                                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${course.level === 'Advanced' ? 'bg-red-50 text-red-500' : course.level === 'Intermediate' ? 'bg-blue-50 text-blue-500' : 'bg-green-50 text-green-500'}`}>
                                                    {course.level}
                                                </span>
                                            </td>
                                            <td className="p-4 text-sm text-gray-600">{course.category}</td>
                                            <td className="p-4">
                                                <span className="text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{course.type}</span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <button className="text-primary hover:text-[#e66000] text-sm font-bold flex items-center gap-1 ml-auto transition-colors">
                                                    Enroll Now <ExternalLink size={14} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Featured Learning Section */}
            <div className="mt-8">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Recommended for You</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-[#405D71] rounded-2xl overflow-hidden shadow-lg group">
                            <div className="h-32 bg-primary/20 flex items-center justify-center relative">
                                <GraduationCap size={48} className="text-white/20" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#405D71] to-transparent"></div>
                            </div>
                            <div className="p-5">
                                <h4 className="text-white font-bold text-sm mb-1">Modern UI Principles 2026</h4>
                                <p className="text-blue-100/60 text-[11px] mb-4 line-clamp-2 italic leading-relaxed">Master the latest design trends and accessibility standards for modern web apps.</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] text-white/50 font-medium">By Industry Experts</span>
                                    <button className="text-[11px] font-bold text-white bg-primary hover:bg-[#e66000] px-3 py-1 rounded-full transition-all">Quick Start</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Training;
