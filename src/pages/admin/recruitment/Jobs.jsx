import React, { useState } from "react";
import { Plus, Search, Edit, Trash2, X, ChevronDown, Briefcase, Download, Upload, MapPin } from "lucide-react";
import ExportButton from "../../../components/common/ExportButton";

const Jobs = () => {
    // Mock Data
    const [jobs, setJobs] = useState([
        {
            id: "Job-001",
            icon: "🍎",
            title: "Senior IOS Developer",
            applicants: 25,
            category: "Software",
            location: "New York, USA",
            salaryRange: "30,000 - 35,000 / month",
            postedDate: "12 Sep 2024"
        },
        {
            id: "Job-002",
            icon: "🌐",
            title: "Junior PHP Developer",
            applicants: 20,
            category: "Software",
            location: "Los Angeles, USA",
            salaryRange: "20,000 - 25,000 / month",
            postedDate: "24 Oct 2024"
        },
        {
            id: "Job-003",
            icon: "⚙️",
            title: "Junior PHP Developer",
            applicants: 20,
            category: "Software",
            location: "Los Angeles, USA",
            salaryRange: "20,000 - 25,000 / month",
            postedDate: "24 Oct 2024"
        },
        {
            id: "Job-004",
            icon: "⚛️",
            title: "Junior React Developer",
            applicants: 35,
            category: "Software",
            location: "Bristol, UK",
            salaryRange: "30,000 - 35,000 / month",
            postedDate: "18 Feb 2024"
        },
        {
            id: "Job-005",
            icon: "🔴",
            title: "Senior Laravel Developer",
            applicants: 40,
            category: "Software",
            location: "Washington, USA",
            salaryRange: "32,000 - 36,000 / month",
            postedDate: "20 Jul 2024"
        },
        {
            id: "Job-006",
            icon: "☁️",
            title: "DevOps Engineer",
            applicants: 20,
            category: "Software",
            location: "Coventry, UK",
            salaryRange: "25,000 - 35,000 / month",
            postedDate: "10 Apr 2024"
        },
        {
            id: "Job-007",
            icon: "🤖",
            title: "Junior Android Developer",
            applicants: 25,
            category: "Software",
            location: "Chicago, USA",
            salaryRange: "28,000 - 32,000 / month",
            postedDate: "29 Aug 2024"
        }
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [activeTab, setActiveTab] = useState("Basic Information");
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [isRoleOpen, setIsRoleOpen] = useState(false);
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState("Last 7 Days");
    const [selectedRole, setSelectedRole] = useState("Role");
    const [selectedStatus, setSelectedStatus] = useState("Select Status");

    const [formData, setFormData] = useState({
        jobTitle: "",
        jobDescription: "",
        jobCategory: "Select",
        jobType: "Select",
        jobLevel: "Select",
        experience: "Select",
        qualification: "Select",
        gender: "Select",
        minSalary: "Select",
        maxSalary: "Select",
        expiredDate: "",
        requiredSkills: "",
        address: "",
        country: "Select",
        state: "Select",
        city: "Select",
        zipCode: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingItem) {
            setJobs(jobs.map(j => j.id === editingItem.id ? {
                ...j,
                title: formData.jobTitle,
                category: formData.jobCategory,
                location: `${formData.city}, ${formData.country}`,
                salaryRange: `${formData.minSalary} - ${formData.maxSalary} / month`,
                // ... update other fields if displayed
            } : j));
        } else {
            // Mock Add
            const id = `Job-${String(jobs.length + 1).padStart(3, '0')}`;
            const entry = {
                id,
                icon: "🆕",
                title: formData.jobTitle,
                applicants: 0,
                category: formData.jobCategory,
                location: `${formData.city}, ${formData.country}`,
                salaryRange: `${formData.minSalary} - ${formData.maxSalary} / month`,
                postedDate: "Today"
            };
            setJobs([...jobs, entry]);
        }
        closeModal();
    };

    const openEditModal = (item) => {
        setEditingItem(item);
        // Parse location and salary range if possible, or just set defaults/raw
        // For mock, we'll try to split location
        const [city, country] = item.location.split(', ');

        setFormData({
            ...formData,
            jobTitle: item.title,
            jobCategory: item.category,
            city: city || "",
            country: country || "Select",
            // Mock other fields as they aren't in table item
            minSalary: "20000",
            maxSalary: "35000",
            jobType: "Full Time",
            jobLevel: "Senior",
            experience: "1-3 Years",
            qualification: "Bachelors",
            gender: "Any",
            expiredDate: "2024-12-31",
            requiredSkills: "Java, React",
            address: "123 Main St",
            zipCode: "12345"
        });
        setIsModalOpen(true);
    };

    const openAddModal = () => {
        setEditingItem(null);
        setFormData({
            jobTitle: "",
            jobDescription: "",
            jobCategory: "Select",
            jobType: "Select",
            jobLevel: "Select",
            experience: "Select",
            qualification: "Select",
            gender: "Select",
            minSalary: "Select",
            maxSalary: "Select",
            expiredDate: "",
            requiredSkills: "",
            address: "",
            country: "Select",
            state: "Select",
            city: "Select",
            zipCode: ""
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
        setActiveTab("Basic Information");
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans text-gray-800">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Jobs</h1>
                    <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                        <Briefcase size={14} className="text-gray-400" />
                        <span className="hover:text-primary cursor-pointer">Administration</span> / <span className="text-gray-400">Jobs</span>
                    </div>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0 items-center">
                    <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                        <button className="px-3 py-2 bg-[#FF6B00] text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
                        </button>
                        <button className="px-3 py-2 bg-white text-gray-500 hover:bg-gray-50">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
                        </button>
                    </div>
                    <ExportButton />
                    <button
                        onClick={openAddModal}
                        className="bg-[#FF6B00] hover:bg-[#e66000] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm font-medium"
                    >
                        <Plus size={18} />
                        Post Job
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
                    <h2 className="text-lg font-bold text-gray-800">Job List</h2>
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
                                    {["Role", "Developer", "Designer", "Manager"].map((option) => (
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
                                    {["Select Status", "Active", "Inactive", "Closed"].map((option) => (
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
                                <th className="p-4">Job ID</th>
                                <th className="p-4">Job Title</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Location</th>
                                <th className="p-4">Salary Range</th>
                                <th className="p-4">Posted Date</th>
                                <th className="p-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {jobs.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors text-sm">
                                    <td className="p-4"><input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" /></td>
                                    <td className="p-4 font-medium text-gray-500">{item.id}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl">{item.icon}</span>
                                            <div>
                                                <div className="font-bold text-gray-800">{item.title}</div>
                                                <div className="text-xs text-[#FF6B00] font-medium">{item.applicants} Applicants</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-500 font-medium">{item.category}</td>
                                    <td className="p-4 text-gray-500 font-medium">{item.location}</td>
                                    <td className="p-4 text-[#FF6B00] font-bold">{item.salaryRange}</td>
                                    <td className="p-4 text-gray-500 font-medium">{item.postedDate}</td>
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
                    <div>Showing 1 - 7 of 7 entries</div>
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
                            <h2 className="text-xl font-bold text-[#1F2937]">{editingItem ? 'Edit Job' : 'Post Job'}</h2>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 hover:bg-gray-100 rounded-full">
                                <X size={22} />
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-gray-100 px-6 pt-4">
                            <button
                                type="button"
                                onClick={() => setActiveTab("Basic Information")}
                                className={`px-4 py-2.5 text-sm font-bold transition-all relative ${activeTab === "Basic Information" ? 'text-[#FF6B00] border-b-2 border-[#FF6B00]' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Basic Information
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab("Location")}
                                className={`px-4 py-2.5 text-sm font-bold transition-all relative ${activeTab === "Location" ? 'text-[#FF6B00] border-b-2 border-[#FF6B00]' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Location
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6">
                            {activeTab === "Basic Information" && (
                                <div className="space-y-4">
                                    {/* Upload Profile */}
                                    <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                            <Upload size={20} className="text-gray-400" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-700">Upload Profile Image</p>
                                            <p className="text-xs text-gray-400">Image should be below 4 mb</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <button type="button" className="px-3 py-1 bg-[#FF6B00] text-white rounded text-xs font-medium">Upload</button>
                                                <button type="button" className="text-xs text-gray-500">Cancel</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-sm font-bold text-gray-700">Job Title <span className="text-red-500">*</span></label>
                                        <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm" />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-sm font-bold text-gray-700">Job Description <span className="text-red-500">*</span></label>
                                        <textarea name="jobDescription" value={formData.jobDescription} onChange={handleInputChange} rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm resize-none"></textarea>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-bold text-gray-700">Job Category <span className="text-red-500">*</span></label>
                                            <select name="jobCategory" value={formData.jobCategory} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white text-sm">
                                                <option value="Select">Select</option>
                                                <option value="Software">Software</option>
                                                <option value="Hardware">Hardware</option>
                                            </select>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-bold text-gray-700">Job Type <span className="text-red-500">*</span></label>
                                            <select name="jobType" value={formData.jobType} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white text-sm">
                                                <option value="Select">Select</option>
                                                <option value="Full Time">Full Time</option>
                                                <option value="Part Time">Part Time</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-bold text-gray-700">Job Level <span className="text-red-500">*</span></label>
                                            <select name="jobLevel" value={formData.jobLevel} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white text-sm">
                                                <option value="Select">Select</option>
                                                <option value="Junior">Junior</option>
                                                <option value="Mid">Mid</option>
                                                <option value="Senior">Senior</option>
                                            </select>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-bold text-gray-700">Experience <span className="text-red-500">*</span></label>
                                            <select name="experience" value={formData.experience} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white text-sm">
                                                <option value="Select">Select</option>
                                                <option value="0-1 Years">0-1 Years</option>
                                                <option value="1-3 Years">1-3 Years</option>
                                                <option value="3-5 Years">3-5 Years</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-bold text-gray-700">Qualification <span className="text-red-500">*</span></label>
                                            <select name="qualification" value={formData.qualification} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white text-sm">
                                                <option value="Select">Select</option>
                                                <option value="Bachelors">Bachelors</option>
                                                <option value="Masters">Masters</option>
                                            </select>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-bold text-gray-700">Gender <span className="text-red-500">*</span></label>
                                            <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white text-sm">
                                                <option value="Select">Select</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Any">Any</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-bold text-gray-700">Min. Salary <span className="text-red-500">*</span></label>
                                            <select name="minSalary" value={formData.minSalary} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white text-sm">
                                                <option value="Select">Select</option>
                                                <option value="10000">10,000</option>
                                                <option value="20000">20,000</option>
                                                <option value="30000">30,000</option>
                                            </select>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-bold text-gray-700">Max. Salary <span className="text-red-500">*</span></label>
                                            <select name="maxSalary" value={formData.maxSalary} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white text-sm">
                                                <option value="Select">Select</option>
                                                <option value="25000">25,000</option>
                                                <option value="35000">35,000</option>
                                                <option value="50000">50,000</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-bold text-gray-700">Job Expired Date <span className="text-red-500">*</span></label>
                                            <input type="date" name="expiredDate" value={formData.expiredDate} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-bold text-gray-700">Required Skills</label>
                                            <input type="text" name="requiredSkills" value={formData.requiredSkills} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "Location" && (
                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-bold text-gray-700">Address <span className="text-red-500">*</span></label>
                                        <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-bold text-gray-700">Country <span className="text-red-500">*</span></label>
                                            <select name="country" value={formData.country} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white text-sm">
                                                <option value="Select">Select</option>
                                                <option value="USA">USA</option>
                                                <option value="UK">UK</option>
                                                <option value="India">India</option>
                                            </select>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-bold text-gray-700">State <span className="text-red-500">*</span></label>
                                            <select name="state" value={formData.state} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white text-sm">
                                                <option value="Select">Select</option>
                                                <option value="California">California</option>
                                                <option value="New York">New York</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-bold text-gray-700">City <span className="text-red-500">*</span></label>
                                            <select name="city" value={formData.city} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white text-sm">
                                                <option value="Select">Select</option>
                                                <option value="Los Angeles">Los Angeles</option>
                                                <option value="San Francisco">San Francisco</option>
                                            </select>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-bold text-gray-700">Zip Code <span className="text-red-500">*</span></label>
                                            <input type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm" />
                                        </div>
                                    </div>

                                    {/* Map Placeholder */}
                                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                                        <a href="#" className="text-[#FF6B00] text-xs font-medium px-3 py-2 block border-b border-gray-200 bg-gray-50">View larger map</a>
                                        <div className="h-48 bg-gray-100 flex items-center justify-center">
                                            <div className="text-center text-gray-400">
                                                <MapPin size={32} className="mx-auto mb-2" />
                                                <p className="text-sm">Map View</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Footer Buttons */}
                            <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-gray-100">
                                <button type="button" onClick={closeModal} className="px-6 py-2 bg-gray-50 text-gray-700 rounded-lg font-bold hover:bg-gray-100 transition-colors border border-gray-200 text-sm">Cancel</button>
                                {activeTab === "Basic Information" ? (
                                    <button type="button" onClick={() => setActiveTab("Location")} className="px-6 py-2 bg-[#FF6B00] hover:bg-[#e66000] text-white rounded-lg font-bold transition-colors shadow-sm text-sm">Save & Next</button>
                                ) : (
                                    <button type="submit" className="px-6 py-2 bg-[#FF6B00] hover:bg-[#e66000] text-white rounded-lg font-bold transition-colors shadow-sm text-sm">{editingItem ? 'Update' : 'Post'}</button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Jobs;
