"use client";

import { motion, Variants } from "framer-motion";
import { experiences } from "@/lib/data";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
        },
    },
};

export default function Resume() {
    return (
        <div className="min-h-screen bg-transparent py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="mb-16 border-b-2 border-navy/20 pb-8 text-center sm:text-left"
                >
                    <h1 className="text-4xl sm:text-5xl font-bold font-serif text-navy tracking-tight mb-3">
                        Curriculum Vitae
                    </h1>
                    <p className="text-lg text-navy/70 font-light font-serif tracking-widest uppercase text-sm">
                        Professional Experience & Legal Journey
                    </p>
                </motion.div>

                {/* Timeline Section */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative border-l-2 border-navy/20 ml-4 sm:ml-0"
                >
                    {experiences.map((exp) => (
                        <motion.div
                            key={exp.id}
                            variants={itemVariants}
                            className="mb-14 relative pl-8 sm:pl-10"
                        >
                            {/* Timeline Dot */}
                            <div className="absolute w-3 h-3 bg-gold rounded-full -left-[7.5px] top-2 ring-4 ring-background" />

                            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-1">
                                <h3 className="text-2xl font-bold font-serif text-navy leading-tight">
                                    {exp.position}
                                </h3>
                                <span className="text-sm font-medium text-gold tracking-widest uppercase mt-2 sm:mt-0">
                                    {exp.duration}
                                </span>
                            </div>

                            <h4 className="text-lg font-medium text-navy/80 mb-4 font-serif italic">
                                {exp.institution}
                            </h4>

                            <p className="text-navy/75 leading-relaxed font-light text-justify max-w-2xl">
                                {exp.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
