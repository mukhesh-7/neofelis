import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Mock login
        navigate('/dashboard');
    }

    return (
        <div className="pt-24 min-h-screen flex items-center justify-center bg-borea-gradient text-white">
            <motion.div
                className="w-full max-w-md p-10 rounded-3xl glass border border-white/10 bg-black/30 backdrop-blur-xl shadow-2xl"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl font-bold text-center mb-2">Welcome Back</h2>
                <p className="text-center text-text-muted mb-8">Sign in to your enterprise account</p>

                <form onSubmit={handleLogin}>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-text-muted mb-2">Email</label>
                        <input type="email" placeholder="name@company.com" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" required />
                    </div>
                    <div className="mb-8">
                        <label className="block text-sm font-medium text-text-muted mb-2">Password</label>
                        <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" required />
                    </div>
                    <button type="submit" className="w-full btn btn-primary py-3.5">Sign In</button>
                </form>

                <p className="text-center mt-6 text-sm text-text-muted">
                    Don't have an account? <Link to="/signup" className="text-accent hover:underline font-medium">Sign Up</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
