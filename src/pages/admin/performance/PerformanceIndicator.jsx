import React, { useState } from "react";
import { Plus, Search, Edit, Trash2, X, ChevronDown, Download, BarChart2 } from "lucide-react";
import ExportButton from "../../../components/common/ExportButton";

const PerformanceIndicator = () => {
    // Mock Data
    const [indicators, setIndicators] = useState([
        {
            id: 1,
            designation: "Web Designer",
            department: "Designing",
            approvedBy: { name: "Doglas Martini", role: "Manager", avatar: "https://ui-avatars.com/api/?name=Doglas+Martini&background=random" },
            createdDate: "14 Jan 2024",
            status: "Active"
        },
        {
            id: 2,
            designation: "Web Developer",
            department: "Developer",
            approvedBy: { name: "Doglas Martini", role: "Manager", avatar: "https://ui-avatars.com/api/?name=Doglas+Martini&background=random" },
            createdDate: "21 Jan 2024",
            status: "Active"
        },
        {
            id: 3,
            designation: "IOS Developer",
            department: "Developer",
            approvedBy: { name: "Doglas Martini", role: "Manager", avatar: "https://ui-avatars.com/api/?name=Doglas+Martini&background=random" },
            createdDate: "18 Feb 2024",
            status: "Active"
        },
        {
            id: 4,
            designation: "Android Developer",
            department: "Developer",
            approvedBy: { name: "Doglas Martini", role: "Manager", avatar: "https://ui-avatars.com/api/?name=Doglas+Martini&background=random" },
            createdDate: "24 Feb 2024",
            status: "Active"
        },
        {
            id: 5,
            designation: "DevOps Engineer",
            department: "DevOps",
            approvedBy: { name: "Doglas Martini", role: "Manager", avatar: "https://ui-avatars.com/api/?name=Doglas+Martini&background=random" },
            createdDate: "11 Mar 2024",
            status: "Active"
        }
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState("Last 7 Days");

    const [formData, setFormData] = useState({
        designation: "Select",
        customerExperience: "Select",
        marketing: "Select",
        management: "Select",
        administration: "Select",
        presentationSkills: "Select",
        qualityOfWork: "Select",
        efficiency: "Select",
        integrity: "Select",
        professionalism: "Select",
        teamWork: "Select",
        criticalThinking: "Select",
        conflictManagement: "Select",
        attendance: "Select",
        abilityToMeetDeadline: "Select",
        status: "Select"
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingItem) {
            setIndicators(indicators.map(item => item.id === editingItem.id ? {
                ...item,
                designation: formData.designation,
                // In a real app we would update all fields, but for mock display these are key
                status: formData.status
            } : item));
        } else {
            // Mock Add
            const id = indicators.length + 1;
            const entry = {
                id,
                designation: formData.designation,
                department: "Development", // Mock
                approvedBy: { name: "Me", role: "Admin", avatar: "https://ui-avatars.com/api/?name=Admin&background=random" },
                createdDate: "Today",
                status: formData.status
            };
            setIndicators([...indicators, entry]);
        }
        closeModal();
    };

    const openEditModal = (item) => {
        setEditingItem(item);
        setFormData({
            ...formData, // Keep defaults for fields not in table item for now
            designation: item.designation,
            status: item.status
        });
        setIsModalOpen(true);
    };

    const openAddModal = () => {
        setEditingItem(null);
        setFormData({
            designation: "Select",
            customerExperience: "Select",
            marketing: "Select",
            management: "Select",
            administration: "Select",
            presentationSkills: "Select",
            qualityOfWork: "Select",
            efficiency: "Select",
            integrity: "Select",
            professionalism: "Select",
            teamWork: "Select",
            criticalThinking: "Select",
            conflictManagement: "Select",
            attendance: "Select",
            abilityToMeetDeadline: "Select",
            status: "Select"
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans text-gray-800">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Performance Indicator</h1>
                    <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                        <BarChart2 size={14} className="text-gray-400" />
                        <span className="hover:text-primary cursor-pointer">Performance</span> / <span className="text-gray-400">Performance Indicator</span>
                    </div>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0 items-center">
                    <ExportButton />
                    <button
                        onClick={openAddModal}
                        className="bg-[#FF6B00] hover:bg-[#e66000] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm font-medium"
                    >
                        <Plus size={18} />
                        Add Indicator
                    </button>
                </div>
            </div>

            {/* Content Table Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Filters Row */}
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-lg font-bold text-gray-800">Performance Indicator List</h2>
                    <div className="relative">
                        <button
                            onClick={() => setIsSortOpen(!isSortOpen)}
                            className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors bg-white font-medium min-w-[160px] justify-between"
                        >
                            Sort By : {selectedSort}
                            <ChevronDown size={14} className={`transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isSortOpen && (
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-30 overflow-hidden animate-in fade-in zoom-in duration-200">
                                {["Today", "Yesterday", "Last 7 Days", "This Month"].map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => { setSelectedSort(option); setIsSortOpen(false); }}
                                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors border-b border-gray-50 last:border-0 ${selectedSort === option ? 'bg-[#FF6B00] text-white font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Search Row */}
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Row Per Page</span>
                        <select className="border border-gray-300 rounded-md text-sm p-1 focus:outline-none focus:ring-1 focus:ring-primary bg-white">
                            <option>10</option>
                            <option>20</option>
                            <option>50</option>
                        </select>
                        <span className="text-sm text-gray-600">Entries</span>
                    </div>
                    <div className="relative w-full sm:w-64">
                        <input
                            type="text"
                            placeholder="Search"
                            className="pl-3 pr-10 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary w-full transition-all"
                        />
                        <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100/50 text-gray-700 text-sm font-semibold border-b border-gray-200 uppercase tracking-wider">
                                <th className="p-4 w-12"><input type="checkbox" className="rounded" /></th>
                                <th className="p-4">Designation</th>
                                <th className="p-4">Department</th>
                                <th className="p-4">Approved By</th>
                                <th className="p-4">Created Date</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {indicators.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors text-sm">
                                    <td className="p-4"><input type="checkbox" className="rounded text-primary focus:ring-primary" /></td>
                                    <td className="p-4 font-bold text-gray-700">{item.designation}</td>
                                    <td className="p-4 text-gray-600 font-medium">{item.department}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <img src={item.approvedBy.avatar} alt={item.approvedBy.name} className="w-10 h-10 rounded-full border border-gray-200" />
                                            <div>
                                                <div className="font-bold text-gray-800 text-xs">{item.approvedBy.name}</div>
                                                <div className="text-gray-400 text-[10px] font-medium uppercase">{item.approvedBy.role}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-500 font-medium">{item.createdDate}</td>
                                    <td className="p-4">
                                        <span className="bg-green-100 text-green-600 border border-green-200 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 w-fit uppercase">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2 text-gray-400">
                                            <button onClick={() => openEditModal(item)} className="p-1.5 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
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

                {/* Pagination Info */}
                <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-gray-100">
                    <div className="text-[12px] font-medium text-gray-500">Showing 1 - 5 of 5 entries</div>
                    <div className="flex items-center gap-1">
                        <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"><ChevronDown size={14} className="rotate-90" /></button>
                        <button className="w-8 h-8 flex items-center justify-center bg-[#FF6B00] text-white rounded-full text-xs font-bold">1</button>
                        <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"><ChevronDown size={14} className="-rotate-90" /></button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl overflow-y-auto max-h-[95vh] custom-scrollbar animate-in zoom-in duration-200">
                        <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
                            <h2 className="text-xl font-bold text-[#1F2937]">{editingItem ? 'Edit Indicator' : 'Add New Indicator'}</h2>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 hover:bg-gray-100 rounded-full">
                                <X size={22} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6">
                            {/* Designation */}
                            <div className="mb-8">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Designation</label>
                                <select
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white text-sm"
                                    required
                                >
                                    <option value="Select">Select</option>
                                    <option value="Web Designer">Web Designer</option>
                                    <option value="Web Developer">Web Developer</option>
                                </select>
                            </div>

                            {/* Technical Section */}
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Technical</h3>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    {[
                                        { label: "Customer Experience", name: "customerExperience" },
                                        { label: "Marketing", name: "marketing" },
                                        { label: "Management", name: "management" },
                                        { label: "Administration", name: "administration" },
                                        { label: "Presentation Skills", name: "presentationSkills" },
                                        { label: "Quality of Work", name: "qualityOfWork" },
                                        { label: "Efficiency", name: "efficiency" }
                                    ].map((field) => (
                                        <div key={field.name} className="space-y-1.5">
                                            <label className="text-sm font-bold text-gray-600">{field.label}</label>
                                            <select
                                                name={field.name}
                                                value={formData[field.name]}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white text-sm"
                                            >
                                                <option value="Select">Select</option>
                                                <option value="Beginner">Beginner</option>
                                                <option value="Intermediate">Intermediate</option>
                                                <option value="Advanced">Advanced</option>
                                            </select>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Organizational Section */}
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Organizational</h3>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    {[
                                        { label: "Integrity", name: "integrity" },
                                        { label: "Professionalism", name: "professionalism" },
                                        { label: "Team Work", name: "teamWork" },
                                        { label: "Critical Thinking", name: "criticalThinking" },
                                        { label: "Conflict Management", name: "conflictManagement" },
                                        { label: "Attendance", name: "attendance" },
                                        { label: "Ability To Meet Deadline", name: "abilityToMeetDeadline" }
                                    ].map((field) => (
                                        <div key={field.name} className="space-y-1.5">
                                            <label className="text-sm font-bold text-gray-600">{field.label}</label>
                                            <select
                                                name={field.name}
                                                value={formData[field.name]}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white text-sm"
                                            >
                                                <option value="Select">Select</option>
                                                <option value="Beginner">Beginner</option>
                                                <option value="Intermediate">Intermediate</option>
                                                <option value="Advanced">Advanced</option>
                                            </select>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Status */}
                            <div className="mb-8">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white text-sm"
                                >
                                    <option value="Select">Select</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>

                            {/* Footer Buttons */}
                            <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-6 py-2.5 bg-gray-50 text-gray-700 rounded-lg font-bold hover:bg-gray-100 transition-colors border border-gray-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 bg-[#FF6B00] hover:bg-[#e66000] text-white rounded-lg font-bold transition-colors shadow-sm"
                                >
                                    {editingItem ? 'Update' : 'Add Indicator'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PerformanceIndicator;
