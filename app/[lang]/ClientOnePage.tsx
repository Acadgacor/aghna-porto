"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, Variants, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import { FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { personalInfo, socialLinks } from "@/lib/data";

/* ═══════════════════════════════════════════════════════════════ */
/*  Animation Variants                                             */
/* ═══════════════════════════════════════════════════════════════ */

const fadeUp: Variants = {
    hidden:  { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

const staggerContainer: Variants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};

const slideIn: Variants = {
    hidden:  { opacity: 0, x: -32 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] } },
};

const rowVariant: Variants = {
    hidden:  { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

const contactContainer: Variants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

/* ═══════════════════════════════════════════════════════════════ */
/*  Sub-Components                                                 */
/* ═══════════════════════════════════════════════════════════════ */

/* ── Count-Up Hook ───────────────────────────────────────────── */
function useCountUp(target: number, duration = 1800, start = false) {
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

/* ── Tilt Card ───────────────────────────────────────────────── */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
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

/* ── Stat Item ───────────────────────────────────────────────── */
function StatItem({ value, suffix, label, start }: { value: number; suffix?: string; label: string; start: boolean }) {
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

/* ── Animated Timeline Line ──────────────────────────────────── */
function TimelineLine() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 30%"] });
    const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    return (
        <div ref={ref} className="absolute left-0 top-0 bottom-0 w-[1px] bg-navy/8">
            <motion.div
                className="left-0 top-0 w-full bg-gradient-to-b from-gold via-gold/60 to-gold/20"
                style={{ height, position: "absolute" }}
            />
        </div>
    );
}

/* ── Icon Map ────────────────────────────────────────────────── */
const iconMap: Record<string, React.ReactNode> = {
    Email:     <Mail className="w-5 h-5" />,
    LinkedIn:  <FaLinkedin className="w-5 h-5" />,
    Instagram: <FaInstagram className="w-5 h-5" />,
    WhatsApp:  <FaWhatsapp className="w-5 h-5" />,
};

/* ═══════════════════════════════════════════════════════════════ */
/*  Main Component                                                 */
/* ═══════════════════════════════════════════════════════════════ */

export default function ClientOnePage({ dict, lang }: { dict: any; lang: string }) {
    const homeDict    = dict.home;
    const navDict     = dict.navigation;
    const resumeDict  = dict.resume;
    const contactDict = dict.contact;
    const isIndo      = lang === "id";

    /* ── Refs & InView ───────────────────────────────────────── */
    const aboutRef    = useRef<HTMLDivElement>(null);
    const statsRef    = useRef<HTMLDivElement>(null);
    const resumeRef   = useRef<HTMLDivElement>(null);
    const contactRef  = useRef<HTMLDivElement>(null);

    const isAboutInView   = useInView(aboutRef,   { once: true, margin: "-100px" });
    const isStatsInView   = useInView(statsRef,   { once: true, margin: "-50px"  });
    const isResumeInView  = useInView(resumeRef,  { once: true, margin: "-60px"  });
    const isContactInView = useInView(contactRef, { once: true, margin: "-60px"  });

    /* ── Mobile Detection ────────────────────────────────────── */
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    }, []);

    /* ── WhatsApp / Email URLs ───────────────────────────────── */
    const whatsappMessage = isIndo
        ? "Halo Aghna, saya ingin berdiskusi lebih lanjut mengenai..."
        : "Hello Aghna, I would like to discuss further regarding...";
    const encodedMsg = encodeURIComponent(whatsappMessage);

    return (
        <main className="w-full overflow-x-hidden font-serif bg-cream">

            {/* ═══════════════════════════════════════════════════ */}
            {/*  SECTION: HOME (Hero)                               */}
            {/* ═══════════════════════════════════════════════════ */}
            <section id="home" className="relative min-h-[calc(100vh-72px)] flex items-center overflow-hidden">

                {/* Background ambient orbs */}
                <div className="absolute top-[-10%] left-[-8%] w-[500px] h-[500px] bg-gold/10 rounded-full blur-[120px] pointer-events-none"
                    style={{ animation: "floatSlow 10s ease-in-out infinite" }} />
                <div className="absolute bottom-[-15%] right-[-5%] w-[600px] h-[600px] bg-navy/6 rounded-full blur-[140px] pointer-events-none"
                    style={{ animation: "floatSlow 14s ease-in-out infinite reverse" }} />
                <div className="absolute top-[30%] right-[20%] w-[300px] h-[300px] bg-gold/6 rounded-full blur-[100px] pointer-events-none"
                    style={{ animation: "gradientShift 8s ease-in-out infinite 2s" }} />

                {/* Subtle dot grid */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(10,25,47,0.06)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

                <div className="max-w-[1380px] w-full mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

                        {/* ── Left: Text Content ── */}
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                            className="flex flex-col items-start space-y-6"
                        >
                            {/* Badge */}
                            <motion.div
                                variants={fadeUp}
                                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-gold/30 bg-gold/8 text-navy/75 text-xs font-semibold tracking-wide shadow-sm"
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-60" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
                                </span>
                                Law Undergraduate &amp; Founder of Beaulytics
                            </motion.div>

                            {/* Headline */}
                            <motion.div variants={fadeUp} className="space-y-0.5">
                                <motion.h1 className="text-[2.9rem] sm:text-[3.6rem] lg:text-[4.2rem] xl:text-[5rem] font-bold text-navy leading-[1.05] tracking-tight">
                                    {isIndo ? "Halo, Saya" : "Hello, I'm"}
                                    <br />
                                    <span className="gradient-text">Aghna</span>
                                    <br />
                                    <span className="text-navy/80 font-light">Ghalie Aminudin</span>
                                </motion.h1>
                            </motion.div>

                            {/* Skill Pills */}
                            <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
                                {["Legal Expert", "Business Strategy", "Innovation"].map((pill) => (
                                    <span
                                        key={pill}
                                        className="px-4 py-1.5 rounded-full border border-navy/12 bg-white/50 text-navy/70 text-xs font-semibold backdrop-blur-sm shadow-sm hover:border-gold/40 hover:text-navy hover:bg-white/80 transition-all duration-300 cursor-default"
                                    >
                                        {pill}
                                    </span>
                                ))}
                            </motion.div>

                            {/* Tagline */}
                            <motion.p
                                variants={fadeUp}
                                className="text-base sm:text-lg text-navy/60 leading-relaxed max-w-[480px]"
                            >
                                {personalInfo.tagline}
                            </motion.p>

                            {/* CTA Buttons — now use hash anchors */}
                            <motion.div
                                variants={fadeUp}
                                className="flex flex-col sm:flex-row gap-3 pt-2 w-full sm:w-auto"
                            >
                                <a
                                    href="#resume"
                                    className="group relative inline-flex items-center justify-center gap-2 px-7 py-3 bg-navy text-cream rounded-xl font-semibold text-sm overflow-hidden shadow-lg shadow-navy/20 hover:-translate-y-0.5 hover:shadow-navy/30 transition-all duration-300"
                                >
                                    <span className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <span className="relative">{navDict.resume}</span>
                                    <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                </a>
                                <a
                                    href="#contact"
                                    className="group inline-flex items-center justify-center gap-2 px-7 py-3 border border-navy/20 text-navy hover:border-gold/60 hover:bg-gold/5 rounded-xl font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5"
                                >
                                    {navDict.contact}
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                </a>
                            </motion.div>
                        </motion.div>

                        {/* ── Right: Portrait Image ── */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
                            className="flex justify-center lg:justify-end"
                        >
                            <div className="relative w-full max-w-[380px] lg:max-w-[420px] group" style={{ animation: "float 8s ease-in-out infinite" }}>
                                {/* Outer glow ring */}
                                <div
                                    className="absolute -inset-3 rounded-2xl opacity-60"
                                    style={{
                                        background: "conic-gradient(from 0deg, #D4AF37, #F0D060, #D4AF37, transparent, #D4AF37)",
                                        animation: "rotateBorder 6s linear infinite",
                                        filter: "blur(2px)",
                                    }}
                                />
                                {/* Gold decorative frame */}
                                <div className="absolute inset-0 border border-gold/40 bg-gold/10 translate-x-4 translate-y-4 rounded-2xl transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6" />
                                {/* Image container */}
                                <div
                                    className="relative overflow-hidden rounded-2xl z-10 aspect-[4/5]"
                                    style={{ animation: "borderGlow 4s ease-in-out infinite" }}
                                >
                                    <Image
                                        src={personalInfo.imageUrl}
                                        alt={personalInfo.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy/20 via-transparent to-transparent opacity-60" />
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════ */}
            {/*  STATS STRIP                                        */}
            {/* ═══════════════════════════════════════════════════ */}
            <section className="w-full bg-navy py-12 px-6" ref={statsRef}>
                <motion.div
                    initial="hidden"
                    animate={isStatsInView ? "visible" : "hidden"}
                    variants={staggerContainer}
                    className="max-w-4xl mx-auto grid grid-cols-3 gap-4 divide-x divide-cream/10"
                >
                    <motion.div variants={fadeUp}>
                        <StatItem value={5} suffix="+" label={isIndo ? "Pengalaman Org." : "Organizations"} start={isStatsInView} />
                    </motion.div>
                    <motion.div variants={fadeUp}>
                        <StatItem value={3} suffix="+" label={isIndo ? "Proyek Aktif" : "Active Projects"} start={isStatsInView} />
                    </motion.div>
                    <motion.div variants={fadeUp}>
                        <StatItem value={2} suffix=" yr" label={isIndo ? "Pengalaman Hukum" : "Legal Experience"} start={isStatsInView} />
                    </motion.div>
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════════════ */}
            {/*  SECTION: ABOUT                                     */}
            {/* ═══════════════════════════════════════════════════ */}
            <section
                id="about"
                ref={aboutRef}
                className="w-full bg-cream py-28 lg:py-36 px-6 sm:px-10 lg:px-16 relative overflow-hidden"
            >
                {/* Faint grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(10,25,47,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(10,25,47,0.025)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
                {/* Accent orb */}
                <div className="absolute right-0 top-1/3 w-[400px] h-[400px] bg-gold/8 rounded-full blur-[120px] pointer-events-none" />

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isAboutInView ? "visible" : "hidden"}
                    className="max-w-[1200px] mx-auto relative z-10"
                >
                    <motion.p
                        variants={fadeUp}
                        className="text-xs tracking-[0.3em] uppercase text-gold font-semibold mb-4 text-center"
                    >
                        {isIndo ? "Tentang Saya" : "About Me"}
                    </motion.p>

                    <motion.h2
                        variants={fadeUp}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy text-center mb-6 leading-[1.1]"
                    >
                        {isIndo ? "Siapa" : "Who"}{" "}
                        <span className="gradient-text italic font-serif">
                            {isIndo ? "Aghna" : "I Am"}
                        </span>
                        {isIndo ? " itu?" : "?"}
                    </motion.h2>

                    <motion.div variants={fadeUp} className="divider-gold w-24 mx-auto mb-10" />

                    <motion.p
                        variants={fadeUp}
                        className="text-navy/65 text-center max-w-3xl mx-auto text-base md:text-lg leading-relaxed mb-20"
                    >
                        {personalInfo.shortDescription}
                    </motion.p>

                    {/* Focus Area Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        {personalInfo.focusAreas.map((area, index) => (
                            <motion.div key={index} variants={fadeUp}>
                                <TiltCard className="h-full">
                                    <div className="group relative glass-card p-8 rounded-2xl flex flex-col items-start h-full hover:-translate-y-1 transition-transform duration-300 shadow-sm hover:shadow-md cursor-default overflow-hidden">
                                        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                            style={{ background: "radial-gradient(ellipse at top left, rgba(212,175,55,0.08), transparent 70%)" }}
                                        />
                                        <div className="absolute top-0 left-8 right-8 h-[1.5px] bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <div className="w-12 h-12 rounded-xl bg-navy/6 border border-navy/10 flex items-center justify-center mb-5 group-hover:bg-gold/10 group-hover:border-gold/30 transition-all duration-300 shadow-sm">
                                            <span className="font-serif text-lg font-bold text-gold">0{area.number}</span>
                                        </div>
                                        <h3 className="font-bold text-xl md:text-2xl mb-3 text-navy group-hover:text-gold transition-colors duration-300 relative z-10">
                                            {area.title}
                                        </h3>
                                        <p className="text-navy/60 text-sm md:text-base leading-relaxed relative z-10">
                                            {area.description}
                                        </p>
                                        <div className="mt-6 h-[1.5px] w-0 group-hover:w-10 transition-all duration-500 ease-out bg-gold" />
                                    </div>
                                </TiltCard>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════════════ */}
            {/*  SECTION: RESUME                                    */}
            {/* ═══════════════════════════════════════════════════ */}
            <section id="resume" className="w-full bg-cream relative overflow-hidden">
                {/* Background orbs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/6 rounded-full blur-[150px] pointer-events-none" />
                <div className="absolute bottom-0 left-[-10%] w-[400px] h-[400px] bg-navy/4 rounded-full blur-[120px] pointer-events-none" />
                {/* Faint grid */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(10,25,47,0.04)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

                <div className="relative z-10 max-w-2xl mx-auto px-6 sm:px-10 lg:px-16 py-24">

                    {/* ── Header ── */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                        className="mb-20"
                    >
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15, duration: 0.5 }}
                            className="text-[10px] tracking-[0.35em] uppercase font-semibold mb-4"
                            style={{ color: "var(--color-gold)" }}
                        >
                            Curriculum Vitae
                        </motion.p>
                        <h2 className="text-4xl sm:text-5xl font-serif font-semibold leading-tight mb-6" style={{ color: "var(--color-navy)" }}>
                            Professional
                            <br />
                            <span className="gradient-text">{resumeDict.title}</span>
                        </h2>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
                            style={{ originX: 0 }}
                            className="h-[1.5px] bg-gradient-to-r from-gold via-gold/40 to-transparent w-20"
                        />
                    </motion.div>

                    {/* ── Timeline ── */}
                    <div ref={resumeRef} className="relative pl-8">
                        <TimelineLine />
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate={isResumeInView ? "visible" : "hidden"}
                            className="space-y-0"
                        >
                            {resumeDict.experiences.map((exp: any, index: number) => (
                                <motion.div
                                    key={exp.id}
                                    variants={slideIn}
                                    className="group relative pb-14 last:pb-0"
                                >
                                    {/* Timeline dot */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={isResumeInView ? { scale: 1 } : { scale: 0 }}
                                        transition={{ delay: index * 0.18 + 0.3, type: "spring", stiffness: 300 }}
                                        className="absolute -left-[35px] top-1.5 w-3 h-3 rounded-full border-2 border-gold bg-cream group-hover:bg-gold transition-colors duration-300 shadow-sm z-10"
                                    />
                                    {/* Content card */}
                                    <div className="group/card glass-card rounded-xl p-6 hover:border-gold/30 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                                        <span
                                            className="inline-block text-[10px] tracking-[0.2em] uppercase font-semibold mb-3 px-2.5 py-1 rounded-full border"
                                            style={{
                                                color: "var(--color-gold)",
                                                borderColor: "rgba(212,175,55,0.25)",
                                                background: "rgba(212,175,55,0.06)",
                                            }}
                                        >
                                            {exp.duration}
                                        </span>
                                        <h3
                                            className="text-xl sm:text-2xl font-serif font-semibold leading-snug mb-1 group-hover/card:text-gold transition-colors duration-300"
                                            style={{ color: "var(--color-navy)" }}
                                        >
                                            {exp.position}
                                        </h3>
                                        <h4 className="text-sm font-light italic mb-4" style={{ color: "var(--color-navy)", opacity: 0.5 }}>
                                            {exp.institution}
                                        </h4>
                                        <p className="text-sm leading-relaxed text-justify" style={{ color: "var(--color-navy)", opacity: 0.6 }}>
                                            {exp.description}
                                        </p>
                                        <div className="mt-5 h-[1.5px] w-0 group-hover/card:w-10 transition-all duration-500 ease-out" style={{ background: "var(--color-gold)" }} />
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                </div>
            </section>

            {/* ═══════════════════════════════════════════════════ */}
            {/*  SECTION: CONTACT                                   */}
            {/* ═══════════════════════════════════════════════════ */}
            <section id="contact" className="w-full bg-cream relative overflow-hidden">
                {/* Background orbs */}
                <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] bg-gold/8 rounded-full blur-[140px] pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-navy/5 rounded-full blur-[120px] pointer-events-none" />
                {/* Dot grid */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(10,25,47,0.04)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

                <div ref={contactRef} className="relative z-10 w-full max-w-2xl mx-auto px-6 sm:px-12 lg:px-20 py-28">

                    {/* Eyebrow */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={isContactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ duration: 0.5 }}
                        className="text-[10px] tracking-[0.35em] uppercase font-semibold mb-5"
                        style={{ color: "var(--color-gold)" }}
                    >
                        {contactDict.title}
                    </motion.p>

                    {/* Headline — clip-path reveal */}
                    <div className="overflow-hidden mb-5">
                        <motion.h2
                            initial={{ y: "105%" }}
                            animate={isContactInView ? { y: "0%" } : { y: "105%" }}
                            transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
                            className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-navy leading-[1.05] tracking-tight"
                        >
                            {isIndo ? "Mari bicara." : "Let's talk."}
                        </motion.h2>
                    </div>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        animate={isContactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                        transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                        className="text-base text-navy/50 font-light leading-relaxed mb-14 max-w-sm"
                    >
                        {contactDict.message}
                    </motion.p>

                    {/* Animated divider */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={isContactInView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
                        style={{ originX: 0 }}
                        className="h-[1px] bg-gradient-to-r from-gold/60 via-navy/10 to-transparent mb-10"
                    />

                    {/* Contact Links */}
                    <motion.div
                        variants={contactContainer}
                        initial="hidden"
                        animate={isContactInView ? "visible" : "hidden"}
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
            </section>

        </main>
    );
}
