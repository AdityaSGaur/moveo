"use client";

import React, { useState } from "react";

export interface PassengerProfile {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  phone: string;
  email: string;
  idProof?: string;
}

const DEFAULT_PASSENGERS: PassengerProfile[] = [
  {
    id: "p1",
    name: "Aditya Gaur",
    age: 26,
    gender: "Male",
    phone: "+91 9876543210",
    email: "aditya@example.com",
    idProof: "Aadhaar Verified",
  },
  {
    id: "p2",
    name: "Priya Sharma",
    age: 24,
    gender: "Female",
    phone: "+91 9812345678",
    email: "priya@example.com",
    idProof: "Passport Verified",
  },
];

export const SavedPassengersWidget: React.FC = () => {
  const [passengers, setPassengers] = useState<PassengerProfile[]>(DEFAULT_PASSENGERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState<number>(25);
  const [gender, setGender] = useState<"Male" | "Female" | "Other">("Male");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleAddPassenger = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newP: PassengerProfile = {
      id: `p_${Date.now()}`,
      name: name.trim(),
      age: Number(age) || 25,
      gender,
      phone: phone.trim() || "+91 9900000000",
      email: email.trim() || "user@example.com",
      idProof: "ID Added",
    };

    setPassengers((prev) => [...prev, newP]);
    setName("");
    setIsModalOpen(false);
  };

  return (
    <div className="bg-surface border border-text-tertiary/10 rounded-3xl p-5 shadow-lg flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-display font-bold text-base text-text-primary">
            Saved Passengers ({passengers.length})
          </h3>
          <p className="text-xs text-text-tertiary">Quick 1-click booking details</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-3 py-1.5 rounded-full bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 font-bold text-xs border border-orange-500/20 transition-all"
        >
          + Add
        </button>
      </div>

      {/* Passenger Cards */}
      <div className="space-y-2.5 my-2">
        {passengers.map((p) => (
          <div
            key={p.id}
            className="p-3 rounded-2xl bg-surface-elevated border border-white/5 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-accent-primary to-purple-500 flex items-center justify-center text-white font-bold text-xs shadow-md">
                {p.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="font-bold text-xs text-text-primary">{p.name}</div>
                <div className="text-[10px] text-text-tertiary">
                  {p.gender}, {p.age} yrs • {p.phone}
                </div>
              </div>
            </div>

            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[9px] font-bold border border-emerald-500/20">
              {p.idProof || "Saved"}
            </span>
          </div>
        ))}
      </div>

      {/* Add Passenger Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative max-w-sm w-full bg-surface border border-white/10 rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-text-tertiary/10">
              <h3 className="font-display font-bold text-lg text-text-primary">Add Saved Passenger</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-7 h-7 rounded-full bg-surface-elevated flex items-center justify-center text-text-primary text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddPassenger} className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-text-tertiary uppercase block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aditi Sharma"
                  className="w-full bg-surface-elevated border border-text-tertiary/20 rounded-xl px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-text-tertiary uppercase block mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    required
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full bg-surface-elevated border border-text-tertiary/20 rounded-xl px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-text-tertiary uppercase block mb-1">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full bg-surface-elevated border border-text-tertiary/20 rounded-xl px-2 py-2 text-xs text-text-primary focus:outline-none focus:border-orange-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-text-tertiary uppercase block mb-1">
                  Mobile Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 9876543210"
                  className="w-full bg-surface-elevated border border-text-tertiary/20 rounded-xl px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-text-tertiary uppercase block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="w-full bg-surface-elevated border border-text-tertiary/20 rounded-xl px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-3 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/25"
              >
                Save Traveler Profile
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
