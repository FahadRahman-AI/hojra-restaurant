"use client";

import type { CSSProperties, ReactNode } from "react";

/*
  ImageSlot — quiet image placeholder.
  Base layer always renders (gradient or colour placeholder).
  CSS background-image layer auto-covers when the file is added to public/images/.
  Missing files produce a silent 404 — the placeholder shows instead.

  TO ADD IMAGES: place files in public/images/ with the filenames shown in IMAGES.md.
  No code changes needed — images appear on refresh.
*/

interface ImageSlotProps {
  src: string;
  label?: string;
  className?: string;
  style?: CSSProperties;
  base?: ReactNode;
  overlay?: string;
  labelAlign?: "top" | "center" | "bottom";
  children?: ReactNode;
}

export default function ImageSlot({
  src,
  className,
  style,
  base,
  overlay,
  children,
}: ImageSlotProps) {
  return (
    <div className={className} style={style}>
      {base}

      {/* Real image — covers base when file exists */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {overlay && (
        <div className="absolute inset-0 pointer-events-none" style={{ background: overlay }} />
      )}

      {children}
    </div>
  );
}
