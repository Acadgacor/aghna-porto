"use client";

import { useRef } from "react";
import { motion, Variants, useInView, useScroll, useTransform } from "framer-motion";

/* ── Variants ────────────────────────────────────────────────── */
const container: Variants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
};

const slideIn: Variants = {
    hidden:  { opacity: 0, x: -32 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] } },
};

const fadeUp: Variants = {
    hidden:  { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

/* ── Animated Timeline Line ──────────────────────────────────── */
function TimelineLine() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 30%"] });
    const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    return (
        <div ref={ref} className="absolute left-0 top-0 bottom-0 w-[1px] bg-navy/8">
            <motion.div
                className="left-0 top-0 w-full bg-gradient-to-b from-gold via-gold/60 to-gold/20"
                style={{ height, position: "absolute" }}
            />
        </div>
    );
}

/* ── Main Component ──────────────────────────────────────────── */
export default function ClientResume({ dict }: { dict: any }) {
    const resumeDict = dict.resume;

    const headerRef  = useRef<HTMLDivElement>(null);
    const listRef    = useRef<HTMLDivElement>(null);
    const isListInView = useInView(listRef, { once: true, margin: "-60px" });

    return (
        <div className="min-h-screen bg-cream relative overflow-hidden">

            {/* Background orb */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/6 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-[-10%] w-[400px] h-[400px] bg-navy/4 rounded-full blur-[120px] pointer-events-none" />

            {/* Faint grid */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(10,25,47,0.04)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto px-6 sm:px-10 lg:px-16 py-24">

                {/* ── Header ── */}
                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                    className="mb-20"
                >
                    {/* Eyebrow */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.5 }}
                        className="text-[10px] tracking-[0.35em] uppercase font-semibold mb-4"
                        style={{ color: "var(--color-gold)" }}
                    >
                        Curriculum Vitae
                    </motion.p>

                    <h1
                        className="text-4xl sm:text-5xl font-serif font-semibold leading-tight mb-6"
                        style={{ color: "var(--color-navy)" }}
                    >
                        Professional
                        <br />
                        <span className="gradient-text">{resumeDict.title}</span>
                    </h1>

                    {/* Animated divider */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
                        style={{ originX: 0 }}
                        className="h-[1.5px] bg-gradient-to-r from-gold via-gold/40 to-transparent w-20"
                    />
                </motion.div>

                {/* ── Timeline ── */}
                <div ref={listRef} className="relative pl-8">
                    <TimelineLine />

                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate={isListInView ? "visible" : "hidden"}
                        className="space-y-0"
                    >
                        {resumeDict.experiences.map((exp: any, index: number) => (
                            <motion.div
                                key={exp.id}
                                variants={slideIn}
                                className="group relative pb-14 last:pb-0"
                            >
                                {/* Timeline dot */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={isListInView ? { scale: 1 } : { scale: 0 }}
                                    transition={{ delay: index * 0.18 + 0.3, type: "spring", stiffness: 300 }}
                                    className="absolute -left-[35px] top-1.5 w-3 h-3 rounded-full border-2 border-gold bg-cream group-hover:bg-gold transition-colors duration-300 shadow-sm z-10"
                                />

                                {/* Content card */}
                                <div className="group/card glass-card rounded-xl p-6 hover:border-gold/30 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                                    {/* Duration badge */}
                                    <span
                                        className="inline-block text-[10px] tracking-[0.2em] uppercase font-semibold mb-3 px-2.5 py-1 rounded-full border"
                                        style={{
                                            color: "var(--color-gold)",
                                            borderColor: "rgba(212,175,55,0.25)",
                                            background: "rgba(212,175,55,0.06)",
                                        }}
                                    >
                                        {exp.duration}
                                    </span>

                                    <h3
                                        className="text-xl sm:text-2xl font-serif font-semibold leading-snug mb-1 group-hover/card:text-gold transition-colors duration-300"
                                        style={{ color: "var(--color-navy)" }}
                                    >
                                        {exp.position}
                                    </h3>

                                    <h4
                                        className="text-sm font-light italic mb-4"
                                        style={{ color: "var(--color-navy)", opacity: 0.5 }}
                                    >
                                        {exp.institution}
                                    </h4>

                                    <p
                                        className="text-sm leading-relaxed text-justify"
                                        style={{ color: "var(--color-navy)", opacity: 0.6 }}
                                    >
                                        {exp.description}
                                    </p>

                                    {/* Hover accent */}
                                    <div
                                        className="mt-5 h-[1.5px] w-0 group-hover/card:w-10 transition-all duration-500 ease-out"
                                        style={{ background: "var(--color-gold)" }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

            </div>
        </div>
    );
}
