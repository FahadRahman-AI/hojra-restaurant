"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { menuCategories } from "@/lib/content";
import type { MenuCategory } from "@/types";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function MenuSection({ onViewMenu }: { onViewMenu: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const [activeTab, setActiveTab] = useState<string>(menuCategories[0].id);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      if (headRef.current) {
        const split = new SplitText(headRef.current, { type: "lines", linesClass: "reveal-line" });
        const inner = new SplitText(split.lines, { type: "lines" });
        gsap.set(inner.lines, { y: "105%" });
        gsap.to(inner.lines, {
          y: "0%", duration: 1.1, stagger: 0.1, ease: "power4.out",
          scrollTrigger: { trigger: headRef.current, start: "top 84%", once: true },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const active = menuCategories.find((c) => c.id === activeTab) as MenuCategory;
  const featured = active.dishes.slice(0, 4);

  return (
    <section
      ref={sectionRef}
      id="menu"
      style={{
        background: "var(--color-cream-2)",
        paddingTop: "clamp(80px,12vw,160px)",
        paddingBottom: "clamp(80px,12vw,160px)",
      }}
    >
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        {/* Label */}
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--color-ink-faint)",
            fontWeight: 400,
            marginBottom: "20px",
          }}
        >
          To Begin
        </p>

        {/* Headline */}
        <h2
          ref={headRef}
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(40px, 5vw, 68px)",
            fontWeight: 400,
            fontStyle: "italic",
            color: "var(--color-ink)",
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
            marginBottom: "48px",
          }}
        >
          Crafted with intention.
        </h2>

        {/* Category pills */}
        <div className="flex flex-wrap gap-3 mb-12">
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 400,
                color: activeTab === cat.id ? "var(--color-ink)" : "var(--color-ink-mid)",
                border: `1px solid ${activeTab === cat.id ? "var(--color-border-mid)" : "var(--color-border)"}`,
                padding: "6px 16px",
                borderRadius: "2px",
                background: activeTab === cat.id ? "var(--color-cream)" : "transparent",
                transition: "all 0.2s ease",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Featured items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ borderTop: "1px solid var(--color-border)" }}>
              {featured.map((dish) => (
                <div
                  key={dish.name}
                  style={{
                    padding: "24px 0",
                    borderBottom: "1px solid var(--color-border)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "16px", marginBottom: "6px" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "20px",
                        fontWeight: 400,
                        color: "var(--color-ink)",
                      }}
                    >
                      {dish.name}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "13px",
                        fontWeight: 400,
                        color: "var(--color-gold)",
                        flexShrink: 0,
                      }}
                    >
                      {dish.price}
                    </span>
                  </div>
                  {dish.description && (
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "13px",
                        fontWeight: 300,
                        color: "var(--color-ink-mid)",
                        lineHeight: 1.7,
                      }}
                    >
                      {dish.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* View full menu */}
        <div style={{ marginTop: "40px" }}>
          <button
            onClick={onViewMenu}
            className="transition-opacity hover:opacity-60"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              fontWeight: 400,
              color: "var(--color-ink)",
              letterSpacing: "0.02em",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
              textDecorationColor: "var(--color-border-mid)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            View the full menu →
          </button>
        </div>

        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "11px",
            fontWeight: 300,
            color: "var(--color-ink-faint)",
            letterSpacing: "0.06em",
            marginTop: "32px",
          }}
        >
          A discretionary service charge of 12.5% applies · Please inform us of any dietary requirements
        </p>
      </div>
    </section>
  );
}
