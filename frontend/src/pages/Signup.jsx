import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        // Mock signup
        navigate('/dashboard');
    }

    return (
        <div className="pt-24 min-h-screen flex items-center justify-center bg-gradient-to-l from-accent/5 to-transparent">
            <motion.div
                className="w-full max-w-md p-10 rounded-3xl glass border border-white/10 bg-black/30 backdrop-blur-xl shadow-2xl"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl font-bold text-center mb-2 text-white">Create Account</h2>
                <p className="text-center text-text-muted mb-8 text-white">Join the intelligent future</p>

                <form onSubmit={handleSignup}>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-text-muted mb-2">Full Name</label>
                        <input type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" required />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-text-muted mb-2">Email</label>
                        <input type="email" placeholder="name@company.com" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" required />
                    </div>
                    <div className="mb-8">
                        <label className="block text-sm font-medium text-text-muted mb-2">Password</label>
                        <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" required />
                    </div>
                    <button type="submit" className="w-full btn btn-primary py-3.5">Create Account</button>
                </form>

                <p className="text-center mt-6 text-sm text-text-muted">
                    Already have an account? <Link to="/login" className="text-accent hover:underline font-medium">Sign In</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Signup;
