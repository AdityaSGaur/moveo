"use client";

import React, { useState, useRef, useEffect } from "react";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: "underline" | "pill" | "enclosed";
  className?: string;
  fullWidth?: boolean;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = "underline",
  className = "",
  fullWidth = false,
}) => {
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);
    const activeElement = tabsRef.current[activeIndex];

    if (activeElement) {
      setIndicatorStyle({
        left: activeElement.offsetLeft,
        width: activeElement.offsetWidth,
      });
    }
  }, [activeTab, tabs]);

  const getContainerStyles = () => {
    switch (variant) {
      case "enclosed":
        return "bg-surface p-1 rounded-xl border border-text-tertiary/10";
      case "pill":
        return "gap-2";
      case "underline":
      default:
        return "border-b border-text-tertiary/10";
    }
  };

  const getTabStyles = (isActive: boolean) => {
    const base = "relative z-10 flex items-center justify-center font-medium transition-colors duration-300 focus:outline-none";
    const widthStyle = fullWidth ? "flex-1" : "px-6";
    
    switch (variant) {
      case "enclosed":
        return `${base} ${widthStyle} py-2.5 rounded-lg text-sm ${
          isActive ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
        }`;
      case "pill":
        return `${base} ${widthStyle} py-2 rounded-full text-sm ${
          isActive ? "text-text-primary" : "text-text-secondary hover:text-text-primary hover:bg-surface-elevated"
        }`;
      case "underline":
      default:
        return `${base} ${widthStyle} py-4 text-base ${
          isActive ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
        }`;
    }
  };

  const renderIndicator = () => {
    switch (variant) {
      case "enclosed":
        return (
          <div
            className="absolute top-1 bottom-1 bg-surface-elevated rounded-lg shadow-sm transition-all duration-300 ease-out border border-text-tertiary/10"
            style={indicatorStyle}
          />
        );
      case "pill":
        return (
          <div
            className="absolute top-0 bottom-0 bg-surface-elevated rounded-full transition-all duration-300 ease-out border border-text-tertiary/10"
            style={indicatorStyle}
          />
        );
      case "underline":
      default:
        return (
          <div
            className="absolute bottom-[-1px] h-0.5 bg-text-primary transition-all duration-300 ease-out"
            style={indicatorStyle}
          />
        );
    }
  };

  return (
    <div className={`relative flex items-center ${getContainerStyles()} ${className}`}>
      {renderIndicator()}
      {tabs.map((tab, index) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            ref={(el) => {
              tabsRef.current[index] = el;
            }}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={getTabStyles(isActive)}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};
