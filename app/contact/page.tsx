"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { socialLinks } from "@/lib/data";

// Helper object to map platform string from data.ts to Lucide React icons
const iconMap: Record<string, React.ReactNode> = {
    Email: <Mail className="w-7 h-7 sm:w-8 sm:h-8 text-navy" />,
    LinkedIn: <FaLinkedin className="w-7 h-7 sm:w-8 sm:h-8 text-navy" />,
    Instagram: <FaInstagram className="w-7 h-7 sm:w-8 sm:h-8 text-navy" />,
};

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2, // cards show up sequentially
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

export default function Contact() {
    return (
        <div className="min-h-[85vh] bg-background py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            <div className="max-w-3xl w-full">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-14 text-center"
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif text-navy tracking-tight mb-4">
                        Get in Touch
                    </h1>
                    <p className="text-lg text-navy/75 font-light max-w-xl mx-auto leading-relaxed">
                        Whether for a potential legal consultation, business inquiry, or
                        just a simple greeting, feel free to reach out. I will respond as
                        promptly as I can.
                    </p>
                </motion.div>

                {/* Contact Links Cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                >
                    {socialLinks.map((social) => (
                        <motion.div key={social.platform} variants={itemVariants}>
                            <Link
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center justify-between p-5 sm:p-8 bg-cream border border-navy/10 hover:border-gold hover:shadow-xl rounded-2xl transition-all duration-300"
                            >
                                <div className="flex items-center space-x-5 sm:space-x-8">
                                    {/* Icon Wrapper */}
                                    <div className="p-4 bg-background rounded-full shadow-sm ring-1 ring-navy/5 group-hover:scale-110 group-hover:ring-gold/30 transition-transform duration-300">
                                        {iconMap[social.platform] || iconMap["Email"]}
                                    </div>

                                    {/* Text Details */}
                                    <div className="flex flex-col">
                                        <h3 className="text-xl sm:text-2xl font-bold font-serif text-navy group-hover:text-gold transition-colors duration-300">
                                            {social.platform}
                                        </h3>
                                        <p className="text-navy/60 font-medium tracking-wide text-sm sm:text-base mt-1 break-all">
                                            {social.label}
                                        </p>
                                    </div>
                                </div>

                                {/* Arrow Icon Effect */}
                                <div className="hidden sm:block">
                                    <ArrowRight className="w-8 h-8 text-navy/20 group-hover:text-gold group-hover:translate-x-2 transition-all duration-300" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
