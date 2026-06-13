"use client";

import React from 'react';
import { useAppSelector } from '@/store/store';
import Link from 'next/link';

export default function ProfilePage() {
  const booking = useAppSelector(s => s.booking.bookingHistory);
  const user = useAppSelector(s => s.auth.user);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      <div className="mb-6">Welcome, <strong>{user?.name || 'Guest'}</strong></div>

      <h2 className="text-xl font-bold mb-3">Your Bookings</h2>
      {booking.length === 0 ? (
        <div className="text-text-tertiary">You have no bookings yet. <Link href="/">Search now</Link></div>
      ) : (
        <div className="space-y-4">
          {booking.map(b => (
            <div key={b.id} className="p-4 bg-surface rounded-lg border border-white/5">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-bold">{b.type.toUpperCase()} — {b.status}</div>
                  <div className="text-xs text-text-tertiary">{new Date(b.createdAt).toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">₹{b.totalAmount.toLocaleString('en-IN')}</div>
                </div>
              </div>
              {b.busBooking && b.busBooking.passengers && (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-text-tertiary">
                      <th className="text-left">Name</th>
                      <th>Age</th>
                      <th>Gender</th>
                      <th>Email</th>
                      <th>Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {b.busBooking.passengers.map((p:any, i:number) => (
                      <tr key={i} className="border-t border-white/5">
                        <td className="py-2">{p.name || '-'}</td>
                        <td className="text-center">{p.age || '-'}</td>
                        <td className="text-center">{p.gender || '-'}</td>
                        <td className="text-center">{p.email || '-'}</td>
                        <td className="text-center">{p.phone || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
