"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/animations";

export function HeroSection({ dict, isIndo }: { dict: any; isIndo: boolean }) {
    const navDict = dict.navigation;
    const homeDict = dict.home;

    return (
        <section id="home" className="relative min-h-[calc(100vh-72px)] flex items-center overflow-hidden">
            {/* Background ambient orbs */}
            <div className="absolute top-[-10%] left-[-8%] w-[500px] h-[500px] bg-gold/10 rounded-full blur-[120px] pointer-events-none"
                style={{ animation: "floatSlow 10s ease-in-out infinite" }} />
            <div className="absolute bottom-[-15%] right-[-5%] w-[600px] h-[600px] bg-navy/6 rounded-full blur-[140px] pointer-events-none"
                style={{ animation: "floatSlow 14s ease-in-out infinite reverse" }} />
            <div className="absolute top-[30%] right-[20%] w-[300px] h-[300px] bg-gold/6 rounded-full blur-[100px] pointer-events-none"
                style={{ animation: "gradientShift 8s ease-in-out infinite 2s" }} />

            {/* Subtle dot grid */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(10,25,47,0.06)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="max-w-[1380px] w-full mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
                    {/* Left: Text Content */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col items-start space-y-6"
                    >
                        {/* Badge */}
                        <motion.div
                            variants={fadeUp}
                            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-gold/30 bg-gold/8 text-navy/75 text-xs font-semibold tracking-wide shadow-sm"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-60" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
                            </span>
                            {homeDict.badge}
                        </motion.div>

                        {/* Headline */}
                        <motion.div variants={fadeUp} className="space-y-0.5">
                            <motion.h1 className="text-[2.9rem] sm:text-[3.6rem] lg:text-[4.2rem] xl:text-[5rem] font-bold text-navy leading-[1.05] tracking-tight">
                                {isIndo ? "Halo, Saya" : "Hello, I'm"}
                                <br />
                                <span className="gradient-text">Aghna</span>
                                <br />
                                <span className="text-navy/80 font-light">Ghalie Aminudin</span>
                            </motion.h1>
                        </motion.div>

                        {/* Skill Pills */}
                        <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
                            {homeDict.skillPills.map((pill: string) => (
                                <span
                                    key={pill}
                                    className="px-4 py-1.5 rounded-full border border-navy/12 bg-white/50 text-navy/70 text-xs font-semibold backdrop-blur-sm shadow-sm hover:border-gold/40 hover:text-navy hover:bg-white/80 transition-all duration-300 cursor-default"
                                >
                                    {pill}
                                </span>
                            ))}
                        </motion.div>

                        {/* Tagline */}
                        <motion.p
                            variants={fadeUp}
                            className="text-base sm:text-lg text-navy/60 leading-relaxed max-w-[480px]"
                        >
                            {homeDict.tagline}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={fadeUp}
                            className="flex flex-col sm:flex-row gap-3 pt-2 w-full sm:w-auto"
                        >
                            <a
                                href="#resume"
                                className="group relative inline-flex items-center justify-center gap-2 px-7 py-3 bg-navy text-cream rounded-xl font-semibold text-sm overflow-hidden shadow-lg shadow-navy/20 hover:-translate-y-0.5 hover:shadow-navy/30 transition-all duration-300"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <span className="relative">{navDict.resume}</span>
                                <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </a>
                            <a
                                href="#contact"
                                className="group inline-flex items-center justify-center gap-2 px-7 py-3 border border-navy/20 text-navy hover:border-gold/60 hover:bg-gold/5 rounded-xl font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5"
                            >
                                {navDict.contact}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Right: Portrait Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
                        className="flex justify-center lg:justify-end"
                    >
                        <div className="relative w-full max-w-[380px] lg:max-w-[420px] group" style={{ animation: "float 8s ease-in-out infinite" }}>
                            {/* Outer glow ring */}
                            <div
                                className="absolute -inset-3 rounded-2xl opacity-60"
                                style={{
                                    background: "conic-gradient(from 0deg, #D4AF37, #F0D060, #D4AF37, transparent, #D4AF37)",
                                    animation: "rotateBorder 6s linear infinite",
                                    filter: "blur(2px)",
                                }}
                            />
                            {/* Gold decorative frame */}
                            <div className="absolute inset-0 border border-gold/40 bg-gold/10 translate-x-4 translate-y-4 rounded-2xl transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6" />
                            {/* Image container */}
                            <div
                                className="relative overflow-hidden rounded-2xl z-10 aspect-[4/5]"
                                style={{ animation: "borderGlow 4s ease-in-out infinite" }}
                            >
                                <Image
                                    src={personalInfo.imageUrl}
                                    alt={personalInfo.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-navy/20 via-transparent to-transparent opacity-60" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
