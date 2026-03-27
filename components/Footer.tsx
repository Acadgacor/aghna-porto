"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { socialLinks } from "@/lib/data";

export default function Footer() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    }, []);

    const whatsappMessage = "Halo Aghna, saya ingin berdiskusi lebih lanjut mengenai...";
    const encodedWhatsAppMessage = encodeURIComponent(whatsappMessage);

    return (
        <footer className="bg-navy text-cream py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center space-y-4">
                {/* Social Links from Static Data */}
                <div className="flex space-x-6">
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
                            <Link
                                key={social.platform}
                                href={finalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-cream/70 hover:text-gold transition-colors duration-300 font-medium tracking-wider"
                            >
                                {social.platform}
                            </Link>
                        );
                    })}
                </div>

                {/* Copyright text */}
                <p className="text-sm font-light font-serif tracking-widest text-cream/70">
                    &copy; 2026 Aghna Ghalie Aminudin
                </p>
            </div>
        </footer>
    );
}
