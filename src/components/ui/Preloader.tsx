"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [visible, setVisible] = useState(true);
  const [contentIn, setContentIn] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Stagger: content appears → holds → panel slides away
    const t1 = setTimeout(() => setContentIn(true),  80);
    const t2 = setTimeout(() => setExiting(true),    1800);
    const t3 = setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 2650);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#F5F0E8",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        pointerEvents: exiting ? "none" : "all",
      }}
      animate={exiting ? { y: "-100%" } : { y: 0 }}
      transition={
        exiting
          ? { duration: 0.85, ease: [0.76, 0, 0.24, 1] }
          : { duration: 0 }
      }
    >
      {/* Arabic welcome — أهلاً وسهلاً */}
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: contentIn ? 1 : 0, y: contentIn ? 0 : 6 }}
        transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(13px, 1.4vw, 17px)",
          fontWeight: 300,
          fontStyle: "italic",
          color: "rgba(28,28,26,0.32)",
          letterSpacing: "0.08em",
          marginBottom: "32px",
          direction: "rtl",
        }}
      >
        پخیر راغلئ
      </motion.p>

      {/* Mughal arch — draws in via pathLength */}
      <motion.svg
        width="110"
        height="130"
        viewBox="0 0 110 130"
        fill="none"
        style={{ marginBottom: "30px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: contentIn ? 1 : 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
      >
        {/* Outer arch */}
        <motion.path
          d="M10 128 L10 60 Q10 8 55 8 Q100 8 100 60 L100 128"
          stroke="rgba(28,28,26,0.14)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: contentIn ? 1 : 0 }}
          transition={{ duration: 1.6, delay: 0.15, ease: [0.33, 1, 0.68, 1] }}
        />
        {/* Inner arch — gold tint */}
        <motion.path
          d="M20 128 L20 63 Q20 20 55 20 Q90 20 90 63 L90 128"
          stroke="rgba(139,105,20,0.22)"
          strokeWidth="0.75"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: contentIn ? 1 : 0 }}
          transition={{ duration: 1.6, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
        />
        {/* Keystone diamond at apex */}
        <motion.path
          d="M55 8 L58 14 L55 20 L52 14 Z"
          fill="rgba(139,105,20,0.30)"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: contentIn ? 1 : 0, scale: contentIn ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          style={{ transformOrigin: "55px 14px" }}
        />
      </motion.svg>

      {/* Wordmark */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: contentIn ? 1 : 0, y: contentIn ? 0 : 10 }}
        transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(44px, 6vw, 72px)",
          fontWeight: 400,
          color: "#1C1C1A",
          letterSpacing: "0.14em",
          lineHeight: 1,
          textTransform: "uppercase",
        }}
      >
        Hojra
      </motion.p>

      {/* Expanding hairline */}
      <motion.div
        style={{
          height: "1px",
          background: "rgba(28,28,26,0.14)",
          marginTop: "18px",
          marginBottom: "14px",
        }}
        initial={{ width: 0 }}
        animate={{ width: contentIn ? "72px" : 0 }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.33, 1, 0.68, 1] }}
      />

      {/* Sub-label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: contentIn ? 0.38 : 0 }}
        transition={{ duration: 0.8, delay: 0.65 }}
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "9px",
          fontWeight: 400,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "#1C1C1A",
        }}
      >
        Afghan &amp; Pakistani · Birmingham
      </motion.p>

      {/* الحجرة — The Chamber, fades in last */}
      <motion.p
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: contentIn ? 0.22 : 0, y: contentIn ? 0 : 4 }}
        transition={{ duration: 0.9, delay: 0.85 }}
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(11px, 1.2vw, 14px)",
          fontWeight: 300,
          color: "#1C1C1A",
          letterSpacing: "0.12em",
          marginTop: "10px",
          direction: "rtl",
        }}
      >
        الحجرة
      </motion.p>

      {/* Bottom progress line — grows left to right */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "1px",
          background: "rgba(139,105,20,0.35)",
          transformOrigin: "left center",
        }}
        initial={{ width: "0%" }}
        animate={{ width: contentIn ? "100%" : "0%" }}
        transition={{ duration: 1.7, delay: 0.1, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
