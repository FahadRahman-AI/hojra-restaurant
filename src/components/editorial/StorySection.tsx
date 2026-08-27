"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);

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

      gsap.utils.toArray<HTMLElement>(".story-fade").forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, duration: 0.7, delay: i * 0.08,
            ease: "power3.out",
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
      id="story"
      style={{ background: "var(--color-cream)", paddingTop: "clamp(80px,12vw,160px)", paddingBottom: "clamp(80px,12vw,160px)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">

          {/* Left — image 45% */}
          <div className="lg:col-span-5">
            <div
              className="relative"
              style={{
                aspectRatio: "4/5",
                background: "var(--color-cream-2)",
                outline: "1px solid var(--color-border)",
                outlineOffset: "-16px",
                backgroundImage: "url(/images/story.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </div>

          {/* Right — text 55% */}
          <div className="lg:col-span-7 lg:pl-8">
            <p
              className="story-fade"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                letterSpacing: "0.20em",
                textTransform: "uppercase",
                color: "var(--color-gold)",
                fontWeight: 400,
                marginBottom: "28px",
              }}
            >
              The Chamber · الحجرة
            </p>

            <h2
              ref={headRef}
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(36px, 4vw, 56px)",
                fontWeight: 400,
                color: "var(--color-ink)",
                lineHeight: 1.12,
                letterSpacing: "-0.01em",
                marginBottom: "32px",
              }}
            >
              A hojra is a private<br />
              chamber. Built for<br />
              those who matter.
            </h2>

            <p
              className="story-fade"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "15px",
                fontWeight: 300,
                color: "var(--color-ink-mid)",
                lineHeight: 1.9,
                maxWidth: "480px",
                marginBottom: "40px",
              }}
            >
              We built a restaurant in its image — so that every guest might
              dine as though welcomed into someone&apos;s home. Every dish
              carries the memory of the families who first prepared it.
            </p>

            <div
              className="story-fade flex flex-col gap-6"
              style={{ borderTop: "1px solid var(--color-border)", paddingTop: "32px" }}
            >
              {[
                { year: "2020", detail: "Founded in Birmingham with a single room and a wood-fired tandoor." },
                { year: "Heritage", detail: "Recipes from Peshawar, Lahore and Kabul — carried with precision and care." },
                { year: "Today", detail: "A place for families, celebrations and long evenings in the heart of Birmingham." },
              ].map((item) => (
                <div key={item.year} className="flex gap-8 items-start">
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "11px",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--color-gold)",
                      fontWeight: 400,
                      minWidth: "72px",
                      paddingTop: "2px",
                    }}
                  >
                    {item.year}
                  </span>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "14px",
                      fontWeight: 300,
                      color: "var(--color-ink-mid)",
                      lineHeight: 1.8,
                    }}
                  >
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
