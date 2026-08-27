"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Story", id: "story" },
  { label: "Menu", id: "menu" },
  { label: "Gallery", id: "gallery" },
  { label: "Private Dining", id: "experiences" },
  { label: "Find Us", id: "location" },
];

interface NavbarProps {
  onReserve: () => void;
  onViewMenu: () => void;
}

export default function Navbar({ onReserve, onViewMenu }: NavbarProps) {
  const barRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      barRef.current,
      { y: -16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.5 }
    );
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 400);
  };

  return (
    <>
      <header
        ref={barRef}
        className="fixed top-0 left-0 right-0 z-[90] opacity-0"
        style={{
          height: "56px",
          background: "var(--color-cream)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        {/* Three-column layout: left nav | centre brand | right actions */}
        <div className="relative flex items-center justify-between h-full px-6 md:px-10">

          {/* Left — desktop nav links */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.slice(0, 3).map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="transition-opacity hover:opacity-50"
                style={{
                  fontFamily: "var(--font-sans)",
                  color: "var(--color-ink-mid)",
                  fontSize: "12px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 400,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Centre — brand (absolutely centred) */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
            style={{ gap: "2px" }}
          >
            <span
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--color-ink)",
                letterSpacing: "0.08em",
                fontWeight: 500,
                fontSize: "20px",
                lineHeight: 1,
              }}
            >
              Hojra
            </span>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--color-ink-faint)",
                letterSpacing: "0.18em",
                fontSize: "8px",
                textTransform: "uppercase",
                fontWeight: 400,
              }}
            >
              Afghan &amp; Pakistani · Birmingham
            </span>
          </button>

          {/* Right — actions */}
          <div className="flex items-center gap-4">
            {/* Right-side nav links (desktop) */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.slice(3).map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="transition-opacity hover:opacity-50"
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: "var(--color-ink-mid)",
                    fontSize: "12px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontWeight: 400,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <button
              onClick={onViewMenu}
              className="hidden md:block transition-opacity hover:opacity-50"
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--color-ink-mid)",
                fontSize: "12px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 400,
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Menu
            </button>

            <button
              onClick={onReserve}
              className="hidden md:inline-flex items-center transition-opacity hover:opacity-80"
              style={{
                background: "var(--color-ink)",
                color: "var(--color-cream)",
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: 400,
                padding: "9px 20px",
                borderRadius: "2px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Reserve
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col justify-center gap-[5px] w-8 h-8 relative z-[101]"
              aria-label="Toggle navigation"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <motion.span
                className="block h-px w-full"
                style={{ background: menuOpen ? "var(--color-cream)" : "var(--color-ink)" }}
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
                transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
              />
              <motion.span
                className="block h-px"
                style={{ background: menuOpen ? "var(--color-cream)" : "var(--color-ink)", width: "60%" }}
                animate={{ opacity: menuOpen ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-px w-full"
                style={{ background: menuOpen ? "var(--color-cream)" : "var(--color-ink)" }}
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
                transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[89] flex flex-col justify-end pb-20 px-10 md:px-20"
            style={{ background: "var(--color-ink)" }}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ x: -32, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -32, opacity: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <button
                    onClick={() => scrollTo(item.id)}
                    className="flex items-baseline gap-4 py-2"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(2rem, 5vw, 4rem)",
                      fontWeight: 300,
                      color: "rgba(245,240,232,0.85)",
                      letterSpacing: "-0.01em",
                      lineHeight: 1.1,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "rgba(245,240,232,0.3)", letterSpacing: "0.12em" }}>
                      0{i + 1}
                    </span>
                    {item.label}
                  </button>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-12 pt-8 flex flex-wrap items-center gap-5"
              style={{ borderTop: "1px solid rgba(245,240,232,0.12)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.55, duration: 0.4 }}
            >
              <button
                onClick={() => { setMenuOpen(false); setTimeout(onReserve, 300); }}
                style={{
                  background: "var(--color-cream)",
                  color: "var(--color-ink)",
                  fontFamily: "var(--font-sans)",
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontWeight: 400,
                  padding: "12px 28px",
                  borderRadius: "2px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Reserve a Table
              </button>
              <button
                onClick={() => { setMenuOpen(false); setTimeout(onViewMenu, 300); }}
                className="transition-opacity hover:opacity-60"
                style={{
                  color: "rgba(245,240,232,0.6)",
                  fontFamily: "var(--font-sans)",
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                View Menu →
              </button>
            </motion.div>

            <div className="mt-8">
              <a
                href="tel:+441217140438"
                style={{ color: "rgba(245,240,232,0.35)", fontFamily: "var(--font-sans)", fontSize: "13px" }}
              >
                0121 714 0438
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
