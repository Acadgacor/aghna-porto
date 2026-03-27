"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { StatItem } from "@/components/ui/StatItem";

export function StatsSection({ isIndo }: { isIndo: boolean }) {
    const statsRef = useRef<HTMLDivElement>(null);
    const isStatsInView = useInView(statsRef, { once: true, margin: "-50px" });

    return (
        <section className="w-full bg-navy py-12 px-6" ref={statsRef}>
            <motion.div
                initial="hidden"
                animate={isStatsInView ? "visible" : "hidden"}
                variants={staggerContainer}
                className="max-w-4xl mx-auto grid grid-cols-3 gap-4 divide-x divide-cream/10"
            >
                <motion.div variants={fadeUp}>
                    <StatItem value={5} suffix="+" label={isIndo ? "Pengalaman Org." : "Organizations"} start={isStatsInView} />
                </motion.div>
                <motion.div variants={fadeUp}>
                    <StatItem value={3} suffix="+" label={isIndo ? "Proyek Aktif" : "Active Projects"} start={isStatsInView} />
                </motion.div>
                <motion.div variants={fadeUp}>
                    <StatItem value={2} suffix=" yr" label={isIndo ? "Pengalaman Hukum" : "Legal Experience"} start={isStatsInView} />
                </motion.div>
            </motion.div>
        </section>
    );
}
