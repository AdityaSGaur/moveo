"use client";

import { useTheme } from "@/providers/ThemeProvider";
import { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-8 h-8 rounded-full bg-surface animate-pulse" />;
  }

  const toggleTheme = (event: React.MouseEvent) => {
    const isDark = theme === "dark";
    const nextTheme = isDark ? "light" : "dark";

    // Fallback if View Transitions API is not supported
    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      setTheme(nextTheme);
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      document.documentElement.animate(
        {
          clipPath: isDark ? clipPath.reverse() : clipPath,
        },
        {
          duration: 600,
          easing: "ease-in-out",
          pseudoElement: isDark ? "::view-transition-old(root)" : "::view-transition-new(root)",
        }
      );
    });
  };

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-surface-elevated transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <MdLightMode className="text-xl text-text-secondary hover:text-text-primary transition-colors" />
      ) : (
        <MdDarkMode className="text-xl text-text-secondary hover:text-text-primary transition-colors" />
      )}
    </button>
  );
};
