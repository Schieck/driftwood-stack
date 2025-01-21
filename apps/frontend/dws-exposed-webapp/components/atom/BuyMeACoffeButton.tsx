import { Button } from '@/components/ui/button';
import React from 'react';
import { PhosphorCoffe } from '@/components/icons';

interface BuyMeACoffeeButtonProps {
  label?: string;
}

/**
 * `BuyMeACoffeeButton` renders a styled button that links to the specified BuyMeACoffee page.
 * It's designed to be reusable, accessible, and follows the atomic design principles.
 *
 * @param BuyMeACoffeeButtonProps - The props for configuring the button.
 * @returns A React element.
 */
const BuyMeACoffeeButton: React.FC<BuyMeACoffeeButtonProps> = ({ label = 'Support the project!' }) => {
  return (
    <a
      href="https://www.buymeacoffee.com/schieck"
      target="_blank"
      rel="noopener noreferrer">
      <Button
        className="inline-flex items-center rounded px-4 py-2 text-xs font-medium uppercase leading-tight shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
        style={{
          backgroundColor: 'hsl(var(--accent))',
          color: 'hsl(var(--accent-foreground))',
          borderRadius: 'var(--radius)',
        }}
        role="button"
        aria-label={label}
      >
        <PhosphorCoffe className="-ml-1 mr-2 size-5" aria-hidden="true" />
        {label}
      </Button>
    </a>
  );
};

export default BuyMeACoffeeButton;