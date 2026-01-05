import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Brain, Cpu, Globe } from 'lucide-react';
import { ShinyButton } from '../components/ui/ShinyButton';
import HorizontalProducts from '../components/HorizontalProducts';

import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import ShaderBackground from "@/components/ui/shader-background";
import Galaxy from "@/components/ui/gravity-stars";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

'use client';
import { cn } from '@/lib/utils';


const Home = () => {


    // Parallax hook
    const { scrollY } = useScroll();
    const yHero = useTransform(scrollY, [0, 1000], [0, 400]); // Background parallax
    const textY = useTransform(scrollY, [0, 500], [0, 100]); // Text parallax
    const opacityHero = useTransform(scrollY, [0, 400], [1, 0]); // Fade out
    const scaleHero = useTransform(scrollY, [0, 500], [1, 0.9]); // Scale down
    const blurHero = useTransform(scrollY, [0, 400], ["0px", "10px"]); // Blur effect

    const timelineData = [
        {
            id: 1,
            title: "Neural Synergy",
            date: "Q1 2024",
            content: "Initiating the sync between biological heuristics and digital processing power.",
            category: "R&D",
            icon: Brain,
            relatedIds: [2, 3],
            status: "completed",
            energy: 95
        },
        {
            id: 2,
            title: "Cognitive Grid",
            date: "Q3 2024",
            content: "Deploying a decentralized mesh of intelligent nodes for real-time inference.",
            category: "Infrastructure",
            icon: Globe,
            relatedIds: [1, 5],
            status: "in-progress",
            energy: 80
        },
        {
            id: 3,
            title: "Deep Perception",
            date: "Q4 2024",
            content: "Computer vision modules achieving 99.9% accuracy in dynamic environments.",
            category: "AI Vision",
            icon: Cpu,
            relatedIds: [1, 4],
            status: "pending",
            energy: 40
        },
        {
            id: 4,
            title: "Hyper-Linkage",
            date: "Q1 2025",
            content: "Ultra-low latency connection protocols for distributed intelligence units.",
            category: "Network",
            icon: ArrowRight,
            relatedIds: [3, 5],
            status: "pending",
            energy: 20
        },
        {
            id: 5,
            title: "Core Synthesis",
            date: "Q2 2025",
            content: "Final integration of sub-systems into the NeoFelis Labs central core.",
            category: "Core",
            icon: Brain,
            relatedIds: [2, 4],
            status: "pending",
            energy: 10
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const wordVariants = {
        hidden: { y: "100%", opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    // Split text helper
    const splitText = (text) => {
        return text.split(" ").map((word, i) => (
            <div key={i} className="inline-block overflow-hidden mr-2 md:mr-4 align-top">
                <motion.span
                    variants={wordVariants}
                    className="inline-block"
                >
                    {word}
                </motion.span>
            </div>
        ));
    };

    const products = [
        { title: "Neural Synthesis", category: "Research", image: "linear-gradient(135deg, #1e293b, #334155)" },
        { title: "Cognitive Cloud", category: "Infrastructure", image: "linear-gradient(135deg, #0f172a, #1e293b)" },
        { title: "Deep Vision", category: "AI Vision", image: "linear-gradient(135deg, #334155, #475569)" }
    ];

    return (
        <div className="bg-borea-gradient w-full min-h-screen overflow-x-hidden">
            {/* Hero Section */}
            <section id="hero" className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-20 bg-black">
                <Spotlight
                    className="-top-40 left-0 md:left-60 md:-top-20"
                    fill="white"
                />
                <motion.div style={{ y: yHero }} className="absolute inset-0 z-0 pointer-events-none">
                    {/* Gravity Stars Background */}
                    <div className="absolute inset-0 w-full h-full z-20 pointer-events-auto">
                        <Galaxy
                            starSpeed={0.1}
                            density={1.5}
                            repulsionStrength={2}
                            className="w-full h-full"
                        />
                    </div>
                    {/* Robot 3D Scene - Positioned to the Right */}
                    <div className="absolute bottom-0 md:top-0 md:right-0 w-full md:w-3/5 h-[500px] md:h-full z-30 pointer-events-auto translate-y-20 md:translate-y-0">
                        <SplineScene
                            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                            className="w-full h-full"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg"></div>
                </motion.div>

                <div className="container-custom relative z-20 w-full pointer-events-none">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[80vh]">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            style={{
                                opacity: opacityHero,
                                y: textY,
                                scale: scaleHero,
                                filter: blurHero
                            }}
                            className="flex flex-col items-center justify-center text-center"
                        >
                            <h1 className="text-7xl md:text-10xl font-bold tracking-tighter leading-tight mb-8 text-white">
                                {splitText("AI-focused,")}
                                <br className="hidden md:block" />
                                <span className="gradient-text">
                                    {splitText("intelligence-driven")}
                                    {splitText("messaging")}
                                </span>
                            </h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2, duration: 0.8 }}
                                className="text-xl md:text-2xl text-text-muted mb-12 max-w-lg leading-relaxed"
                            >
                                NeoFelis Labs transforms enterprise communication with calm, premium, and futuristic AI intelligence.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.5, duration: 0.5 }}
                                className="pointer-events-auto"
                            >
                                <ShinyButton
                                    className="text-lg"
                                    onClick={() => {
                                        const aboutSection = document.getElementById('about');
                                        if (aboutSection) {
                                            aboutSection.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }}
                                >
                                    Explore Our Work
                                </ShinyButton>
                            </motion.div>
                        </motion.div>
                        {/* Right column empty for robot space - Removed since we are centering text now? actually if text is centered, robot on right might overlap or look weird if not handled. 
                           The robot is absolute positioned: `absolute bottom-0 md:top-0 md:right-0 w-full md:w-3/5`.
                           If I center the text, it might sit on top of the robot or be hidden by it. 
                           However, the user explicitly asked to "align the texts to the center of the page".
                           I will keep the robot as is.
                        */}
                        <div className="hidden md:block"></div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="relative min-h-[40vh] w-full flex flex-col items-center justify-start pt-32 pb-20 overflow-hidden z-30">
                <ShaderBackground className="opacity-80 absolute inset-0 pointer-events-none" />

                <div className="container-custom relative z-10 w-3/4">
                    {/* Intro Logic moved top */}
                    <div className="mb-8 md:mb-12 max-w-4xl text-center mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Driven by Intelligence</h2>
                        <p className="text-lg text-text-muted leading-relaxed max-w-2xl mx-auto">
                            We pioneer systems that understand context, nuance, and intent.
                            Our research focuses on creating sustainable, noise-free digital environments for enterprise decision makers.
                        </p>
                    </div>

                    {/* Timeline Component taking full width */}
                    <div className="w-full h-[600px] border border-white/5 rounded-3xl overflow-hidden glass bg-black/20">
                        <RadialOrbitalTimeline timelineData={timelineData} />
                    </div>
                </div>
            </section>

            {/* Horizontal Scroll products Section */}
            <HorizontalProducts />

            {/* Future Goals Section */}
            <section id="future" className="relative min-h-screen w-full flex items-center justify-center py-20 overflow-hidden z-30">
                {/* Video Background */}
                <div className="absolute inset-0 w-full h-full z-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-70"
                    >
                        <source src="./assets/brain.mp4" type="video/mp4" />
                    </video>
                    {/* Dark Overlay for readability */}
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>

                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-10xl mx-auto text-center"
                    >
                        <h2 className="text-6xl md:text-6xl font-bold mb-8 text-white">Future Goals</h2>
                        <div className="p-8 md:p-12 relative overflow-hidden group">
                            <Brain size={64} className="text-accent mb-6 mx-auto animate-pulse" />
                            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">Neuromorphic Integration</h3>
                            <p className="text-lg md:text-xl text-text-muted leading-relaxed">
                                Our vision extends beyond individual products. We are building towards a unified ecosystem where every created system integrates into a singular
                                <span className="text-white font-semibold"> Neuromorphic Computing Architecture</span>.
                                <br /><br />
                                This centralized intelligence will serve as the <span className="text-accent font-bold">Brain</span> of the entire system, orchestrating operations with biological efficiency and cognitive adaptability.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
