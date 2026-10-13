"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Menu01Icon,
  UserCircleIcon,
  UserIcon,
  Ticket01Icon,
  Settings02Icon,
  Logout01Icon,
  ArrowDown01Icon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/Button";
import { Sidebar } from "./Sidebar";
import { ThemeToggle } from "./ThemeToggle";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { logout } from "@/store/slices/authSlice";

const MODULES = [
  { id: "flights", label: "Flights", path: "/flights" },
  { id: "buses", label: "Buses", path: "/buses" },
  { id: "hotels", label: "Hotels", path: "/hotels" },
  { id: "book", label: "Book", path: "/book" },
  { id: "community", label: "Community", path: "/community" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close profile dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setIsProfileOpen(false);
    router.push("/");
  };

  const getUserInitials = () => {
    if (!user?.name) return "US";
    const parts = user.name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return user.name.substring(0, 2).toUpperCase();
  };

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

          {/* Desktop Navigation - Absolutely Centered */}
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
          <div className="hidden lg:flex items-center gap-3 z-10">
            <ThemeToggle />

            {isAuthenticated ? (
              /* PROFILE DROPDOWN MENU */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2.5 p-1.5 pl-2.5 pr-3 rounded-full bg-surface-elevated hover:bg-surface border border-text-tertiary/20 text-text-primary transition-all duration-200 focus:outline-none"
                  aria-expanded={isProfileOpen}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent-primary to-purple-500 flex items-center justify-center text-white font-bold text-xs shadow-md">
                    {getUserInitials()}
                  </div>
                  <span className="text-xs font-semibold max-w-[100px] truncate">{user?.name || "Account"}</span>
                  <HugeiconsIcon
                    icon={ArrowDown01Icon}
                    className={`w-3.5 h-3.5 text-text-tertiary transition-transform duration-300 ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* DROPDOWN MENU CONTENT */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-64 rounded-2xl bg-surface border border-text-tertiary/20 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* User info header */}
                    <div className="p-3 mb-1 rounded-xl bg-surface-elevated/60 border border-white/5">
                      <div className="font-bold text-sm text-text-primary truncate">{user?.name || "User"}</div>
                      <div className="text-xs text-text-tertiary truncate">{user?.email || "user@example.com"}</div>
                      <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        {user?.membershipTier || "Silver"} Member
                      </div>
                    </div>

                    <div className="h-px bg-text-tertiary/10 my-1" />

                    <div className="space-y-0.5">
                      <Link
                        href="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
                      >
                        <HugeiconsIcon icon={UserIcon} className="w-4 h-4 text-accent-primary" />
                        My Profile
                      </Link>

                      <Link
                        href="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
                      >
                        <HugeiconsIcon icon={Ticket01Icon} className="w-4 h-4 text-purple-400" />
                        My Bookings & Tickets
                      </Link>

                      <Link
                        href="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
                      >
                        <HugeiconsIcon icon={Settings02Icon} className="w-4 h-4 text-blue-400" />
                        Settings
                      </Link>
                    </div>

                    <div className="h-px bg-text-tertiary/10 my-1" />

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-left"
                    >
                      <HugeiconsIcon icon={Logout01Icon} className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              !pathname.startsWith("/login") &&
              !pathname.startsWith("/signup") && (
                <Link href="/login">
                  <Button variant="ghost" className="uppercase tracking-widest text-xs px-3 py-2 h-auto text-text-primary">
                    Sign In
                  </Button>
                </Link>
              )
            )}
          </div>

          {/* Mobile & Tablet Actions */}
          <div className="flex lg:hidden items-center gap-2 z-10">
            <ThemeToggle />

            {isAuthenticated ? (
              <Link href="/profile" className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent-primary to-purple-500 flex items-center justify-center text-white font-bold text-xs ring-2 ring-accent-primary/40">
                  {getUserInitials()}
                </div>
              </Link>
            ) : (
              !pathname.startsWith("/login") &&
              !pathname.startsWith("/signup") && (
                <Link href="/login" className="text-text-primary p-1">
                  <HugeiconsIcon icon={UserCircleIcon} size={20} />
                </Link>
              )
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

