
import React, { useState } from "react";
import { Plus, Search, Edit, Trash2, X, ChevronDown, Download, Briefcase } from "lucide-react";
import ExportButton from "../../../components/common/ExportButton";

const Referrals = () => {
    // Mock Data
    const [referrals, setReferrals] = useState([
        {
            id: "Reff-001",
            referrerName: "Anthony Lewis",
            referrerDept: "Finance",
            referrerAvatar: "https://ui-avatars.com/api/?name=Anthony+Lewis&background=random",
            jobReferred: "Senior IOS Developer",
            jobIcon: "🍎",
            refereeName: "Harold Gaynor",
            refereeEmail: "harold@example.com",
            refereeAvatar: "https://ui-avatars.com/api/?name=Harold+Gaynor&background=random",
            bonus: "$200"
        },
        {
            id: "Reff-002",
            referrerName: "Brian Villalobos",
            referrerDept: "Developer",
            referrerAvatar: "https://ui-avatars.com/api/?name=Brian+Villalobos&background=random",
            jobReferred: "Junior PHP Developer",
            jobIcon: "🌐",
            refereeName: "Sandra Ornellas",
            refereeEmail: "sandra@example.com",
            refereeAvatar: "https://ui-avatars.com/api/?name=Sandra+Ornellas&background=random",
            bonus: "$100"
        },
        {
            id: "Reff-003",
            referrerName: "Harvey Smith",
            referrerDept: "Developer",
            referrerAvatar: "https://ui-avatars.com/api/?name=Harvey+Smith&background=random",
            jobReferred: "Network Engineer",
            jobIcon: "🔌",
            refereeName: "John Harris",
            refereeEmail: "john@example.com",
            refereeAvatar: "https://ui-avatars.com/api/?name=John+Harris&background=random",
            bonus: "$300"
        },
        {
            id: "Reff-004",
            referrerName: "Stephan Peralt",
            referrerDept: "Executive Officer",
            referrerAvatar: "https://ui-avatars.com/api/?name=Stephan+Peralt&background=random",
            jobReferred: "Junior React Developer",
            jobIcon: "⚛️",
            refereeName: "Whitney Barnette",
            refereeEmail: "whitney@example.com",
            refereeAvatar: "https://ui-avatars.com/api/?name=Whitney+Barnette&background=random",
            bonus: "$150"
        },
        {
            id: "Reff-005",
            referrerName: "Doglas Martini",
            referrerDept: "Manager",
            referrerAvatar: "https://ui-avatars.com/api/?name=Doglas+Martini&background=random",
            jobReferred: "Senior Laravel Developer",
            jobIcon: "🔴",
            refereeName: "Richard Thompson",
            refereeEmail: "richard@example.com",
            refereeAvatar: "https://ui-avatars.com/api/?name=Richard+Thompson&background=random",
            bonus: "$250"
        }
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [isRoleOpen, setIsRoleOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState("Last 7 Days");
    const [selectedRole, setSelectedRole] = useState("Role");

    const [formData, setFormData] = useState({
        referrerName: "",
        referrerDept: "Finance",
        jobReferred: "",
        refereeName: "",
        refereeEmail: "",
        bonus: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const openEditModal = (item) => {
        setEditingItem(item);
        setFormData({
            referrerName: item.referrerName,
            referrerDept: item.referrerDept,
            jobReferred: item.jobReferred,
            refereeName: item.refereeName,
            refereeEmail: item.refereeEmail,
            bonus: item.bonus.replace('$', '')
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
            setReferrals(referrals.map(r => r.id === editingItem.id ? {
                ...r,
                referrerName: formData.referrerName,
                referrerDept: formData.referrerDept,
                referrerAvatar: `https://ui-avatars.com/api/?name=${formData.referrerName.replace(' ', '+')}&background=random`,
                jobReferred: formData.jobReferred,
                refereeName: formData.refereeName,
                refereeEmail: formData.refereeEmail,
                refereeAvatar: `https://ui-avatars.com/api/?name=${formData.refereeName.replace(' ', '+')}&background=random`,
                bonus: `$${formData.bonus}`
            } : r));
        }
        closeModal();
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans text-gray-800">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Refferals</h1>
                    <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                        <Users size={14} className="text-gray-400" />
                        <span className="hover:text-primary cursor-pointer">Administration</span> / <span className="text-gray-400">Refferals</span>
                    </div>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0 items-center">
                    <ExportButton />
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-[#FF6B00] hover:bg-[#e66000] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm font-medium"
                    >
                        <Plus size={18} />
                        Add Referral
                    </button>
                </div>
            </div>

            {/* Content Table Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Filters Row */}
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-lg font-bold text-gray-800">Refferals List</h2>
                    <div className="flex items-center gap-2 flex-wrap">
                        {/* Role Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => { setIsRoleOpen(!isRoleOpen); setIsSortOpen(false); }}
                                className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors bg-white font-medium"
                            >
                                {selectedRole}
                                <ChevronDown size={14} className={`transition-transform duration-200 ${isRoleOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isRoleOpen && (
                                <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 z-30 overflow-hidden animate-in fade-in zoom-in duration-200">
                                    {["Role", "Developer", "Designer", "Manager", "Finance"].map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => { setSelectedRole(option); setIsRoleOpen(false); }}
                                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors border-b border-gray-50 last:border-0 ${selectedRole === option ? 'bg-[#FF6B00] text-white font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
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
                                onClick={() => { setIsSortOpen(!isSortOpen); setIsRoleOpen(false); }}
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
                                <th className="p-4">Refferals ID</th>
                                <th className="p-4">Referrer Name</th>
                                <th className="p-4">Job Reffered</th>
                                <th className="p-4">Referee Name</th>
                                <th className="p-4">Refferals Bonus</th>
                                <th className="p-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {referrals.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors text-sm">
                                    <td className="p-4"><input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" /></td>
                                    <td className="p-4 font-medium text-gray-500">{item.id}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <img src={item.referrerAvatar} alt={item.referrerName} className="w-9 h-9 rounded-full border border-gray-200" />
                                            <div>
                                                <div className="font-bold text-gray-800">{item.referrerName}</div>
                                                <div className="text-xs text-[#FF6B00]">{item.referrerDept}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg">{item.jobIcon}</span>
                                            <span className="font-bold text-[#405D71]">{item.jobReferred}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <img src={item.refereeAvatar} alt={item.refereeName} className="w-9 h-9 rounded-full border border-gray-200" />
                                            <div>
                                                <div className="font-bold text-gray-800">{item.refereeName}</div>
                                                <div className="text-xs text-[#FF6B00]">{item.refereeEmail}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 font-bold text-gray-700">{item.bonus}</td>
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
                    <div>Showing 1 - {referrals.length} of {referrals.length} entries</div>
                    <div className="flex items-center gap-1">
                        <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 rounded-lg transition-colors rotate-90"><ChevronDown size={14} /></button>
                        <button className="w-8 h-8 flex items-center justify-center bg-[#FF6B00] text-white rounded-full text-xs font-bold">1</button>
                        <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 rounded-lg transition-colors -rotate-90"><ChevronDown size={14} /></button>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-y-auto max-h-[95vh] custom-scrollbar animate-in zoom-in duration-200">
                        <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
                            <h2 className="text-xl font-bold text-[#1F2937]">Edit Referral</h2>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 hover:bg-gray-100 rounded-full">
                                <X size={22} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700">Referrer Name</label>
                                    <input type="text" name="referrerName" value={formData.referrerName} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700">Department</label>
                                    <select name="referrerDept" value={formData.referrerDept} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white text-sm">
                                        <option value="Finance">Finance</option>
                                        <option value="Developer">Developer</option>
                                        <option value="Designer">Designer</option>
                                        <option value="Manager">Manager</option>
                                        <option value="Executive Officer">Executive Officer</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-1.5 mb-4">
                                <label className="text-sm font-bold text-gray-700">Job Referred</label>
                                <input type="text" name="jobReferred" value={formData.jobReferred} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700">Referee Name</label>
                                    <input type="text" name="refereeName" value={formData.refereeName} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700">Referee Email</label>
                                    <input type="email" name="refereeEmail" value={formData.refereeEmail} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm" />
                                </div>
                            </div>
                            <div className="space-y-1.5 mb-6">
                                <label className="text-sm font-bold text-gray-700">Bonus Amount</label>
                                <input type="text" name="bonus" value={formData.bonus} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm" />
                            </div>
                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <button type="button" onClick={closeModal} className="px-6 py-2 bg-gray-50 text-gray-700 rounded-lg font-bold hover:bg-gray-100 transition-colors border border-gray-200 text-sm">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-[#FF6B00] hover:bg-[#e66000] text-white rounded-lg font-bold transition-colors shadow-sm text-sm">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Referrals;
