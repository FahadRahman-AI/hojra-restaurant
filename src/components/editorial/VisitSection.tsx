"use client";

import { openingHours } from "@/lib/content";

export default function VisitSection({ onReserve }: { onReserve: () => void }) {
  const today = new Date().toLocaleDateString("en-GB", { weekday: "long" });

  return (
    <section
      id="location"
      style={{
        background: "var(--color-cream)",
        paddingTop: "clamp(80px,12vw,160px)",
        paddingBottom: "clamp(80px,12vw,160px)",
      }}
    >
      <div className="max-w-2xl mx-auto px-6 md:px-12 text-center">
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(36px, 5vw, 64px)",
            fontWeight: 400,
            color: "var(--color-ink)",
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
            marginBottom: "48px",
          }}
        >
          Find us in Birmingham.
        </h2>

        {/* Address */}
        <div style={{ marginBottom: "40px" }}>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "15px",
              fontWeight: 300,
              color: "var(--color-ink-mid)",
              lineHeight: 1.9,
            }}
          >
            Hojra Restaurant<br />
            Hall Green, Birmingham<br />
            West Midlands
          </p>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "12px",
              fontStyle: "italic",
              color: "var(--color-ink-faint)",
              marginTop: "8px",
            }}
          >
            Address to be confirmed — check with restaurant
          </p>
        </div>

        {/* Phone */}
        <a
          href="tel:+441217140438"
          className="transition-opacity hover:opacity-60"
          style={{
            display: "block",
            fontFamily: "var(--font-sans)",
            fontSize: "15px",
            fontWeight: 300,
            color: "var(--color-ink)",
            marginBottom: "8px",
            textDecoration: "none",
          }}
        >
          0121 714 0438
        </a>

        <a
          href="mailto:hello@hojrarestaurant.com"
          className="transition-opacity hover:opacity-60"
          style={{
            display: "block",
            fontFamily: "var(--font-sans)",
            fontSize: "15px",
            fontWeight: 300,
            color: "var(--color-ink)",
            marginBottom: "48px",
            textDecoration: "none",
          }}
        >
          hojrarestaurant.com
        </a>

        {/* Opening hours label */}
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--color-gold)",
            fontWeight: 400,
            marginBottom: "20px",
          }}
        >
          Opening Hours
        </p>

        {/* Hours */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            maxWidth: "360px",
            margin: "0 auto 48px",
          }}
        >
          {openingHours.map((h) => {
            const isToday = h.day === today;
            const closed = !h.lunch && !h.dinner;
            return (
              <div
                key={h.day}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: "16px",
                  opacity: closed ? 0.4 : 1,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "14px",
                    fontWeight: isToday ? 500 : 300,
                    color: isToday ? "var(--color-ink)" : "var(--color-ink-mid)",
                  }}
                >
                  {h.day}
                  {isToday && (
                    <span
                      style={{
                        display: "inline-block",
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        background: "var(--color-gold)",
                        marginLeft: "8px",
                        verticalAlign: "middle",
                      }}
                    />
                  )}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "13px",
                    fontWeight: 300,
                    color: "var(--color-ink-faint)",
                  }}
                >
                  {closed ? "Closed" : [h.lunch, h.dinner].filter(Boolean).join("  ·  ")}
                </span>
              </div>
            );
          })}
        </div>

        {/* Grand opening */}
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "11px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--color-gold)",
            fontWeight: 400,
            marginBottom: "32px",
          }}
        >
          Grand Opening · 17 August 2026
        </p>

        {/* CTA links */}
        <div style={{ display: "flex", justifyContent: "center", gap: "32px" }}>
          <button
            onClick={onReserve}
            className="transition-opacity hover:opacity-60"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              fontWeight: 400,
              color: "var(--color-ink)",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
              textDecorationColor: "var(--color-border-mid)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Call us
          </button>
          <a
            href="https://www.google.com/maps/place/Hojra+Restaurant/@52.4218291,-1.8371591,17z"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-60"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              fontWeight: 400,
              color: "var(--color-ink)",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
              textDecorationColor: "var(--color-border-mid)",
            }}
          >
            Get directions →
          </a>
        </div>
      </div>
    </section>
  );
}
