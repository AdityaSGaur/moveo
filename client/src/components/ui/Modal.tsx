"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
const Cancel01Icon = (props: any) => <span style={{fontSize: props.size}}>✕</span>;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  showClose?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  showClose = true,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  const sizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-full h-full rounded-none m-0",
  };

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Panel */}
      <div
        className={`glass relative flex w-full flex-col rounded-2xl shadow-2xl transition-all ${sizes[size]} animate-in zoom-in-95 duration-200`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
      >
        {(title || showClose) && (
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            {title && (
              <h2 id="modal-title" className="text-xl font-semibold">
                {title}
              </h2>
            )}
            {showClose && (
              <button
                type="button"
                onClick={onClose}
                className="ml-auto rounded-full p-2 text-text-tertiary transition-colors hover:bg-white/10 hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
              >
                <Cancel01Icon size={20} />
              </button>
            )}
          </div>
        )}
        <div className="p-6 overflow-y-auto max-h-[calc(100vh-10rem)]">
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
