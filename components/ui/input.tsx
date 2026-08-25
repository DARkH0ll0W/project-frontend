import React, { forwardRef, InputHTMLAttributes } from 'react';

// 1. Extend the native HTML input attributes to accept all standard HTML props
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

// 2. Use forwardRef to allow parent components or form libraries to access the underlying DOM node
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    // Fallback ID if none is supplied to link label and input together
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {/* Render label if provided */}
        {label && (
          <label 
            htmlFor={inputId} 
            className="text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}

        {/* Input Field */}
        <input
          id={inputId}
          ref={ref}
          className={`
            px-3 py-2 border rounded-md shadow-sm outline-none transition-all text-base
            focus:ring-2 focus:ring-blue-500
            disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
            ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}
            ${className}
          `}
          {...props} // Spreads native attributes like type, placeholder, value, onChange
        />

        {/* Render Error Message or Helper Text */}
        {error ? (
          <span className="text-xs text-red-500 font-medium">{error}</span>
        ) : helperText ? (
          <span className="text-xs text-gray-500">{helperText}</span>
        ) : null}
      </div>
    );
  }
);

// 3. Set display name for easier debugging in React DevTools
Input.displayName = 'Input';

export default Input;
