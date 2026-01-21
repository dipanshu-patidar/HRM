import React, { useState } from "react";
import { Plus, Search, Edit, Trash2, X, ChevronDown, Users, Download, FileText } from "lucide-react";

const Candidates = () => {
    // Mock Data
    const [candidates, setCandidates] = useState([
        {
            id: "Cand-001",
            name: "Harold Gaynor",
            email: "harold@example.com",
            avatar: "https://ui-avatars.com/api/?name=Harold+Gaynor&background=random",
            appliedRole: "Accountant",
            phone: "(146) 8964 578",
            appliedDate: "12 Sep 2024",
            status: "Sent"
        },
        {
            id: "Cand-002",
            name: "Sandra Ornellas",
            email: "sandra@example.com",
            avatar: "https://ui-avatars.com/api/?name=Sandra+Ornellas&background=random",
            appliedRole: "App Developer",
            phone: "(148) 9648 218",
            appliedDate: "24 Oct 2024",
            status: "Scheduled"
        },
        {
            id: "Cand-003",
            name: "John Harris",
            email: "john@example.com",
            avatar: "https://ui-avatars.com/api/?name=John+Harris&background=random",
            appliedRole: "Technician",
            phone: "(196) 2348 947",
            appliedDate: "18 Feb 2024",
            status: "Interviewed"
        },
        {
            id: "Cand-004",
            name: "Carole Langan",
            email: "carole@example.com",
            avatar: "https://ui-avatars.com/api/?name=Carole+Langan&background=random",
            appliedRole: "Web Developer",
            phone: "(138) 6487 295",
            appliedDate: "17 Oct 2024",
            status: "Offered"
        },
        {
            id: "Cand-005",
            name: "Charles Marks",
            email: "charles@example.com",
            avatar: "https://ui-avatars.com/api/?name=Charles+Marks&background=random",
            appliedRole: "Sales Executive Officer",
            phone: "(154) 6485 218",
            appliedDate: "20 Jul 2024",
            status: "Hired"
        },
        {
            id: "Cand-006",
            name: "Kerry Drake",
            email: "kerry@example.com",
            avatar: "https://ui-avatars.com/api/?name=Kerry+Drake&background=random",
            appliedRole: "Designer",
            phone: "(185) 5947 097",
            appliedDate: "20 Jul 2024",
            status: "Rejected"
        },
        {
            id: "Cand-007",
            name: "David Carmona",
            email: "david@example.com",
            avatar: "https://ui-avatars.com/api/?name=David+Carmona&background=random",
            appliedRole: "Account Manager",
            phone: "(106) 3485 978",
            appliedDate: "29 Aug 2024",
            status: "Hired"
        },
        {
            id: "Cand-008",
            name: "Margaret Soto",
            email: "margaret@example.com",
            avatar: "https://ui-avatars.com/api/?name=Margaret+Soto&background=random",
            appliedRole: "SEO Analyst",
            phone: "(174) 3795 107",
            appliedDate: "22 Feb 2024",
            status: "Scheduled"
        },
        {
            id: "Cand-009",
            name: "Jeffrey Thaler",
            email: "jeffrey@example.com",
            avatar: "https://ui-avatars.com/api/?name=Jeffrey+Thaler&background=random",
            appliedRole: "Admin",
            phone: "(128) 0975 348",
            appliedDate: "03 Nov 2024",
            status: "Apt Received"
        }
    ]);

    const [isSortOpen, setIsSortOpen] = useState(false);
    const [isRoleOpen, setIsRoleOpen] = useState(false);
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState("Last 7 Days");
    const [selectedRole, setSelectedRole] = useState("Role");
    const [selectedStatus, setSelectedStatus] = useState("Select Status");

    const getStatusStyle = (status) => {
        switch (status) {
            case "Sent":
                return "bg-green-100 text-green-600 border-green-200";
            case "Scheduled":
                return "bg-purple-100 text-purple-600 border-purple-200";
            case "Interviewed":
                return "bg-blue-100 text-blue-600 border-blue-200";
            case "Offered":
                return "bg-yellow-100 text-yellow-600 border-yellow-200";
            case "Hired":
                return "bg-green-100 text-green-600 border-green-200";
            case "Rejected":
                return "bg-red-100 text-red-600 border-red-200";
            case "Apt Received":
                return "bg-orange-100 text-orange-600 border-orange-200";
            default:
                return "bg-gray-100 text-gray-600 border-gray-200";
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans text-gray-800">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Candidates List</h1>
                    <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                        <Users size={14} className="text-gray-400" />
                        <span className="hover:text-primary cursor-pointer">Administration</span> / <span className="text-gray-400">Candidates List</span>
                    </div>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0 items-center">
                    <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                        <button className="px-3 py-2 bg-white text-gray-500 hover:bg-gray-50">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
                        </button>
                        <button className="px-3 py-2 bg-[#FF6B00] text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
                        </button>
                    </div>
                    <button className="bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-lg flex items-center gap-2 transition-colors font-medium text-sm">
                        <Download size={16} />
                        Export
                        <ChevronDown size={14} />
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
                    <h2 className="text-lg font-bold text-gray-800">Candidates List</h2>
                    <div className="flex items-center gap-2 flex-wrap">
                        {/* Date Range */}
                        <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors bg-white font-medium">
                            01/15/2026 - 01/21/2026
                            <ChevronDown size={14} />
                        </button>

                        {/* Role Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => { setIsRoleOpen(!isRoleOpen); setIsStatusOpen(false); setIsSortOpen(false); }}
                                className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors bg-white font-medium"
                            >
                                {selectedRole}
                                <ChevronDown size={14} className={`transition-transform duration-200 ${isRoleOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isRoleOpen && (
                                <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 z-30 overflow-hidden animate-in fade-in zoom-in duration-200">
                                    {["Role", "Developer", "Designer", "Manager", "Accountant"].map((option) => (
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

                        {/* Status Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => { setIsStatusOpen(!isStatusOpen); setIsRoleOpen(false); setIsSortOpen(false); }}
                                className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors bg-white font-medium"
                            >
                                {selectedStatus}
                                <ChevronDown size={14} className={`transition-transform duration-200 ${isStatusOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isStatusOpen && (
                                <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 z-30 overflow-hidden animate-in fade-in zoom-in duration-200">
                                    {["Select Status", "Sent", "Scheduled", "Interviewed", "Offered", "Hired", "Rejected"].map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => { setSelectedStatus(option); setIsStatusOpen(false); }}
                                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors border-b border-gray-50 last:border-0 ${selectedStatus === option ? 'bg-[#FF6B00] text-white font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
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
                                onClick={() => { setIsSortOpen(!isSortOpen); setIsRoleOpen(false); setIsStatusOpen(false); }}
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
                                <th className="p-4">Cand ID</th>
                                <th className="p-4">Candidate</th>
                                <th className="p-4">Applied Role</th>
                                <th className="p-4">Phone</th>
                                <th className="p-4">Applied Date</th>
                                <th className="p-4">Resume</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {candidates.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors text-sm">
                                    <td className="p-4"><input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" /></td>
                                    <td className="p-4 font-medium text-gray-500">{item.id}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <img src={item.avatar} alt={item.name} className="w-9 h-9 rounded-full border border-gray-200" />
                                            <div>
                                                <div className="font-bold text-gray-800">{item.name}</div>
                                                <div className="text-xs text-blue-500">{item.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-500 font-medium">{item.appliedRole}</td>
                                    <td className="p-4 text-gray-500 font-medium">{item.phone}</td>
                                    <td className="p-4 text-gray-500 font-medium">{item.appliedDate}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <FileText size={16} />
                                            <Download size={16} className="cursor-pointer hover:text-primary" />
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${getStatusStyle(item.status)}`}>
                                            + {item.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2 text-gray-400">
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
        </div>
    );
};

export default Candidates;
