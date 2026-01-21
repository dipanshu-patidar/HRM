import React, { useState } from "react";
import { Plus, Search, Edit, Trash2, X, ChevronDown } from "lucide-react";

const Holidays = () => {
    const [holidays, setHolidays] = useState([
        {
            id: 1,
            title: "New Year",
            date: "2024-01-01",
            description: "First day of the new year",
            status: "Active",
        },
        {
            id: 2,
            title: "Martin Luther King Jr. Day",
            date: "2024-01-15",
            description: "Celebrating the civil rights leader",
            status: "Active",
        },
        {
            id: 3,
            title: "President's Day",
            date: "2024-02-19",
            description: "Honoring past US Presidents",
            status: "Active",
        },
        {
            id: 4,
            title: "Good Friday",
            date: "2024-03-29",
            description: "Holiday before Easter",
            status: "Active",
        },
        {
            id: 5,
            title: "Labour Day",
            date: "2024-09-02",
            description: "Honors working people",
            status: "Inactive",
        },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newHoliday, setNewHoliday] = useState({
        title: "",
        date: "",
        description: "",
        status: "Active",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewHoliday({ ...newHoliday, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = holidays.length + 1;
        setHolidays([...holidays, { id, ...newHoliday }]);
        closeModal();
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setNewHoliday({
            title: "",
            date: "",
            description: "",
            status: "Active",
        });
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const options = { day: "2-digit", month: "short", year: "numeric" };
        return new Date(dateString).toLocaleDateString("en-GB", options);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans text-gray-800">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Holidays</h1>
                    <div className="text-sm text-gray-500 mt-1">
                        <span className="hover:text-primary cursor-pointer">Dashboard</span> / <span className="text-gray-400">Holidays</span>
                    </div>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="mt-4 md:mt-0 bg-[#FF6B00] hover:bg-[#e66000] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
                >
                    <Plus size={18} />
                    Add Holiday
                </button>
            </div>

            {/* Content Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Header Filters */}
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Row Per Page</span>
                        <select className="border border-gray-300 rounded-md text-sm cursor-pointer focus:outline-none focus:border-primary p-1">
                            <option>10</option>
                            <option>20</option>
                            <option>50</option>
                        </select>
                        <span className="text-sm text-gray-600">Entries</span>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search"
                            className="pl-3 pr-10 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary w-full sm:w-64"
                        />
                        <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-700 text-sm font-semibold border-b border-gray-200">
                                <th className="p-4 w-10">
                                    <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                                </th>
                                <th className="p-4">Title</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Description</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {holidays.map((holiday) => (
                                <tr key={holiday.id} className="hover:bg-gray-50 transition-colors text-sm text-gray-600">
                                    <td className="p-4">
                                        <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                                    </td>
                                    <td className="p-4 font-medium text-gray-800">{holiday.title}</td>
                                    <td className="p-4">{formatDate(holiday.date)}</td>
                                    <td className="p-4">{holiday.description}</td>
                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${holiday.status === "Active"
                                                    ? "bg-green-100 text-green-600 border border-green-200"
                                                    : "bg-red-100 text-red-600 border border-red-200"
                                                }`}
                                        >
                                            • {holiday.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                                                <Edit size={16} />
                                            </button>
                                            <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800">Add Holiday</h2>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-gray-700">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={newHoliday.title}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    required
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-gray-700">Date</label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        name="date"
                                        value={newHoliday.date}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-gray-700">Description</label>
                                <textarea
                                    name="description"
                                    value={newHoliday.description}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                                ></textarea>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-gray-700">Status</label>
                                <div className="relative">
                                    <select
                                        name="status"
                                        value={newHoliday.status}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none bg-white"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-[#FF6B00] hover:bg-[#e66000] text-white rounded-lg font-medium transition-colors shadow-sm"
                                >
                                    Add Holiday
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Holidays;
