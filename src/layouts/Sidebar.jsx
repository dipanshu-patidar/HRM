import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
    LayoutDashboard,
    Layers,
    Users,
    Ticket,
    Calendar,
    Clock,
    BarChart,
    GraduationCap,
    Briefcase,
    DollarSign,
    User,
    ChevronDown,
    ChevronRight,
    FileText,
    UserPlus,
    Building,
    ClipboardList,
    BookOpen
} from "lucide-react";
import clsx from "clsx";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { isAdmin } = useAuth();
    const location = useLocation();
    const [expandedMenus, setExpandedMenus] = useState({
        "Employees": true,
        "Projects": true
    });

    const toggleSubMenu = (label) => {
        setExpandedMenus((prev) => ({
            ...prev,
            [label]: !prev[label],
        }));
    };

    const adminMenu = [
        { type: "header", label: "Main" },
        { type: "link", label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },

        { type: "header", label: "PROJECTS" },
        { type: "link", label: "Clients", path: "/admin/projects/clients", icon: Users },
        {
            type: "dropdown",
            label: "Projects",
            icon: Layers,
            subItems: [
                { label: "Projects", path: "/admin/projects/list" },
                { label: "Tasks", path: "/admin/projects/tasks" },
                { label: "Task Board", path: "/admin/projects/board" },
            ]
        },

        { type: "header", label: "HRM" },
        {
            type: "dropdown",
            label: "Employees",
            icon: User,
            subItems: [
                { label: "Employee Lists", path: "/admin/employees/list" },
                { label: "Employee Details", path: "/admin/employees/details" },
                { label: "Departments", path: "/admin/departments" },
                { label: "Designations", path: "/admin/designations" },
                { label: "Policies", path: "/admin/policies" },
            ],
        },
        {
            type: "dropdown",
            label: "Tickets",
            icon: Ticket,
            subItems: [
                { label: "Tickets", path: "/admin/tickets/list" },
                { label: "Ticket Details", path: "/admin/tickets/details" },
            ],
        },
        { type: "link", label: "Holidays", path: "/admin/holidays", icon: Calendar },
        {
            type: "dropdown",
            label: "Attendance",
            icon: Clock,
            subItems: [
                { label: "Leaves", path: "/admin/attendance/leaves" },
                { label: "Attendance", path: "/admin/attendance/employee" },
                { label: "Timesheets", path: "/admin/attendance/timesheets" },
                { label: "Shift & Schedule", path: "/admin/attendance/shift" },
                { label: "Overtime", path: "/admin/attendance/overtime" },
            ],
        },
        {
            type: "dropdown",
            label: "Performance",
            icon: BarChart,
            subItems: [
                { label: "Performance Indicator", path: "/admin/performance/indicator" },
                { label: "Performance Review", path: "/admin/performance/review" },
                { label: "Performance Appraisal", path: "/admin/performance/appraisal" },
                { label: "Goal List", path: "/admin/performance/goals" },
                { label: "Goal Type", path: "/admin/performance/goal-types" },
            ],
        },
        {
            type: "dropdown",
            label: "Training",
            icon: GraduationCap,
            subItems: [
                { label: "Training List", path: "/admin/training/list" },
                { label: "Trainers", path: "/admin/training/trainers" },
                { label: "Training Type", path: "/admin/training/types" },
            ],
        },

        { type: "header", label: "RECRUITMENT" },
        { type: "link", label: "Jobs", path: "/admin/recruitment/jobs", icon: Briefcase },
        { type: "link", label: "Candidates", path: "/admin/recruitment/candidates", icon: UserPlus },
        { type: "link", label: "Referrals", path: "/admin/recruitment/referrals", icon: Users },

        { type: "header", label: "FINANCE & ACCOUNTS" },
        {
            type: "dropdown",
            label: "Payroll",
            icon: DollarSign,
            subItems: [
                { label: "Employee Salary", path: "/admin/payroll/salary" },
                { label: "Payslip", path: "/admin/payroll/payslip" },
                { label: "Payroll Items", path: "/admin/payroll/items" },
            ],
        },
    ];

    const employeeMenu = [
        { type: "header", label: "Main" },
        { type: "link", label: "Dashboard", path: "/employee/dashboard", icon: LayoutDashboard },
        { type: "link", label: "My Profile", path: "/employee/profile", icon: User },
        { type: "link", label: "Attendance", path: "/employee/attendance", icon: Clock },
        { type: "link", label: "Leaves", path: "/employee/leaves", icon: Calendar },
        { type: "link", label: "Tasks", path: "/employee/tasks", icon: Layers },
        { type: "link", label: "Performance", path: "/employee/performance", icon: BarChart },
        { type: "link", label: "Training", path: "/employee/training", icon: GraduationCap },
        { type: "link", label: "Payroll", path: "/employee/payroll", icon: DollarSign },
        { type: "link", label: "Tickets", path: "/employee/tickets", icon: Ticket },
    ];

    const menuItems = isAdmin ? adminMenu : employeeMenu;

    return (
        <aside
            className={clsx(
                "fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 transition-all duration-300 ease-in-out shadow-sm overflow-y-auto overflow-x-hidden custom-scrollbar",
                isOpen ? "w-64" : "w-20"
            )}
        >
            {/* Brand */}
            <div className="h-16 flex items-center justify-center border-b border-gray-200 bg-white sticky top-0 z-10 transition-all">
                {isOpen ? (
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">S</div>
                        <h1 className="text-xl font-bold text-gray-800 tracking-tight">Smart<span className="text-primary">HR</span></h1>
                    </div>
                ) : (
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">S</div>
                )}
            </div>

            {/* Navigation */}
            <nav className="p-3 pb-20 space-y-1">
                {menuItems.map((item, index) => {
                    // HEADER
                    if (item.type === "header") {
                        return isOpen ? (
                            <div key={index} className="px-3 pt-5 pb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                {item.label}
                            </div>
                        ) : (
                            <div key={index} className="h-4"></div> // Spacer for collapsed mode
                        );
                    }

                    const Icon = item.icon;

                    // DROPDOWN (SUBMENU)
                    if (item.type === "dropdown") {
                        const isExpanded = expandedMenus[item.label];
                        // Check if any sub-item is active
                        const isActive = item.subItems.some((sub) => sub.path === location.pathname);

                        return (
                            <div key={index}>
                                <div
                                    className={clsx(
                                        "group flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all select-none",
                                        isActive || isExpanded
                                            ? "text-gray-800 hover:bg-gray-50"
                                            : "text-gray-500 hover:text-gray-800 hover:bg-gray-50",
                                        !isOpen && "justify-center"
                                    )}
                                    onClick={() => isOpen && toggleSubMenu(item.label)}
                                    title={!isOpen ? item.label : ""}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon size={20} className={clsx("transition-colors", isActive ? "text-primary" : "text-gray-500 group-hover:text-gray-700")} strokeWidth={1.5} />
                                        {isOpen && <span className="font-medium text-sm">{item.label}</span>}
                                    </div>
                                    {isOpen && (
                                        <div className="text-gray-400">
                                            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                        </div>
                                    )}
                                </div>

                                {/* Submenu Items */}
                                {isOpen && isExpanded && (
                                    <div className="mt-1 space-y-0.5">
                                        {item.subItems.map((sub, idx) => {
                                            const isSubActive = location.pathname === sub.path;
                                            return (
                                                <NavLink
                                                    key={idx}
                                                    to={sub.path}
                                                    className={({ isActive }) =>
                                                        clsx(
                                                            "block pl-11 pr-3 py-2 rounded-lg text-sm transition-all relative",
                                                            isActive
                                                                ? "text-primary font-medium"
                                                                : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                                                        )
                                                    }
                                                >
                                                    {isSubActive && <span className="absolute left-6 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary"></span>}
                                                    <span className="truncate">{sub.label}</span>
                                                </NavLink>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    }

                    // STANDARD LINK
                    return (
                        <NavLink
                            key={index}
                            to={item.path}
                            className={({ isActive }) =>
                                clsx(
                                    "group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
                                    isActive
                                        ? "bg-gradient-to-r from-orange-50 to-white text-primary border-r-2 border-primary"
                                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-800 border-r-2 border-transparent",
                                    !isOpen && "justify-center"
                                )
                            }
                            title={!isOpen ? item.label : ""}
                        >
                            <Icon size={20} className={clsx("transition-colors", { "text-primary": location.pathname === item.path }, "group-hover:text-gray-700")} strokeWidth={1.5} />
                            {isOpen && <span className="font-medium text-sm">{item.label}</span>}
                        </NavLink>
                    );
                })}
            </nav>
        </aside>
    );
};

export default Sidebar;
