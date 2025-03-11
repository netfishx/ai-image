import { CustomMarquee } from "@/app/(games)/(game)/custom-marquee";
import { CustomTabs } from "@/app/(games)/(game)/custom-tabs";
import ad from "@/assets/ad.gif";
import { ScrollArea } from "@/components/ui/scroll-area";
import { rgbDataURL } from "@/lib/utils";
import Image from "next/image";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <CustomTabs />
      <div className="relative h-25">
        <Image
          src={ad}
          alt="ad"
          fill
          placeholder="blur"
          blurDataURL={rgbDataURL(200, 200, 200)}
          className="rounded-lg object-cover"
          sizes="100vw"
        />
      </div>
      <CustomMarquee />
      <ScrollArea className="h-[calc(100dvh-100px)]">{children}</ScrollArea>
    </>
  );
}
