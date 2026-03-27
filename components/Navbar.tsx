"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

// NavLinks baseline URLs
const navLinks = [
    { name: "Home", href: "/" },
    { name: "Resume", href: "/resume" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const pathname = usePathname();
    const router = useRouter();

    const currentLocale = pathname?.split("/")[1] || "id";

    // Scroll listener
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const getLocalizedHref = (baseHref: string) => {
        if (baseHref === "/") return `/${currentLocale}`;
        return `/${currentLocale}${baseHref}`;
    };

    const switchLanguage = (newLocale: string) => {
        if (currentLocale === newLocale) return;
        const pathSegments = pathname.split("/");
        pathSegments[1] = newLocale;
        const newUrl = pathSegments.join("/") || `/${newLocale}`;
        router.push(newUrl);
    };

    const getLabel = (link: { name: string; href: string }) => {
        if (link.name === "Contact") return currentLocale === "id" ? "Kontak" : "Contact";
        if (link.name === "Home") return currentLocale === "id" ? "Beranda" : "Home";
        return link.name;
    };

    const isActive = (href: string) => {
        const localizedHref = getLocalizedHref(href);
        if (href === "/") return pathname === localizedHref;
        return pathname.startsWith(localizedHref);
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                    scrolled
                        ? "bg-cream/90 backdrop-blur-xl shadow-[0_2px_20px_rgba(10,25,47,0.08)] border-b border-navy/8"
                        : "bg-transparent border-b border-transparent"
                }`}
            >
                <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                    <div className="flex items-center justify-between h-[72px]">

                        {/* Logo */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <Link
                                href={`/${currentLocale}`}
                                className="group relative font-serif text-xl font-bold text-navy tracking-wide"
                            >
                                <span className="relative inline-block">
                                    Aghna
                                    <span className="text-gold">.</span>
                                    <span className="text-navy/60 font-light">G</span>
                                    <span className="text-gold">.</span>
                                    Aminudin
                                </span>
                                {/* shimmer underline on hover */}
                                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-gold via-gold/50 to-transparent group-hover:w-full transition-all duration-500 ease-out" />
                            </Link>
                        </motion.div>

                        {/* Right: Desktop Nav + Lang Switcher + Hamburger */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="flex items-center gap-6 md:gap-8"
                        >
                            {/* Desktop Nav */}
                            <nav className="hidden md:flex items-center gap-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={getLocalizedHref(link.href)}
                                        className={`relative px-3 py-2 font-serif text-[15px] tracking-wide transition-colors duration-300 nav-link-hover ${
                                            isActive(link.href)
                                                ? "text-navy font-semibold"
                                                : "text-navy/65 hover:text-navy"
                                        }`}
                                    >
                                        {getLabel(link)}
                                        {isActive(link.href) && (
                                            <motion.div
                                                layoutId="nav-indicator"
                                                className="absolute -bottom-0.5 left-3 right-3 h-[1.5px] bg-gold"
                                                transition={{ type: "spring", stiffness: 400, damping: 35 }}
                                            />
                                        )}
                                    </Link>
                                ))}
                            </nav>

                            {/* Language Switcher */}
                            <div className="relative flex items-center bg-navy/6 rounded-full border border-navy/10 p-0.5 gap-0.5">
                                {["id", "en"].map((locale) => (
                                    <motion.button
                                        key={locale}
                                        onClick={() => switchLanguage(locale)}
                                        className={`relative px-3 py-1 text-[11px] font-bold rounded-full transition-colors duration-300 z-10 ${
                                            currentLocale === locale
                                                ? "text-cream"
                                                : "text-navy/50 hover:text-navy"
                                        }`}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {currentLocale === locale && (
                                            <motion.div
                                                layoutId="lang-pill"
                                                className="absolute inset-0 bg-navy rounded-full shadow-sm"
                                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                            />
                                        )}
                                        <span className="relative z-10">{locale.toUpperCase()}</span>
                                    </motion.button>
                                ))}
                            </div>

                            {/* Mobile Hamburger */}
                            <motion.button
                                onClick={() => setIsOpen(!isOpen)}
                                className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-navy/5 border border-navy/10 text-navy hover:bg-navy/10 transition-colors duration-300"
                                aria-label="Toggle menu"
                                whileTap={{ scale: 0.9 }}
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.span
                                        key={isOpen ? "x" : "menu"}
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                                    </motion.span>
                                </AnimatePresence>
                            </motion.button>
                        </motion.div>
                    </div>
                </div>
            </header>

            {/* Mobile Full-Screen Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="fixed inset-0 z-40 bg-navy/30 backdrop-blur-sm md:hidden"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Drawer */}
                        <motion.div
                            key="drawer"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 320, damping: 32 }}
                            className="fixed top-0 right-0 bottom-0 z-50 w-[78vw] max-w-xs bg-cream shadow-2xl flex flex-col md:hidden"
                        >
                            {/* Drawer header */}
                            <div className="flex items-center justify-between px-6 py-5 border-b border-navy/8">
                                <span className="font-serif font-bold text-navy text-lg">Menu</span>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center justify-center w-9 h-9 rounded-full bg-navy/5 border border-navy/10 text-navy"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Drawer Links */}
                            <nav className="flex flex-col px-4 pt-6 gap-1">
                                {navLinks.map((link, i) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.07, duration: 0.3 }}
                                    >
                                        <Link
                                            href={getLocalizedHref(link.href)}
                                            onClick={() => setIsOpen(false)}
                                            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-serif text-lg transition-all duration-200 ${
                                                isActive(link.href)
                                                    ? "bg-navy text-cream font-semibold"
                                                    : "text-navy/75 hover:bg-navy/6 hover:text-navy"
                                            }`}
                                        >
                                            {isActive(link.href) && (
                                                <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                                            )}
                                            {getLabel(link)}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            {/* Drawer Footer */}
                            <div className="mt-auto px-6 pb-8 pt-4 border-t border-navy/8">
                                <p className="font-serif text-xs text-navy/40 tracking-widest uppercase">
                                    © 2026 Aghna Ghalie Aminudin
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Spacer to offset fixed header */}
            <div className="h-[72px]" />
        </>
    );
}
