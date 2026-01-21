import React, { useState } from "react";
import { Plus, Search, Edit, Trash2, X, ChevronDown, Download, Info, UserCheck, Clock, UserX, FileText } from "lucide-react";

const Overtime = () => {
    // Mock Data
    const [overtimes, setOvertimes] = useState([
        {
            id: 1,
            employee: { name: "Anthony Lewis", role: "UI/UX Team", avatar: "https://ui-avatars.com/api/?name=Anthony+Lewis&background=random" },
            date: "14 Jan 2024",
            hours: 32,
            project: "Office Management",
            approvedBy: { name: "Michael Walker", avatar: "https://ui-avatars.com/api/?name=Michael+Walker&background=random" },
            status: "Accepted"
        },
        {
            id: 2,
            employee: { name: "Brian Villalobos", role: "Development", avatar: "https://ui-avatars.com/api/?name=Brian+Villalobos&background=random" },
            date: "21 Jan 2024",
            hours: 45,
            project: "Project Management",
            approvedBy: { name: "Sophie Headrick", avatar: "https://ui-avatars.com/api/?name=Sophie+Headrick&background=random" },
            status: "Accepted"
        },
        {
            id: 3,
            employee: { name: "Connie Waters", role: "Management", avatar: "https://ui-avatars.com/api/?name=Connie+Waters&background=random" },
            date: "15 Nov 2024",
            hours: 32,
            project: "Project Management",
            approvedBy: { name: "Stephen Dias", avatar: "https://ui-avatars.com/api/?name=Stephen+Dias&background=random" },
            status: "Accepted"
        },
        {
            id: 4,
            employee: { name: "Connie Waters", role: "Management", avatar: "https://ui-avatars.com/api/?name=Connie+Waters&background=random" },
            date: "15 Nov 2024",
            hours: 66,
            project: "Ware house developement",
            approvedBy: { name: "Angela Thomas", avatar: "https://ui-avatars.com/api/?name=Angela+Thomas&background=random" },
            status: "Accepted"
        },
        {
            id: 5,
            employee: { name: "Doglas Martini", role: "Development", avatar: "https://ui-avatars.com/api/?name=Doglas+Martini&background=random" },
            date: "12 Apr 2024",
            hours: 36,
            project: "Office Management",
            approvedBy: { name: "Thomas Bordelon", avatar: "https://ui-avatars.com/api/?name=Thomas+Bordelon&background=random" },
            status: "Accepted"
        }
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isExportOpen, setIsExportOpen] = useState(false);
    const [formData, setFormData] = useState({
        employee: "Select",
        date: "",
        overtimeHours: "",
        remainingHours: "",
        description: "",
        status: "Select"
    });

    const stats = [
        { title: "Overtime Employee", count: "12", icon: UserCheck, color: "text-orange-500", bgColor: "bg-orange-50", borderColor: "border-orange-100" },
        { title: "Overtime Hours", count: "118", icon: Clock, color: "text-pink-500", bgColor: "bg-pink-50", borderColor: "border-pink-100" },
        { title: "Pending Request", count: "23", icon: Clock, color: "text-purple-500", bgColor: "bg-purple-50", borderColor: "border-purple-100" },
        { title: "Rejected", count: "5", icon: UserX, color: "text-cyan-500", bgColor: "bg-cyan-50", borderColor: "border-cyan-100" },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle logic
        closeModal();
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFormData({
            employee: "Select",
            date: "",
            overtimeHours: "",
            remainingHours: "",
            description: "",
            status: "Select"
        });
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans text-gray-800">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Overtime</h1>
                    <div className="text-sm text-gray-500 mt-1">
                        <span className="hover:text-primary cursor-pointer">Employee</span> / <span className="text-gray-400">Overtime</span>
                    </div>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0 items-center">
                    <div className="relative">
                        <button
                            onClick={() => setIsExportOpen(!isExportOpen)}
                            className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm ml-2 font-medium"
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
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-[#FF6B00] hover:bg-[#e66000] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm font-medium"
                    >
                        <Plus size={18} />
                        Add Overtime
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
                            <div className="text-2xl font-bold text-gray-800">{stat.count}</div>
                        </div>
                        <div className={`p-3 rounded-xl ${stat.bgColor} ${stat.color} border ${stat.borderColor}`}>
                            <stat.icon size={24} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Content Table Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Filters Row 1 */}
                <div className="p-4 border-b border-gray-100 flex flex-wrap gap-4 items-center justify-between">
                    <h3 className="font-bold text-gray-700">Overtime</h3>
                    <div className="flex flex-wrap gap-2">
                        <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                            01/15/2026 - 01/21/2026
                            <ChevronDown size={14} />
                        </button>
                        <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors bg-white">
                            Employee
                            <ChevronDown size={14} />
                        </button>
                        <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors bg-white">
                            Project
                            <ChevronDown size={14} />
                        </button>
                        <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors bg-white">
                            Select Status
                            <ChevronDown size={14} />
                        </button>
                        <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors bg-white">
                            Sort By : Last 7 Days
                            <ChevronDown size={14} />
                        </button>
                    </div>
                </div>

                {/* Filters Row 2 - Search & Rows */}
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Row Per Page</span>
                        <select className="border border-gray-300 rounded-md text-sm cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary p-1 bg-white">
                            <option>10</option>
                            <option>20</option>
                        </select>
                        <span className="text-sm text-gray-600">Entries</span>
                    </div>
                    <div className="relative w-full sm:w-64">
                        <input
                            type="text"
                            placeholder="Search"
                            className="pl-3 pr-10 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary w-full bg-white transition-all"
                        />
                        <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-700 text-sm font-semibold border-b border-gray-200">
                                <th className="p-4">Employee</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Overtime Hours</th>
                                <th className="p-4">Project</th>
                                <th className="p-4">Approved By</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {overtimes.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50/80 transition-colors text-sm text-gray-600">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <img src={item.employee.avatar} alt={item.employee.name} className="w-10 h-10 rounded-full border border-gray-200 object-cover" />
                                            <div>
                                                <div className="font-bold text-gray-800 text-sm">{item.employee.name}</div>
                                                <div className="text-gray-400 text-xs">{item.employee.role}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">{item.date}</td>
                                    <td className="p-4 pl-12">{item.hours}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-gray-800">{item.project}</span>
                                            <Info size={14} className="text-blue-500 cursor-help" title="Project Info" />
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <img src={item.approvedBy.avatar} alt={item.approvedBy.name} className="w-6 h-6 rounded-full border border-gray-200" />
                                            <span className="text-gray-700 font-medium">{item.approvedBy.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="bg-green-100 text-green-600 border border-green-200 px-3 py-1 rounded-full text-xs font-semibold gap-1 inline-flex items-center">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></span>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2 text-gray-400">
                                            <button className="p-1.5 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                                                <Edit size={16} />
                                            </button>
                                            <button className="p-1.5 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
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
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-y-auto max-h-[90vh] custom-scrollbar animate-in zoom-in duration-200">
                        <div className="flex items-center justify-between p-5 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800">Add Overtime</h2>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-gray-700">Employee <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <select
                                        name="employee"
                                        value={formData.employee}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white appearance-none"
                                        required
                                    >
                                        <option value="Select">Select</option>
                                        <option value="Anthony Lewis">Anthony Lewis</option>
                                        <option value="Brian Villalobos">Brian Villalobos</option>
                                    </select>
                                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-gray-700">Overtime date <span className="text-red-500">*</span></label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700">Overtime <span className="text-red-500">*</span></label>
                                    <input
                                        type="number"
                                        name="overtimeHours"
                                        value={formData.overtimeHours}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        required
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700">Remaining Hours <span className="text-red-500">*</span></label>
                                    <input
                                        type="number"
                                        name="remainingHours"
                                        value={formData.remainingHours}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-gray-700">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="4"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                                ></textarea>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-gray-700">Status <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white appearance-none"
                                        required
                                    >
                                        <option value="Select">Select</option>
                                        <option value="Accepted">Accepted</option>
                                        <option value="Rejected">Rejected</option>
                                        <option value="Pending">Pending</option>
                                    </select>
                                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-6 py-2.5 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 font-bold transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 bg-[#FF6B00] hover:bg-[#e66000] text-white rounded-lg font-bold transition-colors shadow-sm"
                                >
                                    Add Overtime
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Overtime;
