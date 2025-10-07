import Image from "next/image";
import type { ReactNode } from "react";
import { CustomMarquee } from "@/app/(games)/(game)/custom-marquee";
import { CustomTabs } from "@/app/(games)/(game)/custom-tabs";
import ad from "@/assets/ad.gif";
import { ScrollArea } from "@/components/ui/scroll-area";
import { rgbDataURL } from "@/lib/utils";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <CustomTabs />
      <div className="relative h-25">
        <Image
          alt="ad"
          blurDataURL={rgbDataURL(200, 200, 200)}
          className="rounded-lg object-cover"
          fill
          placeholder="blur"
          sizes="100vw"
          src={ad}
        />
      </div>
      <CustomMarquee />
      <ScrollArea className="h-[calc(100dvh-200px)]">{children}</ScrollArea>
    </>
  );
}
