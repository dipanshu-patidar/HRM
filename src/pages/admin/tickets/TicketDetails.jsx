import React, { useState } from 'react';
import {
    Download,
    Plus,
    ChevronDown,
    MessageSquare,
    Paperclip,
    Reply,
    Settings,
    MoreVertical,
    Check,
    X,
    FileText
} from "lucide-react";
import { FaUser, FaTicketAlt } from 'react-icons/fa';
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

const TicketDetails = () => {
    // Mock Data based on screenshots
    const ticketData = {
        id: 'Tic - 001',
        title: 'Laptop Issue',
        category: 'IT Support', // Top blue text
        status: 'Open',
        priority: 'High',
        assignedTo: 'Edgar Hansel',
        user: 'Anthony Lewis',
        userImg: 'https://i.pravatar.cc/150?u=anthony',
        agentImg: 'https://i.pravatar.cc/150?u=edgar',
        createdDate: '25 May 2024',
        email: 'Hellana@example.com',
        description: `For the past week, my laptop has been experiencing intermittent freezing issues. The freezes occur randomly, approximately 3-4 times a day, and last about 30-60 seconds each time. During these freezes, the cursor becomes unresponsive, and I am unable to click on anything or use keyboard shortcuts. The issue usually resolves itself, but it significantly disrupts my work.
        
        • I first noticed the problem on February 1, 2024, while using Google Meet for a video conference. Since then, the issue has occurred during various tasks, including browsing with Chrome, using Microsoft Office applications, and even when the laptop is idle.
        
        • Error messages: No specific error messages have appeared, but the Task Manager (when accessible) shows a spike in CPU usage to 100% during these freezes.`,
        comments: [
            {
                id: 1,
                user: 'James Hendriques',
                role: 'Support Agent', // Implicit
                img: 'https://i.pravatar.cc/150?u=james',
                time: '5 hours ago',
                content: 'This issue disrupts meetings, delays task completion, and affects my overall productivity.',
                attachment: 'Screenshot.png',
                replies: 1
            },
            {
                id: 2,
                user: 'Marilyn Siegle',
                role: 'User',
                img: 'https://i.pravatar.cc/150?u=marilyn',
                time: '6 hours ago',
                content: 'Check the System and Application logs in the Event Viewer for warnings or errors that coincide with the times the freezes occur.',
                attachments: ['Screenshot.png', 'Screenshot.png', 'Screenshot.png', 'Screenshot.png'],
                replies: 1
            },
            {
                id: 3,
                user: 'Marilyn Siegle',
                role: 'User',
                img: 'https://i.pravatar.cc/150?u=marilyn',
                time: '8 hours ago',
                content: 'Check for any pending updates and installing them to see if it resolves the issue',
                replies: 1
            }
        ]
    };

    const [priority, setPriority] = useState('High');
    const [assignee, setAssignee] = useState('Edgar Hansel');
    const [status, setStatus] = useState('Open');

    // Dropdown states
    const [showMarkMenu, setShowMarkMenu] = useState(false);
    const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
    const [showAssignDropdown, setShowAssignDropdown] = useState(false);
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);

    const priorities = ['High', 'Medium', 'Low'];
    const agents = ['Edgar Hansel', 'Juan Hermann', 'Ann Lynch', 'Jessie Otero'];
    const statuses = ['Open', 'On Hold', 'Reopened', 'Closed'];

    const [showAddModal, setShowAddModal] = useState(false);
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

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text("Ticket Details", 14, 15);
        doc.setFontSize(10);

        doc.text(`Ticket ID: ${ticketData.id}`, 14, 25);
        doc.text(`Title: ${ticketData.title}`, 14, 30);
        doc.text(`Status: ${ticketData.status}`, 14, 35);
        doc.text(`Assigned To: ${ticketData.assignedTo}`, 14, 40);
        doc.text(`Created Date: ${ticketData.createdDate}`, 14, 45);

        doc.text("Description:", 14, 55);
        const splitDesc = doc.splitTextToSize(ticketData.description, 180);
        doc.text(splitDesc, 14, 60);

        doc.save(`ticket_${ticketData.id}.pdf`);
        setShowExportMenu(false);
    };

    const exportToExcel = () => {
        const data = [{
            "Ticket ID": ticketData.id,
            "Title": ticketData.title,
            "Category": ticketData.category,
            "Status": ticketData.status,
            "Priority": ticketData.priority,
            "Assigned To": ticketData.assignedTo,
            "User": ticketData.user,
            "Email": ticketData.email,
            "Created Date": ticketData.createdDate,
            "Description": ticketData.description
        }];

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Ticket Details");
        XLSX.writeFile(workbook, `ticket_${ticketData.id}.xlsx`);
        setShowExportMenu(false);
    };

    const handleAddTicket = () => {
        // Mock add logic
        setShowAddModal(false);
        setFormData({ title: '', category: 'Select', subject: '', assignTo: 'Select', description: '', priority: 'Select', status: 'Select' });
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans" onClick={() => {
            setShowMarkMenu(false);
            setShowPriorityDropdown(false);
            setShowAssignDropdown(false);
            setShowStatusDropdown(false);
        }}>
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div className="flex items-center gap-2 mb-4 md:mb-0">
                    <span className="text-gray-500 hover:text-gray-700 cursor-pointer">← Ticket Details</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <button
                            onClick={() => setShowExportMenu(!showExportMenu)}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 text-sm font-medium"
                        >
                            <Download size={16} /> Export <ChevronDown size={14} />
                        </button>
                        {showExportMenu && (
                            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-2">
                                <button onClick={exportToPDF} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                    <FileText size={16} /> Export as PDF
                                </button>
                                <button onClick={exportToExcel} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                    <FileText size={16} /> Export as Excel
                                </button>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 shadow-sm text-sm font-medium"
                    >
                        <Plus size={16} /> Add Ticket
                    </button>
                    <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500">
                        <ChevronDown size={16} className="transform rotate-180" />
                    </button>
                </div>
            </div>

            <div className="flex flex-col xl:flex-row gap-6">

                {/* Left Column: Ticket Content */}
                <div className="flex-1 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

                        {/* Title Section */}
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-blue-500 font-semibold mb-2">{ticketData.category}</h3>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">{ticketData.id}</span>
                                    <h1 className="text-xl font-bold text-gray-800">{ticketData.title}</h1>
                                    <span className="px-3 py-1 bg-red-50 text-red-500 border border-red-100 text-xs font-semibold rounded-full">• {ticketData.status}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <img src={ticketData.agentImg} className="w-5 h-5 rounded-full" alt="assignee" />
                                    <span>Assigned to <span className="font-medium text-gray-700">{ticketData.assignedTo}</span></span>
                                    <span className="text-gray-300">|</span>
                                    <span>Updated 20 hours ago</span>
                                    <span className="text-gray-300">|</span>
                                    <MessageSquare size={14} />
                                    <span>9 Comments</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className={`px-3 py-1 text-white text-xs font-bold rounded-md ${ticketData.priority === 'High' ? 'bg-red-600' : 'bg-gray-500'}`}>• High</span>
                                <div className="relative" onClick={(e) => e.stopPropagation()}>
                                    <button
                                        onClick={() => setShowMarkMenu(!showMarkMenu)}
                                        className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors"
                                    >
                                        Mark as Private <ChevronDown size={14} />
                                    </button>
                                    {showMarkMenu && (
                                        <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1">
                                            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Mark as Private</button>
                                            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Mark as Public</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="text-gray-600 text-sm leading-relaxed space-y-4 mb-8">
                            {ticketData.description.split('\n').map((para, idx) => (
                                <p key={idx}>{para}</p>
                            ))}
                        </div>

                        {/* Comments */}
                        <div className="space-y-6">
                            {ticketData.comments.map((comment) => (
                                <div key={comment.id} className="flex gap-4">
                                    <img src={comment.img} className="w-10 h-10 rounded-full flex-shrink-0" alt="" />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="font-bold text-gray-800 text-sm">{comment.user}</h4>
                                            <span className="text-gray-400 text-xs">Updated {comment.time}</span>
                                        </div>
                                        <p className="text-gray-600 text-sm mb-3">{comment.content}</p>

                                        {/* Attachments */}
                                        {(comment.attachment || comment.attachments) && (
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {comment.attachment && (
                                                    <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded border border-gray-200 cursor-pointer hover:bg-gray-100">
                                                        <span>{comment.attachment}</span> <Download size={12} />
                                                    </div>
                                                )}
                                                {comment.attachments && comment.attachments.map((file, i) => (
                                                    <div key={i} className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded border border-gray-200 cursor-pointer hover:bg-gray-100">
                                                        <span>{file}</span> <Download size={12} />
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div className="flex items-center gap-4 text-xs">
                                            <button className="flex items-center gap-1 text-orange-500 hover:text-orange-600 font-medium">
                                                <Reply size={12} /> Reply
                                            </button>
                                            <span className="text-gray-500 flex items-center gap-1">
                                                <MessageSquare size={12} /> {comment.replies} Comments
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Ticket Sidebar */}
                <div className="w-full xl:w-80 space-y-6 relative">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-3">Ticket Details</h3>

                        <div className="space-y-5">
                            {/* Change Priority */}
                            <div className="relative" onClick={(e) => e.stopPropagation()}>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Change Priority</label>
                                <button
                                    onClick={() => {
                                        setShowPriorityDropdown(!showPriorityDropdown);
                                        setShowAssignDropdown(false);
                                        setShowStatusDropdown(false);
                                    }}
                                    className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                                >
                                    <span>{priority}</span>
                                    <ChevronDown size={16} />
                                </button>
                                {showPriorityDropdown && (
                                    <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1">
                                        {priorities.map(p => (
                                            <button
                                                key={p}
                                                onClick={() => { setPriority(p); setShowPriorityDropdown(false); }}
                                                className={`w-full text-left px-4 py-2 text-sm ${priority === p ? 'bg-orange-500 text-white' : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'}`}
                                            >
                                                {p}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Assign To */}
                            <div className="relative" onClick={(e) => e.stopPropagation()}>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Assign To</label>
                                <button
                                    onClick={() => {
                                        setShowAssignDropdown(!showAssignDropdown);
                                        setShowPriorityDropdown(false);
                                        setShowStatusDropdown(false);
                                    }}
                                    className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                                >
                                    <span>{assignee}</span>
                                    <ChevronDown size={16} />
                                </button>
                                {showAssignDropdown && (
                                    <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1">
                                        {agents.map(a => (
                                            <button
                                                key={a}
                                                onClick={() => { setAssignee(a); setShowAssignDropdown(false); }}
                                                className={`w-full text-left px-4 py-2 text-sm ${assignee === a ? 'bg-orange-500 text-white' : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'}`}
                                            >
                                                {a}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Ticket Status */}
                            <div className="relative" onClick={(e) => e.stopPropagation()}>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Ticket Status</label>
                                <button
                                    onClick={() => {
                                        setShowStatusDropdown(!showStatusDropdown);
                                        setShowPriorityDropdown(false);
                                        setShowAssignDropdown(false);
                                    }}
                                    className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                                >
                                    <span>{status}</span>
                                    <ChevronDown size={16} />
                                </button>
                                {showStatusDropdown && (
                                    <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1">
                                        {statuses.map(s => (
                                            <button
                                                key={s}
                                                onClick={() => { setStatus(s); setShowStatusDropdown(false); }}
                                                className={`w-full text-left px-4 py-2 text-sm ${status === s ? 'bg-orange-500 text-white' : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'}`}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
                            <div className="flex items-center gap-3">
                                <img src={ticketData.userImg} className="w-10 h-10 rounded-full" alt="" />
                                <div>
                                    <p className="text-xs text-gray-500">User</p>
                                    <p className="text-sm font-semibold text-gray-800">{ticketData.user}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <img src={ticketData.agentImg} className="w-10 h-10 rounded-full" alt="" />
                                <div>
                                    <p className="text-xs text-gray-500">Support Agent</p>
                                    <p className="text-sm font-semibold text-gray-800">{ticketData.assignedTo}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-100 space-y-4 text-sm">
                            <div>
                                <p className="text-gray-500 mb-1">Category</p>
                                <p className="font-semibold text-gray-800">Repair & Service</p>
                            </div>
                            <div>
                                <p className="text-gray-500 mb-1">Email</p>
                                <p className="font-semibold text-gray-800 truncate">{ticketData.email}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 mb-1">Last Updated / Closed On</p>
                                <p className="font-semibold text-gray-800">{ticketData.createdDate}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
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
                                    <div className="p-1">
                                        <option>Select</option>
                                        <option>Edgar Hansel</option>
                                        <option>Ann Lynch</option>
                                        <option>Juan Hermann</option>
                                        <option>Jessie Otero</option>
                                    </div>
                                </select>
                                {formData.assignTo !== 'Select' && (
                                    <div className="mt-2 flex gap-2">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                            {formData.assignTo} <button onClick={() => setFormData({ ...formData, assignTo: 'Select' })} className="ml-1 text-gray-400 hover:text-gray-600">x</button>
                                        </span>
                                    </div>
                                )}
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

export default TicketDetails;
