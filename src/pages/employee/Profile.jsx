import React from "react";
import { User, Mail, Phone, MapPin, Calendar, Briefcase, Award } from "lucide-react";

const Profile = () => {
    const employee = {
        name: "My Name",
        role: "Software Engineer",
        image: "https://ui-avatars.com/api/?name=Employee&background=0D8ABC&color=fff",
        email: "employee@example.com",
        phone: "+1 234 567 890",
        department: "Engineering",
        joinDate: "2023-01-15",
        location: "New York, USA"
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
                        <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full overflow-hidden mb-4">
                            <img src={employee.image} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">{employee.name}</h2>
                        <p className="text-gray-500">{employee.role}</p>

                        <div className="mt-6 text-left space-y-3">
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <Mail size={16} className="text-gray-400" />
                                {employee.email}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <Phone size={16} className="text-gray-400" />
                                {employee.phone}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <MapPin size={16} className="text-gray-400" />
                                {employee.location}
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
                                <div className="text-sm font-medium text-gray-700">{employee.name}</div>
                            </div>
                            <div>
                                <label className="text-xs text-gray-400 block mb-1">Department</label>
                                <div className="text-sm font-medium text-gray-700">{employee.department}</div>
                            </div>
                            <div>
                                <label className="text-xs text-gray-400 block mb-1">Designation</label>
                                <div className="text-sm font-medium text-gray-700">{employee.role}</div>
                            </div>
                            <div>
                                <label className="text-xs text-gray-400 block mb-1">Join Date</label>
                                <div className="text-sm font-medium text-gray-700">{employee.joinDate}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
