"use client";

import { useState } from "react";
import Logo from "./components/Logo";
import DesktopNav from "./components/DesktopNav";
import MobileNavToggle from "./components/MobileNavToggle";
import MobileNavMenu from "./components/MobileNavMenu";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Logo />
        <DesktopNav />
        <MobileNavToggle
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      </div>
      <MobileNavMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}
