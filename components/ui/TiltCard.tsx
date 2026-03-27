"use client";

import { useRef } from "react";

export function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        ref.current.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(4px)`;
    };
    const handleMouseLeave = () => {
        if (!ref.current) return;
        ref.current.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg) translateZ(0px)";
        ref.current.style.transition = "transform 0.5s ease";
    };
    const handleMouseEnter = () => {
        if (!ref.current) return;
        ref.current.style.transition = "transform 0.1s ease";
    };
    return (
        <div
            ref={ref}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            style={{ transformStyle: "preserve-3d" }}
        >
            {children}
        </div>
    );
}
