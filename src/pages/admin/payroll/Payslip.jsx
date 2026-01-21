import React from "react";
import { Download, DollarSign } from "lucide-react";

const Payslip = () => {
    // Mock payslip data
    const payslipData = {
        payslipNo: "#PS4283",
        salaryMonth: "October 2024",
        company: {
            name: "SmartHR",
            address: "3099 Kennedy Court Framingham, MA 01702"
        },
        from: {
            name: "XYZ Technologies",
            address: "2077 Chicago Avenue Orosi, CA 93647",
            email: "xyztech@example.com",
            phone: "+1 987 654 3210"
        },
        to: {
            name: "Anthony Lewis",
            designation: "Web Designer",
            email: "anthony@example.com",
            phone: "+1 458 268 4738"
        },
        earnings: [
            { label: "Basic Salary", amount: "$3000" },
            { label: "House Rent Allowance (H.R.A.)", amount: "$1000" },
            { label: "Conveyance", amount: "$200" },
            { label: "Other Allowance", amount: "$100" },
            { label: "Total Earnings", amount: "$4300", isTotal: true }
        ],
        deductions: [
            { label: "Tax Deducted at Source (T.D.S.)", amount: "$200" },
            { label: "Provident Fund", amount: "$300" },
            { label: "ESI", amount: "$150" },
            { label: "Loan", amount: "$50" },
            { label: "Total Earnings", amount: "$700", isTotal: true }
        ],
        netSalary: "$3600",
        netSalaryInWords: "Three thousand six hundred only"
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans text-gray-800">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Payslip</h1>
                    <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                        <DollarSign size={14} className="text-gray-400" />
                        <span className="hover:text-primary cursor-pointer">HR</span> / <span className="text-gray-400">Payslip</span>
                    </div>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0 items-center">
                    <button className="bg-[#405D71] hover:bg-[#354d5e] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm font-medium">
                        <Download size={18} />
                        Download
                    </button>
                    <button className="bg-white border border-gray-300 text-gray-400 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
                    </button>
                </div>
            </div>

            {/* Payslip Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Header with Company Info */}
                <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">S</div>
                        <div>
                            <h2 className="text-xl font-bold text-[#FF6B00]">Smart<span className="text-gray-800">HR</span></h2>
                            <p className="text-sm text-gray-500">{payslipData.company.address}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-500">Payslip No : <span className="text-[#FF6B00] font-bold">{payslipData.payslipNo}</span></p>
                        <p className="text-sm text-gray-500">Salary Month : <span className="text-gray-700 font-medium">{payslipData.salaryMonth}</span></p>
                    </div>
                </div>

                {/* From / To Section */}
                <div className="p-6 border-b border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <p className="text-sm text-gray-400 mb-2">From</p>
                        <h3 className="font-bold text-gray-800 text-lg">{payslipData.from.name}</h3>
                        <p className="text-sm text-gray-500">{payslipData.from.address}</p>
                        <p className="text-sm text-gray-500">Email : <span className="text-blue-500">{payslipData.from.email}</span></p>
                        <p className="text-sm text-gray-500">Phone : {payslipData.from.phone}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400 mb-2">To</p>
                        <h3 className="font-bold text-gray-800 text-lg">{payslipData.to.name}</h3>
                        <p className="text-sm text-gray-500">{payslipData.to.designation}</p>
                        <p className="text-sm text-gray-500">Email : <span className="text-blue-500">{payslipData.to.email}</span></p>
                        <p className="text-sm text-gray-500">Phone : {payslipData.to.phone}</p>
                    </div>
                </div>

                {/* Payslip Month Title */}
                <div className="p-6 border-b border-gray-100 text-center">
                    <h3 className="font-bold text-gray-800">Payslip for the moth of {payslipData.salaryMonth}</h3>
                </div>

                {/* Earnings & Deductions Tables */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Earnings Table */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                            <h4 className="font-bold text-gray-700">Earnings</h4>
                        </div>
                        <table className="w-full">
                            <tbody>
                                {payslipData.earnings.map((item, index) => (
                                    <tr key={index} className={`border-b border-gray-100 last:border-0 ${item.isTotal ? 'bg-gray-50' : ''}`}>
                                        <td className={`px-4 py-3 text-sm ${item.isTotal ? 'font-bold text-[#FF6B00]' : 'text-[#FF6B00]'}`}>{item.label}</td>
                                        <td className={`px-4 py-3 text-sm text-right ${item.isTotal ? 'font-bold text-gray-800' : 'text-gray-700'}`}>{item.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Deductions Table */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                            <h4 className="font-bold text-gray-700">Deductions</h4>
                        </div>
                        <table className="w-full">
                            <tbody>
                                {payslipData.deductions.map((item, index) => (
                                    <tr key={index} className={`border-b border-gray-100 last:border-0 ${item.isTotal ? 'bg-gray-50' : ''}`}>
                                        <td className={`px-4 py-3 text-sm ${item.isTotal ? 'font-bold text-[#FF6B00]' : 'text-[#FF6B00]'}`}>{item.label}</td>
                                        <td className={`px-4 py-3 text-sm text-right ${item.isTotal ? 'font-bold text-gray-800' : 'text-gray-700'}`}>{item.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Net Salary */}
                <div className="p-6 border-t border-gray-100">
                    <p className="text-sm text-gray-500">
                        Net Salary : <span className="font-bold text-gray-800">{payslipData.netSalary}</span>
                        <span className="text-gray-500">({payslipData.netSalaryInWords})</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Payslip;
