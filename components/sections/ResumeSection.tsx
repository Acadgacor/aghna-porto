"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, slideIn } from "@/lib/animations";
import { TimelineLine } from "@/components/ui/TimelineLine";

export function ResumeSection({ dict }: { dict: any }) {
    const resumeDict = dict.resume;
    const resumeRef = useRef<HTMLDivElement>(null);
    const isResumeInView = useInView(resumeRef, { once: true, margin: "-60px" });

    return (
        <section id="resume" className="w-full bg-cream relative overflow-hidden">
            {/* Background orbs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/6 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-[-10%] w-[400px] h-[400px] bg-navy/4 rounded-full blur-[120px] pointer-events-none" />
            {/* Faint grid */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(10,25,47,0.04)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                    className="mb-20"
                >
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15, duration: 0.5 }}
                        className="text-[10px] tracking-[0.35em] uppercase font-semibold mb-4"
                        style={{ color: "var(--color-gold)" }}
                    >
                        Curriculum Vitae
                    </motion.p>
                    <h2 className="text-4xl sm:text-5xl font-serif font-semibold leading-tight mb-6" style={{ color: "var(--color-navy)" }}>
                        Professional
                        <br />
                        <span className="gradient-text">{resumeDict.title}</span>
                    </h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
                        style={{ originX: 0 }}
                        className="h-[1.5px] bg-gradient-to-r from-gold via-gold/40 to-transparent w-20"
                    />
                </motion.div>

                {/* Timeline */}
                <div ref={resumeRef} className="relative pl-8">
                    <TimelineLine />
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate={isResumeInView ? "visible" : "hidden"}
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
                                    animate={isResumeInView ? { scale: 1 } : { scale: 0 }}
                                    transition={{ delay: index * 0.18 + 0.3, type: "spring", stiffness: 300 }}
                                    className="absolute -left-[35px] top-1.5 w-3 h-3 rounded-full border-2 border-gold bg-cream group-hover:bg-gold transition-colors duration-300 shadow-sm z-10"
                                />
                                {/* Content card */}
                                <div className="group/card glass-card rounded-xl p-6 hover:border-gold/30 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
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
                                    <h4 className="text-sm font-light italic mb-4" style={{ color: "var(--color-navy)", opacity: 0.5 }}>
                                        {exp.institution}
                                    </h4>
                                    <p className="text-sm leading-relaxed text-justify" style={{ color: "var(--color-navy)", opacity: 0.6 }}>
                                        {exp.description}
                                    </p>
                                    <div className="mt-5 h-[1.5px] w-0 group-hover/card:w-10 transition-all duration-500 ease-out" style={{ background: "var(--color-gold)" }} />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
