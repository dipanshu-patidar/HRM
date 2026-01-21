import React, { useState } from 'react';
import {
    Plus,
    GripVertical,
    Star,
    MoreVertical,
    Calendar,
    DollarSign,
    Clock,
    User,
    X,
    Upload,
    ChevronDown,
    Layers,
    CheckCircle2,
    Edit,
    Trash2,
    Eye
} from 'lucide-react';

// --- Badge Component ---
const Badge = ({ children, type }) => {
    const colors = {
        High: 'bg-red-100 text-red-700',
        Medium: 'bg-orange-100 text-orange-700',
        Low: 'bg-blue-100 text-blue-700',
        Onhold: 'bg-yellow-100 text-yellow-700',
        Inprogress: 'bg-blue-100 text-blue-700',
        Pending: 'bg-gray-100 text-gray-700',
        Completed: 'bg-green-100 text-green-700',
        'Web Design': 'bg-purple-100 text-purple-700',
        Social: 'bg-pink-100 text-pink-700',
        Research: 'bg-cyan-100 text-cyan-700',
        Development: 'bg-indigo-100 text-indigo-700',
    };
    return (
        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${colors[children] || colors[type] || 'bg-gray-100 text-gray-700'}`}>
            {children}
        </span>
    );
};

// --- Avatar Group Component ---
const AvatarGroup = ({ users, limit = 3 }) => {
    return (
        <div className="flex -space-x-2">
            {users.slice(0, limit).map((user, idx) => (
                <img
                    key={idx}
                    className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover"
                    src={user.avatar}
                    alt={user.name}
                    title={user.name}
                />
            ))}
            {users.length > limit && (
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-600 ring-2 ring-white">
                    +{users.length - limit}
                </div>
            )}
        </div>
    );
};

// --- Project Summary Card Component ---
const ProjectSummaryCard = ({ project }) => {
    const completionPercentage = Math.round((project.completedTasks / project.totalTasks) * 100);

    return (
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center text-primary flex-shrink-0">
                    <Layers size={24} />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-gray-800 truncate">{project.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                        {project.completedTasks} / {project.totalTasks} Tasks Completed
                    </p>
                </div>
            </div>

            <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-2">
                        <Calendar size={14} className="text-gray-400" />
                        Deadline
                    </span>
                    <span className="font-medium text-gray-800">{project.deadline}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-2">
                        <DollarSign size={14} className="text-gray-400" />
                        Value
                    </span>
                    <span className="font-medium text-gray-800">${project.value}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-2">
                        <Clock size={14} className="text-gray-400" />
                        Total Hours
                    </span>
                    <span className="font-medium text-gray-800">{project.totalHours}h</span>
                </div>
            </div>

            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
                <img className="w-8 h-8 rounded-full object-cover" src={project.lead.avatar} alt={project.lead.name} />
                <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500">Project Lead</p>
                    <p className="text-sm font-medium text-gray-800 truncate">{project.lead.name}</p>
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-600">Progress</span>
                    <span className="text-xs font-bold text-primary">{completionPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${completionPercentage}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

// --- Task Item Component ---
const TaskItem = ({ task, onToggle, onEdit, onDelete, onView }) => {
    const [showDropdown, setShowDropdown] = React.useState(false);
    const dropdownRef = React.useRef(null);

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="flex items-center gap-3 p-4 bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors group">
            <GripVertical size={18} className="text-gray-300 cursor-move flex-shrink-0" />
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
                className="w-4 h-4 rounded text-primary focus:ring-primary border-gray-300 flex-shrink-0"
            />
            <Star size={16} className={`flex-shrink-0 cursor-pointer ${task.starred ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />

            <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                    <h4 className={`text-sm font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                        {task.title}
                    </h4>
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Calendar size={12} />
                            {task.dueDate}
                        </span>
                        <Badge type={task.category}>{task.category}</Badge>
                        <Badge type={task.status}>{task.status}</Badge>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
                <AvatarGroup users={task.assignedTo} limit={3} />
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="p-1 text-gray-400 hover:text-gray-600 rounded"
                    >
                        <MoreVertical size={18} />
                    </button>
                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                            <button
                                onClick={() => {
                                    onEdit(task);
                                    setShowDropdown(false);
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                            >
                                <Edit size={14} className="text-primary" />
                                Edit
                            </button>
                            <button
                                onClick={() => {
                                    onDelete(task);
                                    setShowDropdown(false);
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                            >
                                <Trash2 size={14} className="text-red-600" />
                                Delete
                            </button>
                            <button
                                onClick={() => {
                                    onView(task);
                                    setShowDropdown(false);
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                            >
                                <Eye size={14} className="text-blue-600" />
                                View
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Add Task Modal Component ---
const AddTaskModal = ({ isOpen, onClose }) => {
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    if (!isOpen) return null;

    const teamMembers = [
        { id: 1, name: 'John Doe', avatar: 'https://i.pravatar.cc/150?u=1' },
        { id: 2, name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?u=2' },
        { id: 3, name: 'Mike Johnson', avatar: 'https://i.pravatar.cc/150?u=3' },
    ];

    const availableTags = ['Web Design', 'Social', 'Research', 'Development', 'Marketing'];

    const toggleMember = (memberId) => {
        setSelectedMembers(prev =>
            prev.includes(memberId) ? prev.filter(id => id !== memberId) : [...prev, memberId]
        );
    };

    const toggleTag = (tag) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col my-8">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
                    <h3 className="text-xl font-bold text-gray-800">Add New Task</h3>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow overflow-y-auto">
                    <form className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter task title"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-100 focus:border-primary outline-none text-sm"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Due Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-100 focus:border-primary outline-none text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Project <span className="text-red-500">*</span>
                                </label>
                                <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-100 focus:border-primary outline-none text-sm bg-white">
                                    <option value="">Select Project</option>
                                    <option>HRM Dashboard</option>
                                    <option>Coffee Shop Website</option>
                                    <option>Inventory App</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Team Members</label>
                            <div className="border border-gray-300 rounded-lg p-3">
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {selectedMembers.map(memberId => {
                                        const member = teamMembers.find(m => m.id === memberId);
                                        return (
                                            <span key={memberId} className="inline-flex items-center gap-1 px-3 py-1 bg-orange-50 text-primary rounded-full text-sm">
                                                {member.name}
                                                <button type="button" onClick={() => toggleMember(memberId)} className="hover:text-red-600">
                                                    <X size={14} />
                                                </button>
                                            </span>
                                        );
                                    })}
                                </div>
                                <div className="space-y-2">
                                    {teamMembers.map(member => (
                                        <label key={member.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedMembers.includes(member.id)}
                                                onChange={() => toggleMember(member.id)}
                                                className="w-4 h-4 rounded text-primary focus:ring-primary border-gray-300"
                                            />
                                            <img className="w-8 h-8 rounded-full" src={member.avatar} alt={member.name} />
                                            <span className="text-sm text-gray-700">{member.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                            <div className="flex flex-wrap gap-2">
                                {availableTags.map(tag => (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() => toggleTag(tag)}
                                        className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${selectedTags.includes(tag)
                                            ? 'bg-primary text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status <span className="text-red-500">*</span>
                                </label>
                                <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-100 focus:border-primary outline-none text-sm bg-white">
                                    <option>Pending</option>
                                    <option>Inprogress</option>
                                    <option>Onhold</option>
                                    <option>Completed</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Priority <span className="text-red-500">*</span>
                                </label>
                                <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-100 focus:border-primary outline-none text-sm bg-white">
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Who Can See this Task</label>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="visibility" value="public" defaultChecked className="w-4 h-4 text-primary focus:ring-primary border-gray-300" />
                                    <span className="text-sm text-gray-700">Public</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="visibility" value="private" className="w-4 h-4 text-primary focus:ring-primary border-gray-300" />
                                    <span className="text-sm text-gray-700">Private</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="visibility" value="admin" className="w-4 h-4 text-primary focus:ring-primary border-gray-300" />
                                    <span className="text-sm text-gray-700">Admin Only</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                                rows="4"
                                placeholder="Enter task description..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-100 focus:border-primary outline-none text-sm resize-none"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Attachment</label>
                            <div className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                                <Upload size={24} className="text-gray-400 mb-2" />
                                <p className="text-sm text-gray-600 font-medium">Click to upload or drag and drop</p>
                                <p className="text-xs text-gray-500 mt-1">PDF, DOC, ZIP up to 10MB</p>
                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" multiple />
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3 bg-gray-50 flex-shrink-0">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
                    >
                        Cancel
                    </button>
                    <button className="px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-[#d95a1d] transition-all shadow-sm">
                        Add New Task
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Edit Task Modal Component ---
const EditTaskModal = ({ isOpen, onClose, taskData }) => {
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    if (!isOpen) return null;

    const teamMembers = [
        { id: 1, name: 'John Doe', avatar: 'https://i.pravatar.cc/150?u=1' },
        { id: 2, name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?u=2' },
        { id: 3, name: 'Mike Johnson', avatar: 'https://i.pravatar.cc/150?u=3' },
    ];

    const availableTags = ['Web Design', 'Social', 'Research', 'Development', 'Marketing'];

    const toggleMember = (memberId) => {
        setSelectedMembers(prev =>
            prev.includes(memberId) ? prev.filter(id => id !== memberId) : [...prev, memberId]
        );
    };

    const toggleTag = (tag) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col my-8">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
                    <h3 className="text-xl font-bold text-gray-800">Edit Task</h3>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 flex-grow overflow-y-auto">
                    <form className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                defaultValue={taskData?.title}
                                placeholder="Enter task title"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-100 focus:border-primary outline-none text-sm"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Due Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-100 focus:border-primary outline-none text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Project <span className="text-red-500">*</span>
                                </label>
                                <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-100 focus:border-primary outline-none text-sm bg-white">
                                    <option value="">Select Project</option>
                                    <option>HRM Dashboard</option>
                                    <option>Coffee Shop Website</option>
                                    <option>Inventory App</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status <span className="text-red-500">*</span>
                                </label>
                                <select defaultValue={taskData?.status} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-100 focus:border-primary outline-none text-sm bg-white">
                                    <option>Pending</option>
                                    <option>Inprogress</option>
                                    <option>Onhold</option>
                                    <option>Completed</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Priority <span className="text-red-500">*</span>
                                </label>
                                <select defaultValue={taskData?.priority} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-100 focus:border-primary outline-none text-sm bg-white">
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                                rows="4"
                                placeholder="Enter task description..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-100 focus:border-primary outline-none text-sm resize-none"
                            ></textarea>
                        </div>
                    </form>
                </div>

                <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3 bg-gray-50 flex-shrink-0">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
                    >
                        Cancel
                    </button>
                    <button className="px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-[#d95a1d] transition-all shadow-sm">
                        Update Task
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Delete Confirmation Modal Component ---
const DeleteConfirmationModal = ({ isOpen, onClose, taskTitle }) => {
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
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Delete Task</h3>
                    <p className="text-gray-500 mb-6 font-medium">Are you sure you want to delete <span className="text-gray-800 font-bold">{taskTitle}</span>? This action cannot be undone.</p>
                    <div className="flex gap-3 justify-center">
                        <button onClick={onClose} className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm">Cancel</button>
                        <button className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors text-sm shadow-sm">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- View Task Modal Component ---
const ViewTaskModal = ({ isOpen, onClose, taskData }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
                    <h3 className="text-xl font-bold text-gray-800">Task Details</h3>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 flex-grow overflow-y-auto">
                    <div className="space-y-4">
                        <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Title</h4>
                            <p className="text-base font-semibold text-gray-800">{taskData?.title}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h4 className="text-sm font-medium text-gray-500 mb-1">Due Date</h4>
                                <p className="text-sm text-gray-800 flex items-center gap-2">
                                    <Calendar size={14} className="text-gray-400" />
                                    {taskData?.dueDate}
                                </p>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-gray-500 mb-1">Category</h4>
                                <Badge type={taskData?.category}>{taskData?.category}</Badge>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h4 className="text-sm font-medium text-gray-500 mb-1">Status</h4>
                                <Badge type={taskData?.status}>{taskData?.status}</Badge>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-gray-500 mb-1">Priority</h4>
                                <Badge type={taskData?.priority}>{taskData?.priority}</Badge>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-2">Assigned To</h4>
                            <div className="flex flex-wrap gap-3">
                                {taskData?.assignedTo.map((user, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                        <img className="w-8 h-8 rounded-full" src={user.avatar} alt={user.name} />
                                        <span className="text-sm text-gray-700">{user.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Completion Status</h4>
                            <p className="text-sm text-gray-800">{taskData?.completed ? 'Completed' : 'Not Completed'}</p>
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3 bg-gray-50 flex-shrink-0">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Main ProjectTask Component ---
const ProjectTask = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: 'Design new landing page',
            dueDate: 'Jan 25',
            category: 'Web Design',
            status: 'Inprogress',
            priority: 'High',
            completed: false,
            starred: true,
            assignedTo: [
                { name: 'User 1', avatar: 'https://i.pravatar.cc/150?u=1' },
                { name: 'User 2', avatar: 'https://i.pravatar.cc/150?u=2' }
            ]
        },
        {
            id: 2,
            title: 'Create social media campaign',
            dueDate: 'Jan 28',
            category: 'Social',
            status: 'Pending',
            priority: 'Medium',
            completed: false,
            starred: false,
            assignedTo: [
                { name: 'User 3', avatar: 'https://i.pravatar.cc/150?u=3' }
            ]
        },
        {
            id: 3,
            title: 'Research competitor analysis',
            dueDate: 'Jan 30',
            category: 'Research',
            status: 'Onhold',
            priority: 'Low',
            completed: false,
            starred: false,
            assignedTo: [
                { name: 'User 4', avatar: 'https://i.pravatar.cc/150?u=4' },
                { name: 'User 5', avatar: 'https://i.pravatar.cc/150?u=5' },
                { name: 'User 6', avatar: 'https://i.pravatar.cc/150?u=6' }
            ]
        },
        {
            id: 4,
            title: 'Implement authentication module',
            dueDate: 'Feb 02',
            category: 'Development',
            status: 'Inprogress',
            priority: 'High',
            completed: false,
            starred: true,
            assignedTo: [
                { name: 'User 7', avatar: 'https://i.pravatar.cc/150?u=7' }
            ]
        },
        {
            id: 5,
            title: 'Update project documentation',
            dueDate: 'Feb 05',
            category: 'Research',
            status: 'Completed',
            priority: 'Low',
            completed: true,
            starred: false,
            assignedTo: [
                { name: 'User 8', avatar: 'https://i.pravatar.cc/150?u=8' }
            ]
        }
    ]);

    const projects = [
        {
            id: 1,
            name: 'HRM Dashboard',
            totalTasks: 43,
            completedTasks: 41,
            deadline: '15 Jan 2024',
            value: '50,000',
            totalHours: 320,
            lead: { name: 'Bernardo Galaviz', avatar: 'https://i.pravatar.cc/150?u=1' }
        },
        {
            id: 2,
            name: 'Coffee Shop Website',
            totalTasks: 28,
            completedTasks: 15,
            deadline: '20 Feb 2024',
            value: '25,000',
            totalHours: 180,
            lead: { name: 'Lesley Grauer', avatar: 'https://i.pravatar.cc/150?u=6' }
        },
        {
            id: 3,
            name: 'Inventory App',
            totalTasks: 35,
            completedTasks: 10,
            deadline: '10 Mar 2024',
            value: '35,000',
            totalHours: 240,
            lead: { name: 'Jeffery Webb', avatar: 'https://i.pravatar.cc/150?u=7' }
        }
    ];

    const handleToggleTask = (taskId) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const handleEdit = (task) => {
        setSelectedTask(task);
        setIsEditModalOpen(true);
    };

    const handleDelete = (task) => {
        setSelectedTask(task);
        setIsDeleteModalOpen(true);
    };

    const handleView = (task) => {
        setSelectedTask(task);
        setIsViewModalOpen(true);
    };

    const completedTasksCount = tasks.filter(t => t.completed).length;
    const completionPercentage = Math.round((completedTasksCount / tasks.length) * 100);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Tasks</h1>
                </div>

                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-[#d95a1d] transition-all shadow-sm lg:w-auto w-full"
                >
                    <Plus size={18} />
                    <span>Add Task</span>
                </button>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Section - Project Summary Cards */}
                <div className="lg:col-span-1 space-y-4">
                    <h2 className="text-base font-semibold text-gray-800 mb-4">Projects</h2>
                    {projects.map(project => (
                        <ProjectSummaryCard key={project.id} project={project} />
                    ))}
                </div>

                {/* Right Section - Task List */}
                <div className="lg:col-span-2">
                    {/* Filters */}
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-2">Priority</label>
                                <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-orange-100 focus:border-primary outline-none">
                                    <option>All</option>
                                    <option>High</option>
                                    <option>Medium</option>
                                    <option>Low</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-2">Due Date</label>
                                <input
                                    type="date"
                                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-orange-100 focus:border-primary outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-2">Tag</label>
                                <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-orange-100 focus:border-primary outline-none">
                                    <option>All Tags</option>
                                    <option>Web Design</option>
                                    <option>Social</option>
                                    <option>Research</option>
                                    <option>Development</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-2">Sort By</label>
                                <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-orange-100 focus:border-primary outline-none">
                                    <option>Created Date</option>
                                    <option>Due Date</option>
                                    <option>Priority</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Task List Card */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        {/* Card Header */}
                        <div className="p-5 border-b border-gray-200">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-gray-800">HRM Dashboard</h3>
                                <span className="text-sm text-gray-600">
                                    Tasks Done: <span className="font-bold text-primary">{completedTasksCount} / {tasks.length}</span>
                                </span>
                            </div>

                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-medium text-gray-600">Progress</span>
                                    <span className="text-xs font-bold text-primary">{completionPercentage}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-primary h-2 rounded-full transition-all"
                                        style={{ width: `${completionPercentage}%` }}
                                    ></div>
                                </div>
                            </div>

                            <button className="flex items-center gap-2 text-sm font-medium text-primary hover:text-[#d95a1d] transition-colors">
                                <CheckCircle2 size={16} />
                                Mark All as Completed
                            </button>
                        </div>

                        {/* Task List */}
                        <div className="divide-y divide-gray-100">
                            {tasks.map(task => (
                                <TaskItem
                                    key={task.id}
                                    task={task}
                                    onToggle={handleToggleTask}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                    onView={handleView}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <AddTaskModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
            <EditTaskModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} taskData={selectedTask} />
            <DeleteConfirmationModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} taskTitle={selectedTask?.title} />
            <ViewTaskModal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} taskData={selectedTask} />
        </div>
    );
};

export default ProjectTask;
