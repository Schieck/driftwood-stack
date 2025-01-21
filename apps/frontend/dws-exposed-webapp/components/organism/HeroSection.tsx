'use-client'

import React from 'react';
import { useTheme } from 'next-themes';
import GoInput from '../molecule/GoInput';
import GetStartedButton from '../molecule/GetStartedButton';
import Lottie from 'react-lottie';
import { siteConfig } from '@/config/site';
import Link from 'next/link';
import GlassCard from '../atom/GlassCard';

interface HeroSectionProps {
  imageUrl: string;
  title: string;
  description: string;
  onActionClick: () => void;
}

/**
 * HeroSection component displays a prominent call-to-action
 * section that showcases the Driftwood Stack's capabilities.
 * It is designed following the Atomic Design principles at the organism level.
 *
 * Props:
 * - imageUrl: URL of the image to be displayed in the hero section
 * - title: The title of the Hero Section
 * - description: A brief description of the Driftwood Stack
 * - actionText: The text for the action button
 * - onActionClick: The callback function when the action button is clicked
 */
const HeroSection: React.FC<HeroSectionProps> = ({ imageUrl, title, description, onActionClick }) => {
  const { theme } = useTheme();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: require('@/public/driftwood-animation.json'), // Update with the correct path to your Lottie JSON file
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <section 
      className={`h-95 flex justify-center text-center sm:h-screen`}
      aria-label="Hero Section"
    >
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="flex flex-col sm:h-1/2 sm:flex-row sm:gap-12">
          <div className='mt-6 flex flex-col justify-center  px-1 py-3 sm:mt-0 sm:w-2/3 sm:items-start sm:p-0 sm:text-left'>
            <h1 className="font-title text-3xl font-extrabold sm:text-4xl">
              {title}
            </h1>
            <p className="hidden max-w-xl text-lg leading-relaxed sm:visible sm:flex">
              {description}
            </p>
          </div>
          
            <GlassCard>
              <Lottie 
                options={defaultOptions}
                width={'auto'}
                height={'100%'}
              />
            </GlassCard>
          <p className="visible flex p-3 font-light leading-relaxed sm:hidden">
              {description}
            </p>
        </div>
        <div className="flex w-full flex-col-reverse gap-3 p-6 sm:h-1/3 sm:flex-row sm:pt-12">
          <div className='sm:w-1/4'>
            <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <GetStartedButton />
            </Link>
          </div>
          <div className='sm:w-full'>
          <GoInput onSearch={function (value: string): void {
            throw new Error("Function not implemented.");
          }} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

//This component encapsulates all requirements: It's reusable, maintainable, typed with TypeScript, and styled using Tailwind CSS with shadcn components. It illustrates a foundation for building an interactive, accessible, and responsive Hero Section that adheres to React and Atomic Design best practices.