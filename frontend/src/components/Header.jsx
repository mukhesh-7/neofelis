import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';

import logo from "@/assets/logo.png";

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isInHero, setIsInHero] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock auth state
    const location = useLocation();
    const navigate = useNavigate();

    // Check for mock auth
    useEffect(() => {
        const checkAuth = () => {
            const auth = localStorage.getItem('isAuthenticated');
            setIsLoggedIn(auth === 'true');
        };

        checkAuth();
        window.addEventListener('authChange', checkAuth); // Listen for custom event
        return () => window.removeEventListener('authChange', checkAuth);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setScrolled(scrollY > 50);

            // Check if we are still effectively in the hero section (using 80vh as a rough threshold)
            // Adjust threshold as needed, e.g., window.innerHeight * 0.8
            setIsInHero(scrollY < window.innerHeight * 0.8);
        };

        handleScroll(); // Initial check
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        if (location.pathname !== '/') {
            return;
        }
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        setIsLoggedIn(false);
        setIsProfileOpen(false);
        navigate('/');
    };

    const navItems = [
        { label: 'Home', path: '/', isScroll: true, id: 'hero' },
        { label: 'About Us', path: '/#about', isScroll: true, id: 'about' },
        { label: 'Products', path: '/#products', isScroll: true, id: 'products' },
        { label: 'Future', path: '/#future', isScroll: true, id: 'future' },
        { label: 'Contact', path: '/contact', isScroll: false },
    ];

    return (
        <motion.header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 pointer-events-none ${scrolled ? 'py-4' : 'py-6'}`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="container-custom mx-auto px-4 flex items-center justify-between relative">
                {/* Left: Logo */}
                <motion.div
                    className="pointer-events-auto relative z-10"
                    animate={{ opacity: isInHero ? 1 : 0, x: isInHero ? 0 : -20 }}
                    style={{ pointerEvents: isInHero ? 'auto' : 'none' }}
                >
                    <Link to="/" className="font-heading text-xl font-bold tracking-tight text-white flex items-center gap-2">
                        <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
                        NeoFelis
                    </Link>
                </motion.div>

                {/* Center: Navbar (The main glass pill) */}
                <nav className="hidden md:flex pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <ul className="flex items-center gap-1 px-3 py-2 rounded-full border border-white/10 bg-black/30 backdrop-blur-2xl shadow-xl hover:bg-black/40 hover:border-white/20 transition-all">
                        {navItems.map((item) => (
                            <li key={item.label}>
                                {item.isScroll && location.pathname === '/' ? (
                                    <button
                                        onClick={() => scrollToSection(item.id)}
                                        className="text-sm font-medium text-text-muted hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-white/5"
                                    >
                                        {item.label}
                                    </button>
                                ) : (
                                    <Link
                                        to={item.path}
                                        className="text-sm font-medium text-text-muted hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-white/5"
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Right: Auth / Profile */}
                <motion.div
                    className="hidden md:flex items-center gap-3 pointer-events-auto relative z-10"
                    animate={{ opacity: isInHero ? 1 : 0, x: isInHero ? 0 : 20 }}
                    style={{ pointerEvents: isInHero ? 'auto' : 'none' }}
                >
                    {isLoggedIn ? (
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center transition-all"
                            >
                                <User className="w-5 h-5 text-white" />
                            </button>

                            <AnimatePresence>
                                {isProfileOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 top-12 w-48 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-xl overflow-hidden backdrop-blur-xl"
                                    >
                                        <div className="p-1">
                                            <Link
                                                to="/dashboard"
                                                className="flex items-center gap-2 px-4 py-2 text-sm text-text-muted hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                                onClick={() => setIsProfileOpen(false)}
                                            >
                                                <LayoutDashboard className="w-4 h-4" />
                                                Dashboard
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 rounded-lg transition-colors text-left"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Logout
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center transition-all group"
                            title="Login / Sign Up"
                        >
                            <User className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                        </Link>
                    )}
                </motion.div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden pointer-events-auto">
                    <button className="text-white p-2" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <motion.div
                    className="absolute top-24 left-4 right-4 p-6 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-2xl flex flex-col gap-6 md:hidden shadow-2xl z-40 pointer-events-auto"
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                >
                    <ul className="flex flex-col gap-2 text-center">
                        {navItems.map((item) => (
                            <li key={item.label}>
                                {item.isScroll && location.pathname === '/' ? (
                                    <button onClick={() => scrollToSection(item.id)} className="text-lg font-medium text-text-muted hover:text-white block w-full py-3 rounded-xl hover:bg-white/5 transition-colors">
                                        {item.label}
                                    </button>
                                ) : (
                                    <Link to={item.path} className="text-lg font-medium text-text-muted hover:text-white block w-full py-3 rounded-xl hover:bg-white/5 transition-colors" onClick={() => setIsOpen(false)}>
                                        {item.label}
                                    </Link>
                                )}
                            </li>
                        ))}
                        <div className="flex flex-col gap-3 mt-4 border-t border-white/10 pt-4">
                            {isLoggedIn ? (
                                <>
                                    <Link to="/dashboard" className="py-3 rounded-xl font-medium text-white hover:bg-white/5" onClick={() => setIsOpen(false)}>
                                        Dashboard
                                    </Link>
                                    <button onClick={handleLogout} className="py-3 rounded-xl font-medium text-red-400 hover:bg-white/5">
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <Link to="/login" className="py-3 rounded-xl font-medium bg-white text-black" onClick={() => setIsOpen(false)}>
                                    Login / Sign Up
                                </Link>
                            )}
                        </div>
                    </ul>
                </motion.div>
            )}
        </motion.header>
    );
};

export default Header;
