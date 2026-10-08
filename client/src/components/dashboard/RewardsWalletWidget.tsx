"use client";

import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Wallet01Icon,
  Coins01Icon,
  Ticket01Icon,
  Copy01Icon,
} from "@hugeicons/core-free-icons";

export const RewardsWalletWidget: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const PROMO_CODES = [
    { code: "MOVEO500", discount: "Flat ₹500 OFF", minSpend: "Min spend ₹1,500" },
    { code: "SUPERFLY", discount: "15% OFF Flights", minSpend: "No min spend" },
  ];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-surface to-surface-elevated border border-text-tertiary/10 rounded-3xl p-5 shadow-lg flex flex-col justify-between">
      {/* Wallet Balance Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary flex items-center gap-1.5">
            <HugeiconsIcon icon={Wallet01Icon} className="w-3.5 h-3.5 text-orange-400" />
            <span>Moveo Rewards & Wallet</span>
          </span>
          <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 text-[10px] font-bold border border-amber-500/30">
            Silver Tier Member
          </span>
        </div>

        <div className="flex items-baseline justify-between mt-1">
          <div>
            <div className="text-2xl font-display font-extrabold text-emerald-400">
              ₹1,250
            </div>
            <div className="text-[11px] text-text-tertiary font-medium">Available Moveo Cash</div>
          </div>
          <div className="text-right">
            <div className="text-lg font-mono font-bold text-amber-400 flex items-center justify-end gap-1">
              <HugeiconsIcon icon={Coins01Icon} className="w-4 h-4 text-amber-400" />
              <span>1,200 Coins</span>
            </div>
            <div className="text-[10px] text-text-tertiary">100 Coins = ₹10</div>
          </div>
        </div>
      </div>

      {/* Available Coupon Codes */}
      <div className="mt-4 pt-3 border-t border-text-tertiary/10">
        <span className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary block mb-2 flex items-center gap-1.5">
          <HugeiconsIcon icon={Ticket01Icon} className="w-3.5 h-3.5 text-orange-400" />
          <span>Exclusive Discounts & Promos</span>
        </span>
        <div className="space-y-2">
          {PROMO_CODES.map((promo) => (
            <div
              key={promo.code}
              className="p-2.5 rounded-2xl bg-surface border border-dashed border-orange-500/30 flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-extrabold text-xs text-orange-400">
                    {promo.code}
                  </span>
                  <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded">
                    {promo.discount}
                  </span>
                </div>
                <div className="text-[9px] text-text-tertiary">{promo.minSpend}</div>
              </div>

              <button
                onClick={() => handleCopy(promo.code)}
                className="px-2.5 py-1 rounded-xl bg-orange-500/15 hover:bg-orange-500/30 text-orange-400 font-bold text-[10px] transition-colors flex items-center gap-1"
              >
                <HugeiconsIcon icon={Copy01Icon} className="w-3 h-3" />
                <span>{copiedCode === promo.code ? "Copied! ✓" : "Copy Code"}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
