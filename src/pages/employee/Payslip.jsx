import React, { useState } from "react";
import { Download, DollarSign, Eye, Search, X, Printer, Share2 } from "lucide-react";
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
            status: "Paid",
            details: {
                employeeId: "EMP-001",
                joiningDate: "01 Jan 2023",
                department: "Engineering",
                designation: "Software Engineer",
                paymentMethod: "Bank Transfer",
                bankName: "HDFC Bank",
                accountNumber: "**** **** **** 1234"
            }
        },
        {
            id: "#PS4282",
            month: "September 2024",
            basic: "$3000",
            allowance: "$1300",
            deduction: "$700",
            netSalary: "$3600",
            status: "Paid",
            details: {
                employeeId: "EMP-001",
                joiningDate: "01 Jan 2023",
                department: "Engineering",
                designation: "Software Engineer",
                paymentMethod: "Bank Transfer",
                bankName: "HDFC Bank",
                accountNumber: "**** **** **** 1234"
            }
        },
        {
            id: "#PS4281",
            month: "August 2024",
            basic: "$3000",
            allowance: "$1200",
            deduction: "$600",
            netSalary: "$3600",
            status: "Paid",
            details: {
                employeeId: "EMP-001",
                joiningDate: "01 Jan 2023",
                department: "Engineering",
                designation: "Software Engineer",
                paymentMethod: "Bank Transfer",
                bankName: "HDFC Bank",
                accountNumber: "**** **** **** 1234"
            }
        }
    ];

    const [selectedPayslip, setSelectedPayslip] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleView = (slip) => {
        setSelectedPayslip(slip);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedPayslip(null);
    };

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
                                    <td className="p-4 font-medium text-gray-800 hover:text-primary cursor-pointer" onClick={() => handleView(slip)}>{slip.id}</td>
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
                                        <button
                                            onClick={() => handleView(slip)}
                                            className="text-gray-500 hover:text-blue-500 p-2 rounded-full hover:bg-gray-100 transition-colors"
                                            title="View"
                                        >
                                            <Eye size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* View Modal */}
            {showModal && selectedPayslip && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">Payslip Details</h2>
                                <p className="text-sm text-gray-500">{selectedPayslip.month}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 text-gray-500 hover:text-primary hover:bg-white rounded-lg transition-colors" title="Print">
                                    <Printer size={18} />
                                </button>
                                <button className="p-2 text-gray-500 hover:text-primary hover:bg-white rounded-lg transition-colors" title="Download">
                                    <Download size={18} />
                                </button>
                                <button onClick={closeModal} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg transition-colors">
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 overflow-y-auto custom-scrollbar">
                            {/* Company Header */}
                            <div className="text-center mb-8 border-b border-gray-100 pb-6">
                                <h3 className="text-2xl font-bold text-gray-800 uppercase tracking-wide">Kiaan Technology</h3>
                                <p className="text-gray-500 text-sm">123 Business Park, Tech City, NY 10001</p>
                                <p className="text-gray-800 font-bold mt-2">Payslip for the month of {selectedPayslip.month}</p>
                            </div>

                            {/* Employee Details Grid */}
                            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8 text-sm">
                                <div>
                                    <p className="text-gray-500 mb-1">Employee Name</p>
                                    <p className="font-bold text-gray-800 text-lg">My Name</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-gray-500 mb-1">Payslip ID</p>
                                    <p className="font-bold text-gray-800">{selectedPayslip.id}</p>
                                </div>

                                <div><p className="text-gray-500">Employee ID</p><p className="font-medium text-gray-700">{selectedPayslip.details?.employeeId || "EMP-001"}</p></div>
                                <div className="text-right"><p className="text-gray-500">Designation</p><p className="font-medium text-gray-700">{selectedPayslip.details?.designation || "Software Engineer"}</p></div>

                                <div><p className="text-gray-500">Department</p><p className="font-medium text-gray-700">{selectedPayslip.details?.department || "Engineering"}</p></div>
                                <div className="text-right"><p className="text-gray-500">Payment Method</p><p className="font-medium text-gray-700">{selectedPayslip.details?.paymentMethod || "Bank Transfer"}</p></div>
                            </div>

                            {/* Salary Table */}
                            <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-200">
                                            <th className="px-4 py-3 text-left font-semibold text-gray-700 w-1/2">Earnings</th>
                                            <th className="px-4 py-3 text-right font-semibold text-gray-700 w-1/2">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        <tr>
                                            <td className="px-4 py-3 text-gray-600">Basic Salary</td>
                                            <td className="px-4 py-3 text-right font-medium text-gray-800">{selectedPayslip.basic}</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 text-gray-600">House Rent Allowance</td>
                                            <td className="px-4 py-3 text-right font-medium text-gray-800">$800</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 text-gray-600">Conveyance</td>
                                            <td className="px-4 py-3 text-right font-medium text-gray-800">$200</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 text-gray-600">Other Allowances</td>
                                            <td className="px-4 py-3 text-right font-medium text-gray-800">$300</td>
                                        </tr>
                                        <tr className="bg-green-50/50 font-semibold">
                                            <td className="px-4 py-3 text-green-700">Total Earnings</td>
                                            <td className="px-4 py-3 text-right text-green-700">$4300</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className="w-full text-sm border-t border-gray-200">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-200">
                                            <th className="px-4 py-3 text-left font-semibold text-gray-700 w-1/2">Deductions</th>
                                            <th className="px-4 py-3 text-right font-semibold text-gray-700 w-1/2">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        <tr>
                                            <td className="px-4 py-3 text-gray-600">Provident Fund</td>
                                            <td className="px-4 py-3 text-right font-medium text-gray-800">$400</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 text-gray-600">Tax Deducted at Source (TDS)</td>
                                            <td className="px-4 py-3 text-right font-medium text-gray-800">$300</td>
                                        </tr>
                                        <tr className="bg-red-50/50 font-semibold">
                                            <td className="px-4 py-3 text-red-700">Total Deductions</td>
                                            <td className="px-4 py-3 text-right text-red-700">{selectedPayslip.deduction}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Net Salary Highlight */}
                            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 rounded-xl flex justify-between items-center shadow-md">
                                <div>
                                    <p className="text-gray-300 text-xs uppercase tracking-wider font-semibold">Net Salary Payable</p>
                                    <p className="text-xs text-gray-400 mt-1">Paid via {selectedPayslip.details?.bankName}</p>
                                </div>
                                <div className="text-2xl font-bold">{selectedPayslip.netSalary}</div>
                            </div>

                            <p className="text-center text-xs text-gray-400 mt-6">This is a computer-generated document and does not require a signature.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Payslip;
