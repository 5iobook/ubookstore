import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import Toast from '../components/common/Toast/Toast';

/**
 * Toast Item Interface
 */
export interface ToastItem {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * Toast Context Value Interface
 */
interface ToastContextValue {
  toasts: ToastItem[];
  showToast: (toast: Omit<ToastItem, 'id'>) => string;
  hideToast: (id: string) => void;
  clearAllToasts: () => void;
  success: (message: string, duration?: number) => string;
  error: (message: string, duration?: number) => string;
  warning: (message: string, duration?: number) => string;
  info: (message: string, duration?: number) => string;
}

/**
 * Toast Context
 */
const ToastContext = createContext<ToastContextValue | undefined>(undefined);

/**
 * Toast Provider Props
 */
interface ToastProviderProps {
  children: ReactNode;
  maxToasts?: number;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

/**
 * Generate unique ID for toast
 */
const generateId = (): string => {
  return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Toast Provider Component
 * Provides toast notification context to the entire application
 * 
 * @example
 * <ToastProvider maxToasts={5} position="top-right">
 *   <App />
 * </ToastProvider>
 */
export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  maxToasts = 5,
  position = 'top-right',
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  /**
   * Show a new toast notification
   * @param toast - Toast configuration without id
   * @returns Toast ID
   */
  const showToast = useCallback(
    (toast: Omit<ToastItem, 'id'>): string => {
      const id = generateId();
      const newToast: ToastItem = {
        id,
        ...toast,
      };

      setToasts((prev) => {
        // Limit number of toasts
        const updated = [...prev, newToast];
        if (updated.length > maxToasts) {
          return updated.slice(updated.length - maxToasts);
        }
        return updated;
      });

      return id;
    },
    [maxToasts]
  );

  /**
   * Hide a toast notification
   * @param id - Toast ID to hide
   */
  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  /**
   * Clear all toast notifications
   */
  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  /**
   * Show success toast
   * @param message - Toast message
   * @param duration - Duration in milliseconds (default: 5000)
   * @returns Toast ID
   */
  const success = useCallback(
    (message: string, duration: number = 5000): string => {
      return showToast({ type: 'success', message, duration });
    },
    [showToast]
  );

  /**
   * Show error toast
   * @param message - Toast message
   * @param duration - Duration in milliseconds (default: 5000)
   * @returns Toast ID
   */
  const error = useCallback(
    (message: string, duration: number = 5000): string => {
      return showToast({ type: 'error', message, duration });
    },
    [showToast]
  );

  /**
   * Show warning toast
   * @param message - Toast message
   * @param duration - Duration in milliseconds (default: 5000)
   * @returns Toast ID
   */
  const warning = useCallback(
    (message: string, duration: number = 5000): string => {
      return showToast({ type: 'warning', message, duration });
    },
    [showToast]
  );

  /**
   * Show info toast
   * @param message - Toast message
   * @param duration - Duration in milliseconds (default: 5000)
   * @returns Toast ID
   */
  const info = useCallback(
    (message: string, duration: number = 5000): string => {
      return showToast({ type: 'info', message, duration });
    },
    [showToast]
  );

  const value: ToastContextValue = {
    toasts,
    showToast,
    hideToast,
    clearAllToasts,
    success,
    error,
    warning,
    info,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onClose={hideToast} position={position} />
    </ToastContext.Provider>
  );
};

/**
 * Toast Container Component
 * Renders all active toasts
 */
interface ToastContainerProps {
  toasts: ToastItem[];
  onClose: (id: string) => void;
  position: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onClose, position }) => {
  const getPositionStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      position: 'fixed',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      padding: '1rem',
      pointerEvents: 'none',
    };

    switch (position) {
      case 'top-left':
        return { ...baseStyles, top: 0, left: 0 };
      case 'top-center':
        return { ...baseStyles, top: 0, left: '50%', transform: 'translateX(-50%)' };
      case 'top-right':
        return { ...baseStyles, top: 0, right: 0 };
      case 'bottom-left':
        return { ...baseStyles, bottom: 0, left: 0 };
      case 'bottom-center':
        return { ...baseStyles, bottom: 0, left: '50%', transform: 'translateX(-50%)' };
      case 'bottom-right':
        return { ...baseStyles, bottom: 0, right: 0 };
      default:
        return { ...baseStyles, top: 0, right: 0 };
    }
  };

  if (toasts.length === 0) return null;

  return (
    <div style={getPositionStyles()}>
      {toasts.map((toast) => (
        <div key={toast.id} style={{ pointerEvents: 'auto' }}>
          <Toast
            id={toast.id}
            type={toast.type}
            message={toast.message}
            duration={toast.duration}
            onClose={onClose}
            action={toast.action}
          />
        </div>
      ))}
    </div>
  );
};

/**
 * useToast Hook
 * Access toast notification system
 * 
 * @returns Toast context value
 * @throws Error if used outside ToastProvider
 * 
 * @example
 * const { success, error, warning, info } = useToast();
 * 
 * const handleSubmit = async () => {
 *   try {
 *     await saveData();
 *     success('Data saved successfully!');
 *   } catch (err) {
 *     error('Failed to save data');
 *   }
 * };
 * 
 * @example
 * // With custom action
 * const { showToast } = useToast();
 * 
 * showToast({
 *   type: 'info',
 *   message: 'New message received',
 *   duration: 10000,
 *   action: {
 *     label: 'View',
 *     onClick: () => navigate('/messages')
 *   }
 * });
 */
export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
};

export default useToast;
