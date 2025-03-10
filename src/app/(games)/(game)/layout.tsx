import { CustomMarquee } from "@/app/(games)/(game)/custom-marquee";
import { CustomTabs } from "@/app/(games)/(game)/custom-tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <CustomTabs />
      <CustomMarquee />
      <ScrollArea className="h-[calc(100dvh-100px)]">{children}</ScrollArea>
    </>
  );
}
