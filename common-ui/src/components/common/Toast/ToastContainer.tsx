import React from 'react';
import { createPortal } from 'react-dom';
import Toast from './Toast';
import type { ToastProps } from './Toast';
import './ToastContainer.css';

export interface ToastContainerProps {
  toasts: ToastProps[];
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  position = 'top-right',
}) => {
  if (toasts.length === 0) return null;

  const content = (
    <div className={`toast-container toast-container--${position}`}>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );

  return createPortal(content, document.body);
};

export default ToastContainer;
