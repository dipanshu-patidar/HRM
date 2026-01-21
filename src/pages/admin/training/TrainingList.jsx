import React, { useState } from "react";
import { Plus, Search, Edit, Trash2, X, ChevronDown, GraduationCap } from "lucide-react";

const TrainingList = () => {
    // Mock Data
    const [trainings, setTrainings] = useState([
        {
            id: 1,
            type: "Git Training",
            trainer: { name: "Anthony Lewis", avatar: "https://ui-avatars.com/api/?name=Anthony+Lewis&background=random" },
            employees: [
                "https://i.pravatar.cc/150?u=1",
                "https://i.pravatar.cc/150?u=2",
                "https://i.pravatar.cc/150?u=3",
                "https://i.pravatar.cc/150?u=4"
            ],
            duration: "12 Jan 2024 - 12 Feb 2024",
            description: "Version control and code collaboration.",
            cost: "$200",
            status: "Active"
        },
        {
            id: 2,
            type: "HTML Training",
            trainer: { name: "Brian Villalobos", avatar: "https://ui-avatars.com/api/?name=Brian+Villalobos&background=random" },
            employees: [
                "https://i.pravatar.cc/150?u=5",
                "https://i.pravatar.cc/150?u=6",
                "https://i.pravatar.cc/150?u=7"
            ],
            duration: "17 Jan 2024 - 17 Feb 2024",
            description: "Basics of web page structure and markup.",
            cost: "$100",
            status: "Active"
        },
        {
            id: 3,
            type: "React Training",
            trainer: { name: "Harvey Smith", avatar: "https://ui-avatars.com/api/?name=Harvey+Smith&background=random" },
            employees: [
                "https://i.pravatar.cc/150?u=8",
                "https://i.pravatar.cc/150?u=9",
                "https://i.pravatar.cc/150?u=10",
                "https://i.pravatar.cc/150?u=11",
                "https://i.pravatar.cc/150?u=12",
                "https://i.pravatar.cc/150?u=13"
            ],
            duration: "10 Feb 2024 - 10 Mar 2024",
            description: "Dynamic web applications with components",
            cost: "$300",
            status: "Active"
        }
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState("Last 7 Days");

    const [formData, setFormData] = useState({
        trainingType: "Select",
        trainer: "Select",
        employees: "Select",
        cost: "",
        startDate: "",
        endDate: "",
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
                    <h1 className="text-2xl font-bold text-gray-800">Training</h1>
                    <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                        <GraduationCap size={14} className="text-gray-400" />
                        <span className="hover:text-primary cursor-pointer">Performance</span> / <span className="text-gray-400">Add Training</span>
                    </div>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0 items-center">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-[#FF6B00] hover:bg-[#e66000] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm font-medium"
                    >
                        <Plus size={18} />
                        Add Training
                    </button>
                    <button className="bg-white border border-gray-300 text-gray-400 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                        <ChevronDown size={18} />
                    </button>
                </div>
            </div>

            {/* Content Table Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-lg font-bold text-gray-800">Training List</h2>
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
                                <th className="p-4">Training Type</th>
                                <th className="p-4">Trainer</th>
                                <th className="p-4">Employee</th>
                                <th className="p-4">Time Duration</th>
                                <th className="p-4">Description</th>
                                <th className="p-4">Cost</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {trainings.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors text-sm">
                                    <td className="p-4"><input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" /></td>
                                    <td className="p-4 font-medium text-gray-600">{item.type}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <img src={item.trainer.avatar} alt={item.trainer.name} className="w-8 h-8 rounded-full border border-gray-200" />
                                            <span className="font-bold text-gray-800">{item.trainer.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center -space-x-2">
                                            {item.employees.slice(0, 4).map((img, i) => (
                                                <img key={i} src={img} alt={`Emp ${i}`} className="w-7 h-7 rounded-full border-2 border-white ring-1 ring-gray-100" />
                                            ))}
                                            {item.employees.length > 4 && (
                                                <div className="w-7 h-7 rounded-full bg-orange-400 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold ring-1 ring-gray-100">
                                                    +{item.employees.length - 4}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-500 font-medium">{item.duration}</td>
                                    <td className="p-4 text-gray-500 font-medium max-w-[200px] truncate">{item.description}</td>
                                    <td className="p-4 text-gray-500 font-medium">{item.cost}</td>
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
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-y-auto max-h-[95vh] custom-scrollbar animate-in zoom-in duration-200">
                        <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white">
                            <h2 className="text-xl font-bold text-[#1F2937]">Add Training</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 hover:bg-gray-100 rounded-full">
                                <X size={22} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700">Training Type</label>
                                    <select name="trainingType" value={formData.trainingType} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white text-sm">
                                        <option value="Select">Select</option>
                                        <option value="Git Training">Git Training</option>
                                        <option value="HTML Training">HTML Training</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700">Trainer</label>
                                    <select name="trainer" value={formData.trainer} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white text-sm">
                                        <option value="Select">Select</option>
                                        <option value="Anthony Lewis">Anthony Lewis</option>
                                        <option value="Brian Villalobos">Brian Villalobos</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700">Employees</label>
                                    <select name="employees" value={formData.employees} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white text-sm">
                                        <option value="Select">Select</option>
                                        <option value="All Employees">All Employees</option>
                                        <option value="Selected">Selected</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700">Training Cost</label>
                                    <input type="text" name="cost" value={formData.cost} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700">Start Date</label>
                                    <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700">End Date</label>
                                    <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm" />
                                </div>
                            </div>
                            <div className="space-y-1.5 mb-4">
                                <label className="text-sm font-bold text-gray-700">Description</label>
                                <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm resize-none"></textarea>
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
                                <button type="submit" className="px-6 py-2 bg-[#FF6B00] hover:bg-[#e66000] text-white rounded-lg font-bold transition-colors shadow-sm text-sm">Add Training</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrainingList;
