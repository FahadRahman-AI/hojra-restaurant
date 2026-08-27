import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hojra Restaurant · Authentic Afghan & Pakistani Cuisine · Birmingham",
  description:
    "Hojra Restaurant — authentic Afghan & Pakistani cuisine in Birmingham. Slow-cooked pilaus, charcoal-grilled kebabs and karahi. Grand Opening 17 August 2026.",
  keywords: ["Afghan restaurant Birmingham", "Pakistani restaurant Birmingham", "hojra restaurant", "halal restaurant Birmingham", "kebabs Birmingham"],
  openGraph: {
    title: "Hojra Restaurant · Authentic Afghan & Pakistani Cuisine",
    description: "Authentic Afghan & Pakistani cuisine in the heart of Birmingham.",
    type: "website",
    locale: "en_GB",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F5F3EF",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
