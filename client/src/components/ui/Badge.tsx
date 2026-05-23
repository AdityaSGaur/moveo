import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "success"
    | "warning"
    | "error"
    | "info"
    | "movie"
    | "bus"
    | "train";
  size?: "sm" | "md";
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  size = "md",
  dot = false,
  className = "",
  ...props
}) => {
  const variants = {
    default: "bg-surface-elevated text-text-secondary border border-white/10",
    success: "bg-success/10 text-success border border-success/20",
    warning: "bg-warning/10 text-warning border border-warning/20",
    error: "bg-error/10 text-error border border-error/20",
    info: "bg-info/10 text-info border border-info/20",
    movie: "bg-module-movie/10 text-module-movie border border-module-movie/20",
    bus: "bg-module-bus/10 text-module-bus border border-module-bus/20",
    train: "bg-module-train/10 text-module-train border border-module-train/20",
  };

  const dotColors = {
    default: "bg-text-secondary",
    success: "bg-success",
    warning: "bg-warning",
    error: "bg-error",
    info: "bg-info",
    movie: "bg-module-movie",
    bus: "bg-module-bus",
    train: "bg-module-train",
  };

  const sizes = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-1",
  };

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-medium ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {dot && (
        <span
          className={`mr-1.5 h-1.5 w-1.5 rounded-full ${dotColors[variant]}`}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
};
