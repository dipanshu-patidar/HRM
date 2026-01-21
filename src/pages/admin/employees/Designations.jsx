import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import { ChevronDown, Download, FileText, Check, X } from 'lucide-react';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

const Designations = () => {
    // Mock Data matching the user's image
    const [designations, setDesignations] = useState([
        { id: 1, name: 'Accountant', department: 'Finance', employees: 10, status: 'Active' },
        { id: 2, name: 'App Developer', department: 'Application Development', employees: 15, status: 'Active' },
        { id: 3, name: 'Technician', department: 'Application Development', employees: 8, status: 'Active' },
        { id: 4, name: 'Web Developer', department: 'Application Development', employees: 10, status: 'Active' },
        { id: 5, name: 'Sales Executive Officer', department: 'Sales', employees: 10, status: 'Active' },
        { id: 6, name: 'Designer', department: 'Application Development', employees: 15, status: 'Active' },
        { id: 7, name: 'Account Manager', department: 'Finance', employees: 8, status: 'Active' },
        { id: 8, name: 'SEO Analyst', department: 'Marketing', employees: 10, status: 'Inactive' },
        { id: 9, name: 'Admin', department: 'Finance', employees: 5, status: 'Active' },
        { id: 10, name: 'Business Analyst', department: 'Sales', employees: 7, status: 'Active' },
    ]);

    // Derived list of unique departments for the filter
    const uniqueDepartments = [...new Set(designations.map(d => d.department))];

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedDesignation, setSelectedDesignation] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Custom Dropdown States
    const [departmentFilter, setDepartmentFilter] = useState('Department');
    const [statusFilter, setStatusFilter] = useState('Select Status');
    const [sortBy, setSortBy] = useState('Sort By : Last 7 Days');

    const [showDepartmentDropdown, setShowDepartmentDropdown] = useState(false);
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [showExportMenu, setShowExportMenu] = useState(false);

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const [formData, setFormData] = useState({
        name: '',
        department: '',
        status: 'Active',
    });

    // Filter and sort designations
    const getFilteredDesignations = () => {
        let filtered = designations.filter(desig =>
            desig.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            desig.department.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (departmentFilter !== 'Department' && departmentFilter !== 'All Departments') {
            filtered = filtered.filter(desig => desig.department === departmentFilter);
        }

        if (statusFilter !== 'Select Status' && statusFilter !== 'All') {
            filtered = filtered.filter(desig => desig.status === statusFilter);
        }

        // Sort
        switch (sortBy) {
            case 'Recently Added':
                filtered = [...filtered].reverse();
                break;
            case 'Ascending':
                filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'Descending':
                filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                break;
        }

        return filtered;
    };

    const filteredDesignations = getFilteredDesignations();
    const totalPages = Math.ceil(filteredDesignations.length / rowsPerPage);
    const paginatedDesignations = filteredDesignations.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    // Handle Add Designation
    const handleAddDesignation = () => {
        if (formData.name.trim() && formData.department.trim()) {
            const newDesig = {
                id: designations.length + 1,
                name: formData.name,
                department: formData.department,
                employees: 0,
                status: formData.status,
            };
            setDesignations([...designations, newDesig]);
            setFormData({ name: '', department: '', status: 'Active' });
            setShowAddModal(false);
        }
    };

    // Handle Edit Designation
    const handleEditDesignation = () => {
        if (formData.name.trim() && formData.department.trim() && selectedDesignation) {
            setDesignations(designations.map(desig =>
                desig.id === selectedDesignation.id
                    ? { ...desig, name: formData.name, department: formData.department, status: formData.status }
                    : desig
            ));
            setFormData({ name: '', department: '', status: 'Active' });
            setSelectedDesignation(null);
            setShowEditModal(false);
        }
    };

    // Handle Delete Designation
    const handleDeleteDesignation = () => {
        if (selectedDesignation) {
            setDesignations(designations.filter(desig => desig.id !== selectedDesignation.id));
            setSelectedDesignation(null);
            setShowDeleteModal(false);
        }
    };

    // Open Edit Modal
    const openEditModal = (desig) => {
        setSelectedDesignation(desig);
        setFormData({ name: desig.name, department: desig.department, status: desig.status });
        setShowEditModal(true);
    };

    // Open Delete Modal
    const openDeleteModal = (desig) => {
        setSelectedDesignation(desig);
        setShowDeleteModal(true);
    };

    // Export to PDF
    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text("Designation List", 14, 15);
        doc.autoTable({
            startY: 20,
            head: [["ID", "Designation", "Department", "No of Employees", "Status"]],
            body: filteredDesignations.map(desig => [
                desig.id,
                desig.name,
                desig.department,
                desig.employees,
                desig.status
            ]),
        });
        doc.save("designations.pdf");
        setShowExportMenu(false);
    };

    // Export to Excel
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredDesignations.map(desig => ({
            "ID": desig.id,
            "Designation": desig.name,
            "Department": desig.department,
            "No of Employees": desig.employees,
            "Status": desig.status
        })));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Designations");
        XLSX.writeFile(workbook, "designations.xlsx");
        setShowExportMenu(false);
    };

    return (
        <div
            className="p-6 bg-gray-50 min-h-screen font-sans"
            onClick={() => {
                if (showExportMenu) setShowExportMenu(false);
                if (showDepartmentDropdown) setShowDepartmentDropdown(false);
                if (showStatusDropdown) setShowStatusDropdown(false);
                if (showSortDropdown) setShowSortDropdown(false);
            }}
        >
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Designations</h1>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <span>Employee</span>
                        <span className="text-gray-300">/</span>
                        <span className="text-orange-500">Designations</span>
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
                        Add Designation
                    </button>
                </div>
            </div>

            {/* Main Content Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">

                {/* Filters Section */}
                <div className="p-4 border-b border-gray-200 flex flex-col lg:flex-row justify-between items-center gap-4">
                    <h2 className="text-lg font-bold text-gray-800">Designation List</h2>

                    <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">

                        {/* Department Dropdown */}
                        <div className="relative flex-1 lg:flex-none" onClick={(e) => e.stopPropagation()}>
                            <button
                                onClick={() => {
                                    setShowDepartmentDropdown(!showDepartmentDropdown);
                                    setShowStatusDropdown(false);
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

                        {/* Status Dropdown */}
                        <div className="relative flex-1 lg:flex-none" onClick={(e) => e.stopPropagation()}>
                            <button
                                onClick={() => {
                                    setShowStatusDropdown(!showStatusDropdown);
                                    setShowDepartmentDropdown(false);
                                    setShowSortDropdown(false);
                                }}
                                className={`flex items-center justify-between w-full lg:w-40 px-4 py-2 bg-white border ${showStatusDropdown ? 'border-orange-500 ring-1 ring-orange-500' : 'border-gray-200'} rounded-lg text-gray-700 text-sm hover:bg-gray-50 transition-all`}
                            >
                                <span>{statusFilter}</span>
                                <ChevronDown size={16} className={`transition-transform duration-200 ${showStatusDropdown ? 'rotate-180' : ''}`} />
                            </button>

                            {showStatusDropdown && (
                                <div className="absolute top-full right-0 mt-1 w-full lg:w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1 animate-in fade-in zoom-in-95 duration-200">
                                    {['Select Status', 'Active', 'Inactive'].map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => {
                                                setStatusFilter(status);
                                                setShowStatusDropdown(false);
                                            }}
                                            className={`flex items-center justify-between w-full px-4 py-2 text-sm text-left hover:bg-orange-50 hover:text-orange-600 ${statusFilter === status ? 'text-orange-600 font-medium bg-orange-50' : 'text-gray-700'}`}
                                        >
                                            {status}
                                            {statusFilter === status && <Check size={14} />}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Sort By Dropdown */}
                        <div className="relative flex-1 lg:flex-none" onClick={(e) => e.stopPropagation()}>
                            <button
                                onClick={() => {
                                    setShowSortDropdown(!showSortDropdown);
                                    setShowDepartmentDropdown(false);
                                    setShowStatusDropdown(false);
                                }}
                                className={`flex items-center justify-between w-full lg:w-56 px-4 py-2 bg-white border ${showSortDropdown ? 'border-orange-500 ring-1 ring-orange-500' : 'border-gray-200'} rounded-lg text-gray-700 text-sm hover:bg-gray-50 transition-all`}
                            >
                                <span>{sortBy}</span>
                                <ChevronDown size={16} className={`transition-transform duration-200 ${showSortDropdown ? 'rotate-180' : ''}`} />
                            </button>

                            {showSortDropdown && (
                                <div className="absolute top-full right-0 mt-1 w-full lg:w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1 animate-in fade-in zoom-in-95 duration-200">
                                    {[
                                        'Sort By : Last 7 Days',
                                        'Recently Added',
                                        'Ascending',
                                        'Descending'
                                    ].map((option) => (
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
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Designation</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Department</th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">No of Employees</th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {paginatedDesignations.map((desig) => (
                                <tr key={desig.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <input type="checkbox" className="rounded text-orange-500 focus:ring-orange-500" />
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{desig.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{desig.department}</td>
                                    <td className="px-6 py-4 text-center text-sm text-gray-600">{desig.employees}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${desig.status === 'Active'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-700'
                                                }`}
                                        >
                                            <span className={`w-1.5 h-1.5 rounded-full ${desig.status === 'Active' ? 'bg-green-600' : 'bg-red-600'}`}></span>
                                            {desig.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center gap-3">
                                            <button
                                                onClick={() => openEditModal(desig)}
                                                className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                                title="Edit"
                                            >
                                                <FaEdit size={16} />
                                            </button>
                                            <button
                                                onClick={() => openDeleteModal(desig)}
                                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                                title="Delete"
                                            >
                                                <FaTrash size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {paginatedDesignations.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                                        No designations found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="text-sm text-gray-600">
                        Showing <span className="font-medium">{filteredDesignations.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * rowsPerPage, filteredDesignations.length)}</span> of <span className="font-medium">{filteredDesignations.length}</span> entries
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

            {/* Add Designation Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <h3 className="text-xl font-bold text-gray-800">Add Designation</h3>
                            <button
                                onClick={() => {
                                    setShowAddModal(false);
                                    setFormData({ name: '', department: '', status: 'Active' });
                                }}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Designation Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                                    placeholder="Enter designation name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Department Name <span className="text-red-500">*</span>
                                </label>
                                {/* Providing a dropdown for better UX, though image showed input. Can switch to input if strictly requested. */}
                                <select
                                    value={formData.department}
                                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white"
                                >
                                    <option value="" disabled>Select Department</option>
                                    {uniqueDepartments.map(dept => (
                                        <option key={dept} value={dept}>{dept}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Status
                                </label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    onClick={() => {
                                        setShowAddModal(false);
                                        setFormData({ name: '', department: '', status: 'Active' });
                                    }}
                                    className="px-6 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddDesignation}
                                    className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium shadow-sm"
                                >
                                    Add Designation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Designation Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <h3 className="text-xl font-bold text-gray-800">Edit Designation</h3>
                            <button
                                onClick={() => {
                                    setShowEditModal(false);
                                    setFormData({ name: '', department: '', status: 'Active' });
                                    setSelectedDesignation(null);
                                }}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Designation Name <span className="text-red-500">*</span>
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
                                    Department Name <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={formData.department}
                                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white"
                                >
                                    <option value="" disabled>Select Department</option>
                                    {uniqueDepartments.map(dept => (
                                        <option key={dept} value={dept}>{dept}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Status
                                </label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    onClick={() => {
                                        setShowEditModal(false);
                                        setFormData({ name: '', department: '', status: 'Active' });
                                        setSelectedDesignation(null);
                                    }}
                                    className="px-6 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleEditDesignation}
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
                            <h3 className="text-lg font-bold text-gray-800 mb-2">Delete Designation</h3>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete <span className="font-semibold text-gray-800">"{selectedDesignation?.name}"</span>? This action cannot be undone.
                            </p>
                            <div className="flex justify-center gap-3">
                                <button
                                    onClick={() => {
                                        setShowDeleteModal(false);
                                        setSelectedDesignation(null);
                                    }}
                                    className="px-6 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteDesignation}
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

export default Designations;
