import React, { useState } from "react";
import { Download, DollarSign, Eye, Search } from "lucide-react";
import ExportButton from "../../components/common/ExportButton";

const Payslip = () => {
    // Mock Data
    const payslips = [
        {
            id: "#PS4283",
            month: "October 2024",
            basic: "$3000",
            allowance: "$1300",
            deduction: "$700",
            netSalary: "$3600",
            status: "Paid"
        },
        {
            id: "#PS4282",
            month: "September 2024",
            basic: "$3000",
            allowance: "$1300",
            deduction: "$700",
            netSalary: "$3600",
            status: "Paid"
        },
        {
            id: "#PS4281",
            month: "August 2024",
            basic: "$3000",
            allowance: "$1200",
            deduction: "$600",
            netSalary: "$3600",
            status: "Paid"
        }
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans text-gray-800">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">My Payslips</h1>
                    <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                        <DollarSign size={14} className="text-gray-400" />
                        <span className="hover:text-primary cursor-pointer">Dashboard</span> / <span className="text-gray-400">Payslips</span>
                    </div>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0 items-center">
                    <ExportButton />
                </div>
            </div>

            {/* List Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Filters Row */}
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-lg font-bold text-gray-800">Payslip History</h2>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
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
                                <th className="p-4">Payslip ID</th>
                                <th className="p-4">Salary Month</th>
                                <th className="p-4">Basic Salary</th>
                                <th className="p-4">Allowances</th>
                                <th className="p-4">Deductions</th>
                                <th className="p-4">Net Salary</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {payslips.map((slip) => (
                                <tr key={slip.id} className="hover:bg-gray-50 transition-colors text-sm text-gray-600">
                                    <td className="p-4 font-medium text-gray-800 hover:text-primary cursor-pointer">{slip.id}</td>
                                    <td className="p-4">{slip.month}</td>
                                    <td className="p-4">{slip.basic}</td>
                                    <td className="p-4">{slip.allowance}</td>
                                    <td className="p-4">{slip.deduction}</td>
                                    <td className="p-4 font-bold text-green-600">{slip.netSalary}</td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 bg-green-100 text-green-600 rounded text-xs font-bold border border-green-200">
                                            {slip.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <button className="text-gray-500 hover:text-primary p-2 rounded-full hover:bg-gray-100 transition-colors" title="Download PDF">
                                            <Download size={18} />
                                        </button>
                                        <button className="text-gray-500 hover:text-blue-500 p-2 rounded-full hover:bg-gray-100 transition-colors" title="View">
                                            <Eye size={18} />
                                        </button>
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

export default Payslip;
