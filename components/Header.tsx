"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-paper/75 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <Container className="flex h-[68px] items-center justify-between">
        <a href="#top" className="shrink-0">
          <Image
            src="/assets/firmity-logo.png"
            alt="Firmity"
            width={114}
            height={40}
            priority
            className="h-9 w-auto sm:h-10"
          />
        </a>
        {/* Absolute path + hash (not a bare "#lead-form") so this still
            works from pages other than "/" that don't have that section,
            e.g. /thank-you — browsers resolve the hash after navigating. */}
        <Button href="/#lead-form" variant="outline" className="!px-5 !py-2.5 text-[14px]">
          Free Assessment →
        </Button>
      </Container>
    </header>
  );
}
