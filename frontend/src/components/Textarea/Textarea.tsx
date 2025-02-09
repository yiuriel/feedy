import React, { forwardRef } from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hideLabel?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hideLabel, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className={`block text-sm font-medium mb-1 ${
              hideLabel ? "sr-only" : "text-gray-700"
            }`}
          >
            {label}
          </label>
        )}
        <textarea
          {...props}
          id={textareaId}
          ref={ref}
          className={`block w-full rounded-lg border-0 py-2 px-3 shadow-sm ring-1 ring-inset transition-colors
            bg-white text-gray-900 placeholder:text-gray-400 min-h-[40px]
            ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 max-h-60
            ${error ? "ring-red-500 focus:ring-red-500" : ""}
            ${className || ""}`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${textareaId}-error` : undefined}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500" id={`${textareaId}-error`}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
