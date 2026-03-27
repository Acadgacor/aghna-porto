"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, Variants, useInView } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { socialLinks } from "@/lib/data";

/* ── Icon Map ────────────────────────────────────────────────── */
const iconMap: Record<string, React.ReactNode> = {
    Email:     <Mail className="w-5 h-5" />,
    LinkedIn:  <FaLinkedin className="w-5 h-5" />,
    Instagram: <FaInstagram className="w-5 h-5" />,
    WhatsApp:  <FaWhatsapp className="w-5 h-5" />,
};

/* ── Variants ────────────────────────────────────────────────── */
const container: Variants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const rowVariant: Variants = {
    hidden:  { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

/* ── Main Component ──────────────────────────────────────────── */
export default function ClientContact({ dict }: { dict: any }) {
    const contactDict = dict.contact;
    const isIndo = contactDict.title === "Hubungi Saya";

    const [isMobile, setIsMobile] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView   = useInView(sectionRef, { once: true, margin: "-60px" });

    useEffect(() => {
        setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    }, []);

    const whatsappMessage = isIndo
        ? "Halo Aghna, saya ingin berdiskusi lebih lanjut mengenai..."
        : "Hello Aghna, I would like to discuss further regarding...";
    const encodedMsg = encodeURIComponent(whatsappMessage);

    return (
        <div className="min-h-[90vh] bg-cream relative overflow-hidden flex items-center">

            {/* Background orbs */}
            <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] bg-gold/8 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-navy/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Dot grid */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(10,25,47,0.04)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

            <div ref={sectionRef} className="relative z-10 w-full max-w-2xl mx-auto px-6 sm:px-12 lg:px-20 py-28">

                {/* Eyebrow */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.5 }}
                    className="text-[10px] tracking-[0.35em] uppercase font-semibold mb-5"
                    style={{ color: "var(--color-gold)" }}
                >
                    {contactDict.title}
                </motion.p>

                {/* Headline — clip-path reveal */}
                <div className="overflow-hidden mb-5">
                    <motion.h1
                        initial={{ y: "105%" }}
                        animate={isInView ? { y: "0%" } : { y: "105%" }}
                        transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
                        className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-navy leading-[1.05] tracking-tight"
                    >
                        {isIndo ? "Mari bicara." : "Let's talk."}
                    </motion.h1>
                </div>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 14 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                    transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    className="text-base text-navy/50 font-light leading-relaxed mb-14 max-w-sm"
                >
                    {contactDict.message}
                </motion.p>

                {/* Animated divider */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
                    style={{ originX: 0 }}
                    className="h-[1px] bg-gradient-to-r from-gold/60 via-navy/10 to-transparent mb-10"
                />

                {/* Contact Links */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="space-y-0"
                >
                    {socialLinks.map((social) => {
                        let finalUrl = social.url;
                        if (social.platform === "WhatsApp") {
                            finalUrl = isMobile
                                ? `whatsapp://send?phone=6281319244558&text=${encodedMsg}`
                                : `${social.url}?text=${encodedMsg}`;
                        } else if (social.platform === "Email") {
                            finalUrl = isMobile
                                ? `mailto:aghnaghalie@gmail.com?subject=Inquiry&body=${encodedMsg}`
                                : `https://mail.google.com/mail/?view=cm&fs=1&to=aghnaghalie@gmail.com`;
                        }

                        return (
                            <motion.div key={social.platform} variants={rowVariant}>
                                <Link
                                    href={finalUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative flex items-center justify-between py-5 border-b border-navy/8 hover:border-gold/30 transition-colors duration-300 overflow-hidden"
                                >
                                    {/* Left hover accent bar */}
                                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gold scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

                                    {/* Content */}
                                    <div className="flex items-center gap-5 pl-3">
                                        <span className="w-10 h-10 rounded-xl bg-navy/5 border border-navy/8 flex items-center justify-center text-navy/35 group-hover:bg-gold/8 group-hover:border-gold/25 group-hover:text-navy/70 transition-all duration-300">
                                            {iconMap[social.platform] || iconMap["Email"]}
                                        </span>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-[0.18em] text-navy/35 font-semibold mb-0.5">
                                                {social.platform}
                                            </p>
                                            <p className="text-base text-navy font-medium group-hover:text-navy/70 transition-colors duration-300">
                                                {social.label}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Arrow */}
                                    <div className="flex items-center justify-center w-9 h-9 rounded-full border border-navy/8 group-hover:border-gold/30 group-hover:bg-gold/6 transition-all duration-300 mr-1">
                                        <ArrowUpRight className="w-4 h-4 text-navy/25 group-hover:text-navy/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>

            </div>
        </div>
    );
}
