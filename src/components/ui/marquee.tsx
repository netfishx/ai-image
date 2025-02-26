import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type MarqueeProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  pauseOnHover?: boolean;
  reverse?: boolean;
  fade?: boolean;
  innerClassName?: string;
  numberOfCopies?: number;
};

export function Marquee({
  children,
  pauseOnHover = false,
  reverse = false,
  fade = false,
  className,
  innerClassName,
  ...rest
}: MarqueeProps) {
  return (
    <div
      className={cn("group flex gap-[1rem] overflow-hidden", className)}
      style={{
        maskImage: fade
          ? `linear-gradient(${"to right"}, transparent 0%, rgba(0, 0, 0, 1.0) 10%, rgba(0, 0, 0, 1.0) 90%, transparent 100%)`
          : undefined,
        WebkitMaskImage: fade
          ? `linear-gradient(${"to right"}, transparent 0%, rgba(0, 0, 0, 1.0) 10%, rgba(0, 0, 0, 1.0) 90%, transparent 100%)`
          : undefined,
      }}
      {...rest}
    >
      <div
        className={cn(
          "flex shrink-0 justify-around gap-[1rem] [--gap:1rem]",
          "animate-marquee flex-row",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
          reverse && "direction-reverse",
          innerClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
