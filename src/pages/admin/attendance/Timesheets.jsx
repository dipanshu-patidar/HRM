import React, { useState } from "react";
import { Plus, Search, Edit, Trash2, X, ChevronDown, Download, Info } from "lucide-react";

const Timesheets = () => {
    // Mock Data
    const [timesheets, setTimesheets] = useState([
        {
            id: 1,
            employee: { name: "Anthony Lewis", role: "UI/UX Team", avatar: "https://ui-avatars.com/api/?name=Anthony+Lewis&background=random" },
            date: "14 Jan 2024",
            project: "Office Management",
            assignedHours: 32,
            workedHours: 13,
        },
        {
            id: 2,
            employee: { name: "Brian Villalobos", role: "Development", avatar: "https://ui-avatars.com/api/?name=Brian+Villalobos&background=random" },
            date: "21 Jan 2024",
            project: "Project Management",
            assignedHours: 45,
            workedHours: 14,
        },
        {
            id: 3,
            employee: { name: "Connie Waters", role: "Management", avatar: "https://ui-avatars.com/api/?name=Connie+Waters&background=random" },
            date: "15 Nov 2024",
            project: "Project Management",
            assignedHours: 32,
            workedHours: 19,
        },
        {
            id: 4,
            employee: { name: "Connie Waters", role: "Management", avatar: "https://ui-avatars.com/api/?name=Connie+Waters&background=random" },
            date: "15 Nov 2024",
            project: "Project Management",
            assignedHours: 32,
            workedHours: 19,
        },
        {
            id: 5,
            employee: { name: "Doglas Martini", role: "Development", avatar: "https://ui-avatars.com/api/?name=Doglas+Martini&background=random" },
            date: "12 Apr 2024",
            project: "Office Management",
            assignedHours: 36,
            workedHours: 45,
        },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newWork, setNewWork] = useState({
        project: "",
        deadline: "",
        totalHours: "",
        remainingHours: "",
        date: "",
        hours: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewWork({ ...newWork, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock Add
        const id = timesheets.length + 1;
        const entry = {
            id,
            employee: { name: "Me", role: "Admin", avatar: "https://ui-avatars.com/api/?name=Me&background=random" },
            date: newWork.date || "Today",
            project: newWork.project || "New Project",
            assignedHours: newWork.totalHours || 0,
            workedHours: newWork.hours || 0,
        };
        setTimesheets([entry, ...timesheets]);
        closeModal();
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setNewWork({
            project: "",
            deadline: "",
            totalHours: "",
            remainingHours: "",
            date: "",
            hours: ""
        });
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans text-gray-800">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Timesheets</h1>
                    <div className="text-sm text-gray-500 mt-1">
                        <span className="hover:text-primary cursor-pointer">Employee</span> / <span className="text-gray-400">Timesheets</span>
                    </div>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                    <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm ml-2">
                        <Download size={18} />
                        Export
                        <ChevronDown size={14} />
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-[#FF6B00] hover:bg-[#e66000] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
                    >
                        <Plus size={18} />
                        Add Today's Work
                    </button>
                </div>
            </div>

            {/* Content Table Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                {/* Filters */}
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-lg font-bold text-gray-800">Timesheet</h2>
                    <div className="flex flex-wrap gap-2">
                        <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                            Select Project
                            <ChevronDown size={14} />
                        </button>
                        <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                            Sort By : Last 7 Days
                            <ChevronDown size={14} />
                        </button>
                    </div>
                </div>

                {/* Search and Rows */}
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

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 text-sm font-semibold border-b border-gray-200">
                                <th className="p-4">Employee</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Project</th>
                                <th className="p-4">Assigned Hours</th>
                                <th className="p-4">Worked Hours</th>
                                <th className="p-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {timesheets.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors text-sm text-gray-600">
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
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-gray-800">{item.project}</span>
                                            <Info size={14} className="text-blue-500 cursor-help" />
                                        </div>
                                    </td>
                                    <td className="p-4 pl-12">{item.assignedHours}</td>
                                    <td className="p-4 pl-12">{item.workedHours}</td>
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
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800">Add Todays Work</h2>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-gray-700">Project <span className="text-red-500">*</span></label>
                                <select
                                    name="project"
                                    value={newWork.project}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="Office Management">Office Management</option>
                                    <option value="Project Management">Project Management</option>
                                    <option value="Video Calling App">Video Calling App</option>
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-gray-700">Deadline <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        name="deadline"
                                        value={newWork.deadline}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700">Total Hours <span className="text-red-500">*</span></label>
                                    <input
                                        type="number"
                                        name="totalHours"
                                        value={newWork.totalHours}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        required
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700">Remaining Hours <span className="text-red-500">*</span></label>
                                    <input
                                        type="number"
                                        name="remainingHours"
                                        value={newWork.remainingHours}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700">Date <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            name="date"
                                            value={newWork.date}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700">Hours <span className="text-red-500">*</span></label>
                                    <input
                                        type="number"
                                        name="hours"
                                        value={newWork.hours}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        required
                                    />
                                </div>
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
                                    Add Changes
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Timesheets;
