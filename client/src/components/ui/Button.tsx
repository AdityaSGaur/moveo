"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      icon,
      fullWidth = false,
      loading = false,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";

    const variants = {
      primary: "bg-text-primary text-background hover:opacity-90",
      secondary: "bg-surface-elevated text-text-primary hover:bg-surface border border-text-tertiary/20",
      outline: "bg-transparent border border-text-primary text-text-primary hover:bg-text-primary hover:text-background",
      ghost: "bg-transparent text-text-primary hover:bg-surface",
      danger: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
    };

    const sizes = {
      sm: "text-sm px-4 py-2 rounded-lg",
      md: "text-base px-6 py-3 rounded-xl",
      lg: "text-lg px-8 py-4 rounded-2xl",
    };

    const classes = [
      baseStyles,
      variants[variant],
      sizes[size],
      fullWidth ? "w-full" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button ref={ref} disabled={disabled || loading} className={classes} {...props}>
        {loading ? (
          <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : icon ? (
          <span className="mr-2">{icon}</span>
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
