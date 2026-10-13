"use client";

import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Airplane01Icon,
  Bus01Icon,
  Hotel01Icon,
  Ticket01Icon,
  Download01Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons";

export interface ETicket {
  id: string;
  pnr: string;
  type: "flight" | "bus" | "hotel";
  operatorName: string;
  serviceName: string;
  fromCity: string;
  fromCode?: string;
  toCity: string;
  toCode?: string;
  departureTime: string;
  arrivalTime: string;
  date: string;
  seats: string[];
  passengers: { name: string; age: number; gender: string }[];
  amount: number;
  status: "Confirmed" | "Boarding Soon" | "In Transit" | "Completed";
}

interface ActiveETicketCardProps {
  ticket: ETicket;
}

export const ActiveETicketCard: React.FC<ActiveETicketCardProps> = ({ ticket }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const renderTransportIcon = (className = "w-5 h-5 text-orange-400") => {
    if (ticket.type === "flight") return <HugeiconsIcon icon={Airplane01Icon} className={className} />;
    if (ticket.type === "bus") return <HugeiconsIcon icon={Bus01Icon} className={className} />;
    return <HugeiconsIcon icon={Hotel01Icon} className={className} />;
  };

  const getStatusStyle = () => {
    if (ticket.status === "Boarding Soon") return "bg-amber-500/15 text-amber-400 border-amber-500/30";
    if (ticket.status === "In Transit") return "bg-blue-500/15 text-blue-400 border-blue-500/30";
    if (ticket.status === "Completed") return "bg-gray-500/15 text-gray-400 border-gray-500/30";
    return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
  };

  return (
    <>
      <div className="bg-surface border border-text-tertiary/10 rounded-3xl p-5 shadow-lg relative overflow-hidden group hover:border-orange-500/30 transition-all duration-300">
        {/* Top Ticket Header */}
        <div className="flex items-center justify-between border-b border-text-tertiary/10 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-2xl bg-surface-elevated border border-white/5">
              {renderTransportIcon()}
            </span>
            <div>
              <div className="font-bold text-xs text-text-primary uppercase tracking-wider">
                {ticket.operatorName}
              </div>
              <div className="text-[10px] text-text-tertiary font-mono">PNR: {ticket.pnr}</div>
            </div>
          </div>

          <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${getStatusStyle()}`}>
            {ticket.status}
          </span>
        </div>

        {ticket.type === "hotel" ? (
          <div className="my-4 flex items-center justify-between gap-4 rounded-2xl bg-background/50 p-4">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary">Hotel stay</div>
              <div className="mt-1 font-display font-bold text-text-primary">{ticket.operatorName}</div>
              <div className="text-xs text-text-secondary">{ticket.fromCity}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary">Check in · out</div>
              <div className="mt-1 text-xs font-semibold text-text-primary">{ticket.departureTime} – {ticket.arrivalTime}</div>
              <div className="text-xs text-text-secondary">{ticket.date}</div>
            </div>
          </div>
        ) : (
        /* Departure to Destination Flow */
        <div className="my-4 flex items-center justify-between gap-2">
          {/* Origin */}
          <div>
            <div className="font-display font-extrabold text-lg sm:text-xl text-text-primary">
              {ticket.fromCode || ticket.fromCity.substring(0, 3).toUpperCase()}
            </div>
            <div className="text-xs font-semibold text-text-secondary">{ticket.fromCity}</div>
            <div className="text-[10px] text-text-tertiary font-mono mt-0.5">{ticket.departureTime}</div>
          </div>

          {/* Dotted Route Line */}
          <div className="flex-1 flex flex-col items-center px-2">
            <div className="text-[10px] text-orange-400 font-bold uppercase tracking-wider mb-1">
              {ticket.date}
            </div>
            <div className="w-full h-px bg-dashed border-b border-dashed border-text-tertiary/30 relative">
              <span className="absolute left-1/2 -translate-x-1/2 -top-2 bg-surface px-1">
                {renderTransportIcon("w-3.5 h-3.5 text-orange-400")}
              </span>
            </div>
            <div className="text-[9px] text-text-tertiary font-mono mt-1">Direct</div>
          </div>

          {/* Destination */}
          <div className="text-right">
            <div className="font-display font-extrabold text-lg sm:text-xl text-text-primary">
              {ticket.toCode || ticket.toCity.substring(0, 3).toUpperCase()}
            </div>
            <div className="text-xs font-semibold text-text-secondary">{ticket.toCity}</div>
            <div className="text-[10px] text-text-tertiary font-mono mt-0.5">{ticket.arrivalTime}</div>
          </div>
        </div>
        )}

        {/* Footer info & E-Ticket Button */}
        <div className="pt-3 border-t border-text-tertiary/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <span className="text-[9px] text-text-tertiary uppercase font-bold block">{ticket.type === "hotel" ? "Room" : "Seats"}</span>
              <span className="font-mono text-xs font-bold text-text-primary">
                {ticket.type === "hotel" ? ticket.serviceName : ticket.seats.join(", ")}
              </span>
            </div>
            <div className="h-6 w-px bg-text-tertiary/10" />
            <div>
              <span className="text-[9px] text-text-tertiary uppercase font-bold block">Total Paid</span>
              <span className="font-mono text-xs font-bold text-emerald-400">
                ₹{ticket.amount.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3.5 py-1.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 transition-all active:scale-95 flex items-center gap-1.5"
          >
            <HugeiconsIcon icon={Ticket01Icon} className="w-3.5 h-3.5" />
            <span>{ticket.type === "hotel" ? "View Booking" : "View E-Ticket"}</span>
          </button>
        </div>
      </div>

      {/* Printable / Viewable E-Ticket Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative max-w-md w-full bg-surface border border-white/10 rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-text-tertiary/10">
              <div className="flex items-center gap-2">
                {renderTransportIcon("w-6 h-6 text-orange-400")}
                <div>
                  <h3 className="font-display font-bold text-lg text-text-primary">{ticket.type === "hotel" ? "Stay Confirmation" : "Official E-Ticket"}</h3>
                  <p className="text-xs text-text-tertiary">Moveo Verified Booking</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-surface-elevated flex items-center justify-center text-text-primary text-sm font-bold"
              >
                <HugeiconsIcon icon={Cancel01Icon} className="w-4 h-4" />
              </button>
            </div>

            {/* Ticket Card Body */}
            <div className="p-4 rounded-2xl bg-surface-elevated border border-white/10 space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-text-tertiary">{ticket.type === "hotel" ? "Confirmation Ref:" : "Booking Ref (PNR):"}</span>
                <span className="font-mono font-bold text-orange-400">{ticket.pnr}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-text-tertiary">Operator / Service:</span>
                <span className="font-semibold text-text-primary">{ticket.operatorName} ({ticket.serviceName})</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-text-tertiary">{ticket.type === "hotel" ? "Stay & Dates:" : "Route & Date:"}</span>
                <span className="font-semibold text-text-primary">{ticket.type === "hotel" ? `${ticket.operatorName}, ${ticket.fromCity} (${ticket.departureTime} – ${ticket.arrivalTime})` : `${ticket.fromCity} ➔ ${ticket.toCity} (${ticket.date})`}</span>
              </div>

              {/* Passengers */}
              <div className="pt-3 border-t border-text-tertiary/10">
                <span className="text-[10px] text-text-tertiary font-bold uppercase tracking-wider block mb-2">
                  {ticket.type === "hotel" ? "Guests" : "Passengers"} ({ticket.passengers.length})
                </span>
                <div className="space-y-1.5">
                  {ticket.passengers.map((p, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs p-2 rounded-xl bg-background/50">
                      <span className="font-bold text-text-primary">{p.name}</span>
                      <span className="text-text-tertiary font-mono">{p.gender}, {p.age} yrs{ticket.type === "hotel" ? "" : ` (Seat ${ticket.seats[idx] || "Unassigned"})`}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Simulated Barcode */}
              <div className="pt-4 border-t border-text-tertiary/10 flex flex-col items-center gap-2 text-center">
                <div className="w-48 h-12 bg-white rounded-lg p-2 flex items-center justify-around">
                  <svg className="w-full h-full text-black" viewBox="0 0 200 40">
                    <rect x="0" y="0" width="4" height="40" fill="black"/>
                    <rect x="6" y="0" width="2" height="40" fill="black"/>
                    <rect x="12" y="0" width="8" height="40" fill="black"/>
                    <rect x="24" y="0" width="3" height="40" fill="black"/>
                    <rect x="30" y="0" width="6" height="40" fill="black"/>
                    <rect x="40" y="0" width="2" height="40" fill="black"/>
                    <rect x="46" y="0" width="10" height="40" fill="black"/>
                    <rect x="60" y="0" width="4" height="40" fill="black"/>
                    <rect x="68" y="0" width="2" height="40" fill="black"/>
                    <rect x="74" y="0" width="8" height="40" fill="black"/>
                    <rect x="86" y="0" width="4" height="40" fill="black"/>
                    <rect x="94" y="0" width="6" height="40" fill="black"/>
                    <rect x="104" y="0" width="2" height="40" fill="black"/>
                    <rect x="110" y="0" width="12" height="40" fill="black"/>
                    <rect x="126" y="0" width="4" height="40" fill="black"/>
                    <rect x="134" y="0" width="6" height="40" fill="black"/>
                    <rect x="144" y="0" width="3" height="40" fill="black"/>
                    <rect x="150" y="0" width="8" height="40" fill="black"/>
                    <rect x="162" y="0" width="4" height="40" fill="black"/>
                    <rect x="170" y="0" width="6" height="40" fill="black"/>
                    <rect x="180" y="0" width="10" height="40" fill="black"/>
                  </svg>
                </div>
                <span className="text-[10px] font-mono text-text-tertiary">{ticket.type === "hotel" ? "Show this confirmation at check-in" : "Scan barcode at terminal gate"}</span>
              </div>
            </div>

            <button
              onClick={() => alert(ticket.type === "hotel" ? "Booking confirmation PDF download triggered!" : "E-Ticket PDF Download triggered!")}
              className="w-full mt-4 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2"
            >
              <HugeiconsIcon icon={Download01Icon} className="w-4 h-4" />
              <span>{ticket.type === "hotel" ? "Download Confirmation" : "Download PDF Ticket"}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
