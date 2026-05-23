"use client";

import React from "react";
const Cancel01Icon = (props: any) => <span style={{fontSize: props.size}}>✕</span>;

interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  selected?: boolean;
  icon?: React.ReactNode;
  onRemove?: () => void;
  variant?: "default" | "filter";
}

export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  (
    {
      label,
      selected = false,
      icon,
      onRemove,
      variant = "default",
      className = "",
      onClick,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-background";
    
    const sizeStyles = "px-4 py-1.5 h-8";

    const getVariantStyles = () => {
      if (variant === "filter") {
        return selected
          ? "bg-accent-primary text-white border border-transparent"
          : "bg-surface-elevated text-text-secondary border border-white/10 hover:bg-white/10 hover:text-text-primary";
      }
      
      // Default variant
      return "bg-surface-elevated text-text-primary border border-white/10";
    };

    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        className={`${baseStyles} ${sizeStyles} ${getVariantStyles()} ${
          onClick ? "cursor-pointer" : "cursor-default"
        } ${className}`}
        aria-pressed={selected}
        {...props}
      >
        {icon && <span className="mr-1.5 -ml-1 flex items-center">{icon}</span>}
        <span>{label}</span>
        {onRemove && (
          <span
            role="button"
            tabIndex={0}
            className="ml-1.5 -mr-1.5 rounded-full p-0.5 hover:bg-black/20 focus:outline-none focus:ring-2 focus:ring-accent-primary"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                onRemove();
              }
            }}
            aria-label={`Remove ${label}`}
          >
            <Cancel01Icon size={14} />
          </span>
        )}
      </button>
    );
  }
);

Chip.displayName = "Chip";
