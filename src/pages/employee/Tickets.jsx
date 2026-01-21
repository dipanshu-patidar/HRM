import React from "react";

const Tickets = () => {
    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans text-gray-800">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">My Tickets</h1>
                <div className="text-sm text-gray-500 mt-1">Dashboard / Tickets</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center text-gray-500">
                Support tickets will be listed here.
            </div>
        </div>
    );
};

export default Tickets;
