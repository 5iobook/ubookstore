import React from 'react';
import styles from './Checkbox.module.css';

export interface CheckboxProps {
  id?: string;
  name?: string;
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  description?: string;
  onChange?: (checked: boolean) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  name,
  checked = false,
  disabled = false,
  label,
  description,
  onChange,
  className = '',
  size = 'md',
  variant = 'default'
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange && !disabled) {
      onChange(e.target.checked);
    }
  };

  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`${styles.checkboxWrapper} ${styles[size]} ${className}`}>
      <div className={styles.checkboxContainer}>
        <input
          type="checkbox"
          id={checkboxId}
          name={name}
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
          className={`${styles.checkbox} ${styles[variant]} ${disabled ? styles.disabled : ''}`}
        />
        <div className={`${styles.checkmark} ${checked ? styles.checked : ''}`}>
          {checked && (
            <svg
              className={styles.checkIcon}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
                fill="currentColor"
              />
            </svg>
          )}
        </div>
      </div>
      
      {(label || description) && (
        <div className={styles.labelContainer}>
          {label && (
            <label htmlFor={checkboxId} className={styles.label}>
              {label}
            </label>
          )}
          {description && (
            <p className={styles.description}>{description}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Checkbox;