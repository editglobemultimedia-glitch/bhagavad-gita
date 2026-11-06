"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { navGroups, type NavGroup } from "@/lib/navData";
import { useJoinModal } from "@/lib/useJoinModal";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const openJoin = useJoinModal((state) => state.open);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const toggleMobileAccordion = (label: string) => {
    setMobileExpanded((current) => (current === label ? null : label));
  };

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-40 w-full bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "border-b border-gray-100"
      }`}
    >
      <div className="mx-auto w-full max-w-full px-4 lg:px-8 xl:px-10">
        <div className="flex min-h-14 items-center justify-between gap-3 py-1 md:min-h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex flex-shrink-0 items-center gap-2 lg:gap-3"
            aria-label="Bhagavad Gita Vishwa Mahotsav home"
          >
            <img
              src="/bh4.png"
              alt="Bhagavad Gita Vishwa Mahotsav 2027"
              className="h-10 w-10 flex-shrink-0 object-contain drop-shadow-sm transition-all md:h-12 md:w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16"
            />

            <span className="flex flex-col justify-center gap-0">
              <span className="whitespace-nowrap font-[Cinzel] text-base font-bold uppercase tracking-tight text-[#24160C] md:text-lg xl:text-[22px]">
                BhagavadGita
              </span>
              <span className="whitespace-nowrap font-[Cormorant_Garamond] text-xs font-semibold tracking-tight text-[#A66A00] md:text-sm xl:text-[15px]">
                VISHWA MAHOTSAV-2027
              </span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav
            className="ml-5 hidden flex-shrink-0 items-center gap-1 xl:ml-12 xl:flex xl:gap-1.5 2xl:ml-16 2xl:gap-2"
            aria-label="Main navigation"
          >
            {navGroups.map((group) => (
              <DesktopNavItem
                key={group.label}
                group={group}
                active={activeDropdown === group.label}
                onEnter={() => setActiveDropdown(group.label)}
                onLeave={() => setActiveDropdown(null)}
                onNavigate={() => setActiveDropdown(null)}
              />
            ))}
          </nav>

          {/* Join button and mobile menu toggle */}
          <div className="ml-auto mr-2 flex flex-shrink-0 items-center gap-2 xl:ml-auto xl:mr-20 2xl:mr-28">
            <button
              type="button"
              onClick={openJoin}
              className="hidden min-w-max items-center gap-2 rounded-full bg-gold-gradient px-4 py-2.5 font-sans text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:scale-105 hover:shadow-gold md:inline-flex lg:px-5 xl:text-sm"
            >
              🔱 Join the Movement
            </button>

            <button
              type="button"
              className="p-2 text-ink xl:hidden"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileOpen && (
        <div className="max-h-[80vh] overflow-y-auto border-t border-gray-100 bg-white xl:hidden">
          <div className="container-main space-y-1 py-4">
            {navGroups.map((group) => (
              <div key={group.label}>
                {group.children?.length ? (
                  <>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between px-2 py-2.5 text-left font-sans text-sm font-medium text-ink transition-colors hover:text-gold"
                      onClick={() => toggleMobileAccordion(group.label)}
                      aria-expanded={mobileExpanded === group.label}
                    >
                      <span>{group.label}</span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          mobileExpanded === group.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {mobileExpanded === group.label && (
                      <div className="ml-2 space-y-1 border-l-2 border-gold pb-2 pl-4">
                        {group.children.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-2 py-1.5 text-sm text-ink-muted transition-colors hover:text-gold"
                            onClick={() => {
                              setMobileOpen(false);
                              setMobileExpanded(null);
                            }}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={group.href}
                    className="flex w-full items-center justify-between px-2 py-2.5 font-sans text-sm font-medium text-ink transition-colors hover:text-gold"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span>{group.label}</span>
                  </Link>
                )}
              </div>
            ))}

            <div className="space-y-4 pb-2 pt-4">
              <button
                type="button"
                onClick={() => {
                  openJoin();
                  setMobileOpen(false);
                  setMobileExpanded(null);
                }}
                className="w-full rounded-full bg-gold-gradient py-3 font-sans text-xs font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:shadow-gold"
              >
                🔱 Join the Movement
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

type DesktopNavItemProps = {
  group: NavGroup;
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onNavigate: () => void;
};

function DesktopNavItem({
  group,
  active,
  onEnter,
  onLeave,
  onNavigate,
}: DesktopNavItemProps) {
  const dropdownImages: Record<string, string> = {
    Home: "/p1.jpg",
    Journey: "/p2.jpg",
    Program: "/p4.jpg",
    Participation: "/p5.jpg",
    Media: "/p8.jpg",
    "Our Leadership": "/bh1.png",
  };

  const hasChildren = Boolean(group.children?.length);

  return (
    <div
      className="relative"
      onMouseEnter={hasChildren ? onEnter : undefined}
      onMouseLeave={hasChildren ? onLeave : undefined}
    >
      <Link
        href={group.href}
        aria-haspopup={hasChildren ? "true" : undefined}
        aria-expanded={hasChildren ? active : undefined}
        onClick={onNavigate}
        className={`flex items-center gap-1 px-2 py-2 text-[14px] font-semibold whitespace-nowrap rounded-sm transition-colors duration-200 xl:px-2.5 xl:text-[15px] 2xl:px-3 2xl:text-base ${
          active ? "text-gold" : "text-ink hover:text-gold"
        }`}
      >
        {group.label}
        {hasChildren && (
          <ChevronDown
            size={15}
            className={`flex-shrink-0 transition-transform duration-200 ${
              active ? "rotate-180 text-gold" : ""
            }`}
          />
        )}
      </Link>

      {active && hasChildren && (
        <div
          className="fixed left-1/2 top-[110px] z-[9999] w-[min(850px,calc(100vw-32px))] -translate-x-1/2 border border-[#D9C27A] bg-[#F8F1DE] shadow-2xl"
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
        >
          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Dropdown links */}
            <div className="grid grid-cols-1 gap-x-8 gap-y-5 p-6 sm:grid-cols-2 sm:p-8 md:col-span-2 md:p-10">
              {group.children?.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-[Cormorant_Garamond] text-lg text-[#5A3713] transition hover:text-[#A66A00] sm:text-xl"
                  onClick={onNavigate}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Dropdown image panel */}
            <div className="hidden border-l border-[#D9C27A] p-6 md:block">
              <h3 className="mb-5 font-[Cormorant_Garamond] text-3xl text-[#5A3713]">
                {group.label}
              </h3>
              <img
                src={dropdownImages[group.label] ?? "/p1.jpg"}
                alt={`${group.label} section`}
                className="h-[220px] w-full rounded-xl object-cover"
              />
              <Link
                href={group.href}
                className="mt-5 inline-block text-lg font-semibold text-[#A66A00] hover:underline"
                onClick={onNavigate}
              >
                Know More →
              </Link>
            </div>
          </div>

          <div className="absolute left-0 right-0 top-0 h-1 bg-gold-gradient" />
        </div>
      )}
    </div>
  );
}
