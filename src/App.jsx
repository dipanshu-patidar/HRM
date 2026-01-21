import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/auth/Login";
import AdminDashboard from "./components/admin/AdminDashboard/AdminDashboard";
import Client from "./components/admin/Projects/Client/Client";
import EmployeeDashboard from "./pages/employee/Dashboard";

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
