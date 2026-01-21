import React, { useState } from "react";
import {
    Edit,
    ChevronDown,
    ChevronUp,
    MoreVertical,
    Briefcase,
    GraduationCap,
    Users,
    CreditCard,
    FileText,
    Layers,
    Calendar,
    Mail,
    Phone,
    MapPin,
    User,
    CheckCircle2,
    X,
    ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmployeeDetails = () => {
    const navigate = useNavigate();

    // State for collapsible sections
    const [sections, setSections] = useState({
        about: true,
        bank: false,
        family: false,
        education: false,
        experience: false,
    });

    const [activeTab, setActiveTab] = useState("projects");

    // Modal State
    const [showBankModal, setShowBankModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    // Bank Form State
    const [bankForm, setBankForm] = useState({
        salaryBasis: "Select",
        salaryAmount: "",
        paymentType: "Select",
        pfContribution: "Select",
        pfNo: "",
        empPfRate: "",
        additionalRate: "",
        totalRate: "",
        esiContribution: "Select",
        esiNumber: "",
        empEsiRate: "",
        additionalEsiRate: "",
        totalEsiRate: ""
    });

    const toggleSection = (section) => {
        setSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    // Mock Data
    const employee = {
        name: "Stephan Peralt",
        role: "Software Developer",
        experience: "10+ years of Experience",
        image: "https://i.pravatar.cc/150?u=4",
        clientId: "CLT-0024",
        team: "UI/UX Design",
        dateOfJoin: "1st Jan 2023",
        reportOffice: {
            name: "Doglas Martini",
            image: "https://i.pravatar.cc/150?u=5"
        },
        basicInfo: {
            phone: "(163) 2459 315",
            email: "perralt12@example.com",
            gender: "Male",
            birthday: "24th July 2000",
            address: "1861 Bayonne Ave, Manchester, NJ, 08759"
        },
        personalInfo: {
            passportNo: "QRET4566FGRT",
            passportExpDate: "15 May 2029",
            nationality: "Indian",
            religion: "Christianity",
            maritalStatus: "Yes",
            spouseEmployment: "No",
            children: 2
        },
        emergencyContact: {
            primary: {
                name: "Adrian Peralt",
                relation: "Father",
                phone: "+1 127 2685 598"
            },
            secondary: {
                name: "Karen Wills",
                relation: "Mother",
                phone: "+1 989 7774 787"
            }
        },
        about: "As an award winning designer, I deliver exceptional quality work and bring value to your brand! With 10 years of experience and 350+ projects completed worldwide with satisfied customers, I developed the 360° brand approach, which helped me to create numerous brands that are relevant, meaningful and loved.",
        projects: [
            {
                name: "World Health",
                tasks: 8,
                completed: 15,
                deadline: "31 July 2025",
                lead: { name: "Leona", image: "https://i.pravatar.cc/150?u=8", color: "bg-blue-600" },
                logo: "bg-blue-600"
            },
            {
                name: "Hospital Administration",
                tasks: 8,
                completed: 15,
                deadline: "31 July 2025",
                lead: { name: "Leona", image: "https://i.pravatar.cc/150?u=8", color: "bg-indigo-600" },
                logo: "bg-indigo-600"
            }
        ]
    };

    const handleEditClick = () => {
        setShowEditModal(true);
    };


    // Reusable Section Component
    const SectionCard = ({ title, isOpen, onToggle, children, showEdit = true, onEdit }) => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-4 overflow-hidden">
            <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={onToggle}
            >
                <h3 className="font-bold text-gray-800 text-sm md:text-base">{title}</h3>
                <div className="flex items-center gap-3">
                    {showEdit && (
                        <div onClick={(e) => { e.stopPropagation(); onEdit && onEdit(); }} className="print:hidden">
                            <Edit size={16} className="text-gray-400 hover:text-gray-600" />
                        </div>
                    )}
                    {isOpen ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
                </div>
            </div>
            {isOpen && (
                <div className="p-4 border-t border-gray-100 text-sm text-gray-600 leading-relaxed">
                    {children}
                </div>
            )}
        </div>
    );

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div className="flex items-center gap-2">
                    <button onClick={() => navigate("/admin/employees/list")} className="p-2 hover:bg-gray-100 rounded-full transition-colors print:hidden">
                        <ArrowLeft size={20} className="text-gray-600" />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800">Employee Details</h1>
                </div>
                <div className="flex items-center gap-3 print:hidden">
                    <button
                        onClick={() => setShowBankModal(true)}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2"
                    >
                        <CreditCard size={16} /> Bank & Statutory
                    </button>

                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Profile Card & Info */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Profile Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="h-24 bg-gradient-to-r from-orange-400 to-orange-600 relative"></div>
                        <div className="px-6 pb-6 relative text-center">
                            <div className="w-20 h-20 mx-auto -mt-10 rounded-full border-4 border-white shadow-md overflow-hidden relative bg-white">
                                <img src={employee.image} alt={employee.name} className="w-full h-full object-cover" />
                            </div>

                            <div className="mt-3">
                                <h2 className="text-lg font-bold text-gray-800 flex items-center justify-center gap-1">
                                    {employee.name}
                                    <CheckCircle2 size={16} className="text-green-500 fill-current" />
                                </h2>
                                <div className="flex flex-wrap justify-center gap-2 mt-2">
                                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded text-xs font-medium">{employee.role}</span>
                                    <span className="bg-green-50 text-green-600 px-3 py-1 rounded text-xs font-medium">{employee.experience}</span>
                                </div>
                            </div>

                            <div className="mt-6 space-y-3 text-sm">
                                <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                                    <span className="text-gray-500 flex items-center gap-2"><Briefcase size={14} /> Client ID</span>
                                    <span className="font-medium text-gray-700">{employee.clientId}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                                    <span className="text-gray-500 flex items-center gap-2"><Users size={14} /> Team</span>
                                    <span className="font-medium text-gray-700">{employee.team}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                                    <span className="text-gray-500 flex items-center gap-2"><Calendar size={14} /> Date Of Join</span>
                                    <span className="font-medium text-gray-700">{employee.dateOfJoin}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                                    <span className="text-gray-500 flex items-center gap-2"><MapPin size={14} /> Report Office</span>
                                    <div className="flex items-center gap-2">
                                        <img src={employee.reportOffice.image} alt="" className="w-6 h-6 rounded-full" />
                                        <span className="font-medium text-gray-700">{employee.reportOffice.name}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 print:hidden">
                                <button
                                    onClick={handleEditClick}
                                    className="w-full bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Edit size={16} /> Edit Info
                                </button>
                                {/* Message button removed as per user request */}
                            </div>
                        </div>
                    </div>

                    {/* Basic Information */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-gray-800">Basic Information</h3>
                            <Edit size={16} className="text-gray-400 cursor-pointer hover:text-gray-600 print:hidden" onClick={handleEditClick} />
                        </div>
                        <div className="space-y-4 text-sm">
                            <div className="flex gap-3">
                                <Phone size={16} className="text-gray-400 min-w-4" />
                                <div>
                                    <p className="text-gray-500 text-xs">Phone</p>
                                    <p className="text-gray-700 font-medium">{employee.basicInfo.phone}</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Mail size={16} className="text-gray-400 min-w-4" />
                                <div>
                                    <p className="text-gray-500 text-xs">Email</p>
                                    <p className="text-blue-500 font-medium cursor-pointer hover:underline">{employee.basicInfo.email}</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <User size={16} className="text-gray-400 min-w-4" />
                                <div>
                                    <p className="text-gray-500 text-xs">Gender</p>
                                    <p className="text-gray-700 font-medium">{employee.basicInfo.gender}</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Calendar size={16} className="text-gray-400 min-w-4" />
                                <div>
                                    <p className="text-gray-500 text-xs">Birthday</p>
                                    <p className="text-gray-700 font-medium">{employee.basicInfo.birthday}</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <MapPin size={16} className="text-gray-400 min-w-4" />
                                <div>
                                    <p className="text-gray-500 text-xs">Address</p>
                                    <p className="text-gray-700 font-medium">{employee.basicInfo.address}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Personal Information */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-gray-800">Personal Information</h3>
                            <Edit size={16} className="text-gray-400 cursor-pointer hover:text-gray-600 print:hidden" onClick={handleEditClick} />
                        </div>
                        <div className="space-y-3 text-sm">
                            {Object.entries({
                                "Passport No": employee.personalInfo.passportNo,
                                "Passport Exp Date": employee.personalInfo.passportExpDate,
                                "Nationality": employee.personalInfo.nationality,
                                "Religion": employee.personalInfo.religion,
                                "Marital status": employee.personalInfo.maritalStatus,
                                "Employment of spouse": employee.personalInfo.spouseEmployment,
                                "No. of children": employee.personalInfo.children
                            }).map(([key, value]) => (
                                <div key={key} className="flex justify-between items-center">
                                    <span className="text-gray-500 flex items-center gap-2">
                                        {/* Icons can be added here if needed to match exact design */}
                                        <div className="w-4 flex justify-center"><FileText size={14} /></div>
                                        {key}
                                    </span>
                                    <span className="font-medium text-gray-700">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Emergency Contact */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-gray-800">Emergency Contact Number</h3>
                            <Edit size={16} className="text-gray-400 cursor-pointer hover:text-gray-600 print:hidden" onClick={handleEditClick} />
                        </div>
                        <div className="space-y-4">
                            <div className="p-3 border border-gray-50 rounded-lg bg-gray-50/50">
                                <p className="text-xs text-gray-400 mb-1">Primary</p>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">{employee.emergencyContact.primary.name} <span className="text-gray-400 font-normal mx-1">•</span> <span className="text-gray-600">{employee.emergencyContact.primary.relation}</span></p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-700">{employee.emergencyContact.primary.phone}</p>
                                </div>
                            </div>
                            <div className="p-3 border border-gray-50 rounded-lg bg-gray-50/50">
                                <p className="text-xs text-gray-400 mb-1">Secondry</p>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">{employee.emergencyContact.secondary.name} <span className="text-gray-400 font-normal mx-1">•</span> <span className="text-gray-600">{employee.emergencyContact.secondary.relation}</span></p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-700">{employee.emergencyContact.secondary.phone}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Accordions & Tabs */}
                <div className="lg:col-span-2">
                    <SectionCard
                        title="About Employee"
                        isOpen={sections.about}
                        onToggle={() => toggleSection('about')}
                        onEdit={handleEditClick}
                    >
                        {employee.about}
                    </SectionCard>

                    <SectionCard
                        title="Bank Information"
                        isOpen={sections.bank}
                        onToggle={() => toggleSection('bank')}
                        onEdit={handleEditClick}
                    >
                        <p className="text-gray-400 italic">No bank information available</p>
                    </SectionCard>

                    <SectionCard
                        title="Family Information"
                        isOpen={sections.family}
                        onToggle={() => toggleSection('family')}
                        onEdit={handleEditClick}
                    >
                        <p className="text-gray-400 italic">No family information available</p>
                    </SectionCard>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SectionCard
                            title="Education Details"
                            isOpen={sections.education}
                            onToggle={() => toggleSection('education')}
                            onEdit={handleEditClick}
                        >
                            <p className="text-gray-400 italic">No education details available</p>
                        </SectionCard>
                        <SectionCard
                            title="Experience"
                            isOpen={sections.experience}
                            onToggle={() => toggleSection('experience')}
                            onEdit={handleEditClick}
                        >
                            <p className="text-gray-400 italic">No experience details available</p>
                        </SectionCard>
                    </div>

                    {/* Projects / Assets Tabs */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 mt-4 overflow-hidden">
                        <div className="flex border-b border-gray-100 px-6">
                            <button
                                onClick={() => setActiveTab('projects')}
                                className={`py-4 px-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'projects' ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                            >
                                Projects
                            </button>
                            <button
                                onClick={() => setActiveTab('assets')}
                                className={`py-4 px-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'assets' ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                            >
                                Assets
                            </button>
                        </div>
                        <div className="p-6 bg-gray-50/30">
                            {activeTab === 'projects' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {employee.projects.map((project, idx) => (
                                        <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex items-start gap-4 mb-4">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${project.logo}`}>
                                                    {project.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-800 text-sm">{project.name}</h4>
                                                    <p className="text-xs text-gray-500">{project.tasks} tasks <span className="mx-1">•</span> {project.completed} Completed</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between text-xs text-gray-500 mt-4 pt-4 border-t border-gray-50">
                                                <div>
                                                    <p className="mb-1">Deadline</p>
                                                    <p className="text-gray-700 font-medium">{project.deadline}</p>
                                                </div>
                                                <div>
                                                    <p className="mb-1 text-right">Project Lead</p>
                                                    <div className="flex items-center gap-2 justify-end">
                                                        <img src={project.lead.image} alt="" className="w-5 h-5 rounded-full" />
                                                        <span className="text-gray-700 font-medium">{project.lead.name}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {activeTab === 'assets' && (
                                <div className="text-center py-8 text-gray-400 italic">No assets assigned</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bank & Statutory Modal */}
            {showBankModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800">Bank & Statutory</h2>
                            <button onClick={() => setShowBankModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-8 overflow-y-auto custom-scrollbar flex-1 space-y-8">
                            {/* Basic Salary Information */}
                            <div>
                                <h3 className="text-sm font-bold text-gray-800 mb-4">Basic Salary Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-gray-600">Salary basis <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <select
                                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 appearance-none bg-white text-sm"
                                                value={bankForm.salaryBasis}
                                                onChange={(e) => setBankForm({ ...bankForm, salaryBasis: e.target.value })}
                                            >
                                                <option>Select</option>
                                                <option>Hourly</option>
                                                <option>Daily</option>
                                                <option>Monthly</option>
                                            </select>
                                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-gray-600">Salary amount</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                                            <input
                                                type="text"
                                                className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 text-sm"
                                                value={bankForm.salaryAmount}
                                                onChange={(e) => setBankForm({ ...bankForm, salaryAmount: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-gray-600">Payment type</label>
                                        <div className="relative">
                                            <select
                                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 appearance-none bg-white text-sm"
                                                value={bankForm.paymentType}
                                                onChange={(e) => setBankForm({ ...bankForm, paymentType: e.target.value })}
                                            >
                                                <option>Select</option>
                                                <option>Bank Transfer</option>
                                                <option>Cheque</option>
                                                <option>Cash</option>
                                            </select>
                                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* PF Information */}
                            <div>
                                <h3 className="text-sm font-bold text-gray-800 mb-4">PF Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-gray-600">PF contribution <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <select
                                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 appearance-none bg-white text-sm"
                                                value={bankForm.pfContribution}
                                                onChange={(e) => setBankForm({ ...bankForm, pfContribution: e.target.value })}
                                            >
                                                <option>Select</option>
                                                <option>Yes</option>
                                                <option>No</option>
                                            </select>
                                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-gray-600">PF No</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 text-sm"
                                            value={bankForm.pfNo}
                                            onChange={(e) => setBankForm({ ...bankForm, pfNo: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-gray-600">Employee PF rate</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 text-sm"
                                            value={bankForm.empPfRate}
                                            onChange={(e) => setBankForm({ ...bankForm, empPfRate: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-gray-600">Additional rate</label>
                                        <div className="relative">
                                            <select
                                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 appearance-none bg-white text-sm"
                                                value={bankForm.additionalRate}
                                                onChange={(e) => setBankForm({ ...bankForm, additionalRate: e.target.value })}
                                            >
                                                <option>Select</option>
                                                <option>0%</option>
                                                <option>1%</option>
                                                <option>2%</option>
                                            </select>
                                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-gray-600">Total rate</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 text-sm bg-gray-50"
                                            readOnly
                                            value={bankForm.totalRate}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* ESI Information */}
                            <div>
                                <h3 className="text-sm font-bold text-gray-800 mb-4">ESI Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-gray-600">ESI contribution <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <select
                                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 appearance-none bg-white text-sm"
                                                value={bankForm.esiContribution}
                                                onChange={(e) => setBankForm({ ...bankForm, esiContribution: e.target.value })}
                                            >
                                                <option>Select</option>
                                                <option>Yes</option>
                                                <option>No</option>
                                            </select>
                                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-gray-600">ESI Number</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 text-sm"
                                            value={bankForm.esiNumber}
                                            onChange={(e) => setBankForm({ ...bankForm, esiNumber: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-gray-600">Employee ESI rate <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 text-sm"
                                            value={bankForm.empEsiRate}
                                            onChange={(e) => setBankForm({ ...bankForm, empEsiRate: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-gray-600">Additional rate</label>
                                        <div className="relative">
                                            <select
                                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 appearance-none bg-white text-sm"
                                                value={bankForm.additionalEsiRate}
                                                onChange={(e) => setBankForm({ ...bankForm, additionalEsiRate: e.target.value })}
                                            >
                                                <option>Select</option>
                                                <option>0%</option>
                                                <option>1%</option>
                                                <option>2%</option>
                                            </select>
                                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-gray-600">Total rate</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 text-sm bg-gray-50"
                                            readOnly
                                            value={bankForm.totalEsiRate}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
                            <button
                                onClick={() => setShowBankModal(false)}
                                className="px-6 py-2 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setShowBankModal(false)}
                                className="px-6 py-2 rounded-lg text-sm font-medium bg-orange-500 text-white hover:bg-orange-600 transition-colors"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Employee Modal */}
            {showEditModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">Edit Employee <span className="text-gray-400 text-base font-normal ml-2">Employee ID : {employee.clientId}</span></h2>
                            </div>
                            <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex border-b border-gray-100 px-6">
                            <button className="py-4 px-2 text-sm font-medium border-b-2 border-orange-500 text-orange-500">
                                Basic Information
                            </button>
                            <button className="py-4 px-2 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 ml-4">
                                Permissions
                            </button>
                        </div>

                        <div className="p-8 overflow-y-auto custom-scrollbar flex-1 space-y-6">
                            {/* Profile Image & Basic Fields - simplified for visual match */}
                            <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50/50">
                                <div className="flex items-center gap-4 w-full">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-300 overflow-hidden">
                                        <img src={employee.image} alt="Profile" className="w-full h-full object-cover" />
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
                                    <input type="text" defaultValue="Anthony" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700">Last Name</label>
                                    <input type="text" defaultValue="Lewis" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700">Employee ID <span className="text-red-500">*</span></label>
                                    <input type="text" defaultValue="Emp-001" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700">Joining Date <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <input type="text" defaultValue="17-10-2022" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500" />
                                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700">Username <span className="text-red-500">*</span></label>
                                    <input type="text" defaultValue="Anthony" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700">Email <span className="text-red-500">*</span></label>
                                    <input type="text" defaultValue="anthony@example.com" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700">Password <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <input type="password" placeholder="********" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500" />
                                        <Users className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700">Confirm Password <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <input type="password" placeholder="********" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500" />
                                        <Users className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700">Phone Number <span className="text-red-500">*</span></label>
                                    <input type="text" defaultValue="(123) 4567 890" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700">Company <span className="text-red-500">*</span></label>
                                    <input type="text" defaultValue="Abac Company" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700">Department</label>
                                    <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 appearance-none bg-white">
                                        <option>Finance</option>
                                        <option>Developer</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700">Designation</label>
                                    <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 appearance-none bg-white">
                                        <option>Finance</option>
                                        <option>Developer</option>
                                    </select>
                                </div>
                                <div className="col-span-1 md:col-span-2 space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700">About <span className="text-red-500">*</span></label>
                                    <textarea rows="4" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 text-sm">{employee.about}</textarea>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="px-6 py-2 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="px-6 py-2 rounded-lg text-sm font-medium bg-orange-500 text-white hover:bg-orange-600 transition-colors"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeDetails;
