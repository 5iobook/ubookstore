import React from 'react';
import './Card.css';

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  clickable?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  as?: 'div' | 'article' | 'section';
}

export const Card: React.FC<CardProps> = ({
  variant = 'elevated',
  padding = 'md',
  hoverable = false,
  clickable = false,
  children,
  onClick,
  className = '',
  as: Component = 'div',
  ...rest
}) => {
  const classNames = [
    'card',
    `card--${variant}`,
    `card--padding-${padding}`,
    (hoverable || clickable) && 'card--hoverable',
    clickable && 'card--clickable',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = () => {
    if (clickable && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (clickable && onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <Component
      className={classNames}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      aria-pressed={clickable ? false : undefined}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Card;
