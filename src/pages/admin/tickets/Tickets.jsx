import React, { useState } from 'react';
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
    MapPin,
    Phone,
    Mail,
    Filter,
    FileText,
    Check,
    X,
    Calendar
} from "lucide-react";
import { FaTicketAlt, FaExclamationCircle, FaCheckCircle, FaSpinner, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { BarChart, Bar, ResponsiveContainer, Cell } from 'recharts';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

const Tickets = () => {
    // Stats Data for Charts
    const statsData = [
        { name: 'New Tickets', value: 120, color: '#f97316', increase: '+19.01%', icon: <FaTicketAlt /> },
        { name: 'Open Tickets', value: 60, color: '#a855f7', increase: '+12.15%', icon: <FileText /> },
        { name: 'Solved Tickets', value: 50, color: '#22c55e', increase: '+10.50%', icon: <FaCheckCircle /> },
        { name: 'Pending Tickets', value: 10, color: '#3b82f6', increase: '+5.25%', icon: <FaSpinner /> },
    ];

    // Mock Chart Data for tiny bars
    const chartData = [
        { name: '1', uv: 40 }, { name: '2', uv: 30 }, { name: '3', uv: 20 }, { name: '4', uv: 27 },
        { name: '5', uv: 18 }, { name: '6', uv: 23 }, { name: '7', uv: 34 }, { name: '8', uv: 40 },
        { name: '9', uv: 30 }, { name: '10', uv: 20 }, { name: '11', uv: 27 }, { name: '12', uv: 18 },
    ];

    // Initial Tickets Data
    const [tickets, setTickets] = useState([
        {
            id: 'Tic-001',
            title: 'Laptop Issue',
            category: 'Hardware Issues',
            subject: 'Laptop Screen Flickering',
            assignTo: 'Edgar Hansel',
            assignToImg: 'https://i.pravatar.cc/150?u=1',
            status: 'Open',
            priority: 'Low',
            createdDate: '10 hours ago',
            comments: 9,
        },
        {
            id: 'Tic-002',
            title: 'Payment Issue',
            category: 'Software Issues',
            subject: 'Payment Gateway Error',
            assignTo: 'Ann Lynch',
            assignToImg: 'https://i.pravatar.cc/150?u=2',
            status: 'On Hold',
            priority: 'High',
            createdDate: '15 hours ago',
            comments: 9,
        },
        {
            id: 'Tic-003',
            title: 'Bug Report',
            category: 'IT Support',
            subject: 'System Crash on Login',
            assignTo: 'Juan Hermann',
            assignToImg: 'https://i.pravatar.cc/150?u=3',
            status: 'Reopened',
            priority: 'Medium',
            createdDate: '20 hours ago',
            comments: 9,
        },
        {
            id: 'Tic-004',
            title: 'Access Denied',
            category: 'IT Support',
            subject: 'Cannot access internal server',
            assignTo: 'Jessie Otero',
            assignToImg: 'https://i.pravatar.cc/150?u=4',
            status: 'Open',
            priority: 'Low',
            createdDate: '23 hours ago',
            comments: 9,
        },
        {
            id: 'Tic-005',
            title: 'Display Glitch',
            category: 'Hardware Issues',
            subject: 'Monitor colors distorted',
            assignTo: 'Edgar Hansel',
            assignToImg: 'https://i.pravatar.cc/150?u=1',
            status: 'Open',
            priority: 'High',
            createdDate: '1 day ago',
            comments: 3,
        },
        {
            id: 'Tic-006',
            title: 'Security Alert',
            category: 'IT Support',
            subject: 'Suspicious login attempt',
            assignTo: 'Edgar Hansel',
            assignToImg: 'https://i.pravatar.cc/150?u=1',
            status: 'Open',
            priority: 'High',
            createdDate: '2 days ago',
            comments: 5,
        },
        {
            id: 'Tic-007',
            title: 'Connectivity Issue',
            category: 'Connectivity',
            subject: 'Wifi dropping frequently',
            assignTo: 'Edgar Hansel',
            assignToImg: 'https://i.pravatar.cc/150?u=1',
            status: 'Open',
            priority: 'High',
            createdDate: '3 days ago',
            comments: 2,
        },
        {
            id: 'Tic-008',
            title: 'Update Error',
            category: 'IT Support',
            subject: 'Windows update failed',
            assignTo: 'Edgar Hansel',
            assignToImg: 'https://i.pravatar.cc/150?u=1',
            status: 'Open',
            priority: 'High',
            createdDate: '4 days ago',
            comments: 1,
        }
    ]);

    // View Mode: 'list' or 'grid'
    const [viewMode, setViewMode] = useState('grid');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedTicketId, setSelectedTicketId] = useState(null);

    // Filters & States
    const [priorityFilter, setPriorityFilter] = useState('Priority');
    const [statusFilter, setStatusFilter] = useState('Select Status');
    const [sortBy, setSortBy] = useState('Sort By : Last 7 Days');

    const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [showExportMenu, setShowExportMenu] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        category: 'Select',
        subject: '',
        assignTo: 'Select',
        description: '',
        priority: 'Select',
        status: 'Select'
    });

    const [activeActionId, setActiveActionId] = useState(null);

    // Categories Breakdown (Mock)
    const categories = [
        { name: 'Internet Issue', count: 0 },
        { name: 'Computer', count: 1 },
        { name: 'Redistribute', count: 0 },
        { name: 'Payment', count: 2 },
        { name: 'Complaint', count: 1 },
    ];

    // Support Agents (Mock)
    const agents = [
        { name: 'Edgar Hansel', img: 'https://i.pravatar.cc/150?u=1', count: 0 },
        { name: 'Ann Lynch', img: 'https://i.pravatar.cc/150?u=2', count: 1 },
        { name: 'Juan Hermann', img: 'https://i.pravatar.cc/150?u=3', count: 0 },
        { name: 'Jessie Otero', img: 'https://i.pravatar.cc/150?u=4', count: 2 },
    ];

    // Handle Add Ticket
    const handleAddTicket = () => {
        const newTicket = {
            id: `Tic-00${tickets.length + 1}`,
            title: formData.title,
            category: formData.category,
            subject: formData.subject,
            assignTo: formData.assignTo, // In real app, would get img from user list
            assignToImg: 'https://i.pravatar.cc/150?u=5', // Placeholder
            status: formData.status === 'Select' ? 'Open' : formData.status,
            priority: formData.priority === 'Select' ? 'Low' : formData.priority,
            createdDate: 'Just Now',
            comments: 0
        };
        setTickets([newTicket, ...tickets]);
        setShowAddModal(false);
        setFormData({
            title: '',
            category: 'Select',
            subject: '',
            assignTo: 'Select',
            description: '',
            priority: 'Select',
            status: 'Select'
        });
    };

    // Handle Open Edit Modal
    const openEditModal = (ticket) => {
        setFormData({
            title: ticket.title,
            category: ticket.category,
            subject: ticket.subject,
            assignTo: ticket.assignTo,
            description: '', // Description not in main item mock, leaving blank or should be added to items
            priority: ticket.priority,
            status: ticket.status
        });
        setSelectedTicketId(ticket.id);
        setShowEditModal(true);
        setActiveActionId(null);
    };

    // Handle Save Edit
    const handleSaveEdit = () => {
        setTickets(tickets.map(t =>
            t.id === selectedTicketId ? {
                ...t,
                title: formData.title,
                category: formData.category,
                subject: formData.subject,
                assignTo: formData.assignTo,
                priority: formData.priority,
                status: formData.status
            } : t
        ));
        setShowEditModal(false);
        setFormData({
            title: '',
            category: 'Select',
            subject: '',
            assignTo: 'Select',
            description: '',
            priority: 'Select',
            status: 'Select'
        });
        setSelectedTicketId(null);
    };

    // Handle Delete
    const handleDelete = (id) => {
        setTickets(tickets.filter(t => t.id !== id));
        setActiveActionId(null);
    };

    // Exports
    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text("Ticket List", 14, 15);
        doc.autoTable({
            startY: 20,
            head: [["ID", "Title", "Category", "Assign To", "Status", "Priority"]],
            body: tickets.map(t => [t.id, t.title, t.category, t.assignTo, t.status, t.priority]),
        });
        doc.save("tickets.pdf");
        setShowExportMenu(false);
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(tickets);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Tickets");
        XLSX.writeFile(workbook, "tickets.xlsx");
        setShowExportMenu(false);
    };

    return (
        <div
            className="p-6 bg-gray-50 min-h-screen font-sans"
            onClick={() => {
                setShowPriorityDropdown(false);
                setShowStatusDropdown(false);
                setShowSortDropdown(false);
                setShowExportMenu(false);
                setActiveActionId(null);
            }}
        >
            {/* Header / Breadcrumb */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Tickets</h1>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <span>Employee</span>
                    <span className="text-gray-300">/</span>
                    <span className="text-gray-500">Tickets</span>
                    {viewMode === 'grid' && <span className="text-gray-500">Grid</span>}
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {statsData.map((stat, index) => (
                    <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <span className={`p-2 rounded-full bg-opacity-10`} style={{ backgroundColor: `${stat.color}1a`, color: stat.color }}>
                                    {stat.icon}
                                </span>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">{stat.name}</h3>
                                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-1 w-24 h-16">
                            <div className="text-xs font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded-full">{stat.increase}</div>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData}>
                                    <Bar dataKey="uv" radius={[2, 2, 0, 0]}>
                                        {chartData.map((entry, i) => (
                                            <Cell key={`cell-${i}`} fill={stat.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filters Bar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex flex-col xl:flex-row justify-between items-center gap-4">
                <h2 className="text-lg font-bold text-gray-800">
                    {viewMode === 'list' ? 'Ticket List' : 'Ticket Grid'}
                </h2>

                <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">

                    {/* View Toggles */}
                    <div className="flex bg-gray-100 rounded-lg p-1 border border-gray-200">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-orange-500 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <List size={18} />
                        </button>
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-orange-500 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <LayoutGrid size={18} />
                        </button>
                    </div>

                    {/* Priority Filter */}
                    <div className="relative" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => {
                                setShowPriorityDropdown(!showPriorityDropdown);
                                setShowStatusDropdown(false);
                                setShowSortDropdown(false);
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                        >
                            <span>{priorityFilter}</span>
                            <ChevronDown size={14} />
                        </button>
                        {showPriorityDropdown && (
                            <div className="absolute top-full right-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1">
                                {['Priority', 'High', 'Medium', 'Low'].map(opt => (
                                    <button
                                        key={opt}
                                        onClick={() => { setPriorityFilter(opt); setShowPriorityDropdown(false); }}
                                        className="w-full text-left px-4 py-2 text-sm hover:bg-orange-50 text-gray-700 hover:text-orange-600"
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Status Filter */}
                    <div className="relative" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => {
                                setShowStatusDropdown(!showStatusDropdown);
                                setShowPriorityDropdown(false);
                                setShowSortDropdown(false);
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                        >
                            <span>{statusFilter}</span>
                            <ChevronDown size={14} />
                        </button>
                        {showStatusDropdown && (
                            <div className="absolute top-full right-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1">
                                {['Select Status', 'Open', 'On Hold', 'Reopened'].map(opt => (
                                    <button
                                        key={opt}
                                        onClick={() => { setStatusFilter(opt); setShowStatusDropdown(false); }}
                                        className="w-full text-left px-4 py-2 text-sm hover:bg-orange-50 text-gray-700 hover:text-orange-600"
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sort By */}
                    <div className="relative" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => {
                                setShowSortDropdown(!showSortDropdown);
                                setShowPriorityDropdown(false);
                                setShowStatusDropdown(false);
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                        >
                            <span>{sortBy}</span>
                            <ChevronDown size={14} />
                        </button>
                        {showSortDropdown && (
                            <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1">
                                {['Sort By : Last 7 Days', 'Recently Added', 'Priority'].map(opt => (
                                    <button
                                        key={opt}
                                        onClick={() => { setSortBy(opt); setShowSortDropdown(false); }}
                                        className="w-full text-left px-4 py-2 text-sm hover:bg-orange-50 text-gray-700 hover:text-orange-600"
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Export */}
                    <div className="relative" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setShowExportMenu(!showExportMenu)}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                        >
                            <Download size={16} />
                            <span>Export</span>
                            <ChevronDown size={14} />
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

                    {/* Add Ticket Button */}
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center gap-2 shadow-sm transition-colors"
                    >
                        <Plus size={16} />
                        Add Ticket
                    </button>
                </div>
            </div>

            <div className="flex flex-col xl:flex-row gap-6">

                {/* Main Content Area */}
                <div className={`flex-1 ${viewMode === 'grid' ? 'w-full' : ''}`}>
                    {viewMode === 'list' ? (
                        /* List View */
                        <div className="space-y-4">
                            {tickets.map((ticket) => (
                                <div key={ticket.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative">
                                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xs font-semibold text-blue-100 bg-blue-500 px-2 py-0.5 rounded  text-white">{ticket.id}</span>
                                                <span className={`text-xs px-2 py-0.5 rounded border ${ticket.status === 'Open' ? 'text-red-500 border-red-500 bg-red-50' : ticket.status === 'On Hold' ? 'text-yellow-600 border-yellow-600 bg-yellow-50' : 'text-gray-500 border-gray-500'}`}>{ticket.status}</span>
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-800 mb-1">{ticket.title}</h3>
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <img src={ticket.assignToImg} alt="" className="w-5 h-5 rounded-full" />
                                                <span>Assigned to <span className="text-gray-700 font-medium">{ticket.assignTo}</span></span>
                                                <span className="text-gray-300">|</span>
                                                <span>Updated {ticket.createdDate}</span>
                                                <span className="text-gray-300">|</span>
                                                <span>{ticket.comments} Comments</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${ticket.priority === 'High' ? 'bg-red-500' : ticket.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'}`}>
                                                {ticket.priority}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* Grid View */
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {tickets.map((ticket) => (
                                <div key={ticket.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all group relative">
                                    <div className="absolute top-4 right-4" onClick={(e) => e.stopPropagation()}>
                                        <button onClick={() => setActiveActionId(activeActionId === ticket.id ? null : ticket.id)} className="text-gray-400 hover:text-gray-600">
                                            <MoreVertical size={18} />
                                        </button>
                                        {activeActionId === ticket.id && (
                                            <div className="absolute top-full right-0 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1">
                                                <button onClick={() => openEditModal(ticket)} className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                                    <Edit size={14} /> Edit
                                                </button>
                                                <button onClick={() => handleDelete(ticket.id)} className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                                    <Trash2 size={14} /> Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col items-center text-center mb-4">
                                        <div className="w-16 h-16 rounded-full bg-blue-100 mb-3 overflow-hidden p-1 border border-gray-100">
                                            <img src={ticket.assignToImg} alt={ticket.assignTo} className="w-full h-full rounded-full object-cover" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-800">{ticket.title}</h3>
                                        <span className="text-xs font-medium text-blue-500 bg-blue-50 px-2 py-0.5 rounded mt-1">{ticket.id}</span>
                                    </div>

                                    <div className="space-y-3 pt-3 border-t border-gray-100">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-500">Category</span>
                                            <span className="font-medium text-gray-800">{ticket.category}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-500">Status</span>
                                            <span className={`px-2 py-0.5 text-xs rounded border ${ticket.status === 'Open' ? 'text-red-500 bg-red-50 border-red-100' : 'text-gray-700 bg-gray-50 border-gray-200'}`}>
                                                • {ticket.status}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-500">Priority</span>
                                            <span className={`px-2 py-0.5 text-xs rounded border ${ticket.priority === 'High' ? 'text-red-500 bg-red-50 border-red-100' : ticket.priority === 'Medium' ? 'text-yellow-600 bg-yellow-50 border-yellow-100' : 'text-green-600 bg-green-50 border-green-100'}`}>
                                                • {ticket.priority}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <img src={ticket.assignToImg} className="w-6 h-6 rounded-full" />
                                            <span className="text-xs text-gray-600 font-medium truncate max-w-[80px]">{ticket.assignTo}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="p-1.5 rounded-full text-orange-500 bg-orange-50 hover:bg-orange-100 transition-colors">
                                                <FaEnvelope size={12} />
                                            </button>
                                            <button className="p-1.5 rounded-full text-orange-500 bg-orange-50 hover:bg-orange-100 transition-colors">
                                                <FaPhoneAlt size={12} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Sidebar (Only in List View or logic can be adapted) */}
                {viewMode === 'list' && (
                    <div className="w-full xl:w-80 space-y-6">
                        {/* Ticket Categories */}
                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Ticket Categories</h3>
                            <div className="space-y-3">
                                {categories.map((cat, idx) => (
                                    <div key={idx} className="flex justify-between items-center text-sm text-gray-600">
                                        <span>{cat.name}</span>
                                        <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs font-semibold">{cat.count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Support Agents */}
                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Support Agents</h3>
                            <div className="space-y-4">
                                {agents.map((agent, idx) => (
                                    <div key={idx} className="flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <img src={agent.img} className="w-8 h-8 rounded-full" alt="" />
                                            <span className="text-sm font-medium text-gray-700">{agent.name}</span>
                                        </div>
                                        <span className="bg-gray-900 text-white px-2 py-0.5 rounded-full text-xs font-semibold">{agent.count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* Load More Button */}
            {/* <div className="mt-8 flex justify-center">
                <button className="px-6 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors shadow-sm flex items-center gap-2">
                    <FaSpinner className="animate-spin" /> Load More
                </button>
            </div> */}


            {/* Edit Ticket Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <h3 className="text-xl font-bold text-gray-800">Edit Ticket</h3>
                            <button
                                onClick={() => { setShowEditModal(false); setFormData({ title: '', category: 'Select', subject: '', assignTo: 'Select', description: '', priority: 'Select', status: 'Select' }); }}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-sans"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Event Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                                >
                                    <option>Select</option>
                                    <option>Hardware Issues</option>
                                    <option>Software Issues</option>
                                    <option>IT Support</option>
                                    <option>Internet Issue</option>
                                    <option>Connectivity</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Subject</label>
                                <input
                                    type="text"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Assign To</label>
                                <select
                                    value={formData.assignTo}
                                    onChange={(e) => setFormData({ ...formData, assignTo: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                                >
                                    <option>Select</option>
                                    <option>Edgar Hansel</option>
                                    <option>Ann Lynch</option>
                                    <option>Juan Hermann</option>
                                    <option>Jessie Otero</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Ticket Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all min-h-[100px]"
                                    placeholder="Add Question"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Priority</label>
                                <select
                                    value={formData.priority}
                                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                                >
                                    <option>Select</option>
                                    <option>High</option>
                                    <option>Medium</option>
                                    <option>Low</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Status</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                                >
                                    <option>Select</option>
                                    <option>Open</option>
                                    <option>On Hold</option>
                                    <option>Reopened</option>
                                    <option>Resolved</option>
                                </select>
                            </div>

                            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                                <button
                                    onClick={() => { setShowEditModal(false); setFormData({ title: '', category: 'Select', subject: '', assignTo: 'Select', description: '', priority: 'Select', status: 'Select' }); }}
                                    className="px-6 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveEdit}
                                    className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium shadow-sm"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Ticket Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <h3 className="text-xl font-bold text-gray-800">Add Ticket</h3>
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-sans"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Event Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                                >
                                    <option>Select</option>
                                    <option>Hardware Issues</option>
                                    <option>Software Issues</option>
                                    <option>IT Support</option>
                                    <option>Connectivity</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Subject</label>
                                <input
                                    type="text"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Assign To</label>
                                <select
                                    value={formData.assignTo}
                                    onChange={(e) => setFormData({ ...formData, assignTo: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                                >
                                    <option>Select</option>
                                    <option>Edgar Hansel</option>
                                    <option>Ann Lynch</option>
                                    <option>Juan Hermann</option>
                                    <option>Jessie Otero</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Ticket Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all min-h-[100px]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Priority</label>
                                <select
                                    value={formData.priority}
                                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                                >
                                    <option>Select</option>
                                    <option>High</option>
                                    <option>Medium</option>
                                    <option>Low</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Status</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                                >
                                    <option>Select</option>
                                    <option>Open</option>
                                    <option>On Hold</option>
                                    <option>Reopened</option>
                                    <option>Resolved</option>
                                </select>
                            </div>

                            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="px-6 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddTicket}
                                    className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium shadow-sm"
                                >
                                    Add Ticket
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tickets;
