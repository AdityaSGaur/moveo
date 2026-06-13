"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu01Icon, UserCircleIcon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/Button";
import { Sidebar } from "./Sidebar";
import { ThemeToggle } from "./ThemeToggle";

const MODULES = [
  { id: "flights", label: "Flights", path: "/flights" },
  { id: "buses", label: "Buses", path: "/buses" },
  { id: "trains", label: "Trains", path: "/trains" },
  { id: "book", label: "Book", path: "/book" },
  { id: "community", label: "Community", path: "/community" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Outer header: responsive padding when scrolled */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "pt-0 sm:pt-4 sm:px-4 md:px-12 lg:px-24" : "py-6 px-4 md:px-12 lg:px-24"
        }`}
      >
        {/* Inner container */}
        <div
          className={`flex items-center justify-between mx-auto w-full min-w-0 transition-all duration-500 ${
            isScrolled
              ? "max-w-7xl bg-background/95 border-b sm:border border-text-tertiary/20 rounded-none sm:rounded-full py-2 px-4 pr-0 sm:py-3 sm:pl-6 sm:pr-3 shadow-xl"
              : "max-w-7xl"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center group overflow-hidden shrink-0 z-10">
            <span className="font-display font-bold text-lg sm:text-xl md:text-2xl tracking-tighter uppercase group-hover:-translate-y-full transition-all duration-500 block relative text-text-primary">
              MOVEO
              <span className="absolute top-full left-0 font-display font-bold text-lg sm:text-xl md:text-2xl tracking-tighter uppercase text-text-primary">
                MOVEO
              </span>
            </span>
          </Link>

          {/* Desktop Navigation - Absolutely Centered (only show on lg+) */}
          <nav className="hidden lg:block absolute left-1/2 -translate-x-1/2 z-0">
            <ul className="flex items-center gap-4 lg:gap-8">
              {MODULES.map((mod) => (
                <li key={mod.id}>
                  <Link
                    href={mod.path}
                    className={`relative text-sm font-medium uppercase tracking-widest transition-all ${
                      pathname.startsWith(mod.path)
                        ? "text-text-primary font-bold"
                        : "text-text-tertiary hover:text-text-primary"
                    }`}
                  >
                    {mod.label}
                    {pathname.startsWith(mod.path) && (
                      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-text-primary rounded-full" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2 z-10">
            <ThemeToggle />
            {!pathname.startsWith('/login') && !pathname.startsWith('/signup') && (
              <Link href="/login">
                <Button variant="ghost" className="uppercase tracking-widest text-xs px-3 py-2 h-auto text-text-primary">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile & Tablet Actions */}
          <div className="flex lg:hidden items-center gap-1.5 z-10">
            <ThemeToggle />
            {!pathname.startsWith('/login') && !pathname.startsWith('/signup') && (
              <Link href="/login" className="text-text-primary p-1">
                <HugeiconsIcon icon={UserCircleIcon} size={20} />
              </Link>
            )}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-1.5 focus:outline-none text-text-primary"
            >
              <HugeiconsIcon icon={Menu01Icon} size={20} />
            </button>
          </div>
        </div>
      </header>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};
