"use client";

import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Ticket01Icon,
  Airplane01Icon,
  Bus01Icon,
  Train01Icon,
  Download01Icon,
  Cancel01Icon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";
import { ETicket } from "./ActiveETicketCard";

interface ETicketGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTicketGenerated: (ticket: ETicket) => void;
}

export const ETicketGeneratorModal: React.FC<ETicketGeneratorModalProps> = ({
  isOpen,
  onClose,
  onTicketGenerated,
}) => {
  const [type, setType] = useState<"flight" | "bus" | "train">("flight");
  const [operatorName, setOperatorName] = useState("Air India");
  const [serviceName, setServiceName] = useState("AI-102 Superfast");
  const [fromCity, setFromCity] = useState("Mumbai");
  const [fromCode, setFromCode] = useState("BOM");
  const [toCity, setToCity] = useState("Delhi");
  const [toCode, setToCode] = useState("DEL");
  const [departureTime, setDepartureTime] = useState("10:00 AM");
  const [arrivalTime, setArrivalTime] = useState("12:15 PM");
  const [date, setDate] = useState("2026-09-15");
  const [seats, setSeats] = useState("14A, 14B");
  const [passengerName, setPassengerName] = useState("Aditya Gaur");
  const [passengerAge, setPassengerAge] = useState(26);
  const [passengerGender, setPassengerGender] = useState("Male");
  const [amount, setAmount] = useState(4500);

  const [generatedTicket, setGeneratedTicket] = useState<ETicket | null>(null);

  if (!isOpen) return null;

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();

    const randomPnr = `MOVE-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const newTicket: ETicket = {
      id: `gen_${Date.now()}`,
      pnr: randomPnr,
      type,
      operatorName: operatorName.trim() || "Moveo Express",
      serviceName: serviceName.trim() || "Special Transport",
      fromCity: fromCity.trim(),
      fromCode: fromCode.trim() || fromCity.substring(0, 3).toUpperCase(),
      toCity: toCity.trim(),
      toCode: toCode.trim() || toCity.substring(0, 3).toUpperCase(),
      departureTime,
      arrivalTime,
      date,
      seats: seats.split(",").map((s) => s.trim()),
      passengers: [
        {
          name: passengerName.trim() || "Passenger 1",
          age: Number(passengerAge) || 25,
          gender: passengerGender,
        },
      ],
      amount: Number(amount) || 2500,
      status: "Confirmed",
    };

    setGeneratedTicket(newTicket);
    onTicketGenerated(newTicket);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full bg-surface border border-white/10 rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-300 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-text-tertiary/10">
          <div className="flex items-center gap-2">
            <HugeiconsIcon icon={Ticket01Icon} className="w-6 h-6 text-orange-400" />
            <div>
              <h2 className="text-lg font-bold font-display text-text-primary">E-Ticket Generator</h2>
              <p className="text-xs text-text-tertiary">Generate instant official PDF e-tickets</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-elevated flex items-center justify-center text-text-primary text-sm font-bold"
          >
            <HugeiconsIcon icon={Cancel01Icon} className="w-4 h-4" />
          </button>
        </div>

        {generatedTicket ? (
          /* Success Generated Preview */
          <div className="space-y-4">
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-emerald-400 text-xs font-semibold">
              <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-4 h-4" />
              <span>E-Ticket Generated Successfully! PNR: {generatedTicket.pnr}</span>
            </div>

            {/* Ticket Card Preview */}
            <div className="p-4 rounded-2xl bg-surface-elevated border border-white/10 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-text-tertiary">Transport:</span>
                <span className="font-bold text-orange-400 uppercase">{generatedTicket.type} ({generatedTicket.operatorName})</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-text-tertiary">Route:</span>
                <span className="font-semibold text-text-primary">{generatedTicket.fromCity} ➔ {generatedTicket.toCity}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-text-tertiary">Date & Time:</span>
                <span className="font-semibold text-text-primary">{generatedTicket.date} ({generatedTicket.departureTime} - {generatedTicket.arrivalTime})</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-text-tertiary">Passenger:</span>
                <span className="font-semibold text-text-primary">{generatedTicket.passengers[0].name} (Seat: {generatedTicket.seats.join(", ")})</span>
              </div>

              {/* Barcode SVG */}
              <div className="pt-3 border-t border-text-tertiary/10 flex flex-col items-center gap-2">
                <div className="w-48 h-10 bg-white rounded p-1.5 flex items-center justify-center">
                  <svg className="w-full h-full text-black" viewBox="0 0 200 40">
                    <rect x="0" y="0" width="4" height="40" fill="black"/>
                    <rect x="8" y="0" width="4" height="40" fill="black"/>
                    <rect x="16" y="0" width="8" height="40" fill="black"/>
                    <rect x="28" y="0" width="3" height="40" fill="black"/>
                    <rect x="36" y="0" width="6" height="40" fill="black"/>
                    <rect x="48" y="0" width="10" height="40" fill="black"/>
                    <rect x="64" y="0" width="4" height="40" fill="black"/>
                    <rect x="72" y="0" width="8" height="40" fill="black"/>
                    <rect x="84" y="0" width="6" height="40" fill="black"/>
                    <rect x="94" y="0" width="12" height="40" fill="black"/>
                    <rect x="110" y="0" width="4" height="40" fill="black"/>
                    <rect x="120" y="0" width="6" height="40" fill="black"/>
                    <rect x="130" y="0" width="8" height="40" fill="black"/>
                    <rect x="144" y="0" width="4" height="40" fill="black"/>
                    <rect x="154" y="0" width="10" height="40" fill="black"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setGeneratedTicket(null)}
                className="w-1/2 py-3 rounded-2xl bg-surface-elevated border border-text-tertiary/20 text-text-primary text-xs font-bold"
              >
                Create Another
              </button>
              <button
                onClick={() => {
                  alert("E-Ticket PDF downloaded!");
                  onClose();
                }}
                className="w-1/2 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-lg flex items-center justify-center gap-1.5"
              >
                <HugeiconsIcon icon={Download01Icon} className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        ) : (
          /* Generator Form */
          <form onSubmit={handleGenerate} className="space-y-3">
            {/* Transport Type Picker */}
            <div>
              <label className="text-[10px] font-bold text-text-tertiary uppercase block mb-1">
                Select Transport Mode
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => { setType("flight"); setOperatorName("Air India"); }}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    type === "flight"
                      ? "bg-orange-500/15 border-orange-500 text-orange-400"
                      : "bg-surface-elevated border-text-tertiary/20 text-text-secondary"
                  }`}
                >
                  <HugeiconsIcon icon={Airplane01Icon} className="w-4 h-4" />
                  <span>Flight</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setType("bus"); setOperatorName("Zingbus Express"); }}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    type === "bus"
                      ? "bg-orange-500/15 border-orange-500 text-orange-400"
                      : "bg-surface-elevated border-text-tertiary/20 text-text-secondary"
                  }`}
                >
                  <HugeiconsIcon icon={Bus01Icon} className="w-4 h-4" />
                  <span>Bus</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setType("train"); setOperatorName("Shatabdi Express"); }}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    type === "train"
                      ? "bg-orange-500/15 border-orange-500 text-orange-400"
                      : "bg-surface-elevated border-text-tertiary/20 text-text-secondary"
                  }`}
                >
                  <HugeiconsIcon icon={Train01Icon} className="w-4 h-4" />
                  <span>Train</span>
                </button>
              </div>
            </div>

            {/* Operator & Service */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-bold text-text-tertiary uppercase block mb-1">
                  Operator Name
                </label>
                <input
                  type="text"
                  required
                  value={operatorName}
                  onChange={(e) => setOperatorName(e.target.value)}
                  className="w-full bg-surface-elevated border border-text-tertiary/20 rounded-xl px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-text-tertiary uppercase block mb-1">
                  Service / Train No.
                </label>
                <input
                  type="text"
                  required
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  className="w-full bg-surface-elevated border border-text-tertiary/20 rounded-xl px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* From & To */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-bold text-text-tertiary uppercase block mb-1">
                  From City
                </label>
                <input
                  type="text"
                  required
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  className="w-full bg-surface-elevated border border-text-tertiary/20 rounded-xl px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-text-tertiary uppercase block mb-1">
                  To Destination
                </label>
                <input
                  type="text"
                  required
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  className="w-full bg-surface-elevated border border-text-tertiary/20 rounded-xl px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Date & Times */}
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[10px] font-bold text-text-tertiary uppercase block mb-1">
                  Travel Date
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-surface-elevated border border-text-tertiary/20 rounded-xl px-2 py-2 text-xs text-text-primary focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-text-tertiary uppercase block mb-1">
                  Departure Time
                </label>
                <input
                  type="text"
                  required
                  value={departureTime}
                  onChange={(e) => setDepartureTime(e.target.value)}
                  className="w-full bg-surface-elevated border border-text-tertiary/20 rounded-xl px-2 py-2 text-xs text-text-primary focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-text-tertiary uppercase block mb-1">
                  Arrival Time
                </label>
                <input
                  type="text"
                  required
                  value={arrivalTime}
                  onChange={(e) => setArrivalTime(e.target.value)}
                  className="w-full bg-surface-elevated border border-text-tertiary/20 rounded-xl px-2 py-2 text-xs text-text-primary focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Passenger details */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-bold text-text-tertiary uppercase block mb-1">
                  Passenger Name
                </label>
                <input
                  type="text"
                  required
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                  className="w-full bg-surface-elevated border border-text-tertiary/20 rounded-xl px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-text-tertiary uppercase block mb-1">
                  Seats Allocated
                </label>
                <input
                  type="text"
                  required
                  value={seats}
                  onChange={(e) => setSeats(e.target.value)}
                  placeholder="e.g. 12A, 12B"
                  className="w-full bg-surface-elevated border border-text-tertiary/20 rounded-xl px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2"
            >
              <HugeiconsIcon icon={Ticket01Icon} className="w-4 h-4" />
              <span>Generate E-Ticket Pass</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
