import Link from "next/link";
import { socialLinks } from "@/lib/data";

export default function Footer() {
    return (
        <footer className="bg-navy text-cream py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center space-y-4">
                {/* Social Links from Static Data */}
                <div className="flex space-x-6">
                    {socialLinks.map((social) => (
                        <Link
                            key={social.platform}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cream/70 hover:text-gold transition-colors duration-300 font-medium tracking-wider"
                        >
                            {social.platform}
                        </Link>
                    ))}
                </div>

                {/* Copyright text */}
                <p className="text-sm font-light font-serif tracking-widest text-cream/70">
                    &copy; 2026 Fauqa Thuuril Aqli
                </p>
            </div>
        </footer>
    );
}
