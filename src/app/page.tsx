"use client";

import { useState } from "react";
import { useLenisGsap } from "@/hooks/useLenisGsap";
import Navbar from "@/components/ui/Navbar";
import Preloader from "@/components/ui/Preloader";
import Footer from "@/components/ui/Footer";
import StickyBar from "@/components/ui/StickyBar";
import ReservationDrawer from "@/components/reservation/ReservationDrawer";
import FullMenuOverlay from "@/components/menu/FullMenuOverlay";
import HeroSection from "@/components/editorial/HeroSection";
import ManifestoSection from "@/components/editorial/ManifestoSection";
import StorySection from "@/components/editorial/StorySection";
import MenuSection from "@/components/editorial/MenuSection";
import GallerySection from "@/components/editorial/GallerySection";
import ExperiencesSection from "@/components/editorial/ExperiencesSection";
import SignatureDishSection from "@/components/editorial/SignatureDishSection";
import PressSection from "@/components/editorial/PressSection";
import VisitSection from "@/components/editorial/VisitSection";

export default function HomePage() {
  useLenisGsap();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const openReserve = () => setDrawerOpen(true);
  const openMenu = () => setMenuOpen(true);

  return (
    <>
      <Preloader onComplete={() => setLoaded(true)} />
      <Navbar onReserve={openReserve} onViewMenu={openMenu} />

      <main>
        <HeroSection onReserve={openReserve} onViewMenu={openMenu} startAnim={loaded} />
        <ManifestoSection />
        <StorySection />
        <MenuSection onViewMenu={openMenu} />
        <SignatureDishSection />
        <ExperiencesSection onReserve={openReserve} />
        <GallerySection />
        <PressSection />
        <VisitSection onReserve={openReserve} />
      </main>

      <Footer onReserve={openReserve} />
      <StickyBar onReserve={openReserve} />
      <ReservationDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <FullMenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
