"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/Button";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}


// Sync with Navbar MODULES
const NAV_LINKS = [
  { label: "Flights", href: "/flights" },
  { label: "Buses", href: "/buses" },
  { label: "Trains", href: "/trains" },
  { label: "Community", href: "/community" },
];

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className={`fixed inset-0 bg-background/95 z-60 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        style={{ willChange: "opacity" }}
      />

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-surface border-l border-text-tertiary/10 z-70 shadow-2xl transition-transform duration-500 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 md:p-8 border-b border-text-tertiary/10">
          <span className="font-display font-bold text-2xl tracking-tighter text-text-primary uppercase">
            Menu
          </span>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-elevated text-text-primary hover:bg-text-primary hover:text-background transition-colors"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={20} />
          </button>
        </div>

        <div className="flex flex-col px-6 md:px-8 py-8 gap-6 flex-1 overflow-y-auto">
          {NAV_LINKS.map((link, idx) => (
            <Link 
              key={link.label} 
              href={link.href}
              onClick={onClose}
              className="text-2xl font-display font-medium text-text-secondary hover:text-text-primary transition-colors flex items-center group"
            >
              <span className="w-8 text-sm font-mono text-text-tertiary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                0{idx + 1}
              </span>
              <span className="-ml-8 group-hover:ml-0 transition-all duration-300">
                {link.label}
              </span>
            </Link>
          ))}
        </div>

        <div className="p-6 md:p-8 border-t border-text-tertiary/10 flex flex-col gap-4">
          <Link href="/login" onClick={onClose} className="w-full">
            <Button variant="outline" fullWidth className="py-4">Sign In</Button>
          </Link>
          <Link href="/signup" onClick={onClose} className="w-full">
            <Button variant="primary" fullWidth className="py-4">Create Account</Button>
          </Link>
        </div>
      </div>
    </>
  );
};
