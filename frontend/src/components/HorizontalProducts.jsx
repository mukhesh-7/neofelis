import React, { useRef, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import monk from '../assets/monk.jpeg';
import web from '../assets/web.jpeg';
import niki from '../assets/niki.jpeg';
import off from '../assets/off.jpeg';
import orch from '../assets/orch.jpeg';
import networkVideo from '../assets/network.mp4';

gsap.registerPlugin(ScrollTrigger);

const products = [
    {
        title: "CrazyMonk",
        category: "Research",
        image: monk,
        id: "01",
        description: "Advanced neural research platform",
        abstract: "CrazyMonk revolutionizes how we approach neural networking by mimicking biological synaptic plasticity in a digital environment. It addresses the scalability bottleneck in current AI models.",
        demoLink: "#"
    },
    {
        title: "MyWeBoy",
        category: "Infrastructure",
        image: web,
        id: "02",
        description: "Next-gen web infrastructure",
        abstract: "MyWeBoy provides a self-healing infrastructure layer that autonomously manages load distribution and server health, addressing the crucial problem of downtime in high-traffic applications.",
        demoLink: "#"
    },
    {
        title: "Nikki",
        category: "AI Vision",
        image: niki,
        id: "03",
        description: "Computer vision made human",
        abstract: "Nikki interprets visual data with context-aware algorithms, solving the problem of false positives in security and autonomous driving systems by understanding scene semantics.",
        demoLink: "#"
    },
    {
        title: "MyOFFBoy",
        category: "Network",
        image: off,
        id: "04",
        description: "Offline-first network protocol",
        abstract: "MyOFFBoy ensures data integrity and seamless user experience even in intermittent connectivity environments, bridging the digital divide in remote areas.",
        demoLink: "#"
    },
    {
        title: "Orchestrator",
        category: "Processing",
        image: orch,
        id: "05",
        description: "Centralized data processing unit",
        abstract: "Orchestrator unifies disparate data streams into a coherent actionable intelligence pipeline, solving the fragmentation issue in enterprise big data setups.",
        demoLink: "#"
    },
];

const HorizontalProducts = () => {
    const sectionRef = useRef(null);
    const pinRef = useRef(null);
    const videoRef = useRef(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const pin = pinRef.current;

        if (!section || !pin) return;

        let ctx = gsap.context(() => {
            // Ensure video plays when section is reached
            ScrollTrigger.create({
                trigger: section,
                start: "top bottom",
                onEnter: () => videoRef.current?.play(),
                onEnterBack: () => videoRef.current?.play(),
            });

            let containerAnimation = gsap.to(pin, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: () => "+=" + pin.offsetWidth,
                    pin: true,
                    scrub: true,
                },
                x: () => -(pin.scrollWidth - document.documentElement.clientWidth) + "px",
                ease: 'none'
            });

            const cards = pin.querySelectorAll('.project-card-gsap');
            cards.forEach((card, index) => {
                gsap.to(card, {
                    scrollTrigger: {
                        trigger: card,
                        containerAnimation: containerAnimation,
                        start: 'left center',
                        end: 'right center',
                        toggleClass: {
                            targets: card,
                            className: "active-project"
                        }
                    }
                })
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="overflow-hidden bg-[#030311] relative"
            id="products"
        >
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full z-0">
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-60"
                >
                    <source src={networkVideo} type="video/mp4" />
                </video>
                {/* Dark Overlay for readability */}
                <div className="absolute inset-0 bg-black/50"></div>
            </div>

            <div ref={pinRef} className="flex h-screen items-center px-[10vw] w-max relative z-10">

                {/* Intro Section within the scroll */}
                <div className="w-[80vw] md:w-[40vw] flex-shrink-0 flex flex-col justify-center px-8">
                    <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">Selected products</h2>
                    <p className="text-xl text-text-muted">Pioneering the future of interaction</p>
                </div>

                {products.map((project) => (
                    <motion.div
                        key={project.id}
                        layoutId={`card-${project.id}`}
                        onClick={() => setSelectedProduct(project)}
                        className="project-card-gsap group relative h-[50vh] md:h-[60vh] w-[80vw] md:w-[450px] flex-shrink-0 mx-4 md:mx-8 rounded-3xl overflow-hidden glass border border-white/5 cursor-pointer bg-black/20"
                        initial={{ opacity: 0.4, scale: 0.9 }}
                        whileHover={{ scale: 0.95, opacity: 1 }}
                    >
                        <style jsx>{`
                            .active-project {
                                opacity: 1 !important;
                                transform: scale(1) !important;
                            }
                        `}</style>
                        <motion.div
                            layoutId={`image-${project.id}`}
                            className="absolute inset-0 w-full h-full"
                        >
                            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

                        <div className="absolute top-6 right-6 md:top-10 md:right-10 opacity-30 font-bold text-6xl md:text-8xl text-white">
                            {project.id}
                        </div>

                        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                            <span className="inline-block px-4 py-1 rounded-full bg-accent/20 text-accent text-sm font-semibold tracking-wider mb-4 border border-accent/20 backdrop-blur-md">
                                {project.category}
                            </span>
                            <motion.h3
                                layoutId={`title-${project.id}`}
                                className="text-3xl md:text-5xl font-bold mb-6 text-white group-hover:text-accent transition-colors duration-300"
                            >
                                {project.title}
                            </motion.h3>
                            <div className="flex items-center gap-3 text-base md:text-lg font-medium text-white group/btn">
                                View Case
                                <span className="bg-white text-black rounded-full p-2 group-hover/btn:bg-accent group-hover/btn:text-white transition-colors">
                                    <ArrowRight size={16} className="-rotate-45 group-hover/btn:rotate-0 transition-transform duration-300" />
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* Outro/Buffer */}
                <div className="w-[10vw] md:w-[50vw] flex-shrink-0"></div>
            </div>

            {/* Expanded Card Modal */}
            {createPortal(
                <AnimatePresence>
                    {selectedProduct && (
                        <div className="fixed inset-0 z-[45] flex items-center justify-center">

                            {/* Backdrop */}
                            <motion.div
                                className="absolute inset-0 bg-black/95 backdrop-blur-sm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedProduct(null)}
                            />

                            {/* Expanded Card */}
                            <motion.div
                                layoutId={`card-${selectedProduct.id}`}
                                className="relative w-full h-full md:w-[90vw] md:h-[85vh] bg-[#050505] rounded-none md:rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row z-50 border border-white/10"
                            >
                                {/* Close Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedProduct(null);
                                    }}
                                    className="absolute top-6 right-6 z-50 p-2 bg-black/50 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors"
                                >
                                    <X size={24} />
                                </button>

                                {/* Left: Image */}
                                <div className="relative w-full md:w-[55%] h-[40vh] md:h-full">
                                    <motion.div
                                        layoutId={`image-${selectedProduct.id}`}
                                        className="w-full h-full"
                                    >
                                        <img
                                            src={selectedProduct.image}
                                            alt={selectedProduct.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#050505]/80 pointer-events-none"></div>
                                </div>

                                {/* Right: Content */}
                                <div className="w-full md:w-[45%] h-full p-8 md:p-16 flex flex-col justify-center relative bg-[#050505]">

                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2, duration: 0.5 }}
                                    >
                                        <div className="flex items-center gap-4 mb-6">
                                            <span className="text-accent text-sm font-bold tracking-widest uppercase border border-accent/20 px-3 py-1 rounded-full">
                                                {selectedProduct.category}
                                            </span>
                                            <div className="h-px w-12 bg-white/20"></div>
                                            <span className="text-white/40 font-mono text-sm">ID: {selectedProduct.id}</span>
                                        </div>

                                        <motion.h2
                                            layoutId={`title-${selectedProduct.id}`}
                                            className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight"
                                        >
                                            {selectedProduct.title}
                                        </motion.h2>

                                        <p className="text-xl text-white/70 font-light mb-8 italic">
                                            {selectedProduct.description}
                                        </p>

                                        <div className="space-y-6">
                                            <div>
                                                <h4 className="text-white font-semibold mb-2">The Challenge & Solution</h4>
                                                <p className="text-text-muted leading-relaxed text-lg">
                                                    {selectedProduct.abstract}
                                                </p>
                                            </div>

                                            <div className="pt-8">
                                                <a
                                                    href={selectedProduct.demoLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-accent hover:text-white transition-all duration-300 group"
                                                >
                                                    View Live Demo
                                                    <ExternalLink size={18} className="group-hover:rotate-45 transition-transform duration-300" />
                                                </a>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Decorative Element */}
                                    <div className="absolute bottom-0 right-0 p-12 opacity-5 pointer-events-none">
                                        <div className="text-[200px] font-bold leading-none text-white select-none">
                                            {selectedProduct.id}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </section>
    );
};

export default HorizontalProducts;
