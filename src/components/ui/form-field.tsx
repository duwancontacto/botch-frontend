"use client";

import { forwardRef } from "react";
import { Input } from "./input";
import { Label } from "./label";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  labelClassName?: string;
  error?: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      id,
      label,
      type = "text",
      labelClassName,
      error,
      className,
      placeholder,
      required = false,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("space-y-3", className)}>
        <Label
          htmlFor={id}
          className={cn(
            "text-[#2a597e]",
            labelClassName,
            required && "after:content-['*'] after:ml-1 after:text-red-500"
          )}
        >
          {label}
        </Label>
        <Input
          ref={ref}
          id={id}
          type={type}
          placeholder={placeholder}
          className={cn(
            "mt-2 h-14 px-6 rounded-full border-[#2a597e] text-[#2a597e] placeholder:text-[#2a597e]/50 focus-visible:ring-0",
            error && "border-red-500 focus-visible:ring-red-500"
          )}
          {...props}
        />
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </div>
    );
  }
);

FormField.displayName = "FormField";

export default FormField;
