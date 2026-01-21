import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/auth/Login";
import AdminDashboard from "./pages/admin/AdminDashboard/AdminDashboard";
import Client from "./pages/admin/Projects/Client/Client";
import EmployeeDashboard from "./pages/employee/Dashboard";
import Holidays from "./pages/admin/Holidays";
import Leaves from "./pages/admin/attendance/Leaves";
import EmployeeAttendance from "./pages/admin/attendance/EmployeeAttendance";
import Timesheets from "./pages/admin/attendance/Timesheets";
import ScheduleTiming from "./pages/admin/attendance/ScheduleTiming";
import Overtime from "./pages/admin/attendance/Overtime";

// Protected Route Wrapper
const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" replace />;
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />; // Or forbidden page
    }

    return children;
};

const AppRoutes = () => {
    const { user } = useAuth();

    return (
        <Routes>
            <Route path="/login" element={<Login />} />

            {/* Redirect Root depending on Auth */}
            <Route path="/" element={
                user ? (
                    user.role === 'admin' ? <Navigate to="/admin/dashboard" replace /> : <Navigate to="/employee/dashboard" replace />
                ) : (
                    <Navigate to="/login" replace />
                )
            } />

            {/* Admin Routes */}
            <Route path="/admin" element={
                <ProtectedRoute allowedRoles={['admin']}>
                    <MainLayout />
                </ProtectedRoute>
            }>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="holidays" element={<Holidays />} />
                <Route path="attendance/leaves" element={<Leaves />} />
                <Route path="attendance/employee" element={<EmployeeAttendance />} />
                <Route path="attendance/timesheets" element={<Timesheets />} />
                <Route path="attendance/shift" element={<ScheduleTiming />} />
                <Route path="attendance/overtime" element={<Overtime />} />
                <Route path="projects/clients" element={<Client />} />
                {/* Placeholder for other routes to avoid 404s on menu clicks */}
                <Route path="*" element={<div className="p-4 text-gray-500">Page under construction</div>} />
            </Route>

            {/* Employee Routes */}
            <Route path="/employee" element={
                <ProtectedRoute allowedRoles={['employee']}>
                    <MainLayout />
                </ProtectedRoute>
            }>
                <Route path="dashboard" element={<EmployeeDashboard />} />
                <Route path="*" element={<div className="p-4 text-gray-500">Page under construction</div>} />
            </Route>
        </Routes>
    );
};

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </Router>
    );
};

export default App;
