import React, { useState } from "react";
import { Ticket, Plus, Search, Filter, MessageSquare, Clock, CheckCircle, AlertCircle, MoreVertical, X, Trash2, Edit2, Eye } from "lucide-react";

const Tickets = () => {
    const [tickets, setTickets] = useState([
        { id: "TK-101", subject: "Laptop Screen Flickering", category: "Hardware", priority: "High", status: "Open", date: "2025-10-20", lastUpdate: "2 hours ago" },
        { id: "TK-098", subject: "VPN Access Issue", category: "Network", priority: "Medium", status: "In Progress", date: "2025-10-18", lastUpdate: "1 day ago" },
        { id: "TK-085", subject: "Payroll Discrepancy", category: "Finance", priority: "Low", status: "Closed", date: "2025-10-05", lastUpdate: "1 week ago" },
    ]);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const stats = [
        { label: "Total Tickets", value: "12", icon: Ticket, color: "text-blue-500", bg: "bg-blue-50" },
        { label: "Open Tickets", value: "2", icon: Clock, color: "text-orange-500", bg: "bg-orange-50" },
        { label: "Resolved", value: "10", icon: CheckCircle, color: "text-green-500", bg: "bg-green-50" },
    ];

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "High": return "bg-red-50 text-red-600 border-red-100";
            case "Medium": return "bg-orange-50 text-orange-600 border-orange-100";
            case "Low": return "bg-blue-50 text-blue-600 border-blue-100";
            default: return "bg-gray-50 text-gray-600 border-gray-100";
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Open": return "bg-orange-100 text-orange-700";
            case "In Progress": return "bg-blue-100 text-blue-700";
            case "Closed": return "bg-green-100 text-green-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans text-gray-800">
            {/* Header */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Support Tickets</h1>
                    <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                        <Ticket size={14} className="text-gray-400" />
                        <span className="hover:text-primary cursor-pointer">Dashboard</span> / <span className="text-gray-400">Tickets</span>
                    </div>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-primary hover:bg-[#e66000] text-white px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-md shadow-orange-500/20 active:scale-95 w-full md:w-auto justify-center"
                >
                    <Plus size={18} /> Raise New Ticket
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-2">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-current opacity-10 group-hover:opacity-100 transition-opacity" style={{ color: stat.color.split('-')[1] }}></div>
                        <div className="flex justify-between items-start">
                            <div className="space-y-2">
                                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">{stat.label}</p>
                                <p className="text-3xl font-black text-gray-800">{stat.value}</p>
                            </div>
                            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                                <stat.icon size={26} strokeWidth={2.5} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* List Control Box */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative w-full md:w-96">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by ID or Subject..."
                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-400 font-medium"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                            <Filter size={16} /> Filters
                        </button>
                        <select className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 focus:outline-none focus:ring-1 focus:ring-primary">
                            <option>Relevance</option>
                            <option>Newest First</option>
                            <option>Oldest First</option>
                        </select>
                    </div>
                </div>

                {/* Table View */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-gray-50/50 text-gray-400 text-[11px] font-black uppercase tracking-[2px]">
                                <th className="p-5">Ticket ID</th>
                                <th className="p-5">Subject</th>
                                <th className="p-5">Category</th>
                                <th className="p-5">Priority</th>
                                <th className="p-5">Status</th>
                                <th className="p-5">Created On</th>
                                <th className="p-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {tickets.map((ticket) => (
                                <tr key={ticket.id} className="hover:bg-gray-50/80 transition-all group cursor-default">
                                    <td className="p-5">
                                        <span className="text-xs font-black px-2 py-1 bg-gray-100 rounded text-gray-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                            {ticket.id}
                                        </span>
                                    </td>
                                    <td className="p-5">
                                        <div className="space-y-0.5">
                                            <p className="text-sm font-bold text-gray-800 group-hover:text-primary transition-colors">{ticket.subject}</p>
                                            <p className="text-[11px] text-gray-400 font-medium">Last active {ticket.lastUpdate}</p>
                                        </div>
                                    </td>
                                    <td className="p-5 text-sm font-bold text-gray-600">{ticket.category}</td>
                                    <td className="p-5">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border shadow-sm ${getPriorityColor(ticket.priority)}`}>
                                            {ticket.priority}
                                        </span>
                                    </td>
                                    <td className="p-5">
                                        <div className="flex items-center gap-2 font-bold text-xs">
                                            <div className={`w-2 h-2 rounded-full ${ticket.status === 'Open' ? 'bg-orange-500' : ticket.status === 'In Progress' ? 'bg-blue-500' : 'bg-green-500 animate-pulse'}`}></div>
                                            <span className="text-gray-700">{ticket.status}</span>
                                        </div>
                                    </td>
                                    <td className="p-5 text-sm text-gray-500 font-medium">{ticket.date}</td>
                                    <td className="p-5 text-right">
                                        <div className="flex items-center justify-end gap-1 opacity-10 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all" title="View Details"><Eye size={16} /></button>
                                            <button className="p-2 text-gray-400 hover:text-primary hover:bg-orange-50 rounded-lg transition-all" title="Edit Ticket"><Edit2 size={16} /></button>
                                            <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Cancel Ticket"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State Mockup if needed - currently not showing */}
                {tickets.length === 0 && (
                    <div className="p-20 flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <AlertCircle size={40} className="text-gray-300" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800">No tickets found</h3>
                        <p className="text-gray-500 text-sm max-w-xs mt-1 leading-relaxed">Everything is running smoothly. If you have an issue, please raise a new ticket.</p>
                    </div>
                )}
            </div>

            {/* Quick Tips */}
            <div className="bg-[#405D71] rounded-2xl p-6 text-white flex flex-col md:flex-row items-center gap-6 shadow-xl relative overflow-hidden group">
                <div className="absolute -left-10 -top-10 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                    <MessageSquare size={160} />
                </div>
                <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                    <AlertCircle size={32} className="text-blue-300" />
                </div>
                <div className="flex-1 space-y-1">
                    <h3 className="text-lg font-black tracking-tight">Need immediate help?</h3>
                    <p className="text-blue-100/70 text-sm font-medium">For urgent technical failures affecting production, use the 'Emergency' priority or contact IT support at ext. 404.</p>
                </div>
                <button className="px-6 py-3 bg-white text-[#405D71] font-black text-sm rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all">Chat with Support</button>
            </div>

            {/* Modal Mockup - Simplified */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h2 className="text-xl font-black text-gray-800 tracking-tight">New Support Ticket</h2>
                            <button onClick={() => setIsAddModalOpen(false)} className="bg-white border border-gray-200 p-2 rounded-xl hover:bg-gray-100 transition-colors"><X size={20} /></button>
                        </div>
                        <div className="p-8 space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-black text-gray-400 uppercase tracking-wider">Subject</label>
                                <input type="text" placeholder="Brief summary of the issue" className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 placeholder:text-gray-300 font-bold" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-wider">Category</label>
                                    <select className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 font-bold text-gray-700">
                                        <option>Hardware</option>
                                        <option>Software</option>
                                        <option>Network</option>
                                        <option>Finance/HR</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-wider">Priority</label>
                                    <select className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 font-bold text-gray-700">
                                        <option>Low</option>
                                        <option>Medium</option>
                                        <option>High</option>
                                        <option>Emergency</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-black text-gray-400 uppercase tracking-wider">Description</label>
                                <textarea rows="4" placeholder="Describe the issue in detail..." className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 placeholder:text-gray-300 font-medium resize-none"></textarea>
                            </div>
                            <div className="pt-4 flex gap-3">
                                <button onClick={() => setIsAddModalOpen(false)} className="flex-1 py-3.5 bg-gray-100 text-gray-500 rounded-2xl font-black text-sm hover:bg-gray-200 transition-colors">Discard</button>
                                <button className="flex-[2] py-3.5 bg-primary text-white rounded-2xl font-black text-sm hover:bg-[#e66000] shadow-lg shadow-orange-500/30 transition-all">Submit Ticket</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tickets;
