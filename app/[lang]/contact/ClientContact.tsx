"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { socialLinks } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
    Email: <Mail className="w-5 h-5" />,
    LinkedIn: <FaLinkedin className="w-5 h-5" />,
    Instagram: <FaInstagram className="w-5 h-5" />,
    WhatsApp: <FaWhatsapp className="w-5 h-5" />,
};

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    },
};

export default function ClientContact({ dict }: { dict: any }) {
    const contactDict = dict.contact;
    const isIndo = contactDict.title === "Hubungi Saya";

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    }, []);

    const whatsappMessage = isIndo
        ? "Halo Aghna, saya ingin berdiskusi lebih lanjut mengenai..."
        : "Hello Aghna, I would like to discuss further regarding...";

    const encodedWhatsAppMessage = encodeURIComponent(whatsappMessage);

    return (
        <div className="min-h-[85vh] bg-cream flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-24">
            <div className="max-w-2xl w-full mx-auto">

                {/* Eyebrow */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-xs uppercase tracking-[0.2em] text-navy/40 font-medium mb-6"
                >
                    {contactDict.title}
                </motion.p>

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                    className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-navy leading-[1.05] tracking-tight mb-6"
                >
                    {dict.home.name.includes("Aghna") ? "Let's talk." : "Mari bicara."}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                    className="text-base text-navy/50 font-light leading-relaxed mb-16 max-w-sm"
                >
                    {contactDict.message}
                </motion.p>

                {/* Divider */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
                    style={{ transformOrigin: "left" }}
                    className="h-px bg-navy/10 mb-10"
                />

                {/* Contact Links */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-1"
                >
                    {socialLinks.map((social) => {
                        let finalUrl = social.url;
                        if (social.platform === "WhatsApp") {
                            finalUrl = isMobile
                                ? `whatsapp://send?phone=6281319244558&text=${encodedWhatsAppMessage}`
                                : `${social.url}?text=${encodedWhatsAppMessage}`;
                        } else if (social.platform === "Email") {
                            finalUrl = isMobile
                                ? `mailto:aghnaghalie@gmail.com?subject=Inquiry&body=${encodedWhatsAppMessage}`
                                : `https://mail.google.com/mail/?view=cm&fs=1&to=aghnaghalie@gmail.com`;
                        }
                        return (
                            <motion.div key={social.platform} variants={itemVariants}>
                                <Link
                                    href={finalUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center justify-between py-5 border-b border-navy/8 hover:border-navy/20 transition-colors duration-300"
                                >
                                    {/* Left: Icon + Label */}
                                    <div className="flex items-center gap-5">
                                        <span className="text-navy/30 group-hover:text-navy/70 transition-colors duration-300">
                                            {iconMap[social.platform] || iconMap["Email"]}
                                        </span>
                                        <div>
                                            <p className="text-xs uppercase tracking-[0.15em] text-navy/35 font-medium mb-0.5">
                                                {social.platform}
                                            </p>
                                            <p className="text-base text-navy font-medium group-hover:text-navy/70 transition-colors duration-300">
                                                {social.label}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right: Arrow */}
                                    <ArrowUpRight className="w-4 h-4 text-navy/20 group-hover:text-navy/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
}
