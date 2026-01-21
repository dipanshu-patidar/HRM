import React, { useState } from 'react';
import { Layers, Calendar, Search, Filter, Download } from 'lucide-react';
import ExportButton from '../../components/common/ExportButton';

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

const Projects = () => {
    const mockProjects = [
        {
            id: 'PROJ-001',
            name: 'HRM SaaS Dashboard',
            leader: { name: 'Bernardo Galaviz', avatar: 'https://i.pravatar.cc/150?u=1' },
            team: [
                { name: 'Me', avatar: 'https://ui-avatars.com/api/?name=Employee&background=0D8ABC&color=fff' },
                { name: 'Alice', avatar: 'https://i.pravatar.cc/150?u=2' },
                { name: 'Bob', avatar: 'https://i.pravatar.cc/150?u=3' }
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
                { name: 'Me', avatar: 'https://ui-avatars.com/api/?name=Employee&background=0D8ABC&color=fff' },
                { name: 'Bob', avatar: 'https://i.pravatar.cc/150?u=3' }
            ],
            deadline: '20 Feb 2024',
            priority: 'Medium',
            status: 'Active'
        }
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">My Projects</h1>
                    <div className="text-sm text-gray-500 mt-1">
                        <span className="hover:text-primary cursor-pointer">Dashboard</span> / <span className="text-gray-400">Projects</span>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <ExportButton />
                </div>
            </div>

            {/* Filters Section */}
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-5 bg-primary rounded-full"></div>
                    <h2 className="text-base font-semibold text-gray-800">Project List</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                <th className="px-6 py-3 text-left">Project Name</th>
                                <th className="px-6 py-3 text-left">Leader</th>
                                <th className="px-6 py-3 text-left">Team</th>
                                <th className="px-6 py-3 text-left">Deadline</th>
                                <th className="px-6 py-3 text-left">Priority</th>
                                <th className="px-6 py-3 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {mockProjects.map((project) => (
                                <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-primary flex-shrink-0">
                                                <Layers size={16} />
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-gray-800 block">{project.name}</span>
                                                <span className="text-xs text-gray-500">{project.id}</span>
                                            </div>
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Projects;
