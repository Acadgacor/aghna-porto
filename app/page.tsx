"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 sm:px-6 lg:px-8 bg-background overflow-hidden selection:bg-gold/20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-4xl w-full text-center space-y-6"
      >
        {/* Tagline / Identity */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-gold font-serif text-lg md:text-xl tracking-widest uppercase"
        >
          {personalInfo.tagline}
        </motion.p>

        {/* Main Heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold font-serif text-navy tracking-normal leading-tight">
          {personalInfo.name}
        </h1>

        {/* Short Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="max-w-2xl mx-auto text-lg sm:text-xl text-navy/75 leading-relaxed font-light"
        >
          {personalInfo.description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-10"
        >
          {/* Primary Navy Button */}
          <Link
            href="/resume"
            className="w-full sm:w-auto px-10 py-4 bg-navy text-cream hover:bg-navy/90 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 rounded-sm font-medium tracking-wider text-center"
          >
            Lihat Resume
          </Link>

          {/* Outline Gold Button */}
          <Link
            href="/contact"
            className="w-full sm:w-auto px-10 py-4 bg-transparent text-navy border-2 border-navy hover:bg-gold/10 hover:text-gold hover:border-gold hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 rounded-sm font-medium tracking-wider text-center"
          >
            Contact Me
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
