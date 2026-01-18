"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";
import { forwardRef } from "react";

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  ({ value, onValueChange, placeholder = "Select...", options }, ref) => {
    return (
      <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
        <SelectPrimitive.Trigger
          ref={ref}
          className="w-full px-3 py-2.5 text-sm border border-[var(--color-light-gray)] bg-white 
            flex items-center justify-between gap-2 text-left
            focus:ring-2 focus:ring-[var(--color-dusty-blue)] focus:border-transparent outline-none 
            transition-all data-[placeholder]:text-[var(--color-warm-gray)]
            hover:border-[var(--color-dusty-blue)]/50"
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon>
            <ChevronDown className="w-4 h-4 text-[var(--color-warm-gray)]" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className="overflow-hidden bg-white border-2 border-[var(--color-dusty-rose)]/30 shadow-lg z-[100]
              animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2
              min-w-[var(--radix-select-trigger-width)] w-[var(--radix-select-trigger-width)]"
            position="popper"
            sideOffset={4}
          >
            <SelectPrimitive.Viewport className="p-1">
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  className="relative flex items-center px-3 py-2.5 text-sm text-[var(--color-charcoal)] 
                    cursor-pointer select-none outline-none
                    data-[highlighted]:bg-[var(--color-cream)] data-[highlighted]:text-[var(--color-charcoal)]
                    data-[state=checked]:bg-[var(--color-dusty-blue)]/10 data-[state=checked]:text-[var(--color-dusty-blue)]
                    transition-colors"
                >
                  <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator className="absolute right-3">
                    <Check className="w-4 h-4 text-[var(--color-dusty-blue)]" />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    );
  }
);

Select.displayName = "Select";


