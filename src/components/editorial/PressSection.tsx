"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { pressQuotes } from "@/lib/content";

export default function PressSection() {
  const autoplay = useRef(Autoplay({ delay: 6000, stopOnInteraction: false }));
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay.current]);
  const [current, setCurrent] = useState(0);

  const onSelect = useCallback(() => {
    if (emblaApi) setCurrent(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  return (
    <section
      id="press"
      className="py-32 md:py-48"
      style={{ background: "var(--color-sage-deep)" }}
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <span
          className="block mb-16 text-[8px] uppercase tracked-editorial"
          style={{ fontFamily: "var(--font-mono)", color: "rgba(245,240,232,0.4)" }}
        >
          Press &amp; Recognition
        </span>

        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {pressQuotes.map((q, i) => (
              <div key={i} className="flex-none w-full">
                <blockquote>
                  <p
                    className="mb-10 font-light italic"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(1.5rem, 3.2vw, 2.6rem)",
                      color: "rgba(245,240,232,0.9)",
                      lineHeight: 1.4,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    &ldquo;{q.quote}&rdquo;
                  </p>
                  <footer className="flex flex-col items-center gap-1">
                    <span className="w-8 h-px mb-4" style={{ background: "var(--color-sage-pale)" }} />
                    <p className="text-sm" style={{ color: "rgba(245,240,232,0.7)", fontFamily: "var(--font-sans)" }}>
                      {q.author}
                    </p>
                    <p className="text-[9px] uppercase tracked-wide" style={{ fontFamily: "var(--font-mono)", color: "rgba(245,240,232,0.35)" }}>
                      {q.publication} · {q.year}
                    </p>
                  </footer>
                </blockquote>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-14">
          {pressQuotes.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Quote ${i + 1}`}
              className="transition-all duration-300"
              style={{
                width: current === i ? 22 : 6,
                height: 2,
                background: current === i ? "var(--color-sage-pale)" : "rgba(245,240,232,0.25)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
