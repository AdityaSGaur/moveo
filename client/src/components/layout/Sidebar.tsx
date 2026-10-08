"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  UserIcon,
  Ticket01Icon,
  Settings02Icon,
  Logout01Icon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/Button";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { logout } from "@/store/slices/authSlice";

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
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

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

  const handleLogout = () => {
    dispatch(logout());
    onClose();
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

        <div className="flex flex-col px-6 md:px-8 py-6 gap-5 flex-1 overflow-y-auto">
          {isAuthenticated && user && (
            <div className="p-4 rounded-2xl bg-surface-elevated border border-white/10 mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent-primary to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  {getUserInitials()}
                </div>
                <div className="overflow-hidden">
                  <div className="font-bold text-sm text-text-primary truncate">{user.name}</div>
                  <div className="text-xs text-text-tertiary truncate">{user.email}</div>
                </div>
              </div>
            </div>
          )}

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

          {isAuthenticated && (
            <div className="pt-4 border-t border-text-tertiary/10 space-y-3">
              <Link
                href="/profile"
                onClick={onClose}
                className="flex items-center gap-3 text-base font-medium text-text-secondary hover:text-text-primary transition-colors"
              >
                <HugeiconsIcon icon={UserIcon} className="w-5 h-5 text-accent-primary" />
                My Profile
              </Link>
              <Link
                href="/profile"
                onClick={onClose}
                className="flex items-center gap-3 text-base font-medium text-text-secondary hover:text-text-primary transition-colors"
              >
                <HugeiconsIcon icon={Ticket01Icon} className="w-5 h-5 text-purple-400" />
                My Bookings & Tickets
              </Link>
              <Link
                href="/profile"
                onClick={onClose}
                className="flex items-center gap-3 text-base font-medium text-text-secondary hover:text-text-primary transition-colors"
              >
                <HugeiconsIcon icon={Settings02Icon} className="w-5 h-5 text-blue-400" />
                Settings
              </Link>
            </div>
          )}
        </div>

        <div className="p-6 md:p-8 border-t border-text-tertiary/10 flex flex-col gap-4">
          {isAuthenticated ? (
            <Button variant="outline" fullWidth className="py-4 text-red-400 border-red-500/30 hover:bg-red-500/10" onClick={handleLogout}>
              <span className="flex items-center justify-center gap-2">
                <HugeiconsIcon icon={Logout01Icon} className="w-4 h-4" />
                Sign Out
              </span>
            </Button>
          ) : (
            <>
              <Link href="/login" onClick={onClose} className="w-full">
                <Button variant="outline" fullWidth className="py-4">Sign In</Button>
              </Link>
              <Link href="/signup" onClick={onClose} className="w-full">
                <Button variant="primary" fullWidth className="py-4">Create Account</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

