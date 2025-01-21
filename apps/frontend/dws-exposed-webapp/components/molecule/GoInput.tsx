"use client"

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import debounce from "lodash.debounce";
import { LucideFastFowardIcon } from "../icons";

interface GoInputProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  debounceTime?: number;
}

/**
 * `GoInput` component represents a molecule-level component
 * featuring a 3D effect input with debounce functionality and a Go button.
 *
 * @component
 * @param {GoInputProps} props - The props for the component.
 * @returns {React.ReactElement} - The rendered element.
 * 
 * @example
 * ```tsx
 * <GoInput
 *   placeholder="Search..."
 *   onSearch={(value) => console.log(value)}
 *   debounceTime={300}
 * />
 * ```
 */
const GoInput: React.FC<GoInputProps> = ({
  placeholder = "Search among driftwoods...",
  onSearch,
  debounceTime = 300,
}) => {
  const [inputValue, setInputValue] = useState("");

  // Wrap onSearch in debounce
  const debouncedOnSearch = useCallback(
    debounce((value: string) => {
      onSearch(value);
    }, debounceTime),
    [onSearch, debounceTime]
  );

  useEffect(() => {
    // Trigger debounced search on inputValue change
    debouncedOnSearch(inputValue);

    // Cleanup debounce on unmount
    return () => {
      debouncedOnSearch.cancel();
    };
  }, [inputValue, debouncedOnSearch]);

  return (
    <div className="flex gap-3">
      <Input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        aria-label={placeholder}
      />
      <Button
        onClick={() => onSearch(inputValue)}
        className={clsx(
          "px-4 bg-primary hover:bg-primary rounded-md shadow-md transition duration-300 ease-in-out",
          "flex items-center justify-center"
        )}
        aria-label="Submit Search"
      >
        <LucideFastFowardIcon />
      </Button>
    </div>
  );
};

export default GoInput;
