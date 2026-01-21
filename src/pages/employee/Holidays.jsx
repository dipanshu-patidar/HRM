import React, { useState } from "react";
import { Search, MapPin } from "lucide-react";

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

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const options = { day: "2-digit", month: "short", year: "numeric", weekday: 'long' };
        return new Date(dateString).toLocaleDateString("en-GB", options);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans text-gray-800">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">My Holidays</h1>
                    <div className="text-sm text-gray-500 mt-1">
                        <span className="hover:text-primary cursor-pointer">Dashboard</span> / <span className="text-gray-400">Holidays</span>
                    </div>
                </div>
            </div>

            {/* Optional: Calendar View or Cards? Sticking to Table for consistency but could be Cards */}
            {/* Content Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Header Filters */}
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-lg font-bold text-gray-800">Holiday List 2024</h2>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search Holiday"
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
                                <th className="p-4">Title</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Day</th>
                                <th className="p-4">Description</th>
                                <th className="p-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {holidays.map((holiday) => (
                                <tr key={holiday.id} className="hover:bg-gray-50 transition-colors text-sm text-gray-600">
                                    <td className="p-4 font-medium text-gray-800">{holiday.title}</td>
                                    <td className="p-4">{formatDate(holiday.date).split(',')[1]}</td>
                                    <td className="p-4">{formatDate(holiday.date).split(',')[0]}</td>
                                    <td className="p-4">{holiday.description}</td>
                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${holiday.status === "Active"
                                                ? "bg-green-100 text-green-600 border border-green-200"
                                                : "bg-red-100 text-red-600 border border-red-200"
                                                }`}
                                        >
                                            {holiday.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Holidays;
