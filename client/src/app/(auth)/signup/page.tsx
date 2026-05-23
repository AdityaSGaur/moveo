"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center px-4 relative overflow-hidden py-12">
      {/* Abstract Background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-accent-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="mb-8 md:mb-10 text-center">
          <Link href="/" className="inline-block mb-6 md:mb-8">
            <span className="font-display font-bold text-3xl md:text-4xl tracking-tighter uppercase text-text-primary">MOVEO</span>
          </Link>
          <h1 className="text-xl md:text-2xl font-medium text-text-primary tracking-tight">Create an account</h1>
          <p className="text-text-secondary mt-2 text-xs md:text-sm">Join us and start booking your journeys today.</p>
        </div>

        <form className="space-y-5 md:space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] md:text-xs font-medium text-text-secondary uppercase tracking-widest">Full Name</label>
            <input 
              type="text" 
              placeholder="Enter your name" 
              className="w-full bg-surface-elevated border border-text-tertiary/20 rounded-xl px-4 py-3 text-sm md:text-base text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-text-primary transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] md:text-xs font-medium text-text-secondary uppercase tracking-widest">Email</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full bg-surface-elevated border border-text-tertiary/20 rounded-xl px-4 py-3 text-sm md:text-base text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-text-primary transition-colors"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] md:text-xs font-medium text-text-secondary uppercase tracking-widest">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Create a strong password" 
                className="w-full bg-surface-elevated border border-text-tertiary/20 rounded-xl px-4 py-3 pr-12 text-sm md:text-base text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-text-primary transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary transition-colors text-xs font-medium uppercase tracking-widest"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <Button fullWidth className="py-4 mt-8">
            Sign Up
          </Button>

          <div className="relative flex items-center py-4">
            <div className="flex-grow border-t border-text-tertiary/20"></div>
            <span className="flex-shrink-0 mx-4 text-text-tertiary text-xs uppercase tracking-widest font-mono">Or</span>
            <div className="flex-grow border-t border-text-tertiary/20"></div>
          </div>

          <button 
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-surface-elevated border border-text-tertiary/20 rounded-xl px-4 py-4 text-text-primary hover:bg-surface transition-colors duration-300 shadow-lg"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span className="font-medium text-sm">Continue with Google</span>
          </button>
        </form>

        <p className="text-center text-sm text-text-secondary mt-8">
          Already have an account? <Link href="/login" className="text-text-primary hover:underline font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
