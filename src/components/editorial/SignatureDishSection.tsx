"use client";

export default function SignatureDishSection() {
  return (
    <section
      style={{
        width: "100%",
        height: "55vh",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(to bottom, #D4C9B0, #C4B898)",
        backgroundImage: "url(/images/dish-1.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Scrim — max 35% at bottom, fades to 0% by 40% height */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(28,28,26,0.35) 0%, rgba(28,28,26,0.0) 40%)",
        }}
      />

      {/* Text — bottom left */}
      <div
        style={{
          position: "absolute",
          bottom: "clamp(32px, 5vw, 56px)",
          left: "clamp(24px, 6vw, 64px)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "10px",
            letterSpacing: "0.20em",
            textTransform: "uppercase",
            color: "rgba(245,240,232,0.55)",
            fontWeight: 400,
            marginBottom: "10px",
          }}
        >
          House Speciality
        </p>
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(48px, 6vw, 88px)",
            fontWeight: 300,
            fontStyle: "italic",
            color: "var(--color-cream)",
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
          }}
        >
          Chinaki.
        </p>
      </div>
    </section>
  );
}
