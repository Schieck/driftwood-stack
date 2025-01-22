import React from 'react';
import { Button } from '@/components/ui/button';
import { PhosphorStar } from '../icons';

interface GetStartedButtonProps {
    handleClick?: () => {};
}


/**
 * `GetStartedButton` is a UI component for navigating users to get started with the Driftwood Stack project.
 *
 * @param {GetStartedButtonProps} props The properties for the GetStartedButtonProps component.
 */

const GetStartedButton= (handleClick?: GetStartedButtonProps) => {
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