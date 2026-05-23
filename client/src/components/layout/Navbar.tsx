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
  { id: "movies", label: "Movies", path: "/movies" },
  { id: "buses", label: "Buses", path: "/buses" },
  { id: "trains", label: "Trains", path: "/trains" },
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
      <header
        className={`fixed z-50 transition-all duration-500 ${
          isScrolled 
            ? "top-4 left-4 right-4 md:left-12 md:right-12 lg:left-24 lg:right-24 bg-background/90 backdrop-blur-xl border border-text-tertiary/20 rounded-full py-3 px-6 md:px-8 shadow-xl" 
            : "top-0 left-0 right-0 bg-transparent py-8 px-4 md:px-12 lg:px-24"
        }`}
      >
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          {/* Minimalist Logo */}
          <Link href="/" className="flex items-center gap-2 group overflow-hidden">
            <span className="font-display font-bold text-2xl tracking-tighter uppercase group-hover:-translate-y-full transition-all duration-500 block relative text-text-primary">
              MOVEO
              <span className="absolute top-full left-0 font-display font-bold text-2xl tracking-tighter uppercase text-text-primary">
                MOVEO
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            <ul className="flex items-center gap-8">
              {MODULES.map((mod) => (
                <li key={mod.id}>
                  <Link
                    href={mod.path}
                    className={`text-sm font-medium uppercase tracking-widest transition-colors ${
                      pathname.startsWith(mod.path)
                        ? "text-text-primary font-bold"
                        : "text-text-tertiary hover:text-text-primary"
                    }`}
                  >
                    {mod.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            {!pathname.startsWith('/login') && !pathname.startsWith('/signup') && (
              <Link href="/login">
                <Button variant="ghost" className="uppercase tracking-widest text-xs px-4 text-text-primary">
                  Sign In
                </Button>
              </Link>
            )}
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-surface-elevated rounded-full transition-colors flex items-center gap-2 text-text-primary"
            >
              <span className="text-xs font-medium uppercase tracking-widest">Menu</span>
              <HugeiconsIcon icon={Menu01Icon} size={20} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4">
            <ThemeToggle />
            {!pathname.startsWith('/login') && !pathname.startsWith('/signup') && (
               <Link href="/login" className="text-text-primary">
                 <HugeiconsIcon icon={UserCircleIcon} size={24} />
               </Link>
             )}
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 focus:outline-none text-text-primary"
            >
              <HugeiconsIcon icon={Menu01Icon} size={24} />
            </button>
          </div>
        </div>
      </header>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};
