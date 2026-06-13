"use client";

import React, { useState, useEffect, useRef } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ArrowLeft01Icon, 
  Airplane01Icon, 
  Bus01Icon as BusIcon, 
  Train01Icon as TrainIcon, 
  UserMultipleIcon,
  CheckmarkBadge01Icon,
  InformationCircleIcon,
  StarIcon
} from '@hugeicons/core-free-icons';
import { Passenger } from '@/types';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { addToHistory } from '@/store/slices/bookingSlice';
import { useRouter } from 'next/navigation';

function Stars({ rating, size=12 }: { rating:number;size?:number }) {
  return (
    <div className="flex items-center gap-1">
      <HugeiconsIcon icon={StarIcon} size={size} className="text-yellow-400 fill-yellow-400" />
      <span className="text-[11px] font-bold text-text-primary">{rating.toFixed(1)}</span>
    </div>
  );
}

interface BookingDetailsViewProps {
  item: any;
  type: "flight" | "bus" | "train";
  onBack: () => void;
  recommendedOptions: any[];
  onSelectRecommended: (item: any) => void;
  CardComponent: React.FC<{ [key: string]: any, onBook: (item: any) => void }>;
}

export const BookingDetailsView = ({ 
  item, 
  type, 
  onBack, 
  recommendedOptions,
  onSelectRecommended,
  CardComponent
}: BookingDetailsViewProps) => {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  // selected class/state used by pricing logic
  const [selectedClass, setSelectedClass] = useState(item.type || (item.classes && item.classes[0]?.name) || "Standard");

  // base price resolver (kept as const to avoid accidental hoisting issues)
  const getBasePrice = () => {
    if (type === "train" && item.classes) {
      const cls = item.classes.find((c: any) => c.name === selectedClass);
      return cls ? cls.price : item.classes[0].price;
    }
    return item.price || 2500;
  };

  // Derived fare calculations should come after state and helper definitions
  const totalPassengers = adults + children + infants || 1;
  const adultPrice = getBasePrice();
  const childPrice = Math.max(0, Math.round(adultPrice * 0.75));
  const infantPrice = Math.max(0, Math.round(adultPrice * 0.1));
  const taxesPerPassenger = 350;
  const fareBreakdown = {
    adults: { count: adults, unit: adultPrice, subtotal: adults * adultPrice },
    children: { count: children, unit: childPrice, subtotal: children * childPrice },
    infants: { count: infants, unit: infantPrice, subtotal: infants * infantPrice },
  };
  const subtotalFare = fareBreakdown.adults.subtotal + fareBreakdown.children.subtotal + fareBreakdown.infants.subtotal;
  // Fees: GST percentage and platform fee percentage
  const gstPercent = 5; // percent GST
  const platformFeePercent = 2; // platform convenience fee percent
  const gstAmount = Math.round((subtotalFare * gstPercent) / 100);
  const platformFee = Math.round((subtotalFare * platformFeePercent) / 100);
  const totalTaxes = gstAmount + platformFee + taxesPerPassenger * totalPassengers;
  const grandTotal = subtotalFare + totalTaxes;

  // Coupons (sample) — in real app fetch from API
  const availableCoupons = [
    { code: 'MOVE10', discountPercent: 10, title: '10% off up to ₹500' },
    { code: 'FLAT250', discountAmount: 250, title: 'Flat ₹250 off' }
  ];
  const [appliedCoupon, setAppliedCoupon] = useState<any | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [animated, setAnimated] = useState(false);
  const totalRef = useRef<HTMLSpanElement | null>(null);

  const auth = useAppSelector(s => s.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (animated) {
      const id = setTimeout(() => setAnimated(false), 700);
      return () => clearTimeout(id);
    }
  }, [animated]);
  const [showPassengerDetails, setShowPassengerDetails] = useState(false);
  const [passengerDetails, setPassengerDetails] = useState<Passenger[]>(() => {
    return Array.from({ length: 1 }).map(() => ({ name: '', age: 30, gender: 'male' } as Passenger));
  });

  const Icon = type === "flight" ? Airplane01Icon : type === "bus" ? BusIcon : TrainIcon;

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-500">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-bold text-text-secondary hover:text-text-primary mb-6 transition-colors group"
      >
        <div className="p-1.5 rounded-full bg-surface group-hover:bg-surface-elevated transition-colors border border-white/5">
          <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
        </div>
        Back to Search Results
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column: Details */}
        <div className="flex-1 space-y-8">
          
          {/* Main Item Header */}
          <div className="bg-surface-elevated rounded-[2rem] p-6 md:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <HugeiconsIcon icon={Icon} size={120} />
            </div>
            
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="p-4 rounded-2xl bg-accent-primary/10 text-accent-primary border border-accent-primary/20">
                <HugeiconsIcon icon={Icon} size={28} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold font-display text-text-primary">
                  {type === "flight" ? item.airline : type === "bus" ? item.operator : item.name}
                </h1>
                <div className="flex items-center gap-3 mt-1.5 text-sm font-bold tracking-widest uppercase text-text-tertiary">
                  <span>{item.flightNo || item.busNumber || item.number}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-text-tertiary/30" />
                  <Stars rating={item.rating || 4.5} />
                </div>
              </div>
            </div>

            {/* Route Timeline */}
            <div className="flex items-center justify-between bg-background/50 p-6 rounded-2xl border border-white/5 relative z-10">
              <div className="text-left w-1/3">
                <div className="text-3xl md:text-4xl font-bold font-mono text-text-primary">{item.departure}</div>
                <div className="text-sm text-text-secondary mt-1 font-bold">{item.fromCode || item.from}</div>
              </div>
              
              <div className="flex-1 px-4 flex flex-col items-center">
                <span className="text-xs font-bold text-text-tertiary tracking-widest uppercase mb-3">{item.duration}</span>
                <div className="w-full flex items-center gap-2">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-accent-primary/50 to-accent-primary" />
                  <div className="w-2.5 h-2.5 rounded-full bg-accent-primary ring-4 ring-accent-primary/20" />
                  <div className="h-px flex-1 bg-gradient-to-r from-accent-primary via-accent-primary/50 to-transparent" />
                </div>
                <span className="text-[10px] font-bold text-text-tertiary uppercase mt-2">
                  {item.stops || (type === "bus" ? "Direct" : "Non-stop")}
                </span>
              </div>

              <div className="text-right w-1/3">
                <div className="text-3xl md:text-4xl font-bold font-mono text-text-primary">{item.arrival}</div>
                <div className="text-sm text-text-secondary mt-1 font-bold">{item.toCode || item.to}</div>
              </div>
            </div>

            {/* Amenities */}
            {item.amenities && (
              <div className="mt-8 relative z-10">
                <h3 className="text-xs font-bold uppercase tracking-widest text-text-tertiary mb-3">Included Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {item.amenities.map((amenity: string) => (
                    <div key={amenity} className="flex items-center gap-1.5 px-3 py-1.5 bg-surface rounded-xl border border-white/5 text-xs font-bold text-text-secondary">
                      <HugeiconsIcon icon={CheckmarkBadge01Icon} size={14} className="text-green-500" />
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Policies & Info */}
          <div className="bg-surface rounded-[2rem] p-6 md:p-8 border border-white/5 shadow-inner">
            <h3 className="text-lg font-bold font-display mb-4 flex items-center gap-2">
              <HugeiconsIcon icon={InformationCircleIcon} size={20} className="text-accent-primary" />
              Travel Policies
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-bold text-text-primary mb-2">Cancellation</h4>
                <p className="text-xs text-text-secondary leading-relaxed">Free cancellation up to 24 hours before departure. A nominal fee applies for later cancellations.</p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-text-primary mb-2">Baggage Allowance</h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {type === "flight" ? "15kg check-in baggage and 7kg cabin baggage included per passenger." : "Standard baggage rules apply. Up to 2 pieces of luggage per passenger."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Configuration & Checkout */}
        <div className="lg:w-[400px] shrink-0">
          <div className="bg-surface-elevated rounded-[2rem] p-6 border border-white/10 shadow-2xl sticky top-32">
            <h3 className="text-lg font-bold font-display mb-6">Booking Options</h3>
            
            <div className="space-y-6">
              {/* Class Selection */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-text-tertiary mb-3 block">Select Class</label>
                <div className="grid grid-cols-2 gap-2">
                  {(type === "train" ? item.classes.map((c: any) => c.name) : type === "bus" ? [item.type, "VIP Sleeper"] : ["Economy", "Premium", "Business"]).map((cls: string) => (
                    <button 
                      key={cls}
                      onClick={() => setSelectedClass(cls)}
                      className={`p-3 rounded-xl border text-sm font-bold transition-all text-center ${selectedClass === cls ? "border-accent-primary bg-accent-primary text-background shadow-lg shadow-accent-primary/20" : "border-white/10 hover:border-white/30 text-text-secondary hover:text-text-primary hover:bg-surface"}`}
                    >
                      {cls}
                    </button>
                  ))}
                </div>
              </div>

              {/* Passengers */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-text-tertiary mb-3 block">Travellers</label>
                <div className="flex items-center justify-between p-4 bg-background rounded-2xl border border-white/5">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-text-primary font-bold">
                      <HugeiconsIcon icon={UserMultipleIcon} size={18} />
                      Passengers
                    </div>
                    <div className="text-xs text-text-tertiary">Adults, Children, Infants</div>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap justify-end">
                    <div className="flex items-center gap-2 min-w-[68px]">
                      <button onClick={() => { setAdults(Math.max(1, adults - 1)); }} className="w-8 h-8 rounded-full bg-surface-elevated flex items-center justify-center hover:bg-white/10 text-text-primary font-bold">-</button>
                      <span className="text-base font-bold w-6 text-center text-text-primary">{adults}</span>
                      <button onClick={() => { setAdults(adults + 1); }} className="w-8 h-8 rounded-full bg-surface-elevated flex items-center justify-center hover:bg-white/10 text-text-primary font-bold">+</button>
                    </div>
                    <div className="flex items-center gap-2 min-w-[68px]">
                      <button onClick={() => setChildren(Math.max(0, children - 1))} className="w-8 h-8 rounded-full bg-surface-elevated flex items-center justify-center hover:bg-white/10 text-text-primary font-bold">-</button>
                      <span className="text-base font-bold w-6 text-center text-text-primary">{children}</span>
                      <button onClick={() => setChildren(children + 1)} className="w-8 h-8 rounded-full bg-surface-elevated flex items-center justify-center hover:bg-white/10 text-text-primary font-bold">+</button>
                    </div>
                    <div className="flex items-center gap-2 min-w-[68px]">
                      <button onClick={() => setInfants(Math.max(0, infants - 1))} className="w-8 h-8 rounded-full bg-surface-elevated flex items-center justify-center hover:bg-white/10 text-text-primary font-bold">-</button>
                      <span className="text-base font-bold w-6 text-center text-text-primary">{infants}</span>
                      <button onClick={() => setInfants(infants + 1)} className="w-8 h-8 rounded-full bg-surface-elevated flex items-center justify-center hover:bg-white/10 text-text-primary font-bold">+</button>
                    </div>
                  </div>
                </div>
              {/* Edit passenger details toggle */}
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
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                          <input value={p.phone || ''} onChange={e => setPassengerDetails(prev => { const copy = [...prev]; copy[idx] = { ...copy[idx], phone: e.target.value }; return copy; })} placeholder="Mobile number" className="p-2 rounded-lg bg-background border border-white/5 text-sm" />
                          <input value={p.email || ''} onChange={e => setPassengerDetails(prev => { const copy = [...prev]; copy[idx] = { ...copy[idx], email: e.target.value }; return copy; })} placeholder="Email" className="p-2 rounded-lg bg-background border border-white/5 text-sm" />
                          <input value={p.aadhar || ''} onChange={e => setPassengerDetails(prev => { const copy = [...prev]; copy[idx] = { ...copy[idx], aadhar: e.target.value }; return copy; })} placeholder="Aadhar / ID number" className="p-2 rounded-lg bg-background border border-white/5 text-sm" />
                        </div>
                    </div>
                  ))}
                </div>
              )}
              </div>

              <hr className="border-white/10" />

              {/* Price Summary */}
              <div>
                <div className="flex flex-col gap-2 text-sm text-text-secondary mb-2">
                  <div className="flex items-center justify-between">
                    <span>Adults ({fareBreakdown.adults.count} x)</span>
                    <span className="font-bold">₹{fareBreakdown.adults.unit.toLocaleString('en-IN')} each — ₹{fareBreakdown.adults.subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Children ({fareBreakdown.children.count} x)</span>
                    <span className="font-bold">₹{fareBreakdown.children.unit.toLocaleString('en-IN')} each — ₹{fareBreakdown.children.subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Infants ({fareBreakdown.infants.count} x)</span>
                    <span className="font-bold">₹{fareBreakdown.infants.unit.toLocaleString('en-IN')} each — ₹{fareBreakdown.infants.subtotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-text-secondary mb-2">
                  <div className="flex items-center justify-between"><span>GST ({gstPercent}%)</span><span className="font-bold">₹{gstAmount.toLocaleString('en-IN')}</span></div>
                  <div className="flex items-center justify-between"><span>Platform Fee ({platformFeePercent}%)</span><span className="font-bold">₹{platformFee.toLocaleString('en-IN')}</span></div>
                  <div className="flex items-center justify-between"><span>Other taxes (fixed)</span><span className="font-bold">₹{(taxesPerPassenger * totalPassengers).toLocaleString('en-IN')}</span></div>
                </div>

                {/* Coupons */}
                <div className="mt-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-text-tertiary mb-2 block">Apply Coupon</label>
                  <div className="flex gap-2">
                    <input value={couponCode} onChange={e => setCouponCode(e.target.value.toUpperCase())} placeholder="Enter coupon code" className="flex-1 p-2 rounded-lg bg-background border border-white/5 text-sm" />
                    <button onClick={() => {
                      const found = availableCoupons.find(c => c.code === couponCode.trim().toUpperCase());
                      if (found) {
                        setAppliedCoupon(found);
                        setAnimated(true);
                      } else {
                        // try to clear
                        setAppliedCoupon(null);
                      }
                    }} className="px-4 py-2 bg-accent-primary text-background font-bold rounded-lg">Apply</button>
                  </div>
                  <div className="mt-2 text-xs text-text-tertiary">Available: {availableCoupons.map(c=>c.code).join(', ')}</div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm font-bold uppercase tracking-widest text-text-tertiary">Total</span>
                  <span ref={totalRef} className={`text-3xl font-bold font-display text-text-primary ${animated ? 'price-anim' : ''}`}>
                    ₹{(
                      (() => {
                        let total = grandTotal;
                        if (appliedCoupon) {
                          if (appliedCoupon.discountPercent) {
                            total = Math.round(total * (1 - appliedCoupon.discountPercent / 100));
                          } else if (appliedCoupon.discountAmount) {
                            total = Math.max(0, total - appliedCoupon.discountAmount);
                          }
                        }
                        return total.toLocaleString('en-IN');
                      })()
                    )}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  // Require auth and verified email
                  if (!auth.isAuthenticated) {
                    // redirect to login
                    router.push('/login');
                    return;
                  }
                  if (!auth.user?.emailVerified) {
                    alert('Please verify your account email before proceeding to payment.');
                    router.push('/login');
                    return;
                  }

                  // Validate passenger emails (simple check)
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  for (const p of passengerDetails) {
                    if (!p.email || !emailRegex.test(p.email)) {
                      alert('Please enter a valid, verified email for each passenger before checkout.');
                      return;
                    }
                  }

                  // Build booking object and save to history (simulate pending booking)
                  const booking = {
                    id: 'bk_' + Date.now(),
                    userId: auth.user?.id || 'guest',
                    type,
                    status: 'pending',
                    totalAmount: ((): number => {
                      let total = grandTotal;
                      if (appliedCoupon) {
                        if (appliedCoupon.discountPercent) total = Math.round(total * (1 - appliedCoupon.discountPercent / 100));
                        else if (appliedCoupon.discountAmount) total = Math.max(0, total - appliedCoupon.discountAmount);
                      }
                      return total;
                    })(),
                    discount: appliedCoupon ? (appliedCoupon.discountPercent ?? appliedCoupon.discountAmount ?? 0) : 0,
                    convenienceFee: platformFee,
                    gst: gstAmount,
                    paymentMethod: undefined,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    flightBooking: type === 'flight' ? { flightId: item.id, flightNumber: item.flightNo || '', airlineName: item.airline || '', airlineLogo: item.logo || '', source: item.from || '', destination: item.to || '', departureTime: item.departure, arrivalTime: item.arrival, seats: [] } : undefined,
                    busBooking: type === 'bus' ? { busId: item.id, operatorName: item.operator || '', busType: item.type || '', source: item.from || '', destination: item.to || '', departureTime: item.departure, arrivalTime: item.arrival, boardingPoint: '', droppingPoint: '', seats: [], passengers: passengerDetails } : undefined,
                    trainBooking: type === 'train' ? { trainNumber: item.number || '', trainName: item.name || '', source: item.from || '', destination: item.to || '', departureTime: item.departure, arrivalTime: item.arrival, travelClass: selectedClass, pnr: '', passengers: passengerDetails, berthPreferences: [] } : undefined,
                  } as any;

                  dispatch(addToHistory(booking));
                  router.push('/profile');
                }}
                className="w-full py-4 bg-accent-primary hover:bg-accent-secondary text-background font-bold rounded-2xl transition-all hover:-translate-y-1 shadow-xl shadow-accent-primary/20 flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                   <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Options */}
      {recommendedOptions && recommendedOptions.length > 0 && (
        <div className="mt-16 mb-8 pt-12 border-t border-white/10">
          <h2 className="text-2xl font-bold font-display mb-6">Recommended Alternative Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedOptions.map(rec => {
              const props = type === "flight" ? { flight: rec } : type === "bus" ? { bus: rec } : { train: rec };
              return (
                <CardComponent 
                  key={rec.id} 
                  {...props} 
                  onBook={(r: any) => {
                    onSelectRecommended(r);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} 
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
