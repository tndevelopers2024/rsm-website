"use client";
import { motion, type HTMLMotionProps } from "framer-motion";

type Props = HTMLMotionProps<"div"> & { delay?: number; y?: number; as?: "div" | "li" | "span" };

export function Reveal({ delay = 0, y = 36, children, className, ...rest }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px 140px 0px" }}
      transition={{ duration: 0.8, delay: Math.min(delay, 0.25), ease: [0.2, 0.7, 0.2, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Image curtain reveal */
export function RevealMask({ delay = 0, children, className }: { delay?: number; children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "0px 0px 140px 0px" }}
      transition={{ duration: 1.1, delay: Math.min(delay, 0.2), ease: [0.7, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Word-by-word headline rise. The observer sits on the (unclipped) wrapper. */
export function SplitHeading({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <motion.span
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px 140px 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.055, delayChildren: delay } } }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-bottom" aria-hidden>
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: "110%" }, show: { y: 0, transition: { duration: 0.9, ease: [0.2, 0.7, 0.2, 1] } } }}
          >
            {w}
            {i < words.length - 1 ? "\u00a0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
