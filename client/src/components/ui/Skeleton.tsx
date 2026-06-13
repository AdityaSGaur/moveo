import React from "react";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular" | "card";
  width?: string | number;
  height?: string | number;
  count?: number; // Only applies to 'text' variant
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = "text",
  width,
  height,
  count = 1,
  className = "",
  ...props
}) => {
  const baseClasses = "animate-[shimmer_2s_linear_infinite] bg-[length:400%_100%] bg-linear-to-r from-surface via-surface-elevated to-surface";

  const getVariantClasses = () => {
    switch (variant) {
      case "circular":
        return "rounded-full";
      case "rectangular":
        return "rounded-lg";
      case "card":
        return "rounded-2xl";
      case "text":
      default:
        return "rounded-md";
    }
  };

  const getDefaultDimensions = () => {
    switch (variant) {
      case "circular":
        return { w: width || "40px", h: height || "40px" };
      case "card":
        return { w: width || "100%", h: height || "200px" };
      case "text":
        return { w: width || "100%", h: height || "1rem" };
      case "rectangular":
      default:
        return { w: width || "100%", h: height || "100px" };
    }
  };

  const { w, h } = getDefaultDimensions();

  // If text variant and count > 1, render multiple skeletons
  if (variant === "text" && count > 1) {
    return (
      <div className="flex flex-col gap-2 w-full">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={`${baseClasses} ${getVariantClasses()} ${className}`}
            style={{
              width: i === count - 1 ? "80%" : w, // Make last line slightly shorter
              height: h,
            }}
            {...props}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${baseClasses} ${getVariantClasses()} ${className}`}
      style={{ width: w, height: h }}
      {...props}
    />
  );
};
