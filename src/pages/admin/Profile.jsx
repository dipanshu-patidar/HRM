import React, { useState } from "react";
import { Upload, Key, User, Mail } from "lucide-react";

const AdminProfile = () => {
    const [personalInfo, setPersonalInfo] = useState({
        name: "Admin",
        email: "admin@gmail.com"
    });

    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const orangeColor = "#F26522";

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans text-gray-800">
            {/* Main Container */}
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Personal Info Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                        <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: orangeColor }}></div>
                        <h2 className="text-lg font-bold text-gray-800">Personal Info</h2>
                    </div>

                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            {/* Name Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">
                                    Name<span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={personalInfo.name}
                                    onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary transition-all text-sm text-gray-700"
                                    placeholder="Enter Name"
                                />
                            </div>

                            {/* Email Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">
                                    Email<span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="email"
                                    value={personalInfo.email}
                                    onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary transition-all text-sm text-gray-700"
                                    placeholder="Enter Email"
                                />
                            </div>
                        </div>

                        {/* Avatar Section */}
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-gray-700 block">Avtar</label>

                            <div className="flex flex-col gap-4">
                                <label className="flex items-center gap-2 cursor-pointer w-fit px-4 py-2 rounded-md text-white text-sm font-medium transition-all hover:bg-opacity-90 active:scale-95" style={{ backgroundColor: orangeColor }}>
                                    <Upload size={16} />
                                    Choose file here
                                    <input type="file" className="hidden" />
                                </label>

                                <div className="w-28 h-28 rounded-lg border-2 overflow-hidden bg-gray-50 flex items-center justify-center p-1" style={{ borderColor: "#a0e85d" /* mimicking the specific light green border color from image if needed, but the user asked for orange mainly. Let's keep a subtle gray/orange mix or just light border as per image */ }}>
                                    <img
                                        src="https://img.freepik.com/free-photo/handsome-young-businessman-suit-glasses_273609-7159.jpg?t=st=1737460000~exp=1737463600~hmac=6b6f7b7b7b7b7b7b7b7b7b7b7b7b7b7b7b7b7b7b7b7b7b7b7b7b"
                                        alt="Avatar Preview"
                                        className="w-full h-full object-cover rounded-md"
                                        onError={(e) => {
                                            e.target.src = "https://ui-avatars.com/api/?name=Work+Do&background=F26522&color=fff";
                                        }}
                                    />
                                </div>
                                <p className="text-[11px] text-gray-400">Please upload a valid image file. Size of image should not be more than 2MB.</p>
                            </div>
                        </div>

                        {/* Save Changes Button */}
                        <div className="mt-8 flex justify-end">
                            <button className="px-6 py-2.5 rounded-lg text-white font-bold text-sm transition-all hover:bg-opacity-90 active:scale-95 shadow-sm shadow-orange-500/20" style={{ backgroundColor: orangeColor }}>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>

                {/* Change Password Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                        <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: orangeColor }}></div>
                        <h2 className="text-lg font-bold text-gray-800">Change Password</h2>
                    </div>

                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {/* Old Password */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">
                                    Old Password<span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary transition-all text-sm text-gray-700"
                                    placeholder="Enter Old Password"
                                />
                            </div>

                            {/* New Password */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">
                                    New Password<span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary transition-all text-sm text-gray-700"
                                    placeholder="Enter Your Password"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Confirm New Password */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">
                                    Confirm New Password<span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary transition-all text-sm text-gray-700"
                                    placeholder="Enter Your Confirm Password"
                                />
                            </div>
                        </div>

                        {/* Change Password Button */}
                        <div className="mt-8 flex justify-end">
                            <button className="px-6 py-2.5 rounded-lg text-white font-bold text-sm transition-all hover:bg-opacity-90 active:scale-95 shadow-sm shadow-orange-500/20" style={{ backgroundColor: orangeColor }}>
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminProfile;
