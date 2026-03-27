"use client";

import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
};

export default function ClientResume({ dict }: { dict: any }) {
    const resumeDict = dict.resume;

    return (
        <div className="min-h-screen bg-cream py-24 px-6 sm:px-10 lg:px-16">
            <div className="max-w-2xl mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                    className="mb-20"
                >
                    <p
                        className="text-xs tracking-[0.25em] uppercase mb-4 font-mono"
                        style={{ color: "var(--color-gold, #b8965a)" }}
                    >
                        Curriculum Vitae
                    </p>
                    <h1
                        className="text-4xl sm:text-5xl font-serif font-semibold leading-tight"
                        style={{ color: "var(--color-navy, #1a2540)" }}
                    >
                        Professional
                        <br />
                        <span style={{ color: "var(--color-gold, #b8965a)" }}>{resumeDict.title}</span>
                    </h1>
                </motion.div>

                {/* Timeline */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="space-y-0"
                >
                    {resumeDict.experiences.map((exp: any, index: number) => (
                        <motion.div
                            key={exp.id}
                            variants={itemVariants}
                            className="group relative grid grid-cols-[1px_1fr] gap-x-8"
                        >
                            {/* Left: vertical line + dot */}
                            <div className="flex flex-col items-center">
                                <div
                                    className="w-px flex-1 transition-colors duration-500 group-hover:opacity-100"
                                    style={{
                                        background: index === 0
                                            ? "linear-gradient(to bottom, transparent, var(--color-navy, #1a2540)30)"
                                            : "var(--color-navy, #1a2540)20",
                                        opacity: 0.4,
                                    }}
                                />
                                <div
                                    className="w-2 h-2 rounded-full my-2 flex-shrink-0 transition-transform duration-300 group-hover:scale-125"
                                    style={{ background: "var(--color-gold, #b8965a)" }}
                                />
                                <div
                                    className="w-px flex-1"
                                    style={{
                                        background: index === resumeDict.experiences.length - 1
                                            ? "linear-gradient(to bottom, var(--color-navy, #1a2540)20, transparent)"
                                            : "var(--color-navy, #1a2540)20",
                                        opacity: 0.4,
                                    }}
                                />
                            </div>

                            {/* Right: content */}
                            <div className="pb-14 pt-1">
                                <span
                                    className="text-[10px] tracking-[0.2em] uppercase font-mono mb-3 block"
                                    style={{ color: "var(--color-gold, #b8965a)" }}
                                >
                                    {exp.duration}
                                </span>

                                <h3
                                    className="text-xl sm:text-2xl font-serif font-semibold leading-snug mb-1"
                                    style={{ color: "var(--color-navy, #1a2540)" }}
                                >
                                    {exp.position}
                                </h3>

                                <h4
                                    className="text-sm font-light italic mb-4"
                                    style={{ color: "var(--color-navy, #1a2540)", opacity: 0.55 }}
                                >
                                    {exp.institution}
                                </h4>

                                <p
                                    className="text-sm leading-relaxed text-justify"
                                    style={{ color: "var(--color-navy, #1a2540)", opacity: 0.65 }}
                                >
                                    {exp.description}
                                </p>

                                {/* Subtle hover line */}
                                <div
                                    className="mt-6 h-px w-0 group-hover:w-12 transition-all duration-500 ease-out"
                                    style={{ background: "var(--color-gold, #b8965a)" }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </div>
    );
}
