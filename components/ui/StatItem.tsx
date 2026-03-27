"use client";

import { useState, useEffect } from "react";

export function useCountUp(target: number, duration = 1800, start = false) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!start) return;
        let startTime: number | null = null;
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [start, target, duration]);
    return count;
}

export function StatItem({ value, suffix = "", label, start }: { value: number; suffix?: string; label: string; start: boolean }) {
    const count = useCountUp(value, 1600, start);
    return (
        <div className="flex flex-col items-center text-center">
            <span className="font-serif text-4xl md:text-5xl font-bold text-gold leading-none">
                {count}{suffix}
            </span>
            <span className="text-cream/60 text-xs md:text-sm mt-2 font-medium tracking-wide uppercase">{label}</span>
        </div>
    );
}
