import React from 'react';
import styles from './Container.module.css';

interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: boolean;
  className?: string;
  as?: React.ElementType;
}

const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = 'xl',
  padding = true,
  className = '',
  as: Component = 'div',
}) => {
  const containerClasses = [
    styles.container,
    styles[`maxWidth-${maxWidth}`],
    padding ? styles.withPadding : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <Component className={containerClasses}>{children}</Component>;
};

export default Container;
