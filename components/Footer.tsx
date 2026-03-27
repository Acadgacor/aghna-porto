"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Mail } from "lucide-react";
import { socialLinks } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
    Email:     <Mail className="w-4 h-4" />,
    LinkedIn:  <FaLinkedin className="w-4 h-4" />,
    Instagram: <FaInstagram className="w-4 h-4" />,
    WhatsApp:  <FaWhatsapp className="w-4 h-4" />,
};

export default function Footer() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    }, []);

    const whatsappMessage = "Halo Aghna, saya ingin berdiskusi lebih lanjut mengenai...";
    const encodedMsg = encodeURIComponent(whatsappMessage);

    return (
        <footer className="relative bg-navy text-cream overflow-hidden">
            {/* Gold gradient top border */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

            {/* Subtle radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(212,175,55,0.04),transparent_70%)] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10">
                <div className="flex flex-col items-center gap-6">

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center"
                    >
                        {socialLinks.map((social, i) => {
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
                                <motion.div
                                    key={social.platform}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08, duration: 0.35 }}
                                >
                                    <Link
                                        href={finalUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-2 px-4 py-2 rounded-full border border-cream/10 text-cream/55 hover:text-gold hover:border-gold/35 hover:bg-gold/6 transition-all duration-300 text-sm font-medium tracking-wide"
                                    >
                                        <span className="group-hover:scale-110 transition-transform duration-300">
                                            {iconMap[social.platform]}
                                        </span>
                                        <span>{social.platform}</span>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* Divider */}
                    <div className="w-32 h-px bg-gradient-to-r from-transparent via-cream/15 to-transparent" />

                    {/* Copyright */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-xs font-serif tracking-[0.25em] text-cream/35 uppercase"
                    >
                        &copy; 2026 Aghna Ghalie Aminudin
                    </motion.p>
                </div>
            </div>
        </footer>
    );
}
