"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AlertCircleIcon,
  CheckmarkCircle02Icon,
  ViewIcon,
  ViewOffIcon,
  Mail01Icon,
  LockPasswordIcon,
  Loading03Icon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/Button";
import { useAppDispatch } from "@/store/store";
import { setUser } from "@/store/slices/authSlice";

type FieldName = "email" | "password";

interface FormState {
  email: string;
  password: string;
}

interface ValidationErrors {
  email?: string;
  password?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormState>({ email: "", password: "" });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});
  const [validating, setValidating] = useState<{ email?: boolean; password?: boolean }>({});
  const [corrected, setCorrected] = useState<{ email?: boolean; password?: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // References for field debounce timers (500ms delay after typing pauses)
  const debounceTimers = useRef<{ [key in FieldName]?: NodeJS.Timeout }>({});

  useEffect(() => {
    return () => {
      // Clear timers on component unmount
      Object.values(debounceTimers.current).forEach((timer) => {
        if (timer) clearTimeout(timer);
      });
    };
  }, []);

  // Validation Rules
  const validateField = (name: FieldName, value: string): string => {
    if (name === "email") {
      const trimmed = value.trim();
      if (!trimmed) return "Email address is required";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmed)) return "Please enter a valid email address (e.g. user@example.com)";
      return "";
    }

    if (name === "password") {
      if (!value) return "Password is required";
      if (value.length < 6) return "Password must be at least 6 characters long";
      return "";
    }

    return "";
  };

  const handleInputChange = (fieldName: FieldName, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));

    // Mark field as touched
    if (!touched[fieldName]) {
      setTouched((prev) => ({ ...prev, [fieldName]: true }));
    }

    // Check if an error is currently displayed for this field
    const hasCurrentError = Boolean(errors[fieldName]);

    if (hasCurrentError) {
      // INSTANT ERROR CORRECTION:
      // Test the newly typed value immediately against validation rules.
      const immediateErr = validateField(fieldName, value);

      if (!immediateErr) {
        // If the new value is valid, IMMEDIATELY clear the error without waiting!
        if (debounceTimers.current[fieldName]) {
          clearTimeout(debounceTimers.current[fieldName]);
        }
        setErrors((prev) => ({ ...prev, [fieldName]: undefined }));
        setValidating((prev) => ({ ...prev, [fieldName]: false }));

        // Trigger brief visual feedback indicator for instant correction
        setCorrected((prev) => ({ ...prev, [fieldName]: true }));
        setTimeout(() => {
          setCorrected((prev) => ({ ...prev, [fieldName]: false }));
        }, 1800);
        return;
      }
    }

    // DEBOUNCED LIVE VALIDATION (When no error is displayed or input is still invalid):
    // Wait ~500ms after user stops typing before displaying an error message
    setValidating((prev) => ({ ...prev, [fieldName]: true }));

    if (debounceTimers.current[fieldName]) {
      clearTimeout(debounceTimers.current[fieldName]);
    }

    debounceTimers.current[fieldName] = setTimeout(() => {
      const err = validateField(fieldName, value);
      setErrors((prev) => ({ ...prev, [fieldName]: err || undefined }));
      setValidating((prev) => ({ ...prev, [fieldName]: false }));
    }, 500);
  };

  const handleBlur = (fieldName: FieldName) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));

    // Clear debounce timer and validate immediately on blur
    if (debounceTimers.current[fieldName]) {
      clearTimeout(debounceTimers.current[fieldName]);
    }

    const err = validateField(fieldName, formData[fieldName]);
    setErrors((prev) => ({ ...prev, [fieldName]: err || undefined }));
    setValidating((prev) => ({ ...prev, [fieldName]: false }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Clear any pending debounce timers
    Object.values(debounceTimers.current).forEach((timer) => {
      if (timer) clearTimeout(timer);
    });

    // Mark all as touched
    setTouched({ email: true, password: true });

    // Validate both fields immediately
    const emailErr = validateField("email", formData.email);
    const passwordErr = validateField("password", formData.password);

    const newErrors: ValidationErrors = {};
    if (emailErr) newErrors.email = emailErr;
    if (passwordErr) newErrors.password = passwordErr;

    setErrors(newErrors);
    setValidating({ email: false, password: false });

    if (emailErr || passwordErr) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      // Extract nice display name from email
      const rawName = formData.email.split("@")[0] || "User";
      const formattedName = rawName.charAt(0).toUpperCase() + rawName.slice(1);

      dispatch(
        setUser({
          id: `usr_${Date.now().toString(36)}`,
          name: formattedName,
          email: formData.email.trim(),
          membershipTier: "silver",
          createdAt: new Date().toISOString(),
        })
      );

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 800);
    }, 1000);
  };

  // Field status styling logic
  const getFieldInputStyle = (fieldName: FieldName) => {
    const isTouched = touched[fieldName];
    const hasError = isTouched && errors[fieldName];
    const isValid = isTouched && !errors[fieldName] && !validating[fieldName] && formData[fieldName].trim().length > 0;

    if (hasError) {
      return "bg-red-500/5 border-red-500/80 text-text-primary focus:border-red-500 focus:ring-2 focus:ring-red-500/20";
    }
    if (isValid) {
      return "bg-emerald-500/5 border-emerald-500/60 text-text-primary focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20";
    }
    return "bg-surface-elevated border-text-tertiary/20 text-text-primary focus:border-text-primary";
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center px-4 relative overflow-hidden py-12">
      {/* Abstract Background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-accent-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="mb-8 md:mb-10 text-center">
          <Link href="/" className="inline-block mb-6 md:mb-8">
            <span className="font-display font-bold text-3xl md:text-4xl tracking-tighter uppercase text-text-primary">MOVEO</span>
          </Link>
          <h1 className="text-xl md:text-2xl font-medium text-text-primary tracking-tight">Welcome back</h1>
          <p className="text-text-secondary mt-2 text-xs md:text-sm">Please enter your details to sign in.</p>
        </div>

        {submitSuccess && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-400 text-sm animate-in fade-in slide-in-from-top-2 duration-300">
            <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-5 h-5 flex-shrink-0" />
            <span>Signed in successfully! Redirecting...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6" noValidate>
          {/* EMAIL FIELD */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[10px] md:text-xs font-medium text-text-secondary uppercase tracking-widest flex items-center gap-1.5">
                <HugeiconsIcon icon={Mail01Icon} className="w-3.5 h-3.5 text-text-tertiary" />
                Email
              </label>

              {/* Status Indicator */}
              <div className="text-[11px] font-medium transition-all duration-300">
                {validating.email && (
                  <span className="text-text-tertiary flex items-center gap-1">
                    <HugeiconsIcon icon={Loading03Icon} className="w-3 h-3 animate-spin text-accent-primary" />
                    Checking...
                  </span>
                )}
                {corrected.email && (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1 animate-pulse">
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-3.5 h-3.5" />
                    Error corrected!
                  </span>
                )}
              </div>
            </div>

            <div className="relative">
              <input
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                placeholder="Enter your email"
                className={`w-full rounded-xl px-4 py-3 text-sm md:text-base placeholder:text-text-tertiary focus:outline-none transition-all duration-200 ${getFieldInputStyle(
                  "email"
                )}`}
              />

              {/* Icon Status Indicator inside input */}
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                {touched.email && !validating.email && (
                  errors.email ? (
                    <HugeiconsIcon icon={AlertCircleIcon} className="w-5 h-5 text-red-500 animate-in zoom-in-50 duration-200" />
                  ) : (
                    formData.email.trim() && (
                      <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-5 h-5 text-emerald-500 animate-in zoom-in-50 duration-200" />
                    )
                  )
                )}
              </div>
            </div>

            {/* Error Message */}
            {touched.email && errors.email && (
              <div className="flex items-center gap-1.5 text-xs text-red-400 pt-0.5 animate-in fade-in slide-in-from-top-1 duration-200">
                <HugeiconsIcon icon={AlertCircleIcon} className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{errors.email}</span>
              </div>
            )}
          </div>

          {/* PASSWORD FIELD */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[10px] md:text-xs font-medium text-text-secondary uppercase tracking-widest flex items-center gap-1.5">
                <HugeiconsIcon icon={LockPasswordIcon} className="w-3.5 h-3.5 text-text-tertiary" />
                Password
              </label>

              <div className="flex items-center gap-3">
                {/* Status Indicator */}
                <div className="text-[11px] font-medium transition-all duration-300">
                  {validating.password && (
                    <span className="text-text-tertiary flex items-center gap-1">
                      <HugeiconsIcon icon={Loading03Icon} className="w-3 h-3 animate-spin text-accent-primary" />
                      Checking...
                    </span>
                  )}
                  {corrected.password && (
                    <span className="text-emerald-400 font-semibold flex items-center gap-1 animate-pulse">
                      <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-3.5 h-3.5" />
                      Error corrected!
                    </span>
                  )}
                </div>

                <Link href="#" className="text-[10px] md:text-xs text-text-tertiary hover:text-text-primary transition-colors">
                  Forgot?
                </Link>
              </div>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                onBlur={() => handleBlur("password")}
                placeholder="Enter your password"
                className={`w-full rounded-xl px-4 py-3 pr-24 text-sm md:text-base placeholder:text-text-tertiary focus:outline-none transition-all duration-200 ${getFieldInputStyle(
                  "password"
                )}`}
              />

              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {/* Icon Status Indicator inside input */}
                {touched.password && !validating.password && (
                  errors.password ? (
                    <HugeiconsIcon icon={AlertCircleIcon} className="w-5 h-5 text-red-500 animate-in zoom-in-50 duration-200" />
                  ) : (
                    formData.password && (
                      <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-5 h-5 text-emerald-500 animate-in zoom-in-50 duration-200" />
                    )
                  )
                )}

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-text-tertiary hover:text-text-primary transition-colors p-1"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  <HugeiconsIcon icon={showPassword ? ViewOffIcon : ViewIcon} className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Error Message */}
            {touched.password && errors.password && (
              <div className="flex items-center gap-1.5 text-xs text-red-400 pt-0.5 animate-in fade-in slide-in-from-top-1 duration-200">
                <HugeiconsIcon icon={AlertCircleIcon} className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{errors.password}</span>
              </div>
            )}
          </div>

          <Button type="submit" fullWidth className="py-4 mt-8" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <HugeiconsIcon icon={Loading03Icon} className="w-4 h-4 animate-spin" />
                Signing In...
              </span>
            ) : (
              "Sign In"
            )}
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
          Don't have an account? <Link href="/signup" className="text-text-primary hover:underline font-medium">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

