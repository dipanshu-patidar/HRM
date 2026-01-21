import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaCloudUploadAlt } from 'react-icons/fa';
import { ChevronDown, Download, FileText, Check, X, Calendar } from 'lucide-react';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

const Policies = () => {
    // Mock Data matching the user's images
    const [policies, setPolicies] = useState([
        { id: 1, name: 'Employee', department: 'Designing', description: 'Guidelines regarding employee absences from work', createdDate: '14 Jan 2024' },
        { id: 2, name: 'Permission Policy', department: 'Developer', description: 'Guidelines for accessing and using company resources', createdDate: '21 Jan 2024' },
        { id: 3, name: 'Privacy Policy', department: 'DevOps', description: 'Ensure compliance with data protection', createdDate: '18 Feb 2024' },
    ]);

    // Derived list of unique departments
    const uniqueDepartments = ['Designing', 'Developer', 'DevOps'];

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedPolicy, setSelectedPolicy] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Custom Dropdown States
    const [dateRange, setDateRange] = useState('01/15/2026 - 01/21/2026');
    const [departmentFilter, setDepartmentFilter] = useState('Department');
    const [sortBy, setSortBy] = useState('Sort By : Last 7 Days');

    const [showDateDropdown, setShowDateDropdown] = useState(false);
    const [showDepartmentDropdown, setShowDepartmentDropdown] = useState(false);
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [showExportMenu, setShowExportMenu] = useState(false);

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const [formData, setFormData] = useState({
        name: '',
        description: '', // Labelled as Appraisal Date in mock but holds description
        department: 'Designing',
        file: null
    });

    // Date Range Options
    const dateRangeOptions = [
        'Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'This Year', 'Next Year', 'Custom Range'
    ];

    // Sort Options
    const sortOptions = [
        'Recently Added', 'Ascending', 'Desending', 'Last Month', 'Last 7 Days'
    ];

    // Filter and sort policies
    const getFilteredPolicies = () => {
        let filtered = policies.filter(policy =>
            policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            policy.description.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (departmentFilter !== 'Department' && departmentFilter !== 'All Departments') {
            filtered = filtered.filter(policy => policy.department === departmentFilter);
        }

        // Sort logic (Basic implementation for demo)
        switch (sortBy) {
            case 'Recently Added':
                // Assuming newer IDs are more recent
                filtered = [...filtered].sort((a, b) => b.id - a.id);
                break;
            case 'Ascending':
                filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'Desending': // Matching typo in image "Desending"
                filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                break;
        }

        return filtered;
    };

    const filteredPolicies = getFilteredPolicies();
    const totalPages = Math.ceil(filteredPolicies.length / rowsPerPage);
    const paginatedPolicies = filteredPolicies.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    // Handle Add Policy
    const handleAddPolicy = () => {
        if (formData.name.trim() && formData.description.trim()) {
            const newPolicy = {
                id: policies.length + 1,
                name: formData.name,
                department: formData.department,
                description: formData.description,
                createdDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
            };
            setPolicies([...policies, newPolicy]);
            setFormData({ name: '', description: '', department: 'Designing', file: null });
            setShowAddModal(false);
        }
    };

    // Handle Edit Policy
    const handleEditPolicy = () => {
        if (formData.name.trim() && formData.description.trim() && selectedPolicy) {
            setPolicies(policies.map(policy =>
                policy.id === selectedPolicy.id
                    ? { ...policy, name: formData.name, department: formData.department, description: formData.description }
                    : policy
            ));
            setFormData({ name: '', description: '', department: 'Designing', file: null });
            setSelectedPolicy(null);
            setShowEditModal(false);
        }
    };

    // Handle Delete Policy
    const handleDeletePolicy = () => {
        if (selectedPolicy) {
            setPolicies(policies.filter(policy => policy.id !== selectedPolicy.id));
            setSelectedPolicy(null);
            setShowDeleteModal(false);
        }
    };

    // Open Edit Modal
    const openEditModal = (policy) => {
        setSelectedPolicy(policy);
        setFormData({ name: policy.name, department: policy.department, description: policy.description, file: null });
        setShowEditModal(true);
    };

    // Open Delete Modal
    const openDeleteModal = (policy) => {
        setSelectedPolicy(policy);
        setShowDeleteModal(true);
    };

    // Export to PDF
    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text("Policies List", 14, 15);
        doc.autoTable({
            startY: 20,
            head: [["Name", "Department", "Description", "Created Date"]],
            body: filteredPolicies.map(policy => [
                policy.name,
                policy.department,
                policy.description,
                policy.createdDate
            ]),
        });
        doc.save("policies.pdf");
        setShowExportMenu(false);
    };

    // Export to Excel
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredPolicies.map(policy => ({
            "Name": policy.name,
            "Department": policy.department,
            "Description": policy.description,
            "Created Date": policy.createdDate
        })));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Policies");
        XLSX.writeFile(workbook, "policies.xlsx");
        setShowExportMenu(false);
    };

    return (
        <div
            className="p-6 bg-gray-50 min-h-screen font-sans"
            onClick={() => {
                if (showExportMenu) setShowExportMenu(false);
                if (showDateDropdown) setShowDateDropdown(false);
                if (showDepartmentDropdown) setShowDepartmentDropdown(false);
                if (showSortDropdown) setShowSortDropdown(false);
            }}
        >
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Policies</h1>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <span>HR</span>
                        <span className="text-gray-300">/</span>
                        <span className="text-orange-500">Policies</span>
                    </div>
                </div>
                <div className="flex items-center gap-3 mt-4 md:mt-0">
                    <div className="relative" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                            onClick={() => setShowExportMenu(!showExportMenu)}
                        >
                            <Download size={18} />
                            <span>Export</span>
                            <ChevronDown size={16} />
                        </button>
                        {showExportMenu && (
                            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1 font-medium animate-in fade-in zoom-in-95 duration-200">
                                <button
                                    onClick={exportToPDF}
                                    className="flex items-center gap-2 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50"
                                >
                                    <FileText size={16} /> Export as PDF
                                </button>
                                <button
                                    onClick={exportToExcel}
                                    className="flex items-center gap-2 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50"
                                >
                                    <FileText size={16} /> Export as Excel
                                </button>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => setShowAddModal(true)}
                        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center gap-2 shadow-sm transition-colors"
                    >
                        <FaPlus size={14} />
                        Add Policy
                    </button>
                </div>
            </div>

            {/* Main Content Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">

                {/* Filters Section */}
                <div className="p-4 border-b border-gray-200 flex flex-col lg:flex-row justify-end items-center gap-3">

                    {/* Date Range Dropdown */}
                    <div className="relative w-full lg:w-auto" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => {
                                setShowDateDropdown(!showDateDropdown);
                                setShowDepartmentDropdown(false);
                                setShowSortDropdown(false);
                            }}
                            className={`flex items-center justify-between w-full lg:w-64 px-4 py-2 bg-white border ${showDateDropdown ? 'border-orange-500 ring-1 ring-orange-500' : 'border-gray-200'} rounded-lg text-gray-700 text-sm hover:bg-gray-50 transition-all`}
                        >
                            <span>{dateRange}</span>
                            <ChevronDown size={16} className={`transition-transform duration-200 ${showDateDropdown ? 'rotate-180' : ''}`} />
                        </button>
                        {showDateDropdown && (
                            <div className="absolute top-full right-0 mt-1 w-full lg:w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1 animate-in fade-in zoom-in-95 duration-200 max-h-60 overflow-y-auto custom-scrollbar">
                                {dateRangeOptions.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => {
                                            setDateRange(option === 'Custom Range' ? '01/15/2026 - 01/21/2026' : option); // Mock behavior
                                            setShowDateDropdown(false);
                                        }}
                                        className={`flex items-center justify-between w-full px-4 py-2 text-sm text-left hover:bg-orange-50 hover:text-orange-600 ${dateRange === option ? 'text-orange-600 font-medium bg-orange-50' : 'text-gray-700'}`}
                                    >
                                        {option}
                                        {dateRange === option && <Check size={14} />}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Department Dropdown */}
                    <div className="relative w-full lg:w-auto" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => {
                                setShowDepartmentDropdown(!showDepartmentDropdown);
                                setShowDateDropdown(false);
                                setShowSortDropdown(false);
                            }}
                            className={`flex items-center justify-between w-full lg:w-48 px-4 py-2 bg-white border ${showDepartmentDropdown ? 'border-orange-500 ring-1 ring-orange-500' : 'border-gray-200'} rounded-lg text-gray-700 text-sm hover:bg-gray-50 transition-all`}
                        >
                            <span className="truncate">{departmentFilter}</span>
                            <ChevronDown size={16} className={`transition-transform duration-200 ml-2 ${showDepartmentDropdown ? 'rotate-180' : ''}`} />
                        </button>
                        {showDepartmentDropdown && (
                            <div className="absolute top-full right-0 mt-1 w-full lg:w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1 animate-in fade-in zoom-in-95 duration-200 max-h-60 overflow-y-auto custom-scrollbar">
                                <button
                                    onClick={() => {
                                        setDepartmentFilter('All Departments');
                                        setShowDepartmentDropdown(false);
                                    }}
                                    className={`flex items-center justify-between w-full px-4 py-2 text-sm text-left hover:bg-orange-50 hover:text-orange-600 ${departmentFilter === 'All Departments' ? 'text-orange-600 font-medium bg-orange-50' : 'text-gray-700'}`}
                                >
                                    All Departments
                                    {departmentFilter === 'All Departments' && <Check size={14} />}
                                </button>
                                {uniqueDepartments.map((dept) => (
                                    <button
                                        key={dept}
                                        onClick={() => {
                                            setDepartmentFilter(dept);
                                            setShowDepartmentDropdown(false);
                                        }}
                                        className={`flex items-center justify-between w-full px-4 py-2 text-sm text-left hover:bg-orange-50 hover:text-orange-600 ${departmentFilter === dept ? 'text-orange-600 font-medium bg-orange-50' : 'text-gray-700'}`}
                                    >
                                        {dept}
                                        {departmentFilter === dept && <Check size={14} />}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sort By Dropdown */}
                    <div className="relative w-full lg:w-auto" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => {
                                setShowSortDropdown(!showSortDropdown);
                                setShowDateDropdown(false);
                                setShowDepartmentDropdown(false);
                            }}
                            className={`flex items-center justify-between w-full lg:w-56 px-4 py-2 bg-white border ${showSortDropdown ? 'border-orange-500 ring-1 ring-orange-500' : 'border-gray-200'} rounded-lg text-gray-700 text-sm hover:bg-gray-50 transition-all`}
                        >
                            <span>{sortBy}</span>
                            <ChevronDown size={16} className={`transition-transform duration-200 ${showSortDropdown ? 'rotate-180' : ''}`} />
                        </button>
                        {showSortDropdown && (
                            <div className="absolute top-full right-0 mt-1 w-full lg:w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1 animate-in fade-in zoom-in-95 duration-200">
                                {sortOptions.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => {
                                            setSortBy(option);
                                            setShowSortDropdown(false);
                                        }}
                                        className={`flex items-center justify-between w-full px-4 py-2 text-sm text-left hover:bg-orange-50 hover:text-orange-600 ${sortBy === option ? 'text-orange-600 font-medium bg-orange-50' : 'text-gray-700'}`}
                                    >
                                        {option}
                                        {sortBy === option && <Check size={14} />}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Search and Row Per Page */}
                <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/50">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <span>Row Per Page</span>
                        <select
                            value={rowsPerPage}
                            onChange={(e) => {
                                setRowsPerPage(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                            className="px-2 py-1 border border-gray-300 rounded bg-white focus:outline-none focus:border-orange-500"
                        >
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                        </select>
                        <span>Entries</span>
                    </div>
                    <div className="relative w-full sm:w-64">
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-sm"
                        />
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-100 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    <input type="checkbox" className="rounded text-orange-500 focus:ring-orange-500" />
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Department</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Created Date</th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {paginatedPolicies.map((policy) => (
                                <tr key={policy.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <input type="checkbox" className="rounded text-orange-500 focus:ring-orange-500" />
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{policy.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{policy.department}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600 max-w-md truncate" title={policy.description}>{policy.description}</td>
                                    <td className="px-6 py-4 text-center text-sm text-gray-600">{policy.createdDate}</td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center gap-3">
                                            <button
                                                onClick={() => openEditModal(policy)}
                                                className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                                title="Edit"
                                            >
                                                <FaEdit size={16} />
                                            </button>
                                            <button
                                                onClick={() => openDeleteModal(policy)}
                                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                                title="Delete"
                                            >
                                                <FaTrash size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {paginatedPolicies.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                                        No policies found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="text-sm text-gray-600">
                        Showing <span className="font-medium">{filteredPolicies.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * rowsPerPage, filteredPolicies.length)}</span> of <span className="font-medium">{filteredPolicies.length}</span> entries
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm text-gray-600 transition-colors"
                        >
                            Previous
                        </button>
                        <div className="flex gap-1">
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`min-w-[32px] px-3 py-1 rounded-lg text-sm transition-colors ${currentPage === i + 1
                                        ? 'bg-orange-500 text-white'
                                        : 'border border-gray-300 hover:bg-gray-50 text-gray-600'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm text-gray-600 transition-colors"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Add Policy Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <h3 className="text-xl font-bold text-gray-800">Add Policy</h3>
                            <button
                                onClick={() => {
                                    setShowAddModal(false);
                                    setFormData({ name: '', description: '', department: 'Designing', file: null });
                                }}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Policy Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                                    placeholder="Enter policy name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all min-h-[100px]"
                                    placeholder="Enter policy description"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Department <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={formData.department}
                                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white"
                                >
                                    {uniqueDepartments.map(dept => (
                                        <option key={dept} value={dept}>{dept}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Upload Policy
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors bg-gray-50/50">
                                    <div className="w-12 h-12 bg-orange-100/50 rounded-full flex items-center justify-center mb-3">
                                        <FaCloudUploadAlt className="text-orange-500" size={24} />
                                    </div>
                                    <p className="text-sm text-gray-600 font-medium">Drag and drop your files</p>
                                    <button className="mt-3 px-6 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors">
                                        Upload
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                                <button
                                    onClick={() => {
                                        setShowAddModal(false);
                                        setFormData({ name: '', description: '', department: 'Designing', file: null });
                                    }}
                                    className="px-6 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddPolicy}
                                    className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium shadow-sm"
                                >
                                    Add Policy
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Policy Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <h3 className="text-xl font-bold text-gray-800">Edit Policy</h3>
                            <button
                                onClick={() => {
                                    setShowEditModal(false);
                                    setFormData({ name: '', description: '', department: 'Designing', file: null });
                                    setSelectedPolicy(null);
                                }}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Policy Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all min-h-[100px]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Department <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={formData.department}
                                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white"
                                >
                                    {uniqueDepartments.map(dept => (
                                        <option key={dept} value={dept}>{dept}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Upload Policy
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors bg-gray-50/50">
                                    <div className="w-12 h-12 bg-orange-100/50 rounded-full flex items-center justify-center mb-3">
                                        <FaCloudUploadAlt className="text-orange-500" size={24} />
                                    </div>
                                    <p className="text-sm text-gray-600 font-medium">Drag and drop your files</p>
                                    <button className="mt-3 px-6 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors">
                                        Upload
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                                <button
                                    onClick={() => {
                                        setShowEditModal(false);
                                        setFormData({ name: '', description: '', department: 'Designing', file: null });
                                        setSelectedPolicy(null);
                                    }}
                                    className="px-6 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleEditPolicy}
                                    className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium shadow-sm"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-sm animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-6 text-center">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaTrash className="text-red-500" size={20} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">Delete Policy</h3>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete <span className="font-semibold text-gray-800">"{selectedPolicy?.name}"</span>? This action cannot be undone.
                            </p>
                            <div className="flex justify-center gap-3">
                                <button
                                    onClick={() => {
                                        setShowDeleteModal(false);
                                        setSelectedPolicy(null);
                                    }}
                                    className="px-6 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeletePolicy}
                                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium shadow-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Policies;
