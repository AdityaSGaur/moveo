"use client";

import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "elevated" | "outline";
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant = "default",
      padding = "md",
      hover = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const variants = {
      default: "bg-surface border border-white/5",
      glass: "glass",
      elevated: "bg-surface-elevated shadow-lg border border-white/5",
      outline: "bg-transparent border-2 border-white/10",
    };

    const paddings = {
      none: "p-0",
      sm: "p-3",
      md: "p-6",
      lg: "p-8",
    };

    const hoverEffect = hover
      ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-white/10 cursor-pointer"
      : "";

    const classes = [
      "rounded-2xl overflow-hidden",
      variants[variant],
      paddings[padding],
      hoverEffect,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
