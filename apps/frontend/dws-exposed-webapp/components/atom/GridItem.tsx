import React from 'react';
import clsx from 'clsx';

import { Card } from '@/components/ui/card'; 

interface GridItemProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * GridItem component designed to be used within a Grid system.
 *
 * @param {GridItemProps} props The properties for the GridItem component.
 */
const GridItem = ({ children, className }: GridItemProps) => {
  const gridItemClasses = clsx([
    'p-4',
    'border',
    'rounded-lg',
    'shadow-md',
    'hover:bg-gray-100',
    'transition-all',
    'duration-300',
    'place-content-center',
    'flex',
    className,
  ]);

  return (
    <Card className={gridItemClasses} role="article" aria-label="Grid Item">
      {children}
    </Card>
  );
};

export { GridItem, type GridItemProps };