import React, { forwardRef } from "react";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hideLabel?: boolean;
  children: React.ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, hideLabel, id, children, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className={`block text-sm font-medium mb-1 ${
              hideLabel ? "sr-only" : "text-gray-700"
            }`}
          >
            {label}
          </label>
        )}
        <select
          {...props}
          id={selectId}
          ref={ref}
          className={`block w-full rounded-lg border-0 py-2 px-3 shadow-sm ring-1 ring-inset transition-colors
            bg-white text-gray-900 
            ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500
            ${error ? "ring-red-500 focus:ring-red-500" : ""}
            ${className || ""}`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${selectId}-error` : undefined}
        >
          {children}
        </select>
        {error && (
          <p className="mt-1 text-sm text-red-500" id={`${selectId}-error`}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
