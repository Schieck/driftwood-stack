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
  subDescription?: string;
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

const HeroSectionDescriptions = ({description, subDescription}: {description: string, subDescription?: string}) => {
  return (
    <>
      <p className="flex font-light leading-relaxed">{description}</p>
      <br/>
      { subDescription && <p className="font-title font-extralight text-lg underline">"{subDescription}"</p> }
    </>
  )
}

/**
 * HeroSection with a Lottie animation, text content,
 * plus a search input and a “Get Started” button.
 * 
 * @param {HeroSectionProps} props The properties for the HeroSection component.
 */
const HeroSection = ({
  lottieOptions,
  title,
  description,
  subDescription,
  onSearch,
  isLoading = false,
}: HeroSectionProps) => {
  const [searchValue, setSearchValue] = useState("");

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      onSearch(value);
    }, 800),
    [onSearch]
  );

  const handleInputChange = (value: string) => {
    setSearchValue(value);
    debouncedSearch(value);
  };

  const handleSearchSubmit = (value: string) => {
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <section className="h-95 px-5 lg:px-20 flex justify-center text-center sm:h-screen" aria-label="Hero Section">
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="flex lg:px-20 flex-col sm:h-1/2 sm:flex-row sm:gap-12">
          <div className="mt-6 flex flex-col justify-center px-1 py-3 sm:mt-0 sm:w-2/3 sm:items-start sm:p-0 sm:text-left">
            <h1 className="font-title text-3xl font-extrabold sm:text-4xl">{title}</h1>
            <div className="hidden p-3 sm:visible sm:flex sm:flex-col">
              <HeroSectionDescriptions description={description} subDescription={subDescription} />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", aspectRatio: "1" }}>
            <GlassCard>
              <Lottie options={lottieOptions} width="auto" height="100%" />
            </GlassCard>
          </div>
        </div>

        <div className="visible pt-10 sm:hidden">
            <HeroSectionDescriptions description={description} subDescription={subDescription} />
        </div>

        <div className="flex w-3/4 flex-col-reverse gap-3 p-6 sm:h-1/3 sm:flex-row sm:pt-12">
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
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
