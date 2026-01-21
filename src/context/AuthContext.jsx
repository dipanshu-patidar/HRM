import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate checking for stored session
        const storedUser = localStorage.getItem("hrm_user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (role) => {
        const userData = {
            id: role === "admin" ? 1 : 2,
            name: role === "admin" ? "Admin User" : "Employee User",
            role: role,
            email: role === "admin" ? "admin@smarthr.com" : "employee@smarthr.com",
        };
        setUser(userData);
        localStorage.setItem("hrm_user", JSON.stringify(userData));
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("hrm_user");
    };

    const value = {
        user,
        login,
        logout,
        loading,
        isAdmin: user?.role === "admin",
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
