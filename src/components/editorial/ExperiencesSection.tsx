"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ExperiencesSection({ onReserve }: { onReserve: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".exp-fade").forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, duration: 0.7, delay: i * 0.08, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experiences"
      style={{
        background: "var(--color-cream)",
        paddingTop: "clamp(80px,12vw,160px)",
        paddingBottom: "clamp(80px,12vw,160px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">

          {/* Left — text 55% */}
          <div className="lg:col-span-6">
            <p
              className="exp-fade"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                letterSpacing: "0.20em",
                textTransform: "uppercase",
                color: "var(--color-gold)",
                fontWeight: 400,
                marginBottom: "24px",
              }}
            >
              Private Dining
            </p>

            <h2
              className="exp-fade"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(36px, 4.5vw, 60px)",
                fontWeight: 400,
                color: "var(--color-ink)",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
                marginBottom: "28px",
              }}
            >
              Spaces built<br />
              for intimacy.
            </h2>

            <p
              className="exp-fade"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "15px",
                fontWeight: 300,
                color: "var(--color-ink-mid)",
                lineHeight: 1.9,
                maxWidth: "440px",
                marginBottom: "40px",
              }}
            >
              Three distinct spaces, each with its own character.
              Every private dining experience is tailored to the occasion —
              from intimate suppers to celebratory gatherings.
            </p>

            <button
              onClick={onReserve}
              className="exp-fade transition-opacity hover:opacity-60"
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
              Enquire →
            </button>
          </div>

          {/* Right — image 45% */}
          <div className="lg:col-span-6">
            <div
              className="exp-fade"
              style={{
                aspectRatio: "4/5",
                background: "var(--color-cream-2)",
                outline: "1px solid var(--color-border)",
                outlineOffset: "-16px",
                backgroundImage: "url(/images/private-dining.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
