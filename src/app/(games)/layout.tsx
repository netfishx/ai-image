import { CustomMarquee } from "@/app/(games)/custom-marquee";
import { CustomTabs } from "@/app/(games)/custom-tabs";
import { Header } from "@/app/(games)/header";
import { getBackgroundImageStyle } from "@/app/bg";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ReactNode } from "react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Header />
      <div
        className="flex flex-1 flex-col bg-cover"
        style={getBackgroundImageStyle("main")}
      >
        <CustomTabs />
        <CustomMarquee />
        <ScrollArea className="h-[calc(100dvh-100px)]">{children}</ScrollArea>
      </div>
    </>
  );
}
