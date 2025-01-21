import React from 'react';
import { Button } from '@/components/ui/button'; // Ensure to have this component by running: npx shadcn add button
import { PhosphorStar } from '../icons';

interface GetStartedButtonProps {
    handleClick?: () => {};
}

/**
 * `GetStartedButton` is a UI component for navigating users to get started with the Driftwood Stack project.
 * It leverages Tailwind CSS for styling and shadcn's Button component for consistent UI.
 *
 * Use this component on the main page as a call-to-action for users to begin their journey.
 */
const GetStartedButton: React.FC<GetStartedButtonProps> = (handleClick?) => {
    return (
        <Button
            variant='outline'
            className='max-w-30 flex w-full gap-3'              
            aria-label="Star Driftwood Stack Project"
            onClick={() => handleClick}
        >
            Star
            <PhosphorStar />
        </Button>
    );
};

export default GetStartedButton;