"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { TiltCard } from "@/components/ui/TiltCard";

export function AboutSection({ dict, isIndo }: { dict: any; isIndo: boolean }) {
    const aboutRef = useRef<HTMLDivElement>(null);
    const isAboutInView = useInView(aboutRef, { once: true, margin: "-100px" });

    return (
        <section
            id="about"
            ref={aboutRef}
            className="w-full bg-cream py-28 lg:py-36 px-6 sm:px-10 lg:px-16 relative overflow-hidden"
        >
            {/* Faint grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(10,25,47,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(10,25,47,0.025)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
            {/* Accent orb */}
            <div className="absolute right-0 top-1/3 w-[400px] h-[400px] bg-gold/8 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate={isAboutInView ? "visible" : "hidden"}
                className="max-w-[1200px] mx-auto relative z-10"
            >
                <motion.p
                    variants={fadeUp}
                    className="text-xs tracking-[0.3em] uppercase text-gold font-semibold mb-4 text-center"
                >
                    {isIndo ? "Tentang Saya" : "About Me"}
                </motion.p>

                <motion.h2
                    variants={fadeUp}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy text-center mb-6 leading-[1.1]"
                >
                    {isIndo ? "Siapa" : "Who"}{" "}
                    <span className="gradient-text italic font-serif">
                        {isIndo ? "Aghna" : "I Am"}
                    </span>
                    {isIndo ? " itu?" : "?"}
                </motion.h2>

                <motion.div variants={fadeUp} className="divider-gold w-24 mx-auto mb-10" />

                <motion.p
                    variants={fadeUp}
                    className="text-navy/65 text-center max-w-3xl mx-auto text-base md:text-lg leading-relaxed mb-20"
                >
                    {personalInfo.shortDescription}
                </motion.p>

                {/* Focus Area Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    {personalInfo.focusAreas.map((area, index) => (
                        <motion.div key={index} variants={fadeUp}>
                            <TiltCard className="h-full">
                                <div className="group relative glass-card p-8 rounded-2xl flex flex-col items-start h-full hover:-translate-y-1 transition-transform duration-300 shadow-sm hover:shadow-md cursor-default overflow-hidden">
                                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                        style={{ background: "radial-gradient(ellipse at top left, rgba(212,175,55,0.08), transparent 70%)" }}
                                    />
                                    <div className="absolute top-0 left-8 right-8 h-[1.5px] bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="w-12 h-12 rounded-xl bg-navy/6 border border-navy/10 flex items-center justify-center mb-5 group-hover:bg-gold/10 group-hover:border-gold/30 transition-all duration-300 shadow-sm">
                                        <span className="font-serif text-lg font-bold text-gold">0{area.number}</span>
                                    </div>
                                    <h3 className="font-bold text-xl md:text-2xl mb-3 text-navy group-hover:text-gold transition-colors duration-300 relative z-10">
                                        {area.title}
                                    </h3>
                                    <p className="text-navy/60 text-sm md:text-base leading-relaxed relative z-10">
                                        {area.description}
                                    </p>
                                    <div className="mt-6 h-[1.5px] w-0 group-hover:w-10 transition-all duration-500 ease-out bg-gold" />
                                </div>
                            </TiltCard>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
