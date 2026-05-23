"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, helperText, className = "", id, ...props }, ref) => {
    const inputId = id || React.useId();

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-text-secondary pl-1"
          >
            {label} {props.required && <span className="text-error">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-4 text-text-tertiary">{icon}</div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`
              w-full bg-[#1A1A2E] text-text-primary placeholder:text-text-tertiary
              border border-white/5 rounded-xl px-4 py-3
              transition-all duration-300 ease-out
              focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary
              disabled:opacity-50 disabled:cursor-not-allowed
              ${icon ? "pl-11" : ""}
              ${error ? "border-error focus:border-error focus:ring-error" : ""}
              ${className}
            `}
            {...props}
          />
        </div>
        {(error || helperText) && (
          <p
            className={`text-sm pl-1 ${
              error ? "text-error" : "text-text-tertiary"
            }`}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
