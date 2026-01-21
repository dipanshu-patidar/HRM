import React, { useState } from "react";
import { Plus, Edit, Trash2, X, ChevronDown, DollarSign, Download, Search } from "lucide-react";
import ExportButton from "../../../components/common/ExportButton";

const PayrollItems = () => {
    // Mock Data for Additions
    const [additions, setAdditions] = useState([
        { id: 1, name: "Leave Balance Amount", category: "Monthly Remuneration", amount: "$5" },
        { id: 2, name: "Arrears of Salary", category: "Additional Remuneration", amount: "$8" },
        { id: 3, name: "Gratuity", category: "Monthly Remuneration", amount: "$20" }
    ]);

    // Mock Data for Overtime
    const [overtime, setOvertime] = useState([
        { id: 1, name: "Normal day OT 1.5x", rate: "Hourly 1.5" },
        { id: 2, name: "Public holiday OT 3.0x", rate: "Hourly 3" },
        { id: 3, name: "Rest day OT 2.0x", rate: "Hourly 2" }
    ]);

    // Mock Data for Deductions
    const [deductions, setDeductions] = useState([
        { id: 1, name: "Absent amount", amount: "$12" },
        { id: 2, name: "Advance", amount: "$7" },
        { id: 3, name: "Unpaid leave", amount: "$3" }
    ]);

    const [activeTab, setActiveTab] = useState("Additions");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState("Last 7 Days");

    const [formData, setFormData] = useState({
        name: "",
        categoryName: "Monthly Remuneration",
        amount: "",
        rateType: "Select",
        rate: "",
        unitCalculation: false,
        assignee: "noAssignee"
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const openAddModal = () => {
        setEditingItem(null);
        setFormData({
            name: "",
            categoryName: "Monthly Remuneration",
            amount: "",
            rateType: "Select",
            rate: "",
            unitCalculation: false,
            assignee: "noAssignee"
        });
        setIsModalOpen(true);
    };

    const openEditModal = (item) => {
        setEditingItem(item);
        if (activeTab === "Additions") {
            setFormData({
                name: item.name,
                categoryName: item.category,
                amount: item.amount.replace('$', ''),
                rateType: "Select",
                rate: "",
                unitCalculation: false,
                assignee: "noAssignee"
            });
        } else if (activeTab === "Overtime") {
            setFormData({
                name: item.name,
                categoryName: "Monthly Remuneration",
                amount: "",
                rateType: "Hourly",
                rate: item.rate.replace('Hourly ', ''),
                unitCalculation: false,
                assignee: "noAssignee"
            });
        } else {
            setFormData({
                name: item.name,
                categoryName: "Monthly Remuneration",
                amount: item.amount.replace('$', ''),
                rateType: "Select",
                rate: "",
                unitCalculation: false,
                assignee: "noAssignee"
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingItem) {
            if (activeTab === "Additions") {
                setAdditions(additions.map(a => a.id === editingItem.id ? { ...a, name: formData.name, category: formData.categoryName, amount: `$${formData.amount}` } : a));
            } else if (activeTab === "Overtime") {
                setOvertime(overtime.map(o => o.id === editingItem.id ? { ...o, name: formData.name, rate: `Hourly ${formData.rate}` } : o));
            } else {
                setDeductions(deductions.map(d => d.id === editingItem.id ? { ...d, name: formData.name, amount: `$${formData.amount}` } : d));
            }
        }
        closeModal();
    };

    const getCurrentData = () => {
        switch (activeTab) {
            case "Additions": return additions;
            case "Overtime": return overtime;
            case "Deductions": return deductions;
            default: return additions;
        }
    };

    const getButtonLabel = () => {
        switch (activeTab) {
            case "Additions": return "Add Addition";
            case "Overtime": return "Add Overtime";
            case "Deductions": return "Add Deduction";
            default: return "Add Addition";
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans text-gray-800">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Payroll Items</h1>
                    <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                        <DollarSign size={14} className="text-gray-400" />
                        <span className="hover:text-primary cursor-pointer">HR</span> / <span className="text-gray-400">Payroll Items</span>
                    </div>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0 items-center">
                    <ExportButton />
                    <button className="bg-white border border-gray-300 text-gray-400 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                        <ChevronDown size={18} />
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 mb-4">
                {["Additions", "Overtime", "Deductions"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === tab ? 'bg-[#405D71] text-white' : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                    >
                        {tab}
                    </button>
                ))}
                <div className="flex-1"></div>
                <button
                    onClick={openAddModal}
                    className="bg-[#FF6B00] hover:bg-[#e66000] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm font-medium"
                >
                    <Plus size={18} />
                    {getButtonLabel()}
                </button>
            </div>

            {/* Content Table Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Filters Row */}
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-lg font-bold text-gray-800">{activeTab} List</h2>
                    <div className="relative">
                        <button
                            onClick={() => setIsSortOpen(!isSortOpen)}
                            className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors bg-white font-medium"
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
                                {activeTab === "Additions" && <th className="p-4">Category</th>}
                                {activeTab === "Overtime" && <th className="p-4">Rate</th>}
                                {(activeTab === "Additions" || activeTab === "Deductions") && <th className="p-4">Default / Unit Amount</th>}
                                <th className="p-4 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {getCurrentData().map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors text-sm">
                                    <td className="p-4"><input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" /></td>
                                    <td className="p-4 font-bold text-gray-800">{item.name}</td>
                                    {activeTab === "Additions" && <td className="p-4 text-[#FF6B00] font-medium">{item.category}</td>}
                                    {activeTab === "Overtime" && <td className="p-4 text-gray-500 font-medium">{item.rate}</td>}
                                    {(activeTab === "Additions" || activeTab === "Deductions") && <td className="p-4 text-gray-700 font-medium">{item.amount}</td>}
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2 text-gray-400">
                                            <button onClick={() => openEditModal(item)} className="p-1.5 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"><Edit size={16} /></button>
                                            <button className="p-1.5 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-gray-100 overflow-hidden text-[12px] font-medium text-gray-500">
                    <div>Showing 1 - 3 of 3 entries</div>
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
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-y-auto max-h-[95vh] custom-scrollbar animate-in zoom-in duration-200">
                        <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
                            <h2 className="text-xl font-bold text-[#1F2937]">{editingItem ? `Edit ${activeTab.slice(0, -1)}` : getButtonLabel()}</h2>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 hover:bg-gray-100 rounded-full">
                                <X size={22} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="space-y-4">
                                {/* Name - shown for all tabs */}
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700">Name</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm" />
                                </div>

                                {/* Additions Form */}
                                {activeTab === "Additions" && (
                                    <>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-bold text-gray-700">Category Name</label>
                                            <select name="categoryName" value={formData.categoryName} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white text-sm">
                                                <option value="Monthly Remuneration">Monthly Remuneration</option>
                                                <option value="Additional Remuneration">Additional Remuneration</option>
                                                <option value="Hourly">Hourly</option>
                                            </select>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-sm font-bold text-gray-700">Amount</label>
                                            <div className="flex items-center gap-4">
                                                <input type="text" name="amount" value={formData.amount} onChange={handleInputChange} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm" />
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm text-gray-500">Unit Calculation</span>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input type="checkbox" name="unitCalculation" checked={formData.unitCalculation} onChange={handleInputChange} className="sr-only peer" />
                                                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#FF6B00]"></div>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="radio" name="assignee" value="noAssignee" checked={formData.assignee === "noAssignee"} onChange={handleInputChange} className="w-4 h-4 text-[#FF6B00] border-gray-300 focus:ring-[#FF6B00]" />
                                                <span className="text-sm text-gray-700">No Assignee</span>
                                            </label>
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="radio" name="assignee" value="allEmployees" checked={formData.assignee === "allEmployees"} onChange={handleInputChange} className="w-4 h-4 text-[#FF6B00] border-gray-300 focus:ring-[#FF6B00]" />
                                                <span className="text-sm text-gray-700">All Employees</span>
                                            </label>
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="radio" name="assignee" value="selectEmployee" checked={formData.assignee === "selectEmployee"} onChange={handleInputChange} className="w-4 h-4 text-[#FF6B00] border-gray-300 focus:ring-[#FF6B00]" />
                                                <span className="text-sm text-gray-700">Select Employee</span>
                                            </label>
                                        </div>
                                    </>
                                )}

                                {/* Overtime Form */}
                                {activeTab === "Overtime" && (
                                    <>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-bold text-gray-700">Rate Type</label>
                                            <select name="rateType" value={formData.rateType || "Select"} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white text-sm">
                                                <option value="Select">Select</option>
                                                <option value="Hourly">Hourly</option>
                                                <option value="Daily">Daily</option>
                                            </select>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-sm font-bold text-gray-700">Rate</label>
                                            <input type="text" name="rate" value={formData.rate || ""} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm" />
                                        </div>
                                    </>
                                )}

                                {/* Deductions Form */}
                                {activeTab === "Deductions" && (
                                    <>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-bold text-gray-700">Amount</label>
                                            <div className="flex items-center gap-4">
                                                <input type="text" name="amount" value={formData.amount} onChange={handleInputChange} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm" />
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm text-gray-500">Unit Calculation</span>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input type="checkbox" name="unitCalculation" checked={formData.unitCalculation} onChange={handleInputChange} className="sr-only peer" />
                                                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#FF6B00]"></div>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="radio" name="assignee" value="noAssignee" checked={formData.assignee === "noAssignee"} onChange={handleInputChange} className="w-4 h-4 text-[#FF6B00] border-gray-300 focus:ring-[#FF6B00]" />
                                                <span className="text-sm text-gray-700">No Assignee</span>
                                            </label>
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="radio" name="assignee" value="allEmployees" checked={formData.assignee === "allEmployees"} onChange={handleInputChange} className="w-4 h-4 text-[#FF6B00] border-gray-300 focus:ring-[#FF6B00]" />
                                                <span className="text-sm text-gray-700">All Employees</span>
                                            </label>
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="radio" name="assignee" value="selectEmployee" checked={formData.assignee === "selectEmployee"} onChange={handleInputChange} className="w-4 h-4 text-[#FF6B00] border-gray-300 focus:ring-[#FF6B00]" />
                                                <span className="text-sm text-gray-700">Select Employee</span>
                                            </label>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Footer Buttons */}
                            <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-gray-100">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 bg-gray-50 text-gray-700 rounded-lg font-bold hover:bg-gray-100 transition-colors border border-gray-200 text-sm">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-[#FF6B00] hover:bg-[#e66000] text-white rounded-lg font-bold transition-colors shadow-sm text-sm">{getButtonLabel()}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PayrollItems;
