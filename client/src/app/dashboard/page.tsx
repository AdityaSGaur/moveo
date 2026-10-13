"use client";

import React, { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { QuickBookingWidget } from "@/components/dashboard/QuickBookingWidget";
import { ActiveETicketCard, ETicket } from "@/components/dashboard/ActiveETicketCard";
import { SavedPassengersWidget } from "@/components/dashboard/SavedPassengersWidget";
import { RewardsWalletWidget } from "@/components/dashboard/RewardsWalletWidget";
import { useAppSelector } from "@/store/store";
import { HugeiconsIcon } from "@hugeicons/react";
import { Ticket01Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";

const SAMPLE_E_TICKETS: ETicket[] = [
  {
    id: "t1",
    pnr: "MOVE-89231",
    type: "flight",
    operatorName: "Air India",
    serviceName: "AI-803 Express",
    fromCity: "Mumbai",
    fromCode: "BOM",
    toCity: "New Delhi",
    toCode: "DEL",
    departureTime: "08:30 AM",
    arrivalTime: "10:45 AM",
    date: "15 Sep 2026",
    seats: ["12A", "12B"],
    passengers: [
      { name: "Aditya Gaur", age: 26, gender: "Male" },
      { name: "Priya Sharma", age: 24, gender: "Female" },
    ],
    amount: 8450,
    status: "Confirmed",
  },
  {
    id: "t2",
    pnr: "MOVE-44109",
    type: "bus",
    operatorName: "Zingbus Premium",
    serviceName: "Volvo A/C Sleeper",
    fromCity: "Delhi",
    fromCode: "DEL",
    toCity: "Manali",
    toCode: "MNL",
    departureTime: "08:00 PM",
    arrivalTime: "09:30 AM (+1d)",
    date: "28 Sep 2026",
    seats: ["SL-04", "SL-05"],
    passengers: [
      { name: "Aditya Gaur", age: 26, gender: "Male" },
    ],
    amount: 2400,
    status: "Boarding Soon",
  },
  {
    id: "t3",
    pnr: "MOVE-12093",
    type: "bus",
    operatorName: "KSRTC Airavat",
    serviceName: "AC Sleeper",
    fromCity: "Bengaluru",
    fromCode: "BLR",
    toCity: "Chennai",
    toCode: "MAA",
    departureTime: "06:00 AM",
    arrivalTime: "12:00 PM",
    date: "10 Oct 2026",
    seats: ["S1-34", "S1-35"],
    passengers: [
      { name: "Aditya Gaur", age: 26, gender: "Male" },
      { name: "Rohan Kumar", age: 27, gender: "Male" },
    ],
    amount: 1890,
    status: "Confirmed",
  },
];

export default function UserDashboardPage() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [customTickets, setCustomTickets] = useState<ETicket[]>([]);

  const reduxBookings = useAppSelector((state) => state.booking.bookingHistory);

  // Combine generated tickets + Redux bookings + sample tickets
  const allTickets: ETicket[] = [
    ...customTickets,
    ...reduxBookings.map((b) => ({
      id: b.id,
      pnr: b.id.toUpperCase().substring(0, 10),
      type: b.type,
      operatorName: b.hotelBooking?.hotelName || "Moveo Express",
      serviceName: b.hotelBooking?.roomType || "Standard Booking",
      fromCity: b.hotelBooking?.city || b.flightBooking?.source || b.busBooking?.source || b.trainBooking?.source || "Mumbai",
      toCity: b.hotelBooking?.city || b.flightBooking?.destination || b.busBooking?.destination || b.trainBooking?.destination || "Goa",
      departureTime: b.hotelBooking?.checkIn || "09:00 AM",
      arrivalTime: b.hotelBooking?.checkOut || "05:00 PM",
      date: new Date(b.createdAt).toLocaleDateString(),
      seats: b.hotelBooking ? [] : ["S1", "S2"],
      passengers: b.hotelBooking?.guestsList || b.busBooking?.passengers || [{ name: "User", age: 25, gender: "Male" }],
      amount: b.totalAmount,
      status: "Confirmed" as const,
    })),
    ...SAMPLE_E_TICKETS,
  ];

  const filteredTickets = allTickets.filter((t) =>
    searchQuery
      ? t.pnr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.fromCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.toCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.operatorName.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  const handleTicketGenerated = (newTicket: ETicket) => {
    setCustomTickets((prev) => [newTicket, ...prev]);
  };

  return (
    <div className="min-h-screen bg-background text-foreground px-4 sm:px-6 md:px-8 py-6 max-w-[1600px] mx-auto">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Dashboard Sidebar */}
        <DashboardSidebar
          activeTab={activeTab}
          onSelectTab={(tab) => setActiveTab(tab)}
          onTicketGenerated={handleTicketGenerated}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col gap-6 min-w-0">
          {/* Header */}
          <DashboardHeader onSearchQuery={(q) => setSearchQuery(q)} />

          {/* Quick Booking Search Widget */}
          <QuickBookingWidget />

          {/* Main Grid: Active Tickets (8 cols) + Side Widgets (4 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Active E-Tickets Section (8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl font-display font-bold text-text-primary flex items-center gap-2">
                    <span>Your Active Bookings</span>
                    <HugeiconsIcon icon={Ticket01Icon} className="w-5 h-5 text-orange-400" />
                  </h2>
                  <p className="text-xs text-text-tertiary">
                    Showing confirmed transport and hotel bookings
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-surface border border-text-tertiary/10 text-xs font-bold text-orange-400">
                  {filteredTickets.length} Bookings
                </span>
              </div>

              {/* Tickets List */}
              <div className="space-y-4">
                {filteredTickets.length === 0 ? (
                  <div className="p-8 rounded-3xl bg-surface border border-text-tertiary/10 text-center text-text-tertiary">
                    No active tickets found. <Link href="/book" className="text-orange-400 font-bold hover:underline">Book a ticket now</Link>
                  </div>
                ) : (
                  filteredTickets.map((t) => (
                    <ActiveETicketCard key={t.id} ticket={t} />
                  ))
                )}
              </div>
            </div>

            {/* Right Side Widgets: Saved Passengers + Rewards (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <RewardsWalletWidget />
              <SavedPassengersWidget />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
