"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setUser } from "@/store/slices/authSlice";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { ETicketGeneratorModal } from "@/components/dashboard/ETicketGeneratorModal";
import { ETicket } from "@/components/dashboard/ActiveETicketCard";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  UserIcon,
  Ticket01Icon,
  Settings02Icon,
  Coins01Icon,
  CheckmarkCircle02Icon,
  Edit02Icon,
} from "@hugeicons/core-free-icons";

export const UserProfileView: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const bookings = useAppSelector((state) => state.booking.bookingHistory);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "Aditya Gaur");
  const [email, setEmail] = useState(user?.email || "aditya@example.com");
  const [phone, setPhone] = useState("+91 9876543210");
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      dispatch(
        setUser({
          ...user,
          name: name.trim(),
          email: email.trim(),
        })
      );
    }
    setIsEditing(false);
    setSuccessMessage("Profile updated successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const getUserInitials = () => {
    const displayName = user?.name || name;
    if (!displayName) return "US";
    const parts = displayName.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return displayName.substring(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background text-foreground px-4 sm:px-6 md:px-8 py-6 max-w-[1600px] mx-auto">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Floating Navigation Panel */}
        <DashboardSidebar
          activeTab="profile"
          onSelectTab={(tab) => {
            if (tab === "dashboard") window.location.href = "/dashboard";
          }}
        />

        {/* Main Profile View Area */}
        <div className="flex-1 flex flex-col gap-6 min-w-0">
          {/* Header Banner Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-surface to-surface-elevated border border-text-tertiary/10 shadow-lg relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-accent-primary to-purple-500 flex items-center justify-center text-white font-bold text-xl sm:text-2xl shadow-xl shrink-0 ring-4 ring-orange-500/20">
                {getUserInitials()}
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-display font-bold text-text-primary">
                    {user?.name || name}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 text-[10px] font-extrabold uppercase border border-amber-500/30">
                    Silver Member
                  </span>
                </div>
                <p className="text-xs text-text-tertiary mt-1 font-medium">
                  {user?.email || email} • Member since August 2026
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3 self-end md:self-auto">
              <button
                onClick={() => setIsGeneratorOpen(true)}
                className="px-4 py-2.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-lg shadow-orange-500/25 flex items-center gap-2 transition-all"
              >
                <HugeiconsIcon icon={Ticket01Icon} className="w-4 h-4" />
                <span>Generate E-Ticket</span>
              </button>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2.5 rounded-2xl bg-surface-elevated hover:bg-surface border border-text-tertiary/20 text-text-primary font-semibold text-xs flex items-center gap-2 transition-all"
              >
                <HugeiconsIcon icon={Edit02Icon} className="w-4 h-4" />
                <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
              </button>
            </div>
          </div>

          {/* Success Toast */}
          {successMessage && (
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-emerald-400 text-xs font-semibold animate-in fade-in duration-200">
              <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-4 h-4" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-3xl bg-surface border border-text-tertiary/10 text-center shadow-md">
              <span className="text-[10px] text-text-tertiary uppercase font-bold tracking-wider block">
                Total Bookings
              </span>
              <span className="text-xl sm:text-2xl font-display font-extrabold text-text-primary mt-1 block">
                {bookings.length + 3}
              </span>
            </div>
            <div className="p-4 rounded-3xl bg-surface border border-text-tertiary/10 text-center shadow-md">
              <span className="text-[10px] text-text-tertiary uppercase font-bold tracking-wider block">
                Wallet Balance
              </span>
              <span className="text-xl sm:text-2xl font-display font-extrabold text-emerald-400 mt-1 block">
                ₹1,250
              </span>
            </div>
            <div className="p-4 rounded-3xl bg-surface border border-text-tertiary/10 text-center shadow-md">
              <span className="text-[10px] text-text-tertiary uppercase font-bold tracking-wider block">
                Moveo Coins
              </span>
              <span className="text-xl sm:text-2xl font-display font-extrabold text-amber-400 mt-1 block">
                1,200
              </span>
            </div>
            <div className="p-4 rounded-3xl bg-surface border border-text-tertiary/10 text-center shadow-md">
              <span className="text-[10px] text-text-tertiary uppercase font-bold tracking-wider block">
                Tier Status
              </span>
              <span className="text-xl sm:text-2xl font-display font-extrabold text-purple-400 mt-1 block">
                Silver
              </span>
            </div>
          </div>

          {/* Profile Edit Form or Details Card */}
          {isEditing ? (
            <div className="p-6 rounded-3xl bg-surface border border-text-tertiary/10 shadow-lg">
              <h3 className="text-base font-bold font-display text-text-primary mb-4">
                Update Account Information
              </h3>
              <form onSubmit={handleSaveProfile} className="space-y-4 max-w-lg">
                <div>
                  <label className="text-xs font-semibold text-text-tertiary uppercase tracking-wider block mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-surface-elevated border border-text-tertiary/20 rounded-2xl px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-text-tertiary uppercase tracking-wider block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-surface-elevated border border-text-tertiary/20 rounded-2xl px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-text-tertiary uppercase tracking-wider block mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-surface-elevated border border-text-tertiary/20 rounded-2xl px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-5 py-2.5 rounded-2xl bg-surface-elevated hover:bg-surface border border-text-tertiary/20 text-xs font-bold text-text-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="p-6 rounded-3xl bg-surface border border-text-tertiary/10 shadow-lg space-y-4">
              <h3 className="text-base font-bold font-display text-text-primary">
                Account & Passenger Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-surface-elevated border border-white/5 space-y-1">
                  <span className="text-[10px] text-text-tertiary uppercase font-bold">Full Name</span>
                  <div className="font-bold text-text-primary text-sm">{user?.name || name}</div>
                </div>
                <div className="p-4 rounded-2xl bg-surface-elevated border border-white/5 space-y-1">
                  <span className="text-[10px] text-text-tertiary uppercase font-bold">Email Address</span>
                  <div className="font-bold text-text-primary text-sm">{user?.email || email}</div>
                </div>
                <div className="p-4 rounded-2xl bg-surface-elevated border border-white/5 space-y-1">
                  <span className="text-[10px] text-text-tertiary uppercase font-bold">Phone Contact</span>
                  <div className="font-bold text-text-primary text-sm">{phone}</div>
                </div>
                <div className="p-4 rounded-2xl bg-surface-elevated border border-white/5 space-y-1">
                  <span className="text-[10px] text-text-tertiary uppercase font-bold">Verification Status</span>
                  <div className="font-bold text-emerald-400 text-sm">Identity Verified ✓</div>
                </div>
              </div>
            </div>
          )}

          {/* Confirmed Booking History */}
          <div className="p-6 rounded-3xl bg-surface border border-text-tertiary/10 shadow-lg">
            <h3 className="text-base font-bold font-display text-text-primary mb-4">
              Your Booking History ({bookings.length})
            </h3>

            {bookings.length === 0 ? (
              <div className="p-6 text-center text-xs text-text-tertiary bg-surface-elevated rounded-2xl border border-white/5">
                No custom booking history yet. Generate an E-Ticket or book a transport ticket to view passes here.
              </div>
            ) : (
              <div className="space-y-3">
                {bookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-4 rounded-2xl bg-surface-elevated border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-bold text-text-primary text-sm uppercase">
                        {b.type} Booking — {b.status}
                      </div>
                      <div className="text-[10px] text-text-tertiary">
                        Date: {new Date(b.createdAt).toLocaleString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-emerald-400 text-sm">
                        ₹{b.totalAmount.toLocaleString("en-IN")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* E-Ticket Generator Modal */}
      <ETicketGeneratorModal
        isOpen={isGeneratorOpen}
        onClose={() => setIsGeneratorOpen(false)}
        onTicketGenerated={(ticket: ETicket) => {
          alert(`Generated new E-Ticket for PNR: ${ticket.pnr}`);
        }}
      />
    </div>
  );
};
