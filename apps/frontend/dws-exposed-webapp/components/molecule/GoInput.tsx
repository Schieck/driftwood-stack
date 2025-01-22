"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { LucideFastFowardIcon } from "../icons";

interface GoInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  placeholder?: string;
  isLoading?: boolean;
}


/**
 * GoInput is a simple input + “Go” button.
 * 
 * @param {GoInputProps} props The properties for the GoInput component.
 */
const GoInput = ({
  value,
  onChange,
  onSubmit,
  placeholder = "Search...",
  isLoading = false
}: GoInputProps) => {
  return (
    <div className="flex gap-3">
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={false}
      />
      <Button
        onClick={() => onSubmit(value)}
        className={clsx("flex items-center justify-center px-4")}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : (<LucideFastFowardIcon />)}
      </Button>
    </div>
  );
};

export default GoInput;
