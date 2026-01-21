import React, { useState } from "react";
import { Plus, Search, Edit, Trash2, X, ChevronDown, Calendar, FileText, Activity, Box, Filter, Download } from "lucide-react";

const Leaves = () => {
    // Mock Data
    const [leaves, setLeaves] = useState([
        {
            id: 1,
            type: "Medical Leave",
            from: "2024-01-14",
            to: "2024-01-15",
            days: "2 Days",
            approvedBy: { name: "Doglas Martini", role: "Manager", avatar: "https://ui-avatars.com/api/?name=Doglas+Martini&background=random" },
            status: "Approved",
            description: "Feeling unwell, high fever."
        },
        {
            id: 2,
            type: "Annual Leave",
            from: "2024-01-21",
            to: "2024-01-25",
            days: "5 Days",
            approvedBy: { name: "Doglas Martini", role: "Manager", avatar: "https://ui-avatars.com/api/?name=Doglas+Martini&background=random" },
            status: "Approved",
            description: "Family vacation."
        },
        {
            id: 3,
            type: "Medical Leave",
            from: "2024-01-20",
            to: "2024-02-22",
            days: "3 Days",
            approvedBy: { name: "Warren Morales", role: "Admin", avatar: "https://ui-avatars.com/api/?name=Warren+Morales&background=random" },
            status: "Approved",
            description: "Surgery recovery."
        },
        {
            id: 4,
            type: "Annual Leave",
            from: "2024-03-15",
            to: "2024-03-17",
            days: "3 Days",
            approvedBy: { name: "Doglas Martini", role: "Manager", avatar: "https://ui-avatars.com/api/?name=Doglas+Martini&background=random" },
            status: "Approved",
            description: "Personal time off."
        },
        {
            id: 5,
            type: "Casual Leave",
            from: "2024-04-12",
            to: "2024-04-16",
            days: "5 Days",
            approvedBy: { name: "Doglas Martini", role: "Manager", avatar: "https://ui-avatars.com/api/?name=Doglas+Martini&background=random" },
            status: "Declined",
            description: "Urgent personal work."
        }
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newLeave, setNewLeave] = useState({
        type: "",
        from: "",
        to: "",
        days: "",
        reason: ""
    });

    // Stats
    const stats = [
        { title: "Annual Leaves", count: "05", remaining: "07", icon: Calendar, color: "bg-gray-900", iconColor: "text-white" },
        { title: "Medical Leaves", count: "11", remaining: "01", icon: Activity, color: "bg-blue-500", iconColor: "text-white" },
        { title: "Casual Leaves", count: "02", remaining: "10", icon: FileText, color: "bg-purple-600", iconColor: "text-white" },
        { title: "Other Leaves", count: "07", remaining: "05", icon: Box, color: "bg-pink-500", iconColor: "text-white" },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewLeave({ ...newLeave, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Calculate days dummy logic
        const days = "2 Days";

        const id = leaves.length + 1;
        const entry = {
            id,
            ...newLeave,
            days: days,
            approvedBy: { name: "Me", role: "Admin", avatar: "https://ui-avatars.com/api/?name=Admin&background=random" },
            status: "Pending" // Default status
        };

        setLeaves([...leaves, entry]);
        closeModal();
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setNewLeave({ type: "", from: "", to: "", days: "", reason: "" });
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const options = { day: "2-digit", month: "short", year: "numeric" };
        return new Date(dateString).toLocaleDateString("en-GB", options);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Leaves</h1>
                    <div className="text-sm text-gray-500 mt-1">
                        <span className="hover:text-primary cursor-pointer">Dashboard</span> / <span className="text-gray-400">Employee</span> / <span className="text-gray-400">Leaves</span>
                    </div>
                </div>
                <div className="mt-4 md:mt-0 flex gap-3">
                    <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm">
                        <Download size={18} />
                        Export
                        <ChevronDown size={14} />
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-[#FF6B00] hover:bg-[#e66000] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
                    >
                        <Plus size={18} />
                        Add Leave
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 relative overflow-hidden flex items-center justify-between">
                        <div className="z-10">
                            <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
                            <div className="text-2xl font-bold text-gray-800 mt-1">{stat.count}</div>
                            <div className="text-xs text-gray-400 mt-1">Remaining Leaves : <span className="text-gray-600 font-medium">{stat.remaining}</span></div>
                        </div>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.color} shadow-lg`}>
                            <stat.icon size={24} className={stat.iconColor} />
                        </div>
                        {/* Decorative Circle */}
                        <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full opacity-10 ${stat.color}`}></div>
                    </div>
                ))}
            </div>

            {/* List Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">

                {/* Filters Row 1 */}
                <div className="p-4 border-b border-gray-100 flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-700">Leave List</h3>
                        <span className="bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded-full border border-orange-200">Total Leaves : 48</span>
                        <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full border border-blue-200">Total Remaining Leaves : 23</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <div className="relative">
                            <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                                01/15/2026 - 01/21/2026
                                <ChevronDown size={14} />
                            </button>
                        </div>
                        <div className="relative">
                            <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                                Leave Type
                                <ChevronDown size={14} />
                            </button>
                        </div>
                        <div className="relative">
                            <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                                Approved By
                                <ChevronDown size={14} />
                            </button>
                        </div>
                        <div className="relative">
                            <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                                Select Status
                                <ChevronDown size={14} />
                            </button>
                        </div>
                        <div className="relative">
                            <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                                Sort By : Last 7 Days
                                <ChevronDown size={14} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Filters Row 2 - Search & Rows */}
                <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4">
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
                            className="pl-3 pr-10 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary w-full"
                        />
                        <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                </div>


                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-700 text-sm font-semibold border-b border-gray-200">
                                <th className="p-4 w-10">
                                    <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                                </th>
                                <th className="p-4">Leave Type</th>
                                <th className="p-4">From</th>
                                <th className="p-4">Approved By</th>
                                <th className="p-4">To</th>
                                <th className="p-4">No of Days</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {leaves.map((leave) => (
                                <tr key={leave.id} className="hover:bg-gray-50 transition-colors text-sm text-gray-600">
                                    <td className="p-4">
                                        <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-gray-800">{leave.type}</span>
                                            <span className="text-blue-500 cursor-help" title={leave.description}>ⓘ</span>
                                        </div>
                                    </td>
                                    <td className="p-4">{formatDate(leave.from)}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <img src={leave.approvedBy.avatar} alt={leave.approvedBy.name} className="w-8 h-8 rounded-full border border-gray-200" />
                                            <div>
                                                <div className="font-medium text-gray-800 text-xs">{leave.approvedBy.name}</div>
                                                <div className="text-gray-400 text-[10px]">{leave.approvedBy.role}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">{formatDate(leave.to)}</td>
                                    <td className="p-4">{leave.days}</td>
                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit ${leave.status === "Approved"
                                                    ? "bg-green-100 text-green-600 border border-green-200"
                                                    : leave.status === "Declined"
                                                        ? "bg-white text-gray-500 border border-gray-300" // UI shows radio button style for declined, I'll match simple style or text
                                                        : "bg-yellow-100 text-yellow-600 border border-yellow-200"
                                                }`}
                                        >
                                            {leave.status === "Approved" && <span>•</span>}
                                            {leave.status === "Declined" && <span className="w-2 h-2 rounded-full border border-gray-400 flex items-center justify-center"><span className="w-1 h-1 bg-red-500 rounded-full"></span></span>}
                                            {leave.status}
                                            <ChevronDown size={12} className="ml-1 opacity-50" />
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                                                <Edit size={16} />
                                            </button>
                                            <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800">Add Leave</h2>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-gray-700">Leave Type</label>
                                <select
                                    name="type"
                                    value={newLeave.type}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
                                >
                                    <option value="">Select</option>
                                    <option value="Medical Leave">Medical Leave</option>
                                    <option value="Annual Leave">Annual Leave</option>
                                    <option value="Casual Leave">Casual Leave</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700">From</label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            name="from"
                                            value={newLeave.from}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700">To</label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            name="to"
                                            value={newLeave.to}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700">No of Days</label>
                                    <input
                                        type="text"
                                        name="days"
                                        value={newLeave.days}
                                        readOnly
                                        placeholder=""
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700">Remaining Days</label>
                                    <input
                                        type="text"
                                        value="8"
                                        readOnly
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-gray-700">Reason</label>
                                <textarea
                                    name="reason"
                                    value={newLeave.reason}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                                ></textarea>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-[#FF6B00] hover:bg-[#e66000] text-white rounded-lg font-medium transition-colors shadow-sm"
                                >
                                    Add Leave
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Leaves;
