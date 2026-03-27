"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";

// NavLinks baseline URLs
const navLinks = [
    { name: "Home", href: "/" },
    { name: "Resume", href: "/resume" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    // i18n hooks
    const pathname = usePathname();
    const router = useRouter();

    // Pastikan kita mendapatkan sekmentasi url yang valid. 
    // Di app router dengan /[lang]/, pathname akan selalu berawalan /[lang]/...
    const currentLocale = pathname?.split('/')[1] || 'id';

    // Helper untuk mengubah href sesuai bahasa saat ini
    const getLocalizedHref = (baseHref: string) => {
        if (baseHref === '/') return `/${currentLocale}`;
        return `/${currentLocale}${baseHref}`;
    };

    // Handler pergantian bahasa
    const switchLanguage = (newLocale: string) => {
        if (currentLocale === newLocale) return;

        // Memecah pathname lalu mengganti elemen pertama dengan bahasa baru
        const pathSegments = pathname.split('/');
        pathSegments[1] = newLocale;
        const newUrl = pathSegments.join('/') || `/${newLocale}`;

        router.push(newUrl);
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-cream/90 backdrop-blur-md shadow-sm border-b border-navy/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo / Name */}
                    <div className="flex-shrink-0">
                        <Link
                            href={`/${currentLocale}`}
                            className="text-2xl font-bold text-navy font-serif tracking-wide"
                        >
                            Aghna.G.Aminudin
                        </Link>
                    </div>

                    {/* Right Section: Desktop Navigation + Language Switcher + Hamburger */}
                    <div className="flex items-center space-x-4 md:space-x-8">

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={getLocalizedHref(link.href)}
                                    className="text-navy/90 hover:text-gold transition-colors duration-300 font-medium font-serif text-lg tracking-wide"
                                >
                                    {/* Gunakan nama menu sesuai bahasa jika diperlukan, namun untuk Home/Resume/Contact ini sudah cukup universal */}
                                    {link.name === 'Contact' && currentLocale === 'id' ? 'Kontak' :
                                        link.name === 'Home' && currentLocale === 'id' ? 'Beranda' : link.name}
                                </Link>
                            ))}
                        </nav>

                        {/* Language Switcher Endpoint */}
                        <div className="flex items-center bg-navy/5 p-1 rounded-full border border-navy/10">
                            <button
                                onClick={() => switchLanguage('id')}
                                className={`px-2 py-1 text-xs sm:text-sm font-bold rounded-full transition-all duration-300 ${currentLocale === 'id'
                                    ? 'bg-navy text-cream shadow-sm'
                                    : 'text-navy/60 hover:text-navy'
                                    }`}
                            >
                                ID
                            </button>
                            <button
                                onClick={() => switchLanguage('en')}
                                className={`px-2 py-1 text-xs sm:text-sm font-bold rounded-full transition-all duration-300 ${currentLocale === 'en'
                                    ? 'bg-navy text-cream shadow-sm'
                                    : 'text-navy/60 hover:text-navy'
                                    }`}
                            >
                                EN
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="text-navy hover:text-gold focus:outline-none transition-colors"
                                aria-label="Toggle menu"
                            >
                                {isOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden overflow-hidden bg-cream border-t border-navy/10 shadow-inner"
                    >
                        <div className="px-4 py-4 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={getLocalizedHref(link.href)}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-4 py-3 rounded-md text-lg font-medium text-navy hover:text-gold hover:bg-navy/5 font-serif transition-colors"
                                >
                                    {link.name === 'Contact' && currentLocale === 'id' ? 'Kontak' :
                                        link.name === 'Home' && currentLocale === 'id' ? 'Beranda' : link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
