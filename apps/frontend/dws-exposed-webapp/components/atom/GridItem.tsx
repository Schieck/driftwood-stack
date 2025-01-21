import React from 'react';
import clsx from 'clsx';

import { Card } from '@/components/ui/card'; 

interface GridItemProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * GridItem component designed to be used within a Grid system.
 * Uses Tailwind CSS for styling to ensure responsiveness and maintainability.
 * @param {GridItemProps} props The properties for the GridItem component.
 * @returns {JSX.Element} The rendered GridItem component.
 */
const GridItem: React.FC<GridItemProps> = ({ children, className }) => {
  // Use clsx for conditional class names
  const gridItemClasses = clsx([
    'p-4', // Padding
    'border', // Border
    'rounded-lg', // Rounded corners
    'shadow-md', // Shadow for depth
    'hover:bg-gray-100', // Hover effect
    'transition-all', // Smooth transition for hover effects
    'duration-300', // Duration for transition effects
    'place-content-center',
    'flex',
    className, // Custom class passed through props
  ]);

  return (
    <Card className={gridItemClasses} role="article" aria-label="Grid Item">
      {children}
    </Card>
  );
};

export { GridItem, type GridItemProps };