import React, { useState } from "react";
import { Plus, Search, Edit, Trash2, X, ChevronDown, Calendar, FileText, Activity, Box, Filter, Download } from "lucide-react";
import ExportButton from "../../components/common/ExportButton";

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
        { title: "Annual Leaves", count: "12", remaining: "07", icon: Calendar, color: "bg-gray-900", iconColor: "text-white" },
        { title: "Medical Leaves", count: "12", remaining: "01", icon: Activity, color: "bg-blue-500", iconColor: "text-white" },
        { title: "Casual Leaves", count: "12", remaining: "10", icon: FileText, color: "bg-purple-600", iconColor: "text-white" },
        { title: "Other Leaves", count: "12", remaining: "05", icon: Box, color: "bg-pink-500", iconColor: "text-white" },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewLeave({ ...newLeave, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Calculate days dummy logic
        const days = "2 Days"; // Logic to calculate days diff
        const id = leaves.length + 1;
        const entry = {
            id,
            ...newLeave,
            days: days,
            approvedBy: { name: "Pending", role: "-", avatar: "" },
            status: "Pending" // Default status
        };

        setLeaves([...leaves, entry]);
        closeModal();
    };

    const openAddModal = () => {
        setNewLeave({
            type: "",
            from: "",
            to: "",
            days: "",
            reason: ""
        });
        setIsModalOpen(true);
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
                    <h1 className="text-2xl font-bold text-gray-800">My Leaves</h1>
                    <div className="text-sm text-gray-500 mt-1">
                        <span className="hover:text-primary cursor-pointer">Dashboard</span> / <span className="text-gray-400">Leaves</span>
                    </div>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                    <button
                        onClick={openAddModal}
                        className="bg-[#FF6B00] hover:bg-[#e66000] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm font-medium"
                    >
                        <Plus size={18} />
                        Add Leave
                    </button>
                    <ExportButton />
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium mb-1">{stat.title}</p>
                            <div className="flex items-baseline gap-1">
                                <h3 className="text-2xl font-bold text-gray-800">{stat.count}</h3>
                                <span className="text-xs text-gray-400">/ {stat.remaining} rem</span>
                            </div>
                        </div>
                        <div className={`p-3 rounded-full ${stat.color} ${stat.iconColor} shadow-md`}>
                            <stat.icon size={20} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Content Table Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Filters Row */}
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-lg font-bold text-gray-800">Leaves List</h2>
                    <div className="flex items-center gap-2">
                        {/* Search and Filters could go here */}
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-700 text-sm font-semibold border-b border-gray-200">
                                <th className="p-4">Leave Type</th>
                                <th className="p-4">From</th>
                                <th className="p-4">To</th>
                                <th className="p-4">No of Days</th>
                                <th className="p-4">Reason</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Approved by</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {leaves.map((leave) => (
                                <tr key={leave.id} className="hover:bg-gray-50 transition-colors text-sm text-gray-600">
                                    <td className="p-4 font-medium text-gray-800">{leave.type}</td>
                                    <td className="p-4">{formatDate(leave.from)}</td>
                                    <td className="p-4">{formatDate(leave.to)}</td>
                                    <td className="p-4">{leave.days}</td>
                                    <td className="p-4 max-w-xs truncate">{leave.description}</td>
                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${leave.status === "Approved"
                                                ? "bg-green-100 text-green-600 border border-green-200"
                                                : leave.status === "New" ? "bg-purple-100 text-purple-600 border border-purple-200"
                                                    : leave.status === "Declined" ? "bg-red-100 text-red-600 border border-red-200"
                                                        : "bg-blue-100 text-blue-600 border border-blue-200"
                                                }`}
                                        >
                                            {leave.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            {leave.approvedBy.avatar && <img src={leave.approvedBy.avatar} alt="Avatar" className="w-6 h-6 rounded-full" />}
                                            <span className="font-medium text-gray-800">{leave.approvedBy.name}</span>
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
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800">Add Leave</h2>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-gray-700">Leave Type</label>
                                <div className="relative">
                                    <select
                                        name="type"
                                        value={newLeave.type}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none bg-white"
                                        required
                                    >
                                        <option value="">Select Leave Type</option>
                                        <option value="Casual Leave">Casual Leave</option>
                                        <option value="Medical Leave">Medical Leave</option>
                                        <option value="Annual Leave">Annual Leave</option>
                                    </select>
                                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700">From</label>
                                    <input
                                        type="date"
                                        name="from"
                                        value={newLeave.from}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        required
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700">To</label>
                                    <input
                                        type="date"
                                        name="to"
                                        value={newLeave.to}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-gray-700">Number of days</label>
                                <input
                                    type="text"
                                    name="days"
                                    value={newLeave.days}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    placeholder="e.g. 2"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-gray-700">Leave Reason</label>
                                <textarea
                                    name="reason"
                                    value={newLeave.reason}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                                    required
                                ></textarea>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full py-2.5 bg-[#FF6B00] hover:bg-[#e66000] text-white rounded-lg font-bold transition-colors shadow-lg shadow-orange-500/20"
                                >
                                    Submit Leave Request
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
