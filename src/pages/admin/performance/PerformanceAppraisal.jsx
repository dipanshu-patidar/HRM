import React, { useState } from "react";
import { Plus, Search, Edit, Trash2, X, ChevronDown, Download, BarChart2, Calendar } from "lucide-react";
import ExportButton from "../../../components/common/ExportButton";

const PerformanceAppraisal = () => {
    // Mock Data
    const [appraisals, setAppraisals] = useState([
        {
            id: 1,
            name: { name: "Anthony Lewis", avatar: "https://ui-avatars.com/api/?name=Anthony+Lewis&background=random" },
            designation: "Web Designer",
            department: "Designing",
            appraisalDate: "14 Jan 2024",
            status: "Active"
        },
        {
            id: 2,
            name: { name: "Brian Villalobos", avatar: "https://ui-avatars.com/api/?name=Brian+Villalobos&background=random" },
            designation: "Web Developer",
            department: "Developer",
            appraisalDate: "21 Jan 2024",
            status: "Active"
        },
        {
            id: 3,
            name: { name: "Harvey Smith", avatar: "https://ui-avatars.com/api/?name=Harvey+Smith&background=random" },
            designation: "IOS Developer",
            department: "Developer",
            appraisalDate: "18 Feb 2024",
            status: "Active"
        },
        {
            id: 4,
            name: { name: "Stephan Peralt", avatar: "https://ui-avatars.com/api/?name=Stephan+Peralt&background=random" },
            designation: "Android Developer",
            department: "Developer",
            appraisalDate: "24 Feb 2024",
            status: "Active"
        },
        {
            id: 5,
            name: { name: "Doglas Martini", avatar: "https://ui-avatars.com/api/?name=Doglas+Martini&background=random" },
            designation: "DevOps Engineer",
            department: "DevOps",
            appraisalDate: "11 Mar 2024",
            status: "Active"
        }
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [activeTab, setActiveTab] = useState("Technical");
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState("Last 7 Days");

    const [formData, setFormData] = useState({
        employee: "Select",
        appraisalDate: "",
        status: "Select",
        competencies: {
            "Customer Experience": "None",
            "Marketing": "None",
            "Management": "None",
            "Administration": "None",
            "Presentation Skill": "None",
            "Quality Of Work": "None",
            "Efficiency": "None"
        }
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCompetencyChange = (indicator, value) => {
        setFormData({
            ...formData,
            competencies: {
                ...formData.competencies,
                [indicator]: value
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingItem) {
            setAppraisals(appraisals.map(a => a.id === editingItem.id ? {
                ...a,
                name: { ...a.name, name: formData.employee.split('|')[0] || a.name.name },
                appraisalDate: formData.appraisalDate,
                status: formData.status
            } : a));
        } else {
            // Mock add
            const id = appraisals.length + 1;
            const entry = {
                id,
                name: { name: "New Employee", avatar: "https://ui-avatars.com/api/?name=New+Employee&background=random" },
                designation: "Developer",
                department: "Development",
                appraisalDate: formData.appraisalDate,
                status: formData.status
            };
            setAppraisals([...appraisals, entry]);
        }
        closeModal();
    };

    const openEditModal = (item) => {
        setEditingItem(item);
        setFormData({
            employee: item.name.name,
            appraisalDate: "2024-01-01", // Mock date as table has formatted string
            status: item.status,
            competencies: {
                "Customer Experience": "Intermediate",
                "Marketing": "Advanced",
                "Management": "Advanced",
                "Administration": "Advanced",
                "Presentation Skill": "Expert / Leader",
                "Quality Of Work": "Expert / Leader",
                "Efficiency": "None"
            }
        });
        setIsModalOpen(true);
    };

    const openAddModal = () => {
        setEditingItem(null);
        setFormData({
            employee: "Select",
            appraisalDate: "",
            status: "Select",
            competencies: {
                "Customer Experience": "None",
                "Marketing": "None",
                "Management": "None",
                "Administration": "None",
                "Presentation Skill": "None",
                "Quality Of Work": "None",
                "Efficiency": "None"
            }
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    };

    const technicalCompetencies = [
        { indicator: "Customer Experience", expected: "Intermediate" },
        { indicator: "Marketing", expected: "Advanced" },
        { indicator: "Management", expected: "Advanced" },
        { indicator: "Administration", expected: "Advanced" },
        { indicator: "Presentation Skill", expected: "Expert / Leader" },
        { indicator: "Quality Of Work", expected: "Expert / Leader" },
        { indicator: "Efficiency", expected: "Expert / Leader" }
    ];

    const organizationalCompetencies = [
        { indicator: "Integrity", expected: "Beginner" },
        { indicator: "Professionalism", expected: "Beginner" },
        { indicator: "Team Work", expected: "Intermediate" },
        { indicator: "Critical Thinking", expected: "Advanced" },
        { indicator: "Conflict Management", expected: "Intermediate" },
        { indicator: "Attendance", expected: "Intermediate" },
        { indicator: "Ability To Meet Deadline", expected: "Advanced" }
    ];

    const currentCompetencies = activeTab === "Technical" ? technicalCompetencies : organizationalCompetencies;

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans text-gray-800">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Performance Appraisal</h1>
                    <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                        <BarChart2 size={14} className="text-gray-400" />
                        <span className="hover:text-primary cursor-pointer">Performance</span> / <span className="text-gray-400">Performance Appraisal</span>
                    </div>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0 items-center">
                    <ExportButton />
                    <button
                        onClick={openAddModal}
                        className="bg-[#FF6B00] hover:bg-[#e66000] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm font-medium"
                    >
                        <Plus size={18} />
                        Add Appraisal
                    </button>
                </div>
            </div>

            {/* Content Table Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Filters Row */}
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-lg font-bold text-gray-800">Performance Appraisal List</h2>
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

                {/* Search and Rows */}
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
                            <tr className="bg-gray-100/50 text-gray-700 text-sm font-semibold border-b border-gray-200 uppercase tracking-wider">
                                <th className="p-4 w-12"><input type="checkbox" className="rounded" /></th>
                                <th className="p-4">Name</th>
                                <th className="p-4">Designation</th>
                                <th className="p-4">Department</th>
                                <th className="p-4">Appraisal Date</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {appraisals.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors text-sm">
                                    <td className="p-4"><input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" /></td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <img src={item.name.avatar} alt={item.name.name} className="w-10 h-10 rounded-full border border-gray-200 object-cover" />
                                            <span className="font-bold text-gray-800">{item.name.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-500 font-medium">{item.designation}</td>
                                    <td className="p-4 text-gray-500 font-medium">{item.department}</td>
                                    <td className="p-4 text-gray-500 font-medium">{item.appraisalDate}</td>
                                    <td className="p-4">
                                        <span className="bg-green-100 text-green-600 border border-green-200 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 w-fit uppercase">
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
                <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-gray-100 overflow-hidden">
                    <div className="text-[12px] font-medium text-gray-500">Showing 1 - 5 of 5 entries</div>
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
                        <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
                            <h2 className="text-xl font-bold text-[#1F2937]">{editingItem ? 'Edit Appraisal' : 'Add Performance Appraisal'}</h2>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 hover:bg-gray-100 rounded-full">
                                <X size={22} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700">Employee <span className="text-red-500">*</span></label>
                                    <select
                                        name="employee"
                                        value={formData.employee}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white text-sm"
                                        required
                                    >
                                        <option value="Select">Select</option>
                                        <option value="Anthony Lewis">Anthony Lewis</option>
                                        <option value="Brian Villalobos">Brian Villalobos</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700">Appraisal Date <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            name="appraisalDate"
                                            value={formData.appraisalDate}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Tabs */}
                            <div className="flex border-b border-gray-100 mb-6">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("Technical")}
                                    className={`px-6 py-2.5 text-sm font-bold transition-all relative ${activeTab === "Technical" ? 'text-white bg-[#405D71] rounded-t-lg' : 'text-gray-500 hover:text-gray-700 border border-gray-200 border-b-0 rounded-t-lg mr-1'}`}
                                >
                                    Technical
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("Organizational")}
                                    className={`px-6 py-2.5 text-sm font-bold transition-all relative ${activeTab === "Organizational" ? 'text-white bg-[#405D71] rounded-t-lg font-bold' : 'text-gray-500 hover:text-gray-700 border border-gray-200 border-b-0 rounded-t-lg'}`}
                                >
                                    Organizational
                                </button>
                            </div>

                            {/* Competencies Table */}
                            <div className="border border-gray-100 rounded-lg overflow-hidden mb-6">
                                <div className="p-4 bg-white border-b border-gray-100">
                                    <h3 className="font-bold text-gray-800">{activeTab} Competencies</h3>
                                </div>
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="bg-gray-50/80 text-gray-600 font-bold border-b border-gray-100">
                                            <th className="p-3">Indicator</th>
                                            <th className="p-3">Expected Value</th>
                                            <th className="p-3">Set Value</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {currentCompetencies.map((comp) => (
                                            <tr key={comp.indicator} className="text-gray-700">
                                                <td className="p-3 text-gray-400 font-medium">{comp.indicator}</td>
                                                <td className="p-3 text-gray-400 font-medium">{comp.expected}</td>
                                                <td className="p-3 w-48">
                                                    <select
                                                        value={formData.competencies[comp.indicator] || "None"}
                                                        onChange={(e) => handleCompetencyChange(comp.indicator, e.target.value)}
                                                        className="w-full px-2 py-1.5 border border-gray-200 rounded focus:outline-none focus:border-primary bg-white text-xs font-medium"
                                                    >
                                                        <option value="None">None</option>
                                                        <option value="Beginner">Beginner</option>
                                                        <option value="Intermediate">Intermediate</option>
                                                        <option value="Advanced">Advanced</option>
                                                        <option value="Expert">Expert</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Status */}
                            <div className="mb-8">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Status <span className="text-red-500">*</span></label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white text-sm"
                                    required
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
                                    {editingItem ? 'Update' : 'Submit'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PerformanceAppraisal;
