import React, { useState } from "react";
import { BarChart, TrendingUp, Target, Award, Star, ChevronRight, FileText } from "lucide-react";

const Performance = () => {
    // Mock Data
    const [performanceReviews] = useState([
        { id: 1, period: "Q3 2025", type: "Quarterly Review", status: "Completed", rating: 4.5, reviewer: "John Doe", date: "2025-10-15" },
        { id: 2, period: "Q2 2025", type: "Quarterly Review", status: "Completed", rating: 4.2, reviewer: "John Doe", date: "2025-07-10" },
        { id: 3, period: "Annual 2024", type: "Annual Review", status: "Completed", rating: 4.8, reviewer: "Jane Smith", date: "2025-01-20" },
    ]);

    const [goals] = useState([
        { id: 1, title: "Learn React Advanced Patterns", progress: 85, dueDate: "2025-12-31", priority: "High" },
        { id: 2, title: "Improve Code Review Turnaround", progress: 60, dueDate: "2025-11-30", priority: "Medium" },
        { id: 3, title: "Lead a Team Project", progress: 30, dueDate: "2026-03-15", priority: "High" },
    ]);

    const stats = [
        { label: "Current Rating", value: "4.5/5.0", icon: Star, color: "text-orange-500", bg: "bg-orange-50" },
        { label: "Goals Completed", value: "12/15", icon: Target, color: "text-blue-500", bg: "bg-blue-50" },
        { label: "Achievements", value: "8", icon: Award, color: "text-purple-500", bg: "bg-purple-50" },
        { label: "Career Growth", value: "+12%", icon: TrendingUp, color: "text-green-500", bg: "bg-green-50" },
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans text-gray-800">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">My Performance</h1>
                <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                    <BarChart size={14} className="text-gray-400" />
                    <span className="hover:text-primary cursor-pointer">Dashboard</span> / <span className="text-gray-400">Performance</span>
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Performance Reviews */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-lg font-bold text-gray-800">Performance Reviews</h2>
                            <button className="text-sm font-bold text-primary hover:underline">View All</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-600 text-[12px] font-bold uppercase tracking-wider">
                                        <th className="p-4">Period</th>
                                        <th className="p-4">Review Type</th>
                                        <th className="p-4">Rating</th>
                                        <th className="p-4">Reviewer</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {performanceReviews.map((review) => (
                                        <tr key={review.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-4 text-sm font-bold text-gray-800">{review.period}</td>
                                            <td className="p-4 text-sm text-gray-600">{review.type}</td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-1">
                                                    <span className="text-sm font-bold text-gray-800">{review.rating}</span>
                                                    <Star size={14} className="text-orange-400 fill-orange-400" />
                                                </div>
                                            </td>
                                            <td className="p-4 text-sm text-gray-600">{review.reviewer}</td>
                                            <td className="p-4">
                                                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-green-50 text-green-600 border border-green-100">
                                                    {review.status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-primary">
                                                    <FileText size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Performance Skills Chart Placeholder */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-bold text-gray-800 mb-6">Skill Competency</h2>
                        <div className="space-y-4">
                            {[
                                { skill: "React.js", level: 90 },
                                { skill: "Node.js", level: 75 },
                                { skill: "UI/UX Design", level: 65 },
                                { skill: "Communication", level: 85 },
                                { skill: "Problem Solving", level: 80 }
                            ].map((item, i) => (
                                <div key={i} className="space-y-1.5">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium text-gray-700">{item.skill}</span>
                                        <span className="font-bold text-primary">{item.level}%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                        <div
                                            className="bg-primary h-2 rounded-full transition-all duration-1000"
                                            style={{ width: `${item.level}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar - Goals */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-gray-800">My Goals</h2>
                            <button className="text-primary hover:bg-orange-50 p-1.5 rounded-lg transition-colors">
                                <Target size={18} />
                            </button>
                        </div>
                        <div className="space-y-4">
                            {goals.map((goal) => (
                                <div key={goal.id} className="p-4 rounded-xl border border-gray-50 bg-gray-50/50 hover:border-primary/20 hover:bg-orange-50/10 transition-all cursor-pointer group">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-gray-800 text-sm group-hover:text-primary transition-colors leading-tight">{goal.title}</h3>
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${goal.priority === 'High' ? 'bg-red-50 text-red-500 border border-red-100' : 'bg-blue-50 text-blue-500 border border-blue-100'}`}>
                                            {goal.priority}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-[11px] text-gray-500 mb-1.5">
                                        <span>Progress</span>
                                        <span className="font-bold">{goal.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                                        <div
                                            className={`h-1.5 rounded-full ${goal.progress > 75 ? 'bg-green-500' : goal.progress > 40 ? 'bg-orange-400' : 'bg-red-400'}`}
                                            style={{ width: `${goal.progress}%` }}
                                        ></div>
                                    </div>
                                    <div className="flex items-center text-[10px] text-gray-400 font-medium whitespace-nowrap overflow-hidden">
                                        <span className="truncate">Due: {goal.dueDate}</span>
                                        <span className="mx-2">•</span>
                                        <span className="text-primary hover:underline">Edit Goal</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-6 py-2.5 rounded-lg border border-dashed border-gray-300 text-gray-500 text-sm font-medium hover:border-primary hover:text-primary transition-all">
                            + Set New Goal
                        </button>
                    </div>

                    {/* Achievement Card */}
                    <div className="bg-[#405D71] rounded-xl shadow-lg p-5 text-white relative overflow-hidden group">
                        <div className="absolute -right-4 -bottom-4 opacity-10 transform group-hover:scale-110 transition-transform duration-500">
                            <Award size={120} />
                        </div>
                        <h3 className="text-lg font-bold mb-2">Employee of the Month</h3>
                        <p className="text-blue-100/80 text-sm mb-4">You received this award for outstanding performance in June 2025.</p>
                        <div className="flex items-center gap-2 text-xs font-bold bg-white/10 w-fit px-3 py-1.5 rounded-full">
                            <Star size={12} className="text-orange-400 fill-orange-400" />
                            <span>View Certificate</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Performance;
