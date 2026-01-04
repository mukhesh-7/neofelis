import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Shield, LogOut } from 'lucide-react';
import { authService } from '../services/authService';

const Dashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Get user data from localStorage
        const userData = authService.getCurrentUser();
        if (!userData) {
            // If no user data, redirect to login
            window.location.href = '/login';
        } else {
            setUser(userData);
        }
    }, []);

    const handleLogout = () => {
        authService.logout();
    };

    if (!user) {
        return (
            <div className="pt-32 min-h-[80vh] bg-black flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    // Extract username from email if not provided
    const username = user.email.split('@')[0];

    return (
        <div className="pt-32 min-h-[80vh] bg-black">
            <div className="container-custom">
                <motion.div
                    className="mb-12 flex justify-between items-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-white">Dashboard</h1>
                        <p className="text-xl text-gray-400">Welcome back, {user.name || 'User'}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </motion.div>

                <motion.div
                    className="max-w-3xl p-10 rounded-3xl glass border border-white/10 bg-black/80 backdrop-blur-xl"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="flex items-center gap-6 mb-10 pb-6 border-b border-white/10">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 border-2 border-white/20 flex items-center justify-center text-3xl font-bold text-white shadow-xl">
                            {(user.name || user.email).charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-2 text-white">{user.name || 'User'}</h2>
                            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
                                {user.googleId ? 'Google Account' : 'Standard Account'}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-8">
                        <div className="flex items-start gap-4">
                            <User size={20} className="mt-1 text-gray-400" />
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Username</label>
                                <div className="text-lg font-medium text-white">@{username}</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Mail size={20} className="mt-1 text-gray-400" />
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Email</label>
                                <div className="text-lg font-medium text-white">{user.email}</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Shield size={20} className="mt-1 text-gray-400" />
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Access Level</label>
                                <div className="text-lg font-medium text-white">Full Access</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
