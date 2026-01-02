import React, { useState, useId } from 'react';
import './Input.css';

export interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  error?: string;
  success?: boolean;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  maxLength?: number;
  autoComplete?: string;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  error,
  success = false,
  helperText,
  disabled = false,
  required = false,
  icon,
  iconPosition = 'left',
  maxLength,
  autoComplete,
  className = '',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputId = useId();

  const hasValue = value.length > 0;
  const hasError = !!error;
  const showFloatingLabel = label && (isFocused || hasValue);

  const containerClassNames = [
    'input-container',
    hasError && 'input-container--error',
    success && !hasError && 'input-container--success',
    disabled && 'input-container--disabled',
    isFocused && 'input-container--focused',
    icon && `input-container--icon-${iconPosition}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={containerClassNames}>
      <div className="input-wrapper">
        {icon && iconPosition === 'left' && (
          <span className="input-icon input-icon--left">{icon}</span>
        )}

        <input
          id={inputId}
          type={type}
          className="input-field"
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
          maxLength={maxLength}
          autoComplete={autoComplete}
          placeholder={!label ? placeholder : ''}
          aria-invalid={hasError}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
        />

        {label && (
          <label
            htmlFor={inputId}
            className={`input-label ${showFloatingLabel ? 'input-label--floating' : ''}`}
          >
            {label}
            {required && <span className="input-label__required">*</span>}
          </label>
        )}

        {icon && iconPosition === 'right' && (
          <span className="input-icon input-icon--right">{icon}</span>
        )}

        {/* Success indicator */}
        {success && !hasError && (
          <span className="input-status-icon input-status-icon--success" aria-label="Valid">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
        )}

        {/* Error indicator */}
        {hasError && (
          <span className="input-status-icon input-status-icon--error" aria-label="Error">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </span>
        )}
      </div>

      {/* Helper text or error message */}
      {(helperText || error) && (
        <div className="input-message">
          {error ? (
            <span id={`${inputId}-error`} className="input-message--error" role="alert">
              {error}
            </span>
          ) : (
            <span id={`${inputId}-helper`} className="input-message--helper">
              {helperText}
            </span>
          )}
        </div>
      )}

      {/* Character count */}
      {maxLength && (
        <div className="input-counter">
          {value.length} / {maxLength}
        </div>
      )}
    </div>
  );
};

export default Input;
