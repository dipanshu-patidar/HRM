import React, { useState } from 'react';
import {
    Layers,
    Users,
    MoreVertical,
    Edit,
    Trash2,
    Download,
    Plus,
    Search,
    Filter,
    ChevronRight,
    Calendar,
    Paperclip,
    X,
    DollarSign,
    ChevronDown,
    Bold,
    Italic,
    Underline,
    Link,
    List as ListIcon,
    AlignLeft,
    Type
} from 'lucide-react';

// --- Reusable Badge Component ---
const Badge = ({ children, type }) => {
    const colors = {
        High: 'bg-red-100 text-red-700',
        Medium: 'bg-orange-100 text-orange-700',
        Low: 'bg-blue-100 text-blue-700',
        Active: 'bg-green-100 text-green-700',
        Inactive: 'bg-gray-100 text-gray-700',
    };
    return (
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${colors[children] || colors[type] || 'bg-gray-100 text-gray-700'}`}>
            {children}
        </span>
    );
};

// --- Reusable Avatar Group Component ---
const AvatarGroup = ({ users, limit = 3 }) => {
    return (
        <div className="flex -space-x-2">
            {users.slice(0, limit).map((user, idx) => (
                <img
                    key={idx}
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src={user.avatar}
                    alt={user.name}
                    title={user.name}
                />
            ))}
            {users.length > limit && (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-600 ring-2 ring-white">
                    +{users.length - limit}
                </div>
            )}
        </div>
    );
};

// --- Add Project Modal Component ---
const AddProjectModal = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState('basic');
    const [logoPreview, setLogoPreview] = useState(null);

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setLogoPreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">Add Project</h3>
                        <p className="text-xs text-gray-500 mt-1">Project ID: <span className="text-primary font-semibold">PROJ-2024-001</span></p>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                        <X size={20} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="px-6 border-b border-gray-200 flex gap-8 bg-white">
                    <button
                        onClick={() => setActiveTab('basic')}
                        className={`py-3 text-sm font-semibold border-b-2 transition-all ${activeTab === 'basic' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        Basic Information
                    </button>
                    <button
                        onClick={() => setActiveTab('members')}
                        className={`py-3 text-sm font-semibold border-b-2 transition-all ${activeTab === 'members' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        Members
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow overflow-y-auto">
                    {activeTab === 'basic' ? (
                        <form className="space-y-6">
                            {/* Logo Upload */}
                            <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <div className="w-20 h-20 rounded-lg bg-white border border-gray-300 flex items-center justify-center overflow-hidden flex-shrink-0 relative group cursor-pointer">
                                    {logoPreview ? (
                                        <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                                    ) : (
                                        <Layers size={32} className="text-gray-400" />
                                    )}
                                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={handleFileChange} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-700 mb-1">Upload Project Logo</h4>
                                    <p className="text-xs text-gray-500 mb-3">Image should be below 4MB</p>
                                    <label className="cursor-pointer px-4 py-2 bg-white border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                        Choose File
                                        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                    </label>
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Name <span className="text-red-500">*</span></label>
                                    <input type="text" placeholder="Enter project name" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-100 focus:border-primary outline-none text-sm" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Client <span className="text-red-500">*</span></label>
                                    <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-100 focus:border-primary outline-none text-sm bg-white">
                                        <option value="">Select Client</option>
                                        <option>Global Tech Solutions</option>
                                        <option>Infinite Media</option>
                                        <option>Nexus Inc.</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority <span className="text-red-500">*</span></label>
                                    <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-100 focus:border-primary outline-none text-sm bg-white">
                                        <option>Low</option>
                                        <option>Medium</option>
                                        <option>High</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date <span className="text-red-500">*</span></label>
                                    <input type="date" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-100 focus:border-primary outline-none text-sm" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date <span className="text-red-500">*</span></label>
                                    <input type="date" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-100 focus:border-primary outline-none text-sm" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Value ($) <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input type="number" placeholder="0.00" className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-100 focus:border-primary outline-none text-sm" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Price Type</label>
                                    <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-100 focus:border-primary outline-none text-sm bg-white">
                                        <option>Fixed Rate</option>
                                        <option>Hourly Rate</option>
                                    </select>
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-100 focus-within:border-primary">
                                        <div className="flex items-center gap-1 p-2 bg-gray-50 border-b border-gray-200">
                                            <button type="button" className="p-1.5 hover:bg-white rounded transition-all text-gray-600"><Bold size={14} /></button>
                                            <button type="button" className="p-1.5 hover:bg-white rounded transition-all text-gray-600"><Italic size={14} /></button>
                                            <button type="button" className="p-1.5 hover:bg-white rounded transition-all text-gray-600"><Underline size={14} /></button>
                                            <div className="w-px h-4 bg-gray-300 mx-1"></div>
                                            <button type="button" className="p-1.5 hover:bg-white rounded transition-all text-gray-600"><ListIcon size={14} /></button>
                                            <button type="button" className="p-1.5 hover:bg-white rounded transition-all text-gray-600"><AlignLeft size={14} /></button>
                                            <button type="button" className="p-1.5 hover:bg-white rounded transition-all text-gray-600"><Link size={14} /></button>
                                        </div>
                                        <textarea rows="4" placeholder="Describe the project objectives and scope..." className="w-full px-4 py-3 outline-none text-sm resize-none"></textarea>
                                    </div>
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Files</label>
                                    <div className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                                        <Paperclip size={24} className="text-gray-400 mb-2" />
                                        <p className="text-sm text-gray-600 font-medium">Click to upload or drag and drop</p>
                                        <p className="text-xs text-gray-500 mt-1">PDF, DOC, ZIP up to 10MB</p>
                                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" multiple />
                                    </div>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h4 className="text-base font-semibold text-gray-700">Select Team Members</h4>
                                <div className="relative w-64">
                                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input type="text" placeholder="Search members..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-100 focus:border-primary outline-none" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <label key={i} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                                        <input type="checkbox" className="w-4 h-4 rounded text-primary focus:ring-primary border-gray-300" />
                                        <img className="w-10 h-10 rounded-full object-cover" src={`https://i.pravatar.cc/150?u=${i + 20}`} alt="Member" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-800 truncate">Employee {i}</p>
                                            <p className="text-xs text-gray-500 truncate">UI/UX Designer</p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3 bg-gray-50">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
                    >
                        Cancel
                    </button>
                    <button className="px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-[#d95a1d] transition-all shadow-sm">
                        Save Project
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Edit Project Modal Component ---
const EditProjectModal = ({ isOpen, onClose, projectData }) => {
    const [activeTab, setActiveTab] = useState('basic');
    const [logoPreview, setLogoPreview] = useState(null);

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setLogoPreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">Edit Project</h3>
                        <p className="text-xs text-gray-500 mt-1">Project ID: <span className="text-primary font-semibold">{projectData?.id}</span></p>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                        <X size={20} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="px-6 border-b border-gray-200 flex gap-8 bg-white">
                    <button
                        onClick={() => setActiveTab('basic')}
                        className={`py-3 text-sm font-semibold border-b-2 transition-all ${activeTab === 'basic' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        Basic Information
                    </button>
                    <button
                        onClick={() => setActiveTab('members')}
                        className={`py-3 text-sm font-semibold border-b-2 transition-all ${activeTab === 'members' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        Members
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow overflow-y-auto">
                    {activeTab === 'basic' ? (
                        <form className="space-y-6">
                            {/* Logo Upload */}
                            <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <div className="w-20 h-20 rounded-lg bg-white border border-gray-300 flex items-center justify-center overflow-hidden flex-shrink-0 relative group cursor-pointer">
                                    {logoPreview ? (
                                        <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                                    ) : (
                                        <Layers size={32} className="text-gray-400" />
                                    )}
                                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={handleFileChange} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-700 mb-1">Update Project Logo</h4>
                                    <p className="text-xs text-gray-500 mb-3">Image should be below 4MB</p>
                                    <label className="cursor-pointer px-4 py-2 bg-white border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                        Choose File
                                        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                    </label>
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Name <span className="text-red-500">*</span></label>
                                    <input type="text" defaultValue={projectData?.name} placeholder="Enter project name" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-100 focus:border-primary outline-none text-sm" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Client <span className="text-red-500">*</span></label>
                                    <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-100 focus:border-primary outline-none text-sm bg-white">
                                        <option value="">Select Client</option>
                                        <option>Global Tech Solutions</option>
                                        <option>Infinite Media</option>
                                        <option>Nexus Inc.</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority <span className="text-red-500">*</span></label>
                                    <select defaultValue={projectData?.priority} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-100 focus:border-primary outline-none text-sm bg-white">
                                        <option>Low</option>
                                        <option>Medium</option>
                                        <option>High</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date <span className="text-red-500">*</span></label>
                                    <input type="date" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-100 focus:border-primary outline-none text-sm" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date <span className="text-red-500">*</span></label>
                                    <input type="date" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-100 focus:border-primary outline-none text-sm" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Value ($) <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input type="number" placeholder="0.00" className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-100 focus:border-primary outline-none text-sm" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Price Type</label>
                                    <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-100 focus:border-primary outline-none text-sm bg-white">
                                        <option>Fixed Rate</option>
                                        <option>Hourly Rate</option>
                                    </select>
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-100 focus-within:border-primary">
                                        <div className="flex items-center gap-1 p-2 bg-gray-50 border-b border-gray-200">
                                            <button type="button" className="p-1.5 hover:bg-white rounded transition-all text-gray-600"><Bold size={14} /></button>
                                            <button type="button" className="p-1.5 hover:bg-white rounded transition-all text-gray-600"><Italic size={14} /></button>
                                            <button type="button" className="p-1.5 hover:bg-white rounded transition-all text-gray-600"><Underline size={14} /></button>
                                            <div className="w-px h-4 bg-gray-300 mx-1"></div>
                                            <button type="button" className="p-1.5 hover:bg-white rounded transition-all text-gray-600"><ListIcon size={14} /></button>
                                            <button type="button" className="p-1.5 hover:bg-white rounded transition-all text-gray-600"><AlignLeft size={14} /></button>
                                            <button type="button" className="p-1.5 hover:bg-white rounded transition-all text-gray-600"><Link size={14} /></button>
                                        </div>
                                        <textarea rows="4" placeholder="Describe the project objectives and scope..." className="w-full px-4 py-3 outline-none text-sm resize-none"></textarea>
                                    </div>
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Files</label>
                                    <div className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                                        <Paperclip size={24} className="text-gray-400 mb-2" />
                                        <p className="text-sm text-gray-600 font-medium">Click to upload or drag and drop</p>
                                        <p className="text-xs text-gray-500 mt-1">PDF, DOC, ZIP up to 10MB</p>
                                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" multiple />
                                    </div>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h4 className="text-base font-semibold text-gray-700">Select Team Members</h4>
                                <div className="relative w-64">
                                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input type="text" placeholder="Search members..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-100 focus:border-primary outline-none" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <label key={i} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                                        <input type="checkbox" className="w-4 h-4 rounded text-primary focus:ring-primary border-gray-300" />
                                        <img className="w-10 h-10 rounded-full object-cover" src={`https://i.pravatar.cc/150?u=${i + 20}`} alt="Member" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-800 truncate">Employee {i}</p>
                                            <p className="text-xs text-gray-500 truncate">UI/UX Designer</p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3 bg-gray-50">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
                    >
                        Cancel
                    </button>
                    <button className="px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-[#d95a1d] transition-all shadow-sm">
                        Update Project
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Delete Confirmation Modal Component ---
const DeleteConfirmationModal = ({ isOpen, onClose, projectName }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 relative animate-fade-in-up">
                <div className="p-6 text-center">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Delete Project</h3>
                    <p className="text-gray-500 mb-6 font-medium">Are you sure you want to delete <span className="text-gray-800 font-bold">{projectName}</span>? This action cannot be undone.</p>
                    <div className="flex gap-3 justify-center">
                        <button onClick={onClose} className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm">Cancel</button>
                        <button className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors text-sm shadow-sm">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Main ProjectsList Component ---
const ProjectList = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedProjects, setSelectedProjects] = useState([]);

    const mockProjects = [
        {
            id: 'PROJ-001',
            name: 'HRM SaaS Dashboard',
            leader: { name: 'Bernardo Galaviz', avatar: 'https://i.pravatar.cc/150?u=1' },
            team: [
                { name: 'Alice', avatar: 'https://i.pravatar.cc/150?u=2' },
                { name: 'Bob', avatar: 'https://i.pravatar.cc/150?u=3' },
                { name: 'Charlie', avatar: 'https://i.pravatar.cc/150?u=4' },
                { name: 'David', avatar: 'https://i.pravatar.cc/150?u=5' }
            ],
            deadline: '15 Jan 2024',
            priority: 'High',
            status: 'Active'
        },
        {
            id: 'PROJ-002',
            name: 'Coffee Shop Website',
            leader: { name: 'Lesley Grauer', avatar: 'https://i.pravatar.cc/150?u=6' },
            team: [
                { name: 'Alice', avatar: 'https://i.pravatar.cc/150?u=2' },
                { name: 'Bob', avatar: 'https://i.pravatar.cc/150?u=3' }
            ],
            deadline: '20 Feb 2024',
            priority: 'Medium',
            status: 'Active'
        },
        {
            id: 'PROJ-003',
            name: 'Inventory App',
            leader: { name: 'Jeffery Webb', avatar: 'https://i.pravatar.cc/150?u=7' },
            team: [
                { name: 'Alice', avatar: 'https://i.pravatar.cc/150?u=2' },
                { name: 'Bob', avatar: 'https://i.pravatar.cc/150?u=3' },
                { name: 'Charlie', avatar: 'https://i.pravatar.cc/150?u=4' }
            ],
            deadline: '10 Mar 2024',
            priority: 'Low',
            status: 'Inactive'
        }
    ];

    const handleEdit = (project) => {
        setSelectedProject(project);
        setIsEditModalOpen(true);
    };

    const handleDelete = (project) => {
        setSelectedProject(project);
        setIsDeleteModalOpen(true);
    };

    const toggleProjectSelection = (id) => {
        setSelectedProjects(prev =>
            prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
        );
    };

    return (
        <div className="p-6">
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Projects</h1>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all">
                        <Download size={18} />
                        <span>Export</span>
                    </button>

                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-[#d95a1d] transition-all shadow-sm"
                    >
                        <Plus size={18} />
                        <span>Add Project</span>
                    </button>
                </div>
            </div>

            {/* Filters Section */}
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-5 bg-primary rounded-full"></div>
                    <h2 className="text-base font-semibold text-gray-800">Project List</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-2">Search</label>
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input type="text" placeholder="Search projects..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-orange-100 focus:border-primary outline-none" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-2">Status</label>
                        <select className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-orange-100 focus:border-primary outline-none">
                            <option>All Status</option>
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-2">Sort By</label>
                        <select className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-orange-100 focus:border-primary outline-none">
                            <option>Last 7 Days</option>
                            <option>Newest First</option>
                            <option>Deadline</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-2">Rows</label>
                        <select className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-orange-100 focus:border-primary outline-none">
                            <option>10 Rows</option>
                            <option>25 Rows</option>
                            <option>50 Rows</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                <th className="px-6 py-3 text-center w-12">
                                    <input type="checkbox" className="w-4 h-4 rounded text-primary focus:ring-primary border-gray-300" />
                                </th>
                                <th className="px-6 py-3 text-left">ID</th>
                                <th className="px-6 py-3 text-left">Project Name</th>
                                <th className="px-6 py-3 text-left">Leader</th>
                                <th className="px-6 py-3 text-left">Team</th>
                                <th className="px-6 py-3 text-left">Deadline</th>
                                <th className="px-6 py-3 text-left">Priority</th>
                                <th className="px-6 py-3 text-left">Status</th>
                                <th className="px-6 py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {mockProjects.map((project) => (
                                <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedProjects.includes(project.id)}
                                            onChange={() => toggleProjectSelection(project.id)}
                                            className="w-4 h-4 rounded text-primary focus:ring-primary border-gray-300"
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs font-medium text-gray-500">{project.id}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-primary flex-shrink-0">
                                                <Layers size={16} />
                                            </div>
                                            <span className="text-sm font-medium text-gray-800">{project.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <img className="w-8 h-8 rounded-full object-cover" src={project.leader.avatar} alt={project.leader.name} />
                                            <span className="text-sm text-gray-700">{project.leader.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <AvatarGroup users={project.team} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Calendar size={14} className="text-gray-400" />
                                            {project.deadline}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge type={project.priority}>{project.priority}</Badge>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${project.status === 'Active' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                            <span className={`text-xs font-medium ${project.status === 'Active' ? 'text-green-600' : 'text-gray-500'}`}>{project.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => handleEdit(project)}
                                                className="p-1.5 text-gray-400 hover:text-primary hover:bg-orange-50 rounded-lg transition-all"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(project)}
                                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-white">
                    <span className="text-sm text-gray-600">
                        Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of <span className="font-medium">45</span> projects
                    </span>
                    <div className="flex items-center gap-2">
                        <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all">Previous</button>
                        <button className="w-8 h-8 bg-primary text-white rounded-lg text-sm font-medium">1</button>
                        <button className="w-8 h-8 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium transition-all">2</button>
                        <button className="w-8 h-8 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium transition-all">3</button>
                        <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all">Next</button>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <AddProjectModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
            <EditProjectModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} projectData={selectedProject} />
            <DeleteConfirmationModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} projectName={selectedProject?.name} />
        </div>
    );
};

export default ProjectList;
