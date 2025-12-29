import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
    return (
        <div className="pt-32 min-h-screen flex items-center bg-borea-gradient text-white">
            <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">Get in Touch</h1>
                    <p className="text-xl text-text-muted mb-12 max-w-md leading-relaxed">
                        Connect with our team to discuss enterprise solutions and partnerships.
                    </p>

                    <div className="flex flex-col gap-8">
                        <div className="flex items-center gap-4 text-xl">
                            <Mail className="text-accent" size={24} />
                            <span>contact@neurolabs.ai</span>
                        </div>
                        <div className="flex items-center gap-4 text-xl">
                            <Phone className="text-accent" size={24} />
                            <span>+1 (555) 123-4567</span>
                        </div>
                        <div className="flex items-center gap-4 text-xl">
                            <MapPin className="text-accent" size={24} />
                            <span>San Francisco, CA</span>
                        </div>
                    </div>
                </motion.div>

                <motion.form
                    className="p-10 rounded-3xl glass border border-white/10 bg-black/30 backdrop-blur-xl shadow-2xl"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-text-muted mb-2">Name</label>
                        <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-text-muted mb-2">Email</label>
                        <input type="email" placeholder="company@email.com" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" />
                    </div>
                    <div className="mb-8">
                        <label className="block text-sm font-medium text-text-muted mb-2">Message</label>
                        <textarea placeholder="How can we help?" rows="4" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"></textarea>
                    </div>
                    <button type="submit" className="w-full btn btn-primary py-4 text-lg">Send Message</button>
                </motion.form>
            </div>
        </div>
    );
};

export default Contact;
