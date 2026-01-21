import React from "react";
import { User, Mail, Phone, MapPin, Shield, Briefcase } from "lucide-react";

const AdminProfile = () => {
    // Mock Admin Data
    const admin = {
        name: "Admin User",
        role: "System Administrator",
        image: "https://ui-avatars.com/api/?name=Admin+User&background=F26522&color=fff",
        email: "admin@smarthrm.com",
        phone: "+1 987 654 3210",
        department: "Administration",
        accessLevel: "Full Access",
        location: "Headquarters, NY"
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans text-gray-800">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
                <div className="text-sm text-gray-500 mt-1">Dashboard / Profile</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="md:col-span-1">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden text-center p-6">
                        <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full overflow-hidden mb-4 border-2 border-orange-100">
                            <img src={admin.image} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">{admin.name}</h2>
                        <p className="text-gray-500 flex items-center justify-center gap-1 mt-1">
                            <Shield size={14} className="text-primary" /> {admin.role}
                        </p>

                        <div className="mt-6 text-left space-y-3">
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <Mail size={16} className="text-gray-400" />
                                {admin.email}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <Phone size={16} className="text-gray-400" />
                                {admin.phone}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <MapPin size={16} className="text-gray-400" />
                                {admin.location}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Details */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Personal Information</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="text-xs text-gray-400 block mb-1">Full Name</label>
                                <div className="text-sm font-medium text-gray-700">{admin.name}</div>
                            </div>
                            <div>
                                <label className="text-xs text-gray-400 block mb-1">Department</label>
                                <div className="text-sm font-medium text-gray-700">{admin.department}</div>
                            </div>
                            <div>
                                <label className="text-xs text-gray-400 block mb-1">Role</label>
                                <div className="text-sm font-medium text-gray-700">{admin.role}</div>
                            </div>
                            <div>
                                <label className="text-xs text-gray-400 block mb-1">Access Level</label>
                                <div className="text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded inline-block">
                                    {admin.accessLevel}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">System Settings</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="text-sm font-medium text-gray-800">Two-Factor Authentication</p>
                                    <p className="text-xs text-gray-500">Secure your account</p>
                                </div>
                                <span className="text-xs font-bold text-green-600">Enabled</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="text-sm font-medium text-gray-800">Email Notifications</p>
                                    <p className="text-xs text-gray-500">Receive daily updates</p>
                                </div>
                                <span className="text-xs font-bold text-gray-500">Disabled</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
