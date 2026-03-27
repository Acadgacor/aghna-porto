"use client";

import { useState, useEffect } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ResumeSection } from "@/components/sections/ResumeSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function ClientOnePage({ dict, lang }: { dict: any; lang: string }) {
    const isIndo = lang === "id";

    /* ── Mobile Detection ────────────────────────────────────── */
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    }, []);

    return (
        <main className="w-full overflow-x-hidden font-serif bg-cream">
            <HeroSection dict={dict} isIndo={isIndo} />
            <StatsSection isIndo={isIndo} />
            <AboutSection dict={dict} isIndo={isIndo} />
            <ResumeSection dict={dict} />
            <ContactSection dict={dict} isIndo={isIndo} isMobile={isMobile} />
        </main>
    );
}
