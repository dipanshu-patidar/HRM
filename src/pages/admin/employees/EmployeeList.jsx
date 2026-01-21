import React, { useState, useEffect } from "react";
import {
    LayoutGrid,
    List,
    Plus,
    Download,
    Search,
    Trash2,
    Edit,
    MoreVertical,
    ChevronDown,
    Users,
    UserCheck,
    UserX,
    UserPlus,
    FileText,
    Calendar,
    X,
    EyeOff,
    User,
    Check
} from "lucide-react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

// Initial Mock Data
const initialEmployees = [
    {
        id: 1,
        empId: "Emp-001",
        name: "Anthony Lewis",
        firstName: "Anthony",
        lastName: "Lewis",
        role: "Software Developer",
        department: "Finance",
        email: "anthony@example.com",
        phone: "(123) 4567 890",
        joiningDate: "12 Sep 2024",
        status: "Active",
        projects: 20,
        tasksDone: 13,
        tasksProgress: 7,
        productivity: 65,
        image: "https://i.pravatar.cc/150?u=1",
        username: "anthony",
        company: "Abac Company"
    },
    {
        id: 2,
        empId: "Emp-002",
        name: "Brian Villalobos",
        firstName: "Brian",
        lastName: "Villalobos",
        role: "Developer",
        department: "Developer",
        email: "brian@example.com",
        phone: "(179) 7382 829",
        joiningDate: "24 Oct 2024",
        status: "Active",
        projects: 30,
        tasksDone: 10,
        tasksProgress: 20,
        productivity: 30,
        image: "https://i.pravatar.cc/150?u=2",
        username: "brian",
        company: "Abac Company"
    },
    {
        id: 3,
        empId: "Emp-003",
        name: "Harvey Smith",
        firstName: "Harvey",
        lastName: "Smith",
        role: "Developer",
        department: "Developer",
        email: "harvey@example.com",
        phone: "(184) 2719 738",
        joiningDate: "18 Feb 2024",
        status: "Active",
        projects: 25,
        tasksDone: 7,
        tasksProgress: 18,
        productivity: 20,
        image: "https://i.pravatar.cc/150?u=3",
        username: "harvey",
        company: "Abac Company"
    },
    {
        id: 4,
        empId: "Emp-004",
        name: "Stephan Peralt",
        firstName: "Stephan",
        lastName: "Peralt",
        role: "Software Developer",
        department: "Executive",
        email: "peral@example.com",
        phone: "(193) 7839 748",
        joiningDate: "17 Oct 2024",
        status: "Active",
        projects: 15,
        tasksDone: 13,
        tasksProgress: 2,
        productivity: 90,
        image: "https://i.pravatar.cc/150?u=4",
        username: "stephan",
        company: "Abac Company"
    },
    {
        id: 5,
        empId: "Emp-005",
        name: "Doglas Martini",
        firstName: "Doglas",
        lastName: "Martini",
        role: "Full Stack Developer",
        department: "Manager",
        email: "martniwr@example.com",
        phone: "(183) 9302 890",
        joiningDate: "20 Jul 2024",
        status: "Active",
        projects: 15,
        tasksDone: 2,
        tasksProgress: 13,
        productivity: 10,
        image: "https://i.pravatar.cc/150?u=5",
        username: "doglas",
        company: "Abac Company"
    },
    {
        id: 6,
        empId: "Emp-006",
        name: "Linda Ray",
        firstName: "Linda",
        lastName: "Ray",
        role: "Software Developer",
        department: "Manager",
        email: "ray@example.com",
        phone: "(183) 9302 890",
        joiningDate: "20 Jul 2024",
        status: "Active",
        projects: 20,
        tasksDone: 10,
        tasksProgress: 10,
        productivity: 50,
        image: "https://i.pravatar.cc/150?u=6",
        username: "linda",
        company: "Abac Company"
    },
];

const EmployeeList = () => {
    // UI State
    const [viewMode, setViewMode] = useState("list");
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showExportMenu, setShowExportMenu] = useState(false);
    const [activeTab, setActiveTab] = useState("basic");
    const [showDateRangeDropdown, setShowDateRangeDropdown] = useState(false);

    // Data State
    const [employees, setEmployees] = useState(initialEmployees);
    const [filteredEmployees, setFilteredEmployees] = useState(initialEmployees);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);
    const [openDropdownId, setOpenDropdownId] = useState(null);

    // Form State
    const [formData, setFormData] = useState({});

    // Filter State
    const [filters, setFilters] = useState({
        designation: "Designation",
        status: "Select Status",
        sortBy: "Sort By : Last 7 Days",
        search: "",
        dateRange: "01/15/2026 - 01/21/2026"
    });
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Stats
    const stats = [
        { title: "Total Employee", value: employees.length, change: "+19.01%", color: "bg-gray-900", textColor: "text-white", icon: Users },
        { title: "Active", value: employees.filter(e => e.status === "Active").length, change: "+19.01%", color: "bg-green-500", textColor: "text-white", icon: UserCheck },
        { title: "InActive", value: employees.filter(e => e.status === "InActive").length, change: "+19.01%", color: "bg-red-600", textColor: "text-white", icon: UserX },
        { title: "New Joiners", value: "67", change: "+19.01%", color: "bg-blue-500", textColor: "text-white", icon: UserPlus },
    ];

    // Filter Logic
    useEffect(() => {
        let result = [...employees];

        // Search
        if (filters.search) {
            const lowerQuery = filters.search.toLowerCase();
            result = result.filter(emp =>
                emp.name.toLowerCase().includes(lowerQuery) ||
                emp.email.toLowerCase().includes(lowerQuery) ||
                emp.empId.toLowerCase().includes(lowerQuery)
            );
        }

        // Designation
        if (filters.designation !== "Designation") {
            result = result.filter(emp => emp.department === filters.designation);
        }

        // Status
        if (filters.status !== "Select Status") {
            result = result.filter(emp => emp.status === filters.status);
        }

        // Sort
        if (filters.sortBy === "Ascending") {
            result.sort((a, b) => a.name.localeCompare(b.name));
        } else if (filters.sortBy === "Descending") {
            result.sort((a, b) => b.name.localeCompare(a.name));
        }
        // "Last 7 Days" is default/mock for now as we don't have real dates to parse logically

        setFilteredEmployees(result);
    }, [filters, employees]);

    // Handlers
    const handleAdd = () => {
        setEditingEmployee(null);
        setFormData({
            firstName: "", lastName: "", empId: "", joiningDate: "",
            username: "", email: "", phone: "", company: "",
            department: "Select", designation: "Select", about: "",
            password: "", confirmPassword: ""
        });
        setShowModal(true);
    };

    const handleEdit = (emp) => {
        setEditingEmployee(emp);
        setFormData({
            ...emp,
            password: "", // Don't show password
            confirmPassword: ""
        });
        setShowModal(true);
    };

    const handleDeleteClick = (emp) => {
        setEmployeeToDelete(emp);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (employeeToDelete) {
            setEmployees(prev => prev.filter(e => e.id !== employeeToDelete.id));
            setShowDeleteModal(false);
            setEmployeeToDelete(null);
        }
    };

    const handleSave = () => {
        // Basic validation or just mock save
        if (editingEmployee) {
            setEmployees(prev => prev.map(e => e.id === editingEmployee.id ? { ...e, ...formData, name: `${formData.firstName} ${formData.lastName}` } : e));
        } else {
            const newId = employees.length + 1;
            setEmployees(prev => [...prev, {
                id: newId,
                ...formData,
                name: `${formData.firstName} ${formData.lastName}`,
                status: "Active",
                projects: 0, tasksDone: 0, tasksProgress: 0, productivity: 0,
                image: `https://i.pravatar.cc/150?u=${newId}`
            }]);
        }
        setShowModal(false);
    };

    const toggleDateRange = () => {
        setShowDateRangeDropdown(!showDateRangeDropdown);
    };

    const handleDateRangeSelect = (range) => {
        setFilters(prev => ({ ...prev, dateRange: range }));
        setShowDateRangeDropdown(false);
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text("Employee List", 14, 15);
        doc.autoTable({
            startY: 20,
            head: [["Emp ID", "Name", "Email", "Phone", "Designation", "Joining Date", "Status"]],
            body: filteredEmployees.map(emp => [
                emp.empId,
                emp.name,
                emp.email,
                emp.phone,
                emp.department,
                emp.joiningDate,
                emp.status
            ]),
        });
        doc.save("employees.pdf");
        setShowExportMenu(false);
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredEmployees.map(emp => ({
            "Emp ID": emp.empId,
            "Name": emp.name,
            "Email": emp.email,
            "Phone": emp.phone,
            "Designation": emp.department,
            "Joining Date": emp.joiningDate,
            "Status": emp.status
        })));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
        XLSX.writeFile(workbook, "employees.xlsx");
        setShowExportMenu(false);
    };

    const toggleDesignationDropdown = (id, e) => {
        e.stopPropagation();
        setOpenDropdownId(prev => prev === id ? null : id);
    };

    const handleDesignationChange = (id, newDesignation) => {
        setEmployees(prev => prev.map(e => e.id === id ? { ...e, department: newDesignation } : e));
        setOpenDropdownId(null);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans" onClick={() => {
            if (showExportMenu) setShowExportMenu(false);
            if (showDateRangeDropdown) setShowDateRangeDropdown(false);
            if (openDropdownId) setOpenDropdownId(null);
        }}>
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Employee</h1>
                    <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                        <span>Employee</span> <span className="text-gray-300">/</span> <span className="text-orange-500">Employee Grid</span>
                    </div>
                </div>
                <div className="flex items-center gap-3 mt-4 md:mt-0">
                    <div className="flex bg-white rounded-lg shadow-sm border border-gray-200 p-1">
                        <button
                            onClick={() => setViewMode("list")}
                            className={`p-2 rounded md:w-auto ${viewMode === 'list' ? 'bg-orange-500 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            <List size={20} />
                        </button>
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`p-2 rounded md:w-auto ${viewMode === 'grid' ? 'bg-orange-500 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            <LayoutGrid size={20} />
                        </button>
                    </div>

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
                            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
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
                        onClick={handleAdd}
                        className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors shadow-sm"
                    >
                        <Plus size={18} className="stroke-2" />
                        <span>Add Employee</span>
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.color} ${stat.textColor}`}>
                                    <Icon size={24} />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                                    <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                                </div>
                            </div>
                            <div className="bg-orange-50 text-orange-500 text-xs font-bold px-2 py-1 rounded">
                                {stat.change}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Filters Section */}
            <div className="bg-white p-4 rounded-t-xl border-b border-gray-200 flex flex-col lg:flex-row justify-between items-center gap-4">
                <h2 className="text-lg font-bold text-gray-800">{viewMode === 'grid' ? 'Employees Grid' : 'Employee List'}</h2>
                <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                    {/* Date Range Dropdown Mock */}
                    <div className="relative flex-1 lg:flex-none" onClick={(e) => e.stopPropagation()}>
                        <div
                            className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-gray-600 bg-white min-w-[200px] cursor-pointer"
                            onClick={toggleDateRange}
                        >
                            <span className="text-sm">{filters.dateRange}</span>
                            <ChevronDown size={16} className="ml-auto" />
                        </div>
                        {showDateRangeDropdown && (
                            <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1">
                                {["Today", "Yesterday", "Last 7 Days", "Last 30 Days", "This Year", "Next Year", "Custom Range"].map((option) => (
                                    <div
                                        key={option}
                                        className={`px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 cursor-pointer ${filters.dateRange === option ? 'text-orange-500 bg-orange-50' : ''}`}
                                        onClick={() => handleDateRangeSelect(option === "Today" ? "01/21/2026" : "01/15/2026 - 01/21/2026")} // simplistic mock logic
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="relative flex-1 lg:flex-none">
                        <select
                            value={filters.designation}
                            onChange={(e) => setFilters({ ...filters, designation: e.target.value })}
                            className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-full cursor-pointer"
                        >
                            <option>Designation</option>
                            <option>Finance</option>
                            <option>Developer</option>
                            <option>Executive</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <ChevronDown size={16} />
                        </div>
                    </div>

                    <div className="relative flex-1 lg:flex-none">
                        <select
                            value={filters.status}
                            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                            className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-full cursor-pointer"
                        >
                            <option>Select Status</option>
                            <option>Active</option>
                            <option>InActive</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <ChevronDown size={16} />
                        </div>
                    </div>

                    <div className="relative flex-1 lg:flex-none">
                        <select
                            value={filters.sortBy}
                            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                            className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-full cursor-pointer"
                        >
                            <option>Sort By : Last 7 Days</option>
                            <option value="Ascending">Ascending</option>
                            <option value="Descending">Descending</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <ChevronDown size={16} />
                        </div>
                    </div>
                </div>
            </div>

            {
                viewMode === 'list' && (
                    <div className="bg-white p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2 text-gray-600">
                            <span>Row Per Page</span>
                            <select
                                value={rowsPerPage}
                                onChange={(e) => setRowsPerPage(Number(e.target.value))}
                                className="border border-gray-200 rounded p-1"
                            >
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                            </select>
                            <span>Entries</span>
                        </div>
                        <div className="relative w-full sm:w-64">
                            <input
                                type="text"
                                placeholder="Search"
                                value={filters.search}
                                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
                            />
                            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                    </div>
                )
            }

            {/* List View */}
            {
                viewMode === 'list' && (
                    <div className="bg-white rounded-b-xl shadow-sm border-x border-b border-gray-200 overflow-x-auto">
                        <table className="w-full min-w-[1000px]">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="p-4 w-4">
                                        <input type="checkbox" className="rounded text-orange-500 focus:ring-orange-500" />
                                    </th>
                                    <th className="p-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Emp ID</th>
                                    <th className="p-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Name</th>
                                    <th className="p-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Email</th>
                                    <th className="p-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Phone</th>
                                    <th className="p-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Designation</th>
                                    <th className="p-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Joining Date</th>
                                    <th className="p-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Status</th>
                                    <th className="p-4 text-right text-xs font-bold text-gray-800 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredEmployees.slice(0, rowsPerPage).map((emp) => (
                                    <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4">
                                            <input type="checkbox" className="rounded text-orange-500 focus:ring-orange-500" />
                                        </td>
                                        <td className="p-4 text-sm font-medium text-gray-900">{emp.empId}</td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <img src={emp.image} alt="" className="w-10 h-10 rounded-full object-cover" />
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900">{emp.name}</p>
                                                    <p className="text-xs text-gray-500">{emp.department}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-gray-600">{emp.email}</td>
                                        <td className="p-4 text-sm text-gray-600">{emp.phone}</td>
                                        <td className="p-4 relative">
                                            <button
                                                onClick={(e) => toggleDesignationDropdown(emp.id, e)}
                                                className="flex items-center gap-2 bg-orange-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium w-max hover:bg-orange-600 transition-colors"
                                            >
                                                {emp.department} <ChevronDown size={14} />
                                            </button>

                                            {openDropdownId === emp.id && (
                                                <div className="absolute top-12 left-4 w-40 bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                                    {["Finance", "Developer", "Executive", "Manager"].map((role) => (
                                                        <button
                                                            key={role}
                                                            onClick={() => handleDesignationChange(emp.id, role)}
                                                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors flex items-center justify-between ${emp.department === role ? 'text-orange-600 font-medium bg-orange-50/50' : 'text-gray-600'}`}
                                                        >
                                                            {role}
                                                            {emp.department === role && <Check size={14} />}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-4 text-sm text-gray-600">{emp.joiningDate}</td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${emp.status === 'Active' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                                                <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                                                {emp.status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(emp)}
                                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(emp)}
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredEmployees.length === 0 && (
                                    <tr>
                                        <td colSpan="9" className="p-8 text-center text-gray-500">No employees found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )
            }

            {/* Grid View */}
            {
                viewMode === 'grid' && (
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredEmployees.map((emp) => (
                            <div key={emp.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center text-center relative hover:shadow-md transition-shadow">
                                <div className="absolute top-4 left-4">
                                    <input type="checkbox" className="rounded text-orange-500 focus:ring-orange-500 h-4 w-4" />
                                </div>
                                <div className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer" onClick={(e) => toggleDesignationDropdown(emp.id, e)}>
                                    <MoreVertical size={20} />
                                    {openDropdownId === emp.id && (
                                        <div className="absolute top-6 right-0 w-32 bg-white border border-gray-100 rounded-lg shadow-xl z-20 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-left">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleEdit(emp); setOpenDropdownId(null); }}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors flex items-center gap-2"
                                            >
                                                <Edit size={14} /> Edit
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleDeleteClick(emp); setOpenDropdownId(null); }}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors flex items-center gap-2"
                                            >
                                                <Trash2 size={14} /> Delete
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="relative mb-4">
                                    <img src={emp.image} alt={emp.name} className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-sm" />
                                    <span className={`absolute bottom-1 right-1 w-4 h-4 border-2 border-white rounded-full ${emp.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                </div>

                                <h3 className="text-lg font-bold text-gray-800 mb-1">{emp.name}</h3>
                                <span className="px-2 py-0.5 rounded bg-pink-50 text-pink-500 text-xs font-medium mb-6">
                                    {emp.role}
                                </span>

                                <div className="w-full grid grid-cols-3 divide-x divide-gray-200 border-t border-b border-gray-100 py-4 mb-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs text-gray-500">Projects</span>
                                        <span className="text-sm font-bold text-gray-800">{emp.projects}</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs text-gray-500">Done</span>
                                        <span className="text-sm font-bold text-gray-800">{emp.tasksDone}</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs text-gray-500">Progress</span>
                                        <span className="text-sm font-bold text-gray-800">{emp.tasksProgress}</span>
                                    </div>
                                </div>

                                <div className="w-full flex flex-col gap-2">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-gray-500">Productivity : <span className="text-primary font-bold">{emp.productivity}%</span></span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                                        <div
                                            className="h-1.5 rounded-full"
                                            style={{
                                                width: `${emp.productivity}%`,
                                                backgroundColor: emp.productivity > 70 ? '#10b981' : emp.productivity > 40 ? '#f59e0b' : '#ef4444'
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {filteredEmployees.length > 0 && (
                            <div className="col-span-full flex justify-center mt-8">
                                <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                                    Load More
                                </button>
                            </div>
                        )}
                    </div>
                )
            }

            {/* Add/Edit Employee Modal */}
            {
                showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                            <div className="flex items-center justify-between p-6 border-b border-gray-100">
                                <h2 className="text-xl font-bold text-gray-800">
                                    {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
                                    <span className="text-gray-400 text-sm font-normal ml-2">Employee ID : {formData.empId || 'EMP -00XX'}</span>
                                </h2>
                                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex border-b border-gray-100 px-6">
                                <button
                                    onClick={() => setActiveTab('basic')}
                                    className={`py-4 px-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'basic' ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                                >
                                    Basic Information
                                </button>
                                <button
                                    onClick={() => setActiveTab('permissions')}
                                    className={`py-4 px-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'permissions' ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                                >
                                    Permissions
                                </button>
                            </div>

                            <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
                                {activeTab === 'basic' && (
                                    <div className="space-y-6">
                                        <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50/50">
                                            <div className="flex items-center gap-4 w-full">
                                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-300 overflow-hidden">
                                                    {editingEmployee && editingEmployee.image ?
                                                        <img src={editingEmployee.image} alt="Profile" className="w-full h-full object-cover" /> :
                                                        <User size={32} />
                                                    }
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-gray-800 text-sm">Upload Profile Image</h4>
                                                    <p className="text-xs text-gray-500 mb-2">Image should be below 4 mb</p>
                                                    <div className="flex gap-3">
                                                        <button className="bg-orange-500 text-white text-xs px-4 py-1.5 rounded hover:bg-orange-600 transition-colors">Upload</button>
                                                        <button className="text-gray-500 text-xs px-2 py-1.5 hover:text-gray-700">Cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-semibold text-gray-700">First Name <span className="text-red-500">*</span></label>
                                                <input
                                                    type="text"
                                                    value={formData.firstName || ""}
                                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-semibold text-gray-700">Last Name</label>
                                                <input
                                                    type="text"
                                                    value={formData.lastName || ""}
                                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-semibold text-gray-700">Employee ID <span className="text-red-500">*</span></label>
                                                <input
                                                    type="text"
                                                    value={formData.empId || ""}
                                                    onChange={(e) => setFormData({ ...formData, empId: e.target.value })}
                                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-semibold text-gray-700">Joining Date <span className="text-red-500">*</span></label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        placeholder="dd/mm/yyyy"
                                                        value={formData.joiningDate || ""}
                                                        onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
                                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                                                    />
                                                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-semibold text-gray-700">Username <span className="text-red-500">*</span></label>
                                                <input
                                                    type="text"
                                                    value={formData.username || ""}
                                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-semibold text-gray-700">Email <span className="text-red-500">*</span></label>
                                                <input
                                                    type="email"
                                                    value={formData.email || ""}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-semibold text-gray-700">Password <span className="text-red-500">*</span></label>
                                                <div className="relative">
                                                    <input
                                                        type="password"
                                                        value={formData.password || ""}
                                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                                                    />
                                                    <EyeOff className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" size={16} />
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-semibold text-gray-700">Confirm Password <span className="text-red-500">*</span></label>
                                                <div className="relative">
                                                    <input
                                                        type="password"
                                                        value={formData.confirmPassword || ""}
                                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                                                    />
                                                    <EyeOff className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" size={16} />
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-semibold text-gray-700">Phone Number <span className="text-red-500">*</span></label>
                                                <input
                                                    type="text"
                                                    value={formData.phone || ""}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-semibold text-gray-700">Company <span className="text-red-500">*</span></label>
                                                <input
                                                    type="text"
                                                    value={formData.company || ""}
                                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-semibold text-gray-700">Department</label>
                                                <div className="relative">
                                                    <select
                                                        value={formData.department || "Select"}
                                                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors appearance-none bg-white"
                                                    >
                                                        <option>Select</option>
                                                        <option>Finance</option>
                                                        <option>Developer</option>
                                                        <option>Executive</option>
                                                        <option>Manager</option>
                                                    </select>
                                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-semibold text-gray-700">Designation</label>
                                                <div className="relative">
                                                    <select
                                                        value={formData.department || "Select"} // Typically designation depends on dep, simplified here
                                                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors appearance-none bg-white"
                                                    >
                                                        <option>Select</option>
                                                        <option>Finance</option>
                                                        <option>Developer</option>
                                                        <option>Executive</option>
                                                    </select>
                                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                                                </div>
                                            </div>
                                            <div className="col-span-1 md:col-span-2 space-y-1.5">
                                                <label className="text-sm font-semibold text-gray-700">About <span className="text-red-500">*</span></label>
                                                <textarea
                                                    value={formData.about || ""}
                                                    onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors h-24 resize-none"
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'permissions' && (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                                            <span className="font-bold text-gray-800">Enable Options</span>
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="relative inline-flex items-center cursor-pointer">
                                                        <input type="checkbox" className="sr-only peer" />
                                                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500"></div>
                                                    </div>
                                                    <span className="text-sm text-gray-700">Enable all Module</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <input type="checkbox" className="rounded text-orange-500 focus:ring-orange-500 w-4 h-4" defaultChecked />
                                                    <span className="text-sm text-gray-700">Select All</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            {[
                                                "Holidays", "Leaves", "Clients", "Projects", "Tasks", "Chats", "Assets", "Timing Sheets"
                                            ].map((module, idx) => (
                                                <div key={idx} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                                                    <div className="flex items-center gap-3 w-40">
                                                        <div className="relative inline-flex items-center cursor-pointer">
                                                            <input type="checkbox" className="sr-only peer" defaultChecked={idx === 0 || idx === 7} />
                                                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500"></div>
                                                        </div>
                                                        <span className="text-sm font-medium text-gray-700">{module}</span>
                                                    </div>
                                                    <div className="flex-1 grid grid-cols-5 gap-2">
                                                        {["Read", "Write", "Create", "Delete", "Import", "Export"].slice(0, 5).map((perm, pIdx) => (
                                                            <div key={pIdx} className="flex items-center gap-2">
                                                                <input type="checkbox" className="rounded text-orange-500 focus:ring-orange-500 w-4 h-4" defaultChecked={pIdx === 0} />
                                                                <span className="text-sm text-gray-600">{perm}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
                                <button onClick={() => setShowModal(false)} className="px-6 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors">Cancel</button>
                                <button onClick={handleSave} className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium transition-colors">Save</button>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Delete Confirmation Modal */}
            {
                showDeleteModal && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden flex flex-col items-center p-8 text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                                <Trash2 className="text-red-500" size={32} />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Confirm Delete</h2>
                            <p className="text-gray-500 mb-6">You want to delete all the marked items, this cant be undone once you delete.</p>

                            <div className="flex gap-4 w-full">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="flex-1 py-2.5 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 font-semibold transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="flex-1 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition-colors shadow-sm"
                                >
                                    Yes, Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default EmployeeList;
