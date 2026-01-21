import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/auth/Login";
import AdminDashboard from "./pages/admin/AdminDashboard/AdminDashboard";
import AdminProfile from "./pages/admin/Profile";
import Client from "./pages/admin/Projects/Client/Client";
import ProjectList from "./pages/admin/Projects/Project/ProjectList";
import ProjectTask from "./pages/admin/Projects/Task/ProjectTask";
import EmployeeDashboard from "./pages/employee/Dashboard";
import EmployeeList from "./pages/admin/employees/EmployeeList";
import EmployeeDetails from "./pages/admin/employees/EmployeeDetails";
import Departments from "./pages/admin/employees/Departments";
import Designations from "./pages/admin/employees/Designations";
import Holidays from "./pages/admin/Holidays";
import Leaves from "./pages/admin/attendance/Leaves";
import EmployeeAttendance from "./pages/admin/attendance/EmployeeAttendance";
import Policies from "./pages/admin/employees/Policies";
import Tickets from "./pages/admin/tickets/Tickets";
import TicketDetails from "./pages/admin/tickets/TicketDetails";
import Timesheets from "./pages/admin/attendance/Timesheets";
import ScheduleTiming from "./pages/admin/attendance/ScheduleTiming";
import Overtime from "./pages/admin/attendance/Overtime";
import PerformanceIndicator from "./pages/admin/performance/PerformanceIndicator";
import PerformanceAppraisal from "./pages/admin/performance/PerformanceAppraisal";
import GoalTracking from "./pages/admin/performance/GoalTracking";
import GoalType from "./pages/admin/performance/GoalType";
import TrainingList from "./pages/admin/training/TrainingList";
import Trainers from "./pages/admin/training/Trainers";
import TrainingType from "./pages/admin/training/TrainingType";
import Jobs from "./pages/admin/recruitment/Jobs";
import Candidates from "./pages/admin/recruitment/Candidates";
import Referrals from "./pages/admin/recruitment/Referrals";
import EmployeeSalary from "./pages/admin/payroll/EmployeeSalary";
import Payslip from "./pages/admin/payroll/Payslip";
import PayrollItems from "./pages/admin/payroll/PayrollItems";

// Employee Pages
import EmployeeProfile from "./pages/employee/Profile";
import EmployeeAttendancePage from "./pages/employee/Attendance";
import EmployeeLeaves from "./pages/employee/Leaves";
import EmployeeHolidays from "./pages/employee/Holidays";
import EmployeeProjects from "./pages/employee/Projects";
import EmployeeTasks from "./pages/employee/Tasks";
import EmployeePerformance from "./pages/employee/Performance";
import EmployeeTraining from "./pages/employee/Training";
import EmployeePayslip from "./pages/employee/Payslip";
import EmployeeTickets from "./pages/employee/Tickets";

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
                <Route path="profile" element={<AdminProfile />} />
                <Route path="employees/list" element={<EmployeeList />} />
                <Route path="employees/details" element={<EmployeeDetails />} />
                <Route path="departments" element={<Departments />} />
                <Route path="designations" element={<Designations />} />
                <Route path="policies" element={<Policies />} />
                <Route path="tickets" element={<Tickets />} />
                <Route path="tickets/details" element={<TicketDetails />} />
                <Route path="holidays" element={<Holidays />} />
                <Route path="attendance/leaves" element={<Leaves />} />
                <Route path="attendance/employee" element={<EmployeeAttendance />} />
                <Route path="attendance/timesheets" element={<Timesheets />} />
                <Route path="attendance/shift" element={<ScheduleTiming />} />
                <Route path="attendance/overtime" element={<Overtime />} />
                <Route path="performance/indicator" element={<PerformanceIndicator />} />
                <Route path="performance/appraisal" element={<PerformanceAppraisal />} />
                <Route path="performance/goals" element={<GoalTracking />} />
                <Route path="performance/goal-types" element={<GoalType />} />
                <Route path="training/list" element={<TrainingList />} />
                <Route path="training/trainers" element={<Trainers />} />
                <Route path="training/types" element={<TrainingType />} />
                <Route path="recruitment/jobs" element={<Jobs />} />
                <Route path="recruitment/candidates" element={<Candidates />} />
                <Route path="recruitment/referrals" element={<Referrals />} />
                <Route path="payroll/salary" element={<EmployeeSalary />} />
                <Route path="payroll/payslip" element={<Payslip />} />
                <Route path="payroll/items" element={<PayrollItems />} />
                <Route path="projects/clients" element={<Client />} />
                <Route path="projects/list" element={<ProjectList />} />
                <Route path="projects/tasks" element={<ProjectTask />} />
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
                <Route path="profile" element={<EmployeeProfile />} />
                <Route path="attendance" element={<EmployeeAttendancePage />} />
                <Route path="leaves" element={<EmployeeLeaves />} />
                <Route path="holidays" element={<EmployeeHolidays />} />
                <Route path="projects" element={<EmployeeProjects />} />
                <Route path="tasks" element={<EmployeeTasks />} />
                <Route path="performance" element={<EmployeePerformance />} />
                <Route path="training" element={<EmployeeTraining />} />
                <Route path="payroll" element={<EmployeePayslip />} />
                <Route path="tickets" element={<EmployeeTickets />} />
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
