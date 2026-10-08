"use client";

import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Logout01Icon,
  UserIcon,
  Compass01Icon,
  Ticket01Icon,
  UserGroupIcon,
  Settings02Icon,
  Add01Icon,
  Airplane01Icon,
  Bus01Icon,
  Train01Icon,
} from "@hugeicons/core-free-icons";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { logout } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { ETicketGeneratorModal } from "./ETicketGeneratorModal";
import { ETicket } from "./ActiveETicketCard";

interface DashboardSidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onTicketGenerated?: (ticket: ETicket) => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  activeTab,
  onSelectTab,
  onTicketGenerated,
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
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
      <aside className="w-full lg:w-72 bg-surface border border-text-tertiary/10 rounded-3xl p-5 flex flex-col gap-6 shrink-0 shadow-lg">
        {/* User Info Header */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-surface-elevated border border-white/5">
          <button
            onClick={() => router.push("/profile")}
            className="flex items-center gap-3 overflow-hidden text-left group"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent-primary to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-md shrink-0 group-hover:scale-105 transition-transform">
              {getUserInitials()}
            </div>
            <div className="overflow-hidden">
              <div className="font-bold text-sm text-text-primary group-hover:text-orange-400 transition-colors truncate">
                {user?.name || "Aditya Gaur"}
              </div>
              <div className="text-[11px] text-emerald-400 font-semibold truncate">
                Silver Member
              </div>
            </div>
          </button>
          <button
            onClick={() => router.push("/profile")}
            className="p-1.5 rounded-xl hover:bg-surface text-text-tertiary hover:text-text-primary transition-colors"
            title="View profile"
          >
            <HugeiconsIcon icon={UserIcon} className="w-4 h-4" />
          </button>
        </div>

        {/* Generate E-Ticket Button */}
        <button
          onClick={() => setIsGeneratorOpen(true)}
          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all duration-300 transform active:scale-95"
        >
          <HugeiconsIcon icon={Ticket01Icon} className="w-4 h-4" />
          <span>Generate E-Ticket</span>
        </button>

        {/* Navigation Sections */}
        <div className="flex flex-col gap-5">
          {/* Travel Hub */}
          <div className="flex flex-col gap-1.5">
            <div className="text-[11px] font-bold text-text-tertiary uppercase tracking-wider px-2">
              Navigation
            </div>

            <button
              onClick={() => {
                onSelectTab("dashboard");
                router.push("/dashboard");
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "dashboard"
                  ? "bg-text-primary text-background font-bold shadow-md"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface-elevated"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <HugeiconsIcon icon={Compass01Icon} className="w-4 h-4" />
                <span>Dashboard</span>
              </div>
            </button>

            <button
              onClick={() => {
                onSelectTab("profile");
                router.push("/profile");
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "profile"
                  ? "bg-text-primary text-background font-bold shadow-md"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface-elevated"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <HugeiconsIcon icon={UserIcon} className="w-4 h-4" />
                <span>My Profile</span>
              </div>
            </button>

            <button
              onClick={() => {
                onSelectTab("bookings");
                router.push("/dashboard");
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "bookings"
                  ? "bg-text-primary text-background font-bold shadow-md"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface-elevated"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <HugeiconsIcon icon={Ticket01Icon} className="w-4 h-4" />
                <span>My E-Tickets</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                Active
              </span>
            </button>

            <button
              onClick={() => {
                onSelectTab("passengers");
                router.push("/dashboard");
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === "passengers"
                  ? "text-text-primary bg-surface-elevated font-semibold"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface-elevated"
              }`}
            >
              <HugeiconsIcon icon={UserGroupIcon} className="w-4 h-4" />
              <span>Saved Passengers</span>
            </button>
          </div>

          {/* Quick Booking Shortcuts */}
          <div className="flex flex-col gap-1.5">
            <div className="text-[11px] font-bold text-text-tertiary uppercase tracking-wider px-2">
              Book Tickets
            </div>

            <button
              onClick={() => router.push("/flights")}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
            >
              <div className="flex items-center gap-2">
                <HugeiconsIcon icon={Airplane01Icon} className="w-3.5 h-3.5 text-orange-400" />
                <span>Flight Tickets</span>
              </div>
              <span className="text-[10px] text-orange-400 font-bold">Book</span>
            </button>

            <button
              onClick={() => router.push("/buses")}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
            >
              <div className="flex items-center gap-2">
                <HugeiconsIcon icon={Bus01Icon} className="w-3.5 h-3.5 text-orange-400" />
                <span>Bus Tickets</span>
              </div>
              <span className="text-[10px] text-orange-400 font-bold">Book</span>
            </button>

            <button
              onClick={() => router.push("/trains")}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
            >
              <div className="flex items-center gap-2">
                <HugeiconsIcon icon={Train01Icon} className="w-3.5 h-3.5 text-orange-400" />
                <span>Train Tickets</span>
              </div>
              <span className="text-[10px] text-orange-400 font-bold">Book</span>
            </button>
          </div>
        </div>

        {/* Footer Settings & Logout */}
        <div className="mt-auto pt-4 border-t border-text-tertiary/10 space-y-1">
          <button
            onClick={() => router.push("/profile")}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
          >
            <HugeiconsIcon icon={Settings02Icon} className="w-4 h-4" />
            <span>Account Settings</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
          >
            <HugeiconsIcon icon={Logout01Icon} className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* E-Ticket Generator Modal */}
      <ETicketGeneratorModal
        isOpen={isGeneratorOpen}
        onClose={() => setIsGeneratorOpen(false)}
        onTicketGenerated={(ticket) => {
          onTicketGenerated?.(ticket);
        }}
      />
    </>
  );
};
