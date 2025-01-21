"use client";

import React, { useState, useCallback } from "react";
import debounce from "lodash.debounce";
import Lottie, { Options as LottieOptions } from "react-lottie";
import GlassCard from "../atom/GlassCard";
import GoInput from "../molecule/GoInput";
import GetStartedButton from "../molecule/GetStartedButton";
import Link from "next/link";
import { siteConfig } from "@/config/site";

interface HeroSectionProps {
  lottieOptions: LottieOptions;
  title: string;
  description: string;
  onSearch: (query: string) => void;
  onGetStarted: () => void;
  isLoading?: boolean;
}

/**
 * HeroSection with a Lottie animation, text content,
 * plus a search input and a “Get Started” button.
 */
const HeroSection: React.FC<HeroSectionProps> = ({
  lottieOptions,
  title,
  description,
  onSearch,
  onGetStarted,
  isLoading = false,
}) => {
  const [searchValue, setSearchValue] = useState("");

  // Debounce ensures we only trigger the search after user stops typing
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      onSearch(value);
    }, 600), // 600ms or your preferred delay
    [onSearch]
  );

  // Called on every keystroke in GoInput
  const handleInputChange = (value: string) => {
    setSearchValue(value);
    debouncedSearch(value);
  };

  // Immediate search if the user clicks “Go” button
  const handleSearchSubmit = (value: string) => {
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <section className="h-95 flex justify-center text-center sm:h-screen" aria-label="Hero Section">
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="flex flex-col sm:h-1/2 sm:flex-row sm:gap-12">
          <div className="mt-6 flex flex-col justify-center px-1 py-3 sm:mt-0 sm:w-2/3 sm:items-start sm:p-0 sm:text-left">
            <h1 className="font-title text-3xl font-extrabold sm:text-4xl">{title}</h1>
            <p className="hidden max-w-xl text-lg leading-relaxed sm:visible sm:flex">
              {description}
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", aspectRatio: "1" }}>
            <GlassCard>
              <Lottie options={lottieOptions} width="auto" height="100%" />
            </GlassCard>
          </div>

          <p className="visible flex p-3 font-light leading-relaxed sm:hidden">{description}</p>
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
          <div className="sm:w-full">
            <GoInput
              value={searchValue}
              onChange={handleInputChange}
              onSubmit={handleSearchSubmit}
              placeholder="Search among driftwoods..."
              isLoading={isLoading}
              debounceTime={0} // We handle debounce logic here
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
