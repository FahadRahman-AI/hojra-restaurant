"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const split = new SplitText(quoteRef.current, { type: "words" });
      gsap.set(split.words, { opacity: 0.12 });
      gsap.to(split.words, {
        opacity: 1,
        stagger: 0.05,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 65%",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--color-cream-2)",
        paddingTop: "clamp(80px, 14vw, 160px)",
        paddingBottom: "clamp(80px, 14vw, 160px)",
        paddingLeft: "24px",
        paddingRight: "24px",
      }}
    >
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-sans)",
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--color-gold)",
            fontWeight: 400,
            marginBottom: "40px",
          }}
        >
          الحُجرة — The Chamber
        </span>
        <p
          ref={quoteRef}
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.6rem, 3.5vw, 3rem)",
            fontWeight: 300,
            color: "var(--color-ink)",
            lineHeight: 1.38,
            letterSpacing: "-0.01em",
          }}
        >
          A hojra is a private chamber — a place kept for those who matter most.
          We built a restaurant in its image, so that every guest might dine as
          though welcomed into our home.
        </p>
      </div>
    </section>
  );
}
