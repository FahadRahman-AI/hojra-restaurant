"use client";

const images = [
  { src: "/images/gallery-1.jpg", alt: "Signature dish" },
  { src: "/images/gallery-2.jpg", alt: "Restaurant interior" },
  { src: "/images/gallery-3.jpg", alt: "Kitchen or chef" },
];

export default function GallerySection() {
  return (
    <section
      id="gallery"
      style={{ background: "var(--color-cream-2)" }}
    >
      {/* Three flush equal columns */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0 }}>
        {images.map((img, i) => (
          <div
            key={i}
            style={{
              aspectRatio: "3/4",
              background: i === 0
                ? "linear-gradient(to bottom, #D4C9B0, #C4B898)"
                : i === 1
                  ? "linear-gradient(to bottom, #C8C0AA, #B8B098)"
                  : "linear-gradient(to bottom, #BCBA9A, #A8A680)",
              backgroundImage: `url(${img.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            aria-label={img.alt}
          />
        ))}
      </div>
    </section>
  );
}
