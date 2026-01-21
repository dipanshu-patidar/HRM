import React, { useState } from "react";
import { CheckCircle2, Clock, Calendar, AlertCircle } from "lucide-react";

const Tasks = () => {
    const tasks = [
        { id: 1, title: "Design Dashboard", project: "HRM System", deadline: "2024-02-28", priority: "High", status: "In Progress" },
        { id: 2, title: "Fix Login Bug", project: "HRM System", deadline: "2024-02-20", priority: "High", status: "Open" },
        { id: 3, title: "Create API", project: "E-Commerce", deadline: "2024-03-15", priority: "Medium", status: "Completed" },
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans text-gray-800">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">My Tasks</h1>
                <div className="text-sm text-gray-500 mt-1">Dashboard / Tasks</div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-700 text-sm font-semibold border-b border-gray-200">
                                <th className="p-4">Task Name</th>
                                <th className="p-4">Project</th>
                                <th className="p-4">Deadline</th>
                                <th className="p-4">Priority</th>
                                <th className="p-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {tasks.map((task) => (
                                <tr key={task.id} className="hover:bg-gray-50 transition-colors text-sm text-gray-600">
                                    <td className="p-4 font-medium text-gray-800">{task.title}</td>
                                    <td className="p-4">{task.project}</td>
                                    <td className="p-4">{task.deadline}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${task.priority === 'High' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                                            {task.priority}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${task.status === 'Completed' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                            {task.status}
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

export default Tasks;
