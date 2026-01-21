import React, { useState } from "react";
import { Plus, Search, Edit, Trash2, X, ChevronDown, Download, GraduationCap, Phone, Mail, MapPin } from "lucide-react";
import ExportButton from "../../../components/common/ExportButton";

const Trainers = () => {
    // Mock Data
    const [trainers, setTrainers] = useState([
        {
            id: 1,
            name: "Anthony Lewis",
            firstName: "Anthony",
            lastName: "Lewis",
            avatar: "https://ui-avatars.com/api/?name=Anthony+Lewis&background=random",
            phone: "(123) 4567 890",
            email: "anthony@example.com",
            role: "Leadership Trainer",
            description: "Anthony is a trainer known for his expertise in leadership development.",
            status: "Active"
        },
        {
            id: 2,
            name: "Brian Villalobos",
            firstName: "Brian",
            lastName: "Villalobos",
            avatar: "https://ui-avatars.com/api/?name=Brian+Villalobos&background=random",
            phone: "(179) 7382 829",
            email: "brian@example.com",
            role: "Technical Trainer",
            description: "Brian is a trainer who excels in teaching advanced technical skills.",
            status: "Active"
        },
        {
            id: 3,
            name: "Harvey Smith",
            firstName: "Harvey",
            lastName: "Smith",
            avatar: "https://ui-avatars.com/api/?name=Harvey+Smith&background=random",
            phone: "(184) 2719 738",
            email: "harvey@example.com",
            role: "Soft Skills Trainer",
            description: "Harvey is a trainer known for his expertise in conflict resolution.",
            status: "Active"
        },
        {
            id: 4,
            name: "Stephan Peralt",
            firstName: "Stephan",
            lastName: "Peralt",
            avatar: "https://ui-avatars.com/api/?name=Stephan+Peralt&background=random",
            phone: "(193) 7839 748",
            email: "peral@example.com",
            role: "Innovation Trainer",
            description: "Stephan is a trainer who enhances creative problem-solving skills.",
            status: "Active"
        },
        {
            id: 5,
            name: "Doglas Martini",
            firstName: "Doglas",
            lastName: "Martini",
            avatar: "https://ui-avatars.com/api/?name=Doglas+Martini&background=random",
            phone: "(183) 9302 890",
            email: "martiniwr@example.com",
            role: "Project Management Trainer",
            description: "Doglas is a trainer who enhances project management skills.",
            status: "Active"
        }
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState("Last 7 Days");

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        role: "",
        phone: "",
        email: "",
        description: "",
        status: "Active"
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const openAddModal = () => {
        setEditingItem(null);
        setFormData({ firstName: "", lastName: "", role: "", phone: "", email: "", description: "", status: "Active" });
        setIsModalOpen(true);
    };

    const openEditModal = (item) => {
        setEditingItem(item);
        setFormData({
            firstName: item.firstName,
            lastName: item.lastName,
            role: item.role || "",
            phone: item.phone,
            email: item.email,
            description: item.description,
            status: item.status
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingItem) {
            setTrainers(trainers.map(t => t.id === editingItem.id ? {
                ...t,
                ...formData,
                name: `${formData.firstName} ${formData.lastName}`,
                avatar: `https://ui-avatars.com/api/?name=${formData.firstName}+${formData.lastName}&background=random`
            } : t));
        } else {
            const newItem = {
                id: Date.now(),
                ...formData,
                name: `${formData.firstName} ${formData.lastName}`,
                avatar: `https://ui-avatars.com/api/?name=${formData.firstName}+${formData.lastName}&background=random`
            };
            setTrainers([...trainers, newItem]);
        }
        setIsModalOpen(false);
        setEditingItem(null);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans text-gray-800">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Trainers</h1>
                    <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                        <GraduationCap size={14} className="text-gray-400" />
                        <span className="hover:text-primary cursor-pointer">Performance</span> / <span className="text-gray-400">Trainers</span>
                    </div>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0 items-center">
                    <button
                        onClick={openAddModal}
                        className="bg-[#FF6B00] hover:bg-[#e66000] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm font-medium"
                    >
                        <Plus size={18} />
                        Add Trainer
                    </button>
                    <ExportButton />
                </div>
            </div>

            {/* Content Table Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-lg font-bold text-gray-800">Trainers List</h2>
                    <div className="relative">
                        <button
                            onClick={() => setIsSortOpen(!isSortOpen)}
                            className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors bg-white font-medium min-w-[160px] justify-between"
                        >
                            Sort By : {selectedSort}
                            <ChevronDown size={14} className={`transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isSortOpen && (
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-30 overflow-hidden animate-in fade-in zoom-in duration-200">
                                {["Today", "Yesterday", "Last 7 Days", "This Month"].map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => { setSelectedSort(option); setIsSortOpen(false); }}
                                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors border-b border-gray-50 last:border-0 ${selectedSort === option ? 'bg-[#FF6B00] text-white font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Row Per Page</span>
                        <select className="border border-gray-300 rounded-md text-sm cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary p-1 bg-white">
                            <option>10</option>
                            <option>20</option>
                        </select>
                        <span className="text-sm text-gray-600">Entries</span>
                    </div>
                    <div className="relative w-full sm:w-64">
                        <input
                            type="text"
                            placeholder="Search"
                            className="pl-3 pr-10 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary w-full bg-white transition-all"
                        />
                        <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100/50 text-gray-700 text-sm font-semibold border-b border-gray-200 uppercase tracking-wider">
                                <th className="p-4 w-12"><input type="checkbox" className="rounded" /></th>
                                <th className="p-4">Name</th>
                                <th className="p-4">Phone</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Description</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {trainers.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors text-sm">
                                    <td className="p-4"><input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" /></td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <img src={item.avatar} alt={item.name} className="w-9 h-9 rounded-full border border-gray-200 object-cover" />
                                            <span className="font-bold text-gray-800">{item.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-500 font-medium">{item.phone}</td>
                                    <td className="p-4 text-gray-500 font-medium">{item.email}</td>
                                    <td className="p-4 text-gray-500 font-medium max-w-[300px] truncate">{item.description}</td>
                                    <td className="p-4">
                                        <span className="bg-green-100 text-green-600 border border-green-200 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 w-fit uppercase">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2 text-gray-400">
                                            <button onClick={() => openEditModal(item)} className="p-1.5 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"><Edit size={16} /></button>
                                            <button className="p-1.5 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-gray-100 overflow-hidden text-[12px] font-medium text-gray-500">
                    <div>Showing 1 - {trainers.length} of {trainers.length} entries</div>
                    <div className="flex items-center gap-1">
                        <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 rounded-lg transition-colors rotate-90"><ChevronDown size={14} /></button>
                        <button className="w-8 h-8 flex items-center justify-center bg-[#FF6B00] text-white rounded-full text-xs font-bold">1</button>
                        <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 rounded-lg transition-colors -rotate-90"><ChevronDown size={14} /></button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-y-auto max-h-[95vh] custom-scrollbar animate-in zoom-in duration-200">
                        <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white">
                            <h2 className="text-xl font-bold text-[#1F2937]">{editingItem ? 'Edit Trainer' : 'Add Trainer'}</h2>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 hover:bg-gray-100 rounded-full">
                                <X size={22} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700">First Name</label>
                                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700">Last Name</label>
                                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700">Role</label>
                                    <input type="text" name="role" value={formData.role} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700">Phone</label>
                                    <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm" />
                                </div>
                            </div>
                            <div className="space-y-1.5 mb-4">
                                <label className="text-sm font-bold text-gray-700">Email</label>
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm" />
                            </div>
                            <div className="space-y-1.5 mb-4">
                                <label className="text-sm font-bold text-gray-700">Description</label>
                                <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm resize-none"></textarea>
                            </div>
                            <div className="space-y-1.5 mb-6">
                                <label className="text-sm font-bold text-gray-700">Status</label>
                                <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white text-sm">
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <button type="button" onClick={closeModal} className="px-6 py-2 bg-gray-50 text-gray-700 rounded-lg font-bold hover:bg-gray-100 transition-colors border border-gray-200 text-sm">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-[#FF6B00] hover:bg-[#e66000] text-white rounded-lg font-bold transition-colors shadow-sm text-sm">{editingItem ? 'Update' : 'Add Trainer'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Trainers;
