"use client";

import { Root } from "@radix-ui/react-label";

import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export function Label({ className, ...props }: ComponentProps<typeof Root>) {
  return (
    <Root
      data-slot="label"
      className={cn(
        "flex select-none items-center gap-2 font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
