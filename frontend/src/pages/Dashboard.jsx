import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Shield } from 'lucide-react';

const Dashboard = () => {
    // Mock user data
    const user = {
        name: "Alex Neuro",
        username: "alex_n",
        email: "alex@neurolabs.ai",
        role: "Enterprise Admin"
    };

    return (
        <div className="pt-32 min-h-[80vh]">
            <div className="container-custom">
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-3">Dashboard</h1>
                    <p className="text-xl text-text-muted">Welcome back, {user.name}</p>
                </motion.div>

                <motion.div
                    className="max-w-3xl p-10 rounded-3xl glass border border-white/5 bg-glass-bg/50 backdrop-blur-xl"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="flex items-center gap-6 mb-10 pb-6 border-b border-white/10">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 border-2 border-white/10 flex items-center justify-center text-3xl font-bold text-white shadow-xl">
                            {user.name.charAt(0)}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
                            <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-bold uppercase tracking-wider">{user.role}</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-8">
                        <div className="flex items-start gap-4">
                            <User size={20} className="mt-1 text-text-muted" />
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1">Username</label>
                                <div className="text-lg font-medium">@{user.username}</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Mail size={20} className="mt-1 text-text-muted" />
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1">Email</label>
                                <div className="text-lg font-medium">{user.email}</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Shield size={20} className="mt-1 text-text-muted" />
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1">Access Level</label>
                                <div className="text-lg font-medium">Full Access</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
