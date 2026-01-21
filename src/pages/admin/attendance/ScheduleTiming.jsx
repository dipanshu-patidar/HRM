import React, { useState } from "react";
import { Plus, Search, ChevronDown, Check, X, Download, Clock } from "lucide-react";
import ExportButton from "../../../components/common/ExportButton";

const ScheduleTiming = () => {
    // Mock Data
    const [schedules, setSchedules] = useState([
        {
            id: 1,
            name: "Anthony Lewis",
            avatar: "https://ui-avatars.com/api/?name=Anthony+Lewis&background=random",
            jobTitle: "Accountant",
            timings: [
                "11-03-2020 - 11:00 AM-12:00 PM",
                "12-03-2020 - 10:00 AM-11:00 AM",
                "01-01-1970 - 10:00 AM-11:00 AM"
            ]
        },
        {
            id: 2,
            name: "Brian Villalobos",
            avatar: "https://ui-avatars.com/api/?name=Brian+Villalobos&background=random",
            jobTitle: "Accountant",
            timings: [
                "11-03-2020 - 11:00 AM-12:00 PM",
                "12-03-2020 - 10:00 AM-11:00 AM",
                "01-01-1970 - 10:00 AM-11:00 AM"
            ]
        },
        {
            id: 3,
            name: "Harvey Smith",
            avatar: "https://ui-avatars.com/api/?name=Harvey+Smith&background=random",
            jobTitle: "Accountant",
            timings: [
                "11-03-2020 - 11:00 AM-12:00 PM",
                "12-03-2020 - 10:00 AM-11:00 AM",
                "01-01-1970 - 10:00 AM-11:00 AM"
            ]
        }
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [isDateRangeOpen, setIsDateRangeOpen] = useState(false);
    const [isSortByOpen, setIsSortByOpen] = useState(false);

    const [selectedDateRange, setSelectedDateRange] = useState("01/15/2026 - 01/21/2026");
    const [selectedSortBy, setSelectedSortBy] = useState("Last 7 Days");

    const dateRangeOptions = [
        "Today", "Yesterday", "Last 7 Days", "Last 30 Days", "This Year", "Next Year", "Custom Range"
    ];

    const sortByOptions = [
        "Recently Added", "Ascending", "Desending", "Last Month", "Last 7 Days"
    ];

    const [formData, setFormData] = useState({
        department: "Select",
        employeeName: "Select",
        date: "",
        shift: "Select",
        minStartTime: "",
        startTime: "",
        maxStartTime: "",
        minEndTime: "",
        endTime: "",
        maxEndTime: "",
        breakTime: "",
        acceptExtraHours: false,
        publish: false
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingItem) {
            setSchedules(schedules.map(s => s.id === editingItem.id ? {
                ...s,
                name: formData.employeeName !== "Select" ? formData.employeeName : s.name,
                // Update other fields as needed based on form data which seems to be comprehensive
            } : s));
        }
        closeModal();
    };

    const openEditModal = (item) => {
        setEditingItem(item);
        // Pre-fill form data roughly mapping schedule item to form structure
        // Since schedule item structure is different from form data, we do best effort or mock
        setFormData({
            ...formData,
            employeeName: item.name,
            department: "Select", // Assuming not available in item
            date: "",
            shift: "Select",
            startTime: item.timings[0]?.split('-')[1]?.trim().split(' ')[0] || "", // Extracting pseudo time
        });
        setIsModalOpen(true);
    };

    const openAddModal = () => {
        setEditingItem(null);
        // Reset form
        setFormData({
            department: "Select",
            employeeName: "Select",
            date: "",
            shift: "Select",
            minStartTime: "",
            startTime: "",
            maxStartTime: "",
            minEndTime: "",
            endTime: "",
            maxEndTime: "",
            breakTime: "",
            acceptExtraHours: false,
            publish: false
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
        // Reset form if needed
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans text-gray-800">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Schedule Timing</h1>
                    <div className="text-sm text-gray-500 mt-1">
                        <span className="hover:text-primary cursor-pointer">Administration</span> / <span className="text-gray-400">Schedule Timing</span>
                    </div>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                    <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm ml-2 font-medium">
                        <Download size={18} />
                        Export
                        <ChevronDown size={14} />
                    </button>
                </div>
            </div>

            {/* List Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                {/* Filters Row */}
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-lg font-bold text-gray-800">Schedule Timing List</h2>
                    <div className="flex flex-wrap gap-2">
                        {/* Date Range Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => { setIsDateRangeOpen(!isDateRangeOpen); setIsSortByOpen(false); }}
                                className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors bg-white font-medium"
                            >
                                {selectedDateRange}
                                <ChevronDown size={14} className={`transition-transform duration-200 ${isDateRangeOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isDateRangeOpen && (
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
                                    {dateRangeOptions.map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => { setSelectedDateRange(option); setIsDateRangeOpen(false); }}
                                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors font-medium border-b border-gray-50 last:border-0 ${selectedDateRange === option ? 'bg-[#FF6B00] text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Sort By Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => { setIsSortByOpen(!isSortByOpen); setIsDateRangeOpen(false); }}
                                className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm transition-colors font-medium ${isSortByOpen ? 'bg-[#FF6B00] border-[#FF6B00] text-white' : 'border-gray-300 text-gray-600 hover:bg-gray-50 bg-white'}`}
                            >
                                Sort By : {selectedSortBy}
                                <ChevronDown size={14} className={`transition-transform duration-200 ${isSortByOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isSortByOpen && (
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
                                    {sortByOptions.map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => { setSelectedSortBy(option); setIsSortByOpen(false); }}
                                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors font-medium border-b border-gray-50 last:border-0 ${selectedSortBy === option ? 'bg-[#FF6B00] text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button className="bg-[#FF6B00] hover:bg-[#e66000] text-white p-2 rounded-lg shadow-sm transition-colors">
                            <Plus size={18} />
                        </button>
                    </div>
                </div>

                {/* Search Row */}
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
                                <th className="p-4 w-10">
                                    <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                                </th>
                                <th className="p-4">Name</th>
                                <th className="p-4">Job Title</th>
                                <th className="p-4">User Available Timings</th>
                                <th className="p-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {schedules.map(item => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors text-sm text-gray-600">
                                    <td className="p-4">
                                        <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full border border-gray-200 object-cover" />
                                            <span className="font-bold text-gray-800 text-sm">{item.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">{item.jobTitle}</td>
                                    <td className="p-4 text-xs">
                                        {item.timings.map((time, idx) => (
                                            <div key={idx} className="mb-1 last:mb-0 text-gray-500">{time}</div>
                                        ))}
                                    </td>
                                    <td className="p-4 text-right">
                                        <button
                                            onClick={() => openEditModal(item)}
                                            className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-xs font-medium transition-colors"
                                        >
                                            Edit Schedule
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Info */}
                <div className="p-4 text-xs text-gray-500 border-t border-gray-100">
                    Showing 1 - 3 of 3 entries
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto custom-scrollbar">
                        <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
                            <h2 className="text-xl font-bold text-gray-800">{editingItem ? 'Edit Schedule' : 'Add Schedule'}</h2>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700">Department <span className="text-red-500">*</span></label>
                                    <select name="department" value={formData.department} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white">
                                        <option>Select</option>
                                        <option>IT</option>
                                        <option>HR</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700">Employee Name <span className="text-red-500">*</span></label>
                                    <select name="employeeName" value={formData.employeeName} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white">
                                        <option>Select</option>
                                        <option>Anthony Lewis</option>
                                        <option>Brian Villalobos</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700">Date</label>
                                    <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700">Shifts <span className="text-red-500">*</span></label>
                                    <select name="shift" value={formData.shift} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white">
                                        <option>Select</option>
                                        <option>Morning</option>
                                        <option>Evening</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700">Min Start Time <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <input type="text" name="minStartTime" value={formData.minStartTime} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                                        <Clock size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700">Start Time <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <input type="text" name="startTime" value={formData.startTime} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                                        <Clock size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700">Max Start Time <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <input type="text" name="maxStartTime" value={formData.maxStartTime} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                                        <Clock size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700">Min End Time <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <input type="text" name="minEndTime" value={formData.minEndTime} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                                        <Clock size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700">End Time <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <input type="text" name="endTime" value={formData.endTime} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                                        <Clock size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700">Max End Time <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <input type="text" name="maxEndTime" value={formData.maxEndTime} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                                        <Clock size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1.5 mb-6">
                                <label className="text-sm font-semibold text-gray-700">Break Time <span className="text-red-500">*</span></label>
                                <input type="text" name="breakTime" value={formData.breakTime} onChange={handleInputChange} className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="flex items-center justify-between md:justify-start md:gap-12">
                                    <label className="text-sm font-semibold text-gray-700">Accept Extra Hours</label>
                                    <div
                                        onClick={() => setFormData({ ...formData, acceptExtraHours: !formData.acceptExtraHours })}
                                        className={`w-11 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-colors ${formData.acceptExtraHours ? 'bg-[#FF6B00]' : 'bg-gray-300'}`}
                                    >
                                        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${formData.acceptExtraHours ? 'translate-x-5' : ''}`}></div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between md:justify-start md:gap-24">
                                    <label className="text-sm font-semibold text-gray-700">Publish</label>
                                    <div
                                        onClick={() => setFormData({ ...formData, publish: !formData.publish })}
                                        className={`w-11 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-colors ${formData.publish ? 'bg-[#FF6B00]' : 'bg-gray-300'}`}
                                    >
                                        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${formData.publish ? 'translate-x-5' : ''}`}></div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 mt-4">
                                <button type="submit" className="px-6 py-2.5 bg-[#FF6B00] hover:bg-[#e66000] text-white rounded-lg font-bold transition-colors shadow-sm text-sm">{editingItem ? 'Update Schedule' : 'Schedule'}</button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScheduleTiming;
