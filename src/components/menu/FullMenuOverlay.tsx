"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fullMenu, menuNotices, businessInfo } from "@/lib/content";

interface FullMenuOverlayProps {
  open: boolean;
  onClose: () => void;
}

export default function FullMenuOverlay({ open, onClose }: FullMenuOverlayProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col"
          style={{ background: "var(--color-cream)" }}
          initial={{ transform: "translateY(100%)" }}
          animate={{ transform: "translateY(0%)" }}
          exit={{ transform: "translateY(100%)" }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          aria-label="Full menu"
        >
          {/* Header */}
          <div
            className="shrink-0 flex items-center justify-between"
            style={{
              paddingLeft: "clamp(24px, 8vw, 120px)",
              paddingRight: "clamp(24px, 8vw, 120px)",
              height: "56px",
              borderBottom: "1px solid var(--color-border)",
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "18px",
                  fontWeight: 500,
                  color: "var(--color-ink)",
                  letterSpacing: "0.04em",
                }}
              >
                Hojra
              </span>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "10px",
                  fontWeight: 300,
                  color: "var(--color-ink-faint)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginLeft: "12px",
                }}
              >
                {businessInfo.tagline}
              </span>
            </div>

            <button
              onClick={onClose}
              className="transition-opacity hover:opacity-50"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                fontWeight: 400,
                color: "var(--color-ink-faint)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: "pointer",
                background: "none",
                border: "none",
              }}
              aria-label="Close menu"
            >
              Close ×
            </button>
          </div>

          {/* Scrollable content */}
          <div
            className="flex-1 overflow-y-auto py-16 md:py-20"
            style={{ paddingLeft: "clamp(24px, 8vw, 120px)", paddingRight: "clamp(24px, 8vw, 120px)" }}
            data-lenis-prevent
          >
            <div style={{ maxWidth: "680px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "64px" }}>
              {fullMenu.map((section) => (
                <section key={section.title}>
                  <h2
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "28px",
                      fontWeight: 400,
                      color: "var(--color-ink)",
                      letterSpacing: "-0.01em",
                      paddingBottom: "12px",
                      marginBottom: "32px",
                      borderBottom: "1px solid var(--color-border)",
                    }}
                  >
                    {section.title}
                  </h2>

                  <div className="flex flex-col">
                    {section.items.map((item) => (
                      <div
                        key={item.name}
                        style={{
                          padding: "16px 0",
                          borderBottom: "1px solid var(--color-border)",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "16px" }}>
                          <span
                            style={{
                              fontFamily: "var(--font-serif)",
                              fontSize: "18px",
                              fontWeight: 400,
                              color: "var(--color-ink)",
                            }}
                          >
                            {item.name}
                          </span>
                          <span
                            style={{
                              fontFamily: "var(--font-sans)",
                              fontSize: "14px",
                              fontWeight: 400,
                              color: "var(--color-gold)",
                              flexShrink: 0,
                            }}
                          >
                            {item.price}
                          </span>
                        </div>
                        {item.description && (
                          <p
                            style={{
                              fontFamily: "var(--font-sans)",
                              fontSize: "13px",
                              fontWeight: 300,
                              color: "var(--color-ink-mid)",
                              lineHeight: 1.7,
                              marginTop: "4px",
                            }}
                          >
                            {item.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              ))}

              {/* Notices */}
              <div
                style={{
                  paddingTop: "32px",
                  borderTop: "1px solid var(--color-border)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "11px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--color-gold)",
                    fontWeight: 400,
                    marginBottom: "4px",
                  }}
                >
                  Food Allergy Notice
                </p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 300, color: "var(--color-ink-mid)", lineHeight: 1.8 }}>
                  {menuNotices.allergy}
                </p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 300, color: "var(--color-ink-faint)" }}>
                  {menuNotices.key}
                </p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 300, color: "var(--color-ink-faint)" }}>
                  {menuNotices.serviceCharge}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
