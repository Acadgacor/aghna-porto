"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function TimelineLine({ targetRef }: { targetRef?: React.RefObject<HTMLElement | null> }) {
    const internalRef = useRef<HTMLDivElement>(null);
    const resolvedRef = targetRef || internalRef;
    const { scrollYProgress } = useScroll({ target: resolvedRef, offset: ["start 80%", "end 30%"] });
    const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    return (
        <div ref={targetRef ? undefined : internalRef} className="absolute left-0 top-0 bottom-0 w-[1px] bg-navy/8">
            <motion.div
                className="left-0 top-0 w-full bg-gradient-to-b from-gold via-gold/60 to-gold/20"
                style={{ height, position: "absolute", transformOrigin: "top" }}
            />
        </div>
    );
}
