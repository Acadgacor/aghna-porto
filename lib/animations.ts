import { Variants } from "framer-motion";

export const fadeUp: Variants = {
    hidden:  { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

export const staggerContainer: Variants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};

export const slideIn: Variants = {
    hidden:  { opacity: 0, x: -32 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] } },
};

export const rowVariant: Variants = {
    hidden:  { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

export const contactContainer: Variants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
