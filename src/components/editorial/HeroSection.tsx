"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

interface HeroSectionProps {
  onReserve: () => void;
  onViewMenu: () => void;
  startAnim: boolean;
}

export default function HeroSection({ onReserve, onViewMenu, startAnim }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!startAnim) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tl = gsap.timeline({ delay: 0.2 });

    if (eyebrowRef.current) {
      gsap.set(eyebrowRef.current, { opacity: 0, y: 10 });
      tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.2);
    }

    if (headlineRef.current) {
      const split = new SplitText(headlineRef.current, { type: "lines", linesClass: "reveal-line" });
      const inner = new SplitText(split.lines, { type: "lines" });
      gsap.set(inner.lines, { y: "110%" });
      tl.to(inner.lines, { y: "0%", duration: 1.1, stagger: 0.12, ease: "power4.out" }, 0.35);
    }

    if (subRef.current) {
      gsap.set(subRef.current, { opacity: 0, y: 14 });
      tl.to(subRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.95);
    }

    if (actionsRef.current) {
      gsap.set(actionsRef.current.children, { opacity: 0, y: 10 });
      tl.to(actionsRef.current.children, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" }, 1.2);
    }

    return () => { tl.kill(); };
  }, [startAnim]);

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{ height: "100vh", minHeight: "640px" }}
      aria-label="Hero"
    >
      {/* Warm gradient background — replaced by hero.jpg when added */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(to bottom, #D4C9B0, #C4B898)",
          backgroundImage: "url(/images/hero.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Subtle scrim for text legibility */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: "linear-gradient(to bottom, rgba(28,28,26,0.20) 0%, rgba(28,28,26,0.04) 40%, rgba(28,28,26,0.04) 60%, rgba(28,28,26,0.32) 100%)",
        }}
      />

      {/* Content */}
      <div
        ref={containerRef}
        className="relative z-[2] text-center px-6"
        style={{ maxWidth: "640px" }}
      >
        <p
          ref={eyebrowRef}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "10px",
            letterSpacing: "0.20em",
            textTransform: "uppercase",
            color: "rgba(245,240,232,0.65)",
            fontWeight: 400,
            marginBottom: "28px",
            opacity: 0,
          }}
        >
          Afghan &amp; Pakistani · Birmingham
        </p>

        <h1
          ref={headlineRef}
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(52px, 8vw, 96px)",
            fontWeight: 300,
            color: "var(--color-cream)",
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            marginBottom: "32px",
          }}
        >
          Where every guest<br />
          <em style={{ fontStyle: "italic" }}>dines as family.</em>
        </h1>

        {/* Rule */}
        <div
          style={{
            width: "48px",
            height: "1px",
            background: "rgba(245,240,232,0.35)",
            margin: "0 auto 32px",
          }}
        />

        <p
          ref={subRef}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "15px",
            fontWeight: 300,
            color: "rgba(245,240,232,0.80)",
            lineHeight: 1.85,
            letterSpacing: "0.01em",
            maxWidth: "420px",
            margin: "0 auto 40px",
            opacity: 0,
          }}
        >
          Authentic Afghan &amp; Pakistani cuisine,<br />
          prepared with memory and intention.
        </p>

        <div
          ref={actionsRef}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "32px" }}
        >
          <button
            onClick={onReserve}
            className="transition-opacity hover:opacity-70"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              fontWeight: 400,
              color: "var(--color-cream)",
              letterSpacing: "0.02em",
              opacity: 0,
              textDecoration: "underline",
              textUnderlineOffset: "4px",
              textDecorationColor: "rgba(245,240,232,0.4)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Reserve a table →
          </button>
          <button
            onClick={onViewMenu}
            className="transition-opacity hover:opacity-70"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              fontWeight: 400,
              color: "rgba(245,240,232,0.80)",
              letterSpacing: "0.02em",
              opacity: 0,
              textDecoration: "underline",
              textUnderlineOffset: "4px",
              textDecorationColor: "rgba(245,240,232,0.3)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            View menu →
          </button>
        </div>
      </div>

      {/* Bottom rule */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[2]"
        style={{ borderBottom: "1px solid rgba(245,240,232,0.15)" }}
      />

      {/* Scroll cue */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-2"
        style={{ opacity: 0.45 }}
      >
        <div className="w-px h-10 overflow-hidden" style={{ background: "rgba(245,240,232,0.20)" }}>
          <div
            className="w-full h-1/2"
            style={{ background: "rgba(245,240,232,0.7)", animation: "heroScroll 2.2s ease-in-out infinite" }}
          />
        </div>
      </div>

      <style>{`
        @keyframes heroScroll {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
}
