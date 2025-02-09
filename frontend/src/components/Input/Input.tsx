import React, { forwardRef } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hideLabel?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hideLabel, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className={`block text-sm font-medium mb-1 ${
              hideLabel ? "sr-only" : "text-gray-700"
            }`}
          >
            {label}
          </label>
        )}
        <input
          {...props}
          id={inputId}
          ref={ref}
          className={`block w-full rounded-lg border-0 py-2 px-3 shadow-sm ring-1 ring-inset transition-colors
            bg-white text-gray-900 placeholder:text-gray-400
            ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-500
            ${error ? "ring-red-500 focus:ring-red-500" : ""}
            ${className || ""}`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${inputId}-error` : undefined}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500" id={`${inputId}-error`}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
