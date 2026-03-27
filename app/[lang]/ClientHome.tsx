"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Scale, TrendingUp } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
    Scale: <Scale className="w-6 h-6 text-gold" />,
    TrendingUp: <TrendingUp className="w-6 h-6 text-gold" />,
    Users: <Scale className="w-6 h-6 text-gold" />, // fallback for 'Users' if we don't import it
};

const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    },
};

export default function ClientHome({ dict, lang }: { dict: any; lang: string }) {
    const homeDict = dict.home;
    const navDict = dict.navigation;

    return (
        <main className="w-full selection:bg-gold/30 overflow-x-hidden font-serif bg-cream">

            {/* --- HERO SECTION --- */}
            <section className="min-h-screen lg:min-h-[calc(100vh-80px)] flex flex-col items-center justify-center pt-20 pb-12 lg:pt-16 lg:pb-20 px-6 lg:px-12 relative overflow-hidden">
                {/* Subtle grid background effect for Hero */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,25,47,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,25,47,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">

                    {/* Left Column (Editorial) */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
                        }}
                        className="space-y-4 lg:space-y-5 flex flex-col items-start"
                    >
                        {/* 1. Top Badge */}
                        <motion.div variants={fadeUpVariant} className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-navy/10 bg-navy/5 text-navy/80 font-medium text-xs sm:text-[13px] shadow-sm mb-1">
                            <div className="w-2 h-2 rounded-full bg-gold"></div>
                            <p className="font-bold">Law Undergraduate & Founder of Beaulytics</p>
                        </motion.div>

                        {/* 2. Headline */}
                        <motion.h1
                            variants={fadeUpVariant}
                            className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.5rem] leading-[1.1] font-bold text-navy tracking-tight"
                        >
                            Halo, <br />
                            {lang === 'id' ? 'Saya ' : 'I am '} <span className="text-gold">Aghna</span> <br />
                            <span>Ghalie Aminudin</span>
                        </motion.h1>

                        {/* 3. Skill Pills */}
                        <motion.div variants={fadeUpVariant} className="flex flex-wrap gap-2 pt-1">
                            <span className="px-4 py-1.5 rounded-full border border-navy/10 bg-white/50 text-navy/80 text-xs sm:text-[13px] shadow-sm font-bold">Legal Expert</span>
                            <span className="px-4 py-1.5 rounded-full border border-navy/10 bg-white/50 text-navy/80 text-xs sm:text-[13px] shadow-sm font-bold">Business Strategy</span>
                            <span className="px-4 py-1.5 rounded-full border border-navy/10 bg-white/50 text-navy/80 text-xs sm:text-[13px] shadow-sm font-bold">Innovation</span>
                        </motion.div>

                        {/* 4. Tagline / Short Description */}
                        <motion.p
                            variants={fadeUpVariant}
                            className="text-base sm:text-lg text-navy/70 leading-relaxed max-w-xl pt-1"
                        >
                            {homeDict.tagline} ⚖️ | Founder Beaulytics ⚡
                        </motion.p>

                        {/* 5. CTA Buttons */}
                        <motion.div
                            variants={fadeUpVariant}
                            className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-3 w-full sm:w-auto"
                        >
                            <Link
                                href={`/${lang}/resume`}
                                className="px-6 py-2.5 bg-navy text-cream hover:bg-navy/90 hover:-translate-y-1 transition-all duration-300 rounded-xl font-medium text-sm text-center shadow-lg shadow-navy/20 w-full sm:w-auto flex items-center justify-center"
                            >
                                {navDict.resume}
                            </Link>
                            <Link
                                href={`/${lang}/contact`}
                                className="px-6 py-2.5 border border-navy text-navy hover:bg-navy/5 hover:-translate-y-1 transition-all duration-300 rounded-xl font-medium text-sm text-center w-full sm:w-auto flex items-center justify-center"
                            >
                                {navDict.contact}
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Right Column (Visual / Portrait) */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
                        }}
                        className="flex flex-col items-center lg:items-end w-full"
                    >
                        {/* Portrait Image */}
                        <motion.div
                            variants={fadeUpVariant}
                            className="relative w-full aspect-[4/5] max-w-[380px] group mt-8 lg:mt-0"
                        >
                            {/* Background decorative frame */}
                            <div className="absolute inset-0 bg-gold/20 border border-gold/40 translate-x-4 translate-y-4 lg:translate-x-6 lg:translate-y-6 transition-transform duration-500 group-hover:translate-x-8 group-hover:translate-y-8 rounded-xl"></div>

                            <div className="absolute inset-0 bg-navy overflow-hidden z-10 rounded-xl shadow-2xl flex items-center justify-center">
                                <Image
                                    src="/portrait-aghna.jpg"
                                    alt="Aghna Ghalie Aminudin"
                                    fill
                                    className="object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                                    priority
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* --- TENTANG SAYA SECTION --- */}
            <section className="w-full bg-cream border-t border-navy/5 py-24 lg:py-32 px-6 lg:px-12 relative overflow-hidden">
                {/* Faint Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,25,47,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,25,47,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
                    }}
                    className="max-w-[1200px] w-full mx-auto flex flex-col items-center relative z-10"
                >
                    {/* Title */}
                    <motion.h2
                        variants={fadeUpVariant}
                        className="text-4xl md:text-5xl font-bold mb-10 text-center text-navy"
                    >
                        {lang === 'id' ? 'Tentang Saya' : 'About Me'}
                    </motion.h2>

                    {/* Short Story */}
                    <motion.p
                        variants={fadeUpVariant}
                        className="text-navy/80 text-center max-w-4xl text-base md:text-lg leading-relaxed mb-16"
                    >
                        {homeDict.shortStory}
                    </motion.p>

                    {/* Focus Areas Cards Layered on Light Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
                        {homeDict.focusAreas?.map((area: any, index: number) => (
                            <motion.div
                                key={index}
                                variants={fadeUpVariant}
                                className="bg-white/60 backdrop-blur-sm border border-navy/10 p-8 rounded-2xl flex flex-col items-start hover:-translate-y-1 hover:border-gold/50 hover:shadow-md transition-all duration-300 group cursor-default shadow-sm relative overflow-hidden"
                            >
                                {/* Subtle gold hover glow */}
                                <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                                {/* Icon Box */}
                                <div className="bg-navy/5 w-14 h-14 flex items-center justify-center rounded-xl mb-6 transition-colors duration-300 shadow-sm border border-navy/10 group-hover:bg-navy/10 group-hover:border-gold/30">
                                    {iconMap[area.iconName] || <Scale className="w-6 h-6 text-gold" />}
                                </div>
                                {/* Card Text */}
                                <h3 className="font-bold text-xl md:text-2xl mb-3 text-navy group-hover:text-gold transition-colors duration-300 relative z-10">
                                    {area.title}
                                </h3>
                                <p className="text-navy/70 text-sm md:text-base leading-relaxed relative z-10">
                                    {area.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

        </main>
    );
}
