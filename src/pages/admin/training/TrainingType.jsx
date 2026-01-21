import React, { useState } from "react";
import { Plus, Search, Edit, Trash2, X, ChevronDown, GraduationCap } from "lucide-react";

const TrainingType = () => {
    // Mock Data
    const [types, setTypes] = useState([
        {
            id: 1,
            type: "Git Training",
            description: "Git training covers managing code changes and collaboration using Git commands and workflows",
            status: "Active"
        },
        {
            id: 2,
            type: "HTML Training",
            description: "HTML training teaches how to create and structure web pages using HTML tags and elements.",
            status: "Active"
        },
        {
            id: 3,
            type: "React Training",
            description: "React training covers building UIs with components, state, and hooks.",
            status: "Active"
        },
        {
            id: 4,
            type: "Nodejs Training",
            description: "Node.js training focuses on building server-side applications using JavaScript.",
            status: "Active"
        },
        {
            id: 5,
            type: "Vuejs Training",
            description: "Vue.js training focuses on building UIs with Vue.js components.",
            status: "Active"
        }
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState("Last 7 Days");

    const [formData, setFormData] = useState({
        type: "",
        description: "",
        status: "Active"
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        setIsModalOpen(false);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans text-gray-800">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Training Type</h1>
                    <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                        <GraduationCap size={14} className="text-gray-400" />
                        <span className="hover:text-primary cursor-pointer">Performance</span> / <span className="text-gray-400">Training Type</span>
                    </div>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0 items-center">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-[#FF6B00] hover:bg-[#e66000] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm font-medium"
                    >
                        <Plus size={18} />
                        Add Training type
                    </button>
                    <button className="bg-white border border-gray-300 text-gray-400 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                        <ChevronDown size={18} />
                    </button>
                </div>
            </div>

            {/* Content Table Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-lg font-bold text-gray-800">Training Type List</h2>
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

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100/50 text-gray-700 text-sm font-semibold border-b border-gray-200 uppercase tracking-wider">
                                <th className="p-4 w-12"><input type="checkbox" className="rounded" /></th>
                                <th className="p-4">Type</th>
                                <th className="p-4">Description</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {types.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors text-sm">
                                    <td className="p-4"><input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" /></td>
                                    <td className="p-4 font-bold text-gray-800">{item.type}</td>
                                    <td className="p-4 text-gray-500 font-medium max-w-[500px]">{item.description}</td>
                                    <td className="p-4">
                                        <span className="bg-green-100 text-green-600 border border-green-200 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 w-fit uppercase">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2 text-gray-400">
                                            <button className="p-1.5 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"><Edit size={16} /></button>
                                            <button className="p-1.5 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-gray-100 overflow-hidden text-[12px] font-medium text-gray-500">
                    <div>Showing 1 - 5 of 5 entries</div>
                    <div className="flex items-center gap-1">
                        <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 rounded-lg transition-colors rotate-90"><ChevronDown size={14} /></button>
                        <button className="w-8 h-8 flex items-center justify-center bg-[#FF6B00] text-white rounded-full text-xs font-bold">1</button>
                        <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 rounded-lg transition-colors -rotate-90"><ChevronDown size={14} /></button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-y-auto max-h-[95vh] custom-scrollbar animate-in zoom-in duration-200">
                        <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white">
                            <h2 className="text-xl font-bold text-[#1F2937]">Add Training Type</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 hover:bg-gray-100 rounded-full">
                                <X size={22} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="space-y-1.5 mb-4">
                                <label className="text-sm font-bold text-gray-700">Goal Type</label>
                                <input type="text" name="type" value={formData.type} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm" />
                            </div>
                            <div className="space-y-1.5 mb-4">
                                <label className="text-sm font-bold text-gray-700">Description</label>
                                <textarea name="description" value={formData.description} onChange={handleInputChange} rows="4" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm resize-none"></textarea>
                            </div>
                            <div className="space-y-1.5 mb-6">
                                <label className="text-sm font-bold text-gray-700">Status</label>
                                <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white text-sm">
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 bg-gray-50 text-gray-700 rounded-lg font-bold hover:bg-gray-100 transition-colors border border-gray-200 text-sm">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-[#FF6B00] hover:bg-[#e66000] text-white rounded-lg font-bold transition-colors shadow-sm text-sm">Add Training type</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrainingType;
