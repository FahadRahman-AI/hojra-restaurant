"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StickyBarProps {
  onReserve: () => void;
}

export default function StickyBar({ onReserve }: StickyBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-[80] sticky-bar-blur"
          style={{
            background: "rgba(245,240,232,0.92)",
            borderTop: "1px solid var(--color-border)",
            height: "52px",
          }}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 h-full flex items-center justify-between gap-4">
            <div className="hidden md:flex items-center gap-6">
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--color-ink)",
                  letterSpacing: "0.04em",
                  fontWeight: 500,
                  fontSize: "16px",
                }}
              >
                Hojra
              </span>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "11px",
                  fontWeight: 300,
                  color: "var(--color-ink-faint)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Birmingham · Tues–Sun
              </span>
            </div>

            <div className="flex items-center gap-4 ml-auto">
              <a
                href="tel:+441217140438"
                className="hidden sm:block transition-opacity hover:opacity-60"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  fontWeight: 300,
                  color: "var(--color-ink-mid)",
                  textDecoration: "none",
                }}
              >
                0121 714 0438
              </a>

              <button
                onClick={onReserve}
                style={{
                  background: "var(--color-ink)",
                  color: "var(--color-cream)",
                  fontFamily: "var(--font-sans)",
                  fontSize: "11px",
                  fontWeight: 400,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  padding: "9px 20px",
                  borderRadius: "2px",
                  cursor: "pointer",
                  border: "none",
                  transition: "opacity 0.2s",
                }}
              >
                Reserve
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
