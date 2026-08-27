"use client";

import { businessInfo } from "@/lib/content";

export default function Footer({ onReserve: _ }: { onReserve: () => void }) {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-border)",
        height: "56px",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        background: "var(--color-cream)",
      }}
    >
      <div
        className="max-w-7xl w-full mx-auto"
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}
      >
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "11px",
            fontWeight: 300,
            color: "var(--color-ink-faint)",
          }}
        >
          © {new Date().getFullYear()} Hojra Restaurant
        </span>

        <span
          className="hidden md:block"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "11px",
            fontWeight: 300,
            color: "var(--color-ink-faint)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Afghan &amp; Pakistani · Birmingham
        </span>

        <div style={{ display: "flex", gap: "24px" }}>
          <a
            href={businessInfo.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-60"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 300,
              color: "var(--color-ink-faint)",
              textDecoration: "none",
            }}
          >
            Instagram
          </a>
          <a
            href={businessInfo.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-60"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 300,
              color: "var(--color-ink-faint)",
              textDecoration: "none",
            }}
          >
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
}
