"use client";

import { forwardRef } from "react";
import { Label } from "./label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { cn } from "@/lib/utils";

interface FormSelectProps {
  id: string;
  label: string;
  labelClassName?: string;
  error?: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  options: { value: string; label: string }[];
  value?: string;
  onValueChange?: (value: string) => void;
}

const FormSelect = forwardRef<HTMLButtonElement, FormSelectProps>(
  (
    {
      id,
      label,
      labelClassName,
      error,
      className,
      placeholder,
      required = false,
      options,
      value,
      onValueChange,
    },
    ref
  ) => {
    return (
      <div className={cn("space-y-3", className)}>
        <Label
          htmlFor={id}
          className={cn(
            "text-[#0D385E]",
            labelClassName,
            required &&
              "after:content-['*'] tracking-[-0.5px] after:ml-1 after:text-red-500"
          )}
        >
          {label}
        </Label>
        <Select value={value} onValueChange={onValueChange}>
          <SelectTrigger
            ref={ref}
            className={cn(
              "mt-2 h-14 px-6  rounded-full border-[#2A597E] text-[#0D385E] focus-visible:ring-0",
              error && "border-red-500 focus-visible:ring-red-500"
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className="text-[#0D385E] bg-[#FFF] border-0 cursor-pointer ">
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </div>
    );
  }
);

FormSelect.displayName = "FormSelect";

export default FormSelect;
