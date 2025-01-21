"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { LucideFastFowardIcon } from "../icons";

interface GoInputProps {
  value: string;
  onChange: (value: string) => void; // Called on keystroke
  onSubmit: (value: string) => void; // Called on “Go” click
  placeholder?: string;
  isLoading?: boolean;
  debounceTime?: number; // Not used here if we do it in Hero
}

/**
 * A simple input + “Go” button. 
 * Debouncing is handled in the parent (HeroSection).
 */
const GoInput: React.FC<GoInputProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder = "Search...",
  isLoading = false,
  debounceTime = 300, // Default if used
}) => {
  return (
    <div className="flex gap-3">
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        // No disabling on typing, to let user finish
        disabled={false}
      />
      <Button
        onClick={() => onSubmit(value)}
        className={clsx("flex items-center justify-center px-4")}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : <LucideFastFowardIcon />}
      </Button>
    </div>
  );
};

export default GoInput;
