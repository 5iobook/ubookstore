import React from 'react';
import styles from './Grid.module.css';

interface GridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  responsive?: boolean;
}

interface GridItemProps {
  children: React.ReactNode;
  span?: 1 | 2 | 3 | 4 | 6 | 12;
  spanMd?: 1 | 2 | 3 | 4 | 6 | 12;
  spanLg?: 1 | 2 | 3 | 4 | 6 | 12;
  className?: string;
}

const Grid: React.FC<GridProps> & { Item: React.FC<GridItemProps> } = ({
  children,
  columns = 12,
  gap = 'md',
  className = '',
  responsive = true,
}) => {
  const gridClasses = [
    styles.grid,
    styles[`columns-${columns}`],
    styles[`gap-${gap}`],
    responsive ? styles.responsive : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={gridClasses}>{children}</div>;
};

const GridItem: React.FC<GridItemProps> = ({
  children,
  span = 1,
  spanMd,
  spanLg,
  className = '',
}) => {
  const itemClasses = [
    styles.gridItem,
    styles[`span-${span}`],
    spanMd ? styles[`span-md-${spanMd}`] : '',
    spanLg ? styles[`span-lg-${spanLg}`] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={itemClasses}>{children}</div>;
};

Grid.Item = GridItem;

export default Grid;
