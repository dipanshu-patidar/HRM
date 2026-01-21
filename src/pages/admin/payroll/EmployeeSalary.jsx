
import React, { useState } from "react";
import { Plus, Search, Edit, Trash2, X, ChevronDown, DollarSign, Download, Calendar } from "lucide-react";
import ExportButton from "../../../components/common/ExportButton";

const EmployeeSalary = () => {
    // Mock Data
    const [employees, setEmployees] = useState([
        {
            id: "Emp-001",
            name: "Anthony Lewis",
            department: "Finance",
            avatar: "https://ui-avatars.com/api/?name=Anthony+Lewis&background=random",
            email: "anthony@example.com",
            phone: "(123) 4567 890",
            designation: "Finance",
            joiningDate: "$12 Sep 2024",
            salary: "$40000"
        },
        {
            id: "Emp-002",
            name: "Brian Villalobos",
            department: "Developer",
            avatar: "https://ui-avatars.com/api/?name=Brian+Villalobos&background=random",
            email: "brian@example.com",
            phone: "(179) 7382 829",
            designation: "Developer",
            joiningDate: "24 Oct 2024",
            salary: "$35000"
        },
        {
            id: "Emp-003",
            name: "Harvey Smith",
            department: "Developer",
            avatar: "https://ui-avatars.com/api/?name=Harvey+Smith&background=random",
            email: "harvey@example.com",
            phone: "(184) 2719 738",
            designation: "Executive",
            joiningDate: "18 Feb 2024",
            salary: "$20000"
        },
        {
            id: "Emp-004",
            name: "Stephan Peralt",
            department: "Executive Officer",
            avatar: "https://ui-avatars.com/api/?name=Stephan+Peralt&background=random",
            email: "peral@example.com",
            phone: "(193) 7839 748",
            designation: "Executive",
            joiningDate: "17 Oct 2024",
            salary: "$22000"
        },
        {
            id: "Emp-005",
            name: "Doglas Martini",
            department: "Manager",
            avatar: "https://ui-avatars.com/api/?name=Doglas+Martini&background=random",
            email: "martiniwr@example.com",
            phone: "(183) 9302 890",
            designation: "Manager",
            joiningDate: "20 Jul 2024",
            salary: "$25000"
        },
        {
            id: "Emp-006",
            name: "Linda Ray",
            department: "Finance",
            avatar: "https://ui-avatars.com/api/?name=Linda+Ray&background=random",
            email: "ray456@example.com",
            phone: "(120) 3728 039",
            designation: "Finance",
            joiningDate: "10 Apr 2024",
            salary: "$30000"
        },
        {
            id: "Emp-007",
            name: "Elliot Murray",
            department: "Developer",
            avatar: "https://ui-avatars.com/api/?name=Elliot+Murray&background=random",
            email: "murray@example.com",
            phone: "(102) 8480 832",
            designation: "Finance",
            joiningDate: "29 Aug 2024",
            salary: "$35000"
        },
        {
            id: "Emp-008",
            name: "Rebecca Smith",
            department: "Executive",
            avatar: "https://ui-avatars.com/api/?name=Rebecca+Smith&background=random",
            email: "smith@example.com",
            phone: "(162) 8920 713",
            designation: "Executive",
            joiningDate: "22 Feb 2024",
            salary: "$45000"
        },
        {
            id: "Emp-009",
            name: "Connie Waters",
            department: "Developer",
            avatar: "https://ui-avatars.com/api/?name=Connie+Waters&background=random",
            email: "connie@example.com",
            phone: "(189) 0920 723",
            designation: "Developer",
            joiningDate: "03 Nov 2024",
            salary: "$50000"
        }
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [isDesignationOpen, setIsDesignationOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState("Last 7 Days");
    const [selectedDesignation, setSelectedDesignation] = useState("Designation");

    const [formData, setFormData] = useState({
        employeeName: "Select",
        netSalary: "",
        basic: "",
        da: "",
        hra: "",
        conveyance: "",
        allowance: "",
        medicalAllowance: "",
        others: "",
        tds: "",
        esi: "",
        pf: "",
        leave: "",
        profTax: "",
        labourWelfare: "",
        deductionOthers: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const openAddModal = () => {
        setEditingItem(null);
        setFormData({
            employeeName: "Select",
            netSalary: "",
            basic: "",
            da: "",
            hra: "",
            conveyance: "",
            allowance: "",
            medicalAllowance: "",
            others: "",
            tds: "",
            esi: "",
            pf: "",
            leave: "",
            profTax: "",
            labourWelfare: "",
            deductionOthers: ""
        });
        setIsModalOpen(true);
    };

    const openEditModal = (item) => {
        setEditingItem(item);
        setFormData({
            employeeName: item.name,
            netSalary: item.salary.replace('$', ''),
            basic: "",
            da: "",
            hra: "",
            conveyance: "",
            allowance: "",
            medicalAllowance: "",
            others: "",
            tds: "",
            esi: "",
            pf: "",
            leave: "",
            profTax: "",
            labourWelfare: "",
            deductionOthers: ""
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingItem) {
            setEmployees(employees.map(emp => emp.id === editingItem.id ? { ...emp, salary: `$${formData.netSalary} ` } : emp));
        }
        closeModal();
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans text-gray-800">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Employee Salary</h1>
                    <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                        <DollarSign size={14} className="text-gray-400" />
                        <span className="hover:text-primary cursor-pointer">HR</span> / <span className="text-gray-400">Employee Salary</span>
                    </div>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0 items-center">
                    <ExportButton />
                    <button
                        onClick={openAddModal}
                        className="bg-[#FF6B00] hover:bg-[#e66000] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm font-medium"
                    >
                        <Plus size={18} />
                        Add Salary
                    </button>
                    <button className="bg-white border border-gray-300 text-gray-400 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                        <ChevronDown size={18} />
                    </button>
                </div>
            </div>

            {/* Content Table Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Filters Row */}
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-lg font-bold text-gray-800">Employee Salary List</h2>
                    <div className="flex items-center gap-2 flex-wrap">
                        {/* Date Range */}
                        <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors bg-white font-medium">
                            01/15/2026 - 01/21/2026
                            <ChevronDown size={14} />
                        </button>

                        {/* Designation Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => { setIsDesignationOpen(!isDesignationOpen); setIsSortOpen(false); }}
                                className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors bg-white font-medium"
                            >
                                {selectedDesignation}
                                <ChevronDown size={14} className={`transition - transform duration - 200 ${isDesignationOpen ? 'rotate-180' : ''} `} />
                            </button>
                            {isDesignationOpen && (
                                <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 z-30 overflow-hidden animate-in fade-in zoom-in duration-200">
                                    {["Designation", "Developer", "Designer", "Manager", "Finance", "Executive"].map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => { setSelectedDesignation(option); setIsDesignationOpen(false); }}
                                            className={`w - full text - left px - 4 py - 2.5 text - sm transition - colors border - b border - gray - 50 last: border - 0 ${selectedDesignation === option ? 'bg-[#FF6B00] text-white font-bold' : 'text-gray-700 hover:bg-gray-50'} `}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Sort Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => { setIsSortOpen(!isSortOpen); setIsDesignationOpen(false); }}
                                className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors bg-white font-medium"
                            >
                                Sort By : {selectedSort}
                                <ChevronDown size={14} className={`transition - transform duration - 200 ${isSortOpen ? 'rotate-180' : ''} `} />
                            </button>
                            {isSortOpen && (
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-30 overflow-hidden animate-in fade-in zoom-in duration-200">
                                    {["Today", "Yesterday", "Last 7 Days", "This Month"].map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => { setSelectedSort(option); setIsSortOpen(false); }}
                                            className={`w - full text - left px - 4 py - 2.5 text - sm transition - colors border - b border - gray - 50 last: border - 0 ${selectedSort === option ? 'bg-[#FF6B00] text-white font-bold' : 'text-gray-700 hover:bg-gray-50'} `}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
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
                                <th className="p-4">Emp ID</th>
                                <th className="p-4">Name</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Phone</th>
                                <th className="p-4">Designation</th>
                                <th className="p-4">Joining Date</th>
                                <th className="p-4">Salary</th>
                                <th className="p-4">Payslip</th>
                                <th className="p-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {employees.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors text-sm">
                                    <td className="p-4"><input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" /></td>
                                    <td className="p-4 font-medium text-gray-500">{item.id}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <img src={item.avatar} alt={item.name} className="w-9 h-9 rounded-full border border-gray-200" />
                                            <div>
                                                <div className="font-bold text-gray-800">{item.name}</div>
                                                <div className="text-xs text-[#FF6B00]">{item.department}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-500 font-medium">{item.email}</td>
                                    <td className="p-4 text-gray-500 font-medium">{item.phone}</td>
                                    <td className="p-4">
                                        <select className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 bg-white focus:outline-none focus:border-primary">
                                            <option>{item.designation}</option>
                                            <option>Developer</option>
                                            <option>Finance</option>
                                            <option>Executive</option>
                                            <option>Manager</option>
                                        </select>
                                    </td>
                                    <td className="p-4 text-gray-500 font-medium">{item.joiningDate}</td>
                                    <td className="p-4 text-gray-700 font-bold">{item.salary}</td>
                                    <td className="p-4">
                                        <button className="bg-[#FF6B00] hover:bg-[#e66000] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">
                                            Generate Slip
                                        </button>
                                    </td>
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
                    <div>Showing 1 - 9 of 9 entries</div>
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
                            <h2 className="text-xl font-bold text-[#1F2937]">{editingItem ? 'Edit Employee Salary' : 'Add Employee Salary'}</h2>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 hover:bg-gray-100 rounded-full">
                                <X size={22} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700">Employee Name</label>
                                    <select name="employeeName" value={formData.employeeName} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white text-sm">
                                        <option value="Select">Select</option>
                                        <option value="Anthony Lewis">Anthony Lewis</option>
                                        <option value="Brian Villalobos">Brian Villalobos</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700">Net Salary</label>
                                    <input type="text" name="netSalary" value={formData.netSalary} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm" />
                                </div>
                            </div>

                            {/* Earnings Section */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-3">
                                    <label className="text-sm font-bold text-gray-700">Earnings</label>
                                    <button type="button" className="text-[#FF6B00] text-sm font-medium flex items-center gap-1">
                                        <Plus size={14} /> Add New
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    <div className="space-y-1">
                                        <label className="text-xs text-gray-500">Basic</label>
                                        <input type="text" name="basic" value={formData.basic} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs text-gray-500">DA(40%)</label>
                                        <input type="text" name="da" value={formData.da} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs text-gray-500">HRA(15%)</label>
                                        <input type="text" name="hra" value={formData.hra} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs text-gray-500">Conveyance</label>
                                        <input type="text" name="conveyance" value={formData.conveyance} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                                    <div className="space-y-1">
                                        <label className="text-xs text-gray-500">Allowance</label>
                                        <input type="text" name="allowance" value={formData.allowance} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs text-gray-500">Medical Allowance</label>
                                        <input type="text" name="medicalAllowance" value={formData.medicalAllowance} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs text-gray-500">Others</label>
                                        <input type="text" name="others" value={formData.others} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm" />
                                    </div>
                                </div>
                            </div>

                            {/* Deductions Section */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-3">
                                    <label className="text-sm font-bold text-gray-700">Deductions</label>
                                    <button type="button" className="text-[#FF6B00] text-sm font-medium flex items-center gap-1">
                                        <Plus size={14} /> Add New
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    <div className="space-y-1">
                                        <label className="text-xs text-gray-500">TDS</label>
                                        <input type="text" name="tds" value={formData.tds} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs text-gray-500">ESI</label>
                                        <input type="text" name="esi" value={formData.esi} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs text-gray-500">PF</label>
                                        <input type="text" name="pf" value={formData.pf} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs text-gray-500">Leave</label>
                                        <input type="text" name="leave" value={formData.leave} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                                    <div className="space-y-1">
                                        <label className="text-xs text-gray-500">Prof.Tax</label>
                                        <input type="text" name="profTax" value={formData.profTax} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs text-gray-500">Labour Welfare</label>
                                        <input type="text" name="labourWelfare" value={formData.labourWelfare} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs text-gray-500">Others</label>
                                        <input type="text" name="deductionOthers" value={formData.deductionOthers} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm" />
                                    </div>
                                </div>
                            </div>

                            {/* Footer Buttons */}
                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <button type="button" onClick={closeModal} className="px-6 py-2 bg-gray-50 text-gray-700 rounded-lg font-bold hover:bg-gray-100 transition-colors border border-gray-200 text-sm">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-[#FF6B00] hover:bg-[#e66000] text-white rounded-lg font-bold transition-colors shadow-sm text-sm">{editingItem ? 'Update' : 'Add Employee Salary'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeSalary;
