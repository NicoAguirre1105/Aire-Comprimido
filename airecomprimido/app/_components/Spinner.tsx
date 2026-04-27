import React from "react";
 
type SpinnerSize = "sm" | "md" | "lg" | "xl";
type SpinnerVariant = "ring" | "dots" | "pulse";
 
interface SpinnerProps {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  label?: string; // accessible label
  className?: string;
}
 
const sizeMap: Record<SpinnerSize, string> = {
  sm: "w-4 h-4",
  md: "w-8 h-8",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
};
 
const dotSizeMap: Record<SpinnerSize, string> = {
  sm: "w-1 h-1",
  md: "w-2 h-2",
  lg: "w-3 h-3",
  xl: "w-4 h-4",
};
 
export function Spinner({
  size = "md",
  variant = "ring",
  label = "Loading…",
  className = "",
}: SpinnerProps) {
  if (variant === "ring") {
    return (
      <span
        role="status"
        aria-label={label}
        className={`inline-block ${sizeMap[size]} ${className}`}
      >
        <svg
          className="animate-spin w-full h-full text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          {/* Background track */}
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          {/* Spinning arc */}
          <path
            className="opacity-80"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
        <span className="sr-only">{label}</span>
      </span>
    );
  }
 
  if (variant === "dots") {
    return (
      <span
        role="status"
        aria-label={label}
        className={`inline-flex items-center gap-1.5 ${className}`}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`rounded-full bg-current ${dotSizeMap[size]} animate-bounce`}
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
        <span className="sr-only">{label}</span>
      </span>
    );
  }
 
  if (variant === "pulse") {
    return (
      <span
        role="status"
        aria-label={label}
        className={`inline-block rounded-full bg-current animate-ping ${sizeMap[size]} ${className}`}
      >
        <span className="sr-only">{label}</span>
      </span>
    );
  }
 
  return null;
}
 
// ──────────────────────────────────────────────
// Full-screen overlay loader
// ──────────────────────────────────────────────
interface PageLoaderProps {
  label?: string;
}
 
export function PageLoader({ label = "Loading…" }: PageLoaderProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center
                 bg-white/80 backdrop-blur-sm dark:bg-black/80"
    >
      <Spinner size="xl" variant="ring" />
      <p className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-300">
        {label}
      </p>
    </div>
  );
}
 
// ──────────────────────────────────────────────
// Inline button loader — wraps children
// ──────────────────────────────────────────────
interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
  children: React.ReactNode;
}
 
export function LoadingButton({
  isLoading,
  children,
  disabled,
  className = "",
  ...props
}: LoadingButtonProps) {
  return (
    <button
      disabled={isLoading || disabled}
      aria-busy={isLoading}
      className={`inline-flex items-center justify-center gap-2 rounded-md
                  px-4 py-2 text-sm font-medium transition-opacity
                  disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {isLoading && <Spinner size="sm" />}
      {children}
    </button>
  );
}
 