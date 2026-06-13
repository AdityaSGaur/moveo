"use client";

import React, { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Cancel01Icon, Airplane01Icon, Bus01Icon as BusIcon, Train01Icon as TrainIcon, UserMultipleIcon } from '@hugeicons/core-free-icons';

import { Passenger } from '@/types';

interface BookingModalProps {
  item: any;
  type: "flight" | "bus" | "train";
  onClose: () => void;
}

export const BookingModal = ({ item, type, onClose }: BookingModalProps) => {
  const [step, setStep] = useState(1);
  const [passengers, setPassengers] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [showPassengerDetails, setShowPassengerDetails] = useState(false);
  const [passengerDetails, setPassengerDetails] = useState<Passenger[]>(() => [{ name: '', age: 30, gender: 'male' } as Passenger]);
  const [selectedClass, setSelectedClass] = useState(item.type || (item.classes && item.classes[0]?.name) || "Standard");

  // Prevent click from propagating to background
  const handleContentClick = (e: React.MouseEvent) => e.stopPropagation();

  const getBasePrice = () => {
    if (type === "train" && item.classes) {
      const cls = item.classes.find((c: any) => c.name === selectedClass);
      return cls ? cls.price : item.classes[0].price;
    }
    return item.price || 2500;
  };
  const totalPassengers = adults + children + infants || 1;
  const adultPrice = getBasePrice();
  const childPrice = Math.max(0, Math.round(getBasePrice() * 0.75));
  const infantPrice = Math.max(0, Math.round(getBasePrice() * 0.1));
  const taxesPerPassenger = 350;
  const subtotalFare = adults * adultPrice + children * childPrice + infants * infantPrice;
  const totalTaxes = taxesPerPassenger * totalPassengers;
  const grandTotal = subtotalFare + totalTaxes;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8" onClick={onClose}>
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />
      <div 
        className="relative w-full max-w-2xl bg-surface-elevated rounded-3xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-300"
        onClick={handleContentClick}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-surface/50">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-accent-primary/20 text-accent-primary border border-accent-primary/20">
              <HugeiconsIcon icon={type === "flight" ? Airplane01Icon : type === "bus" ? BusIcon : TrainIcon} size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold font-display">Booking Options</h2>
              <p className="text-xs text-text-tertiary mt-0.5 font-medium uppercase tracking-widest">
                {type === "flight" ? item.airline : type === "bus" ? item.operator : item.name} • {item.flightNo || item.busNumber || item.number}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-text-secondary hover:text-text-primary transition-colors">
            <HugeiconsIcon icon={Cancel01Icon} size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6">
          {/* Route Summary */}
          <div className="flex items-center justify-between bg-surface p-5 rounded-2xl border border-white/5 shadow-inner">
            <div className="text-left w-1/3">
              <div className="text-xl md:text-2xl font-bold font-mono text-text-primary">{item.departure}</div>
              <div className="text-xs text-text-tertiary mt-1 font-medium">{item.fromCode || item.from}</div>
            </div>
            <div className="flex-1 px-4 flex flex-col items-center">
              <span className="text-[10px] font-bold text-text-tertiary tracking-widest uppercase mb-2">{item.duration}</span>
              <div className="w-full flex items-center gap-2">
                <div className="h-px flex-1 bg-linear-to-r from-transparent via-white/20 to-transparent" />
                <div className="w-1.5 h-1.5 rounded-full bg-accent-primary ring-4 ring-accent-primary/20" />
                <div className="h-px flex-1 bg-linear-to-r from-transparent via-white/20 to-transparent" />
              </div>
            </div>
            <div className="text-right w-1/3">
              <div className="text-xl md:text-2xl font-bold font-mono text-text-primary">{item.arrival}</div>
              <div className="text-xs text-text-tertiary mt-1 font-medium">{item.toCode || item.to}</div>
            </div>
          </div>

          {/* Configuration Options */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Class/Type Selection */}
              <div>
                <h3 className="text-sm font-bold mb-3 uppercase tracking-widest text-text-tertiary flex items-center gap-2">
                  Select Class
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {(type === "train" ? item.classes.map((c: any) => c.name) : type === "bus" ? [item.type, "VIP Sleeper"] : ["Economy", "Premium", "Business"]).map((cls: string) => (
                    <button 
                      key={cls}
                      onClick={() => setSelectedClass(cls)}
                      className={`p-3.5 rounded-2xl border text-sm font-bold transition-all text-center ${selectedClass === cls ? "border-accent-primary bg-accent-primary text-background shadow-lg shadow-accent-primary/20 scale-[1.02]" : "border-white/10 hover:border-white/30 text-text-secondary hover:text-text-primary hover:bg-surface-elevated"}`}
                    >
                      {cls}
                    </button>
                  ))}
                </div>
              </div>

              {/* Passengers */}
              <div>
                <h3 className="text-sm font-bold mb-3 uppercase tracking-widest text-text-tertiary flex items-center gap-2">
                  <HugeiconsIcon icon={UserMultipleIcon} size={16} /> Passengers
                </h3>
                <div className="flex items-center justify-between p-5 bg-surface rounded-2xl border border-white/5">
                  <div>
                    <div className="font-bold text-base text-text-primary">Number of Travellers</div>
                    <div className="text-xs text-text-tertiary mt-1">Adults, Children, Infants</div>
                  </div>
                  <div className="flex items-center gap-3 bg-background p-1.5 rounded-full border border-text-tertiary/10 shadow-inner">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-10 h-10 rounded-full bg-surface-elevated flex items-center justify-center hover:bg-white/10 text-text-primary font-bold text-xl">-</button>
                      <span className="text-base font-bold w-6 text-center text-text-primary">{adults}</span>
                      <button onClick={() => setAdults(adults + 1)} className="w-10 h-10 rounded-full bg-surface-elevated flex items-center justify-center hover:bg-white/10 text-text-primary font-bold text-xl">+</button>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setChildren(Math.max(0, children - 1))} className="w-10 h-10 rounded-full bg-surface-elevated flex items-center justify-center hover:bg-white/10 text-text-primary font-bold text-xl">-</button>
                      <span className="text-base font-bold w-6 text-center text-text-primary">{children}</span>
                      <button onClick={() => setChildren(children + 1)} className="w-10 h-10 rounded-full bg-surface-elevated flex items-center justify-center hover:bg-white/10 text-text-primary font-bold text-xl">+</button>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setInfants(Math.max(0, infants - 1))} className="w-10 h-10 rounded-full bg-surface-elevated flex items-center justify-center hover:bg-white/10 text-text-primary font-bold text-xl">-</button>
                      <span className="text-base font-bold w-6 text-center text-text-primary">{infants}</span>
                      <button onClick={() => setInfants(infants + 1)} className="w-10 h-10 rounded-full bg-surface-elevated flex items-center justify-center hover:bg-white/10 text-text-primary font-bold text-xl">+</button>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <button onClick={() => {
                      setShowPassengerDetails(!showPassengerDetails);
                      const total = adults + children + infants || 1;
                      setPassengerDetails(prev => {
                        const next = prev.slice(0, total);
                        while (next.length < total) next.push({ name: '', age: 0, gender: 'male' } as Passenger);
                        return next;
                      });
                    }}
                    className="text-sm font-bold text-accent-primary hover:underline">
                    {showPassengerDetails ? 'Hide' : 'Edit'} passenger details
                  </button>
                  <div className="text-xs text-text-tertiary">Total: <span className="font-bold">{adults+children+infants}</span></div>
                </div>

                {showPassengerDetails && (
                  <div className="mt-4 space-y-3">
                    {passengerDetails.map((p, idx) => (
                      <div key={idx} className="p-3 bg-surface rounded-lg border border-white/5 flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <div className="font-bold">Passenger {idx+1}</div>
                          <div className="text-xs text-text-tertiary">Type: {idx < adults ? 'Adult' : (idx < adults + children ? 'Child' : 'Infant')}</div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          <input value={p.name} onChange={e => setPassengerDetails(prev => { const copy = [...prev]; copy[idx] = { ...copy[idx], name: e.target.value }; return copy; })} placeholder="Full name" className="p-2 rounded-lg bg-background border border-white/5 text-sm" />
                          <input type="number" value={p.age} onChange={e => setPassengerDetails(prev => { const copy = [...prev]; copy[idx] = { ...copy[idx], age: Number(e.target.value) }; return copy; })} placeholder="Age" className="p-2 rounded-lg bg-background border border-white/5 text-sm" />
                          <select value={p.gender} onChange={e => setPassengerDetails(prev => { const copy = [...prev]; copy[idx] = { ...copy[idx], gender: e.target.value as any }; return copy; })} className="p-2 rounded-lg bg-background border border-white/5 text-sm">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-5 animate-in slide-in-from-bottom-4 duration-500">
               <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-2 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
                 <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                   <path d="M20 6L9 17l-5-5"/>
                 </svg>
               </div>
               <h3 className="text-3xl font-bold font-display text-text-primary">Seats Reserved!</h3>
               <p className="text-text-secondary text-sm max-w-sm leading-relaxed">
                 We've successfully held <span className="font-bold text-text-primary">{totalPassengers} seat{totalPassengers>1?'s':''}</span> in <span className="font-bold text-text-primary">{selectedClass}</span> class for 10 minutes. Proceed to payment to confirm your booking.
               </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/5 bg-surface/80 backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left w-full md:w-auto">
            <div className="text-xs font-bold text-text-tertiary tracking-widest uppercase mb-1">Fare Summary ({totalPassengers} Pax)</div>
            <div className="text-sm text-text-secondary mb-2">
              <div className="flex items-center justify-between"><span>Adults ({adults} x)</span><span>₹{adultPrice.toLocaleString('en-IN')} each</span></div>
              <div className="flex items-center justify-between"><span>Children ({children} x)</span><span>₹{childPrice.toLocaleString('en-IN')} each</span></div>
              <div className="flex items-center justify-between"><span>Infants ({infants} x)</span><span>₹{infantPrice.toLocaleString('en-IN')} each</span></div>
              <div className="flex items-center justify-between mt-2 text-sm"><span>Taxes & Fees</span><span>₹{totalTaxes.toLocaleString('en-IN')}</span></div>
            </div>
            <div className="text-3xl font-bold font-display text-text-primary">₹{grandTotal.toLocaleString('en-IN')}</div>
          </div>
          {step === 1 ? (
            <button 
              onClick={() => setStep(2)}
              className="w-full md:w-auto px-10 py-4 bg-accent-primary hover:bg-accent-secondary text-background font-bold text-sm rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-accent-primary/20"
            >
              Confirm Selection
            </button>
          ) : (
            <button 
              onClick={onClose}
              className="w-full md:w-auto px-10 py-4 bg-text-primary hover:opacity-90 text-background font-bold text-sm rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-text-primary/20 flex items-center justify-center gap-2"
            >
              Proceed to Payment
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
