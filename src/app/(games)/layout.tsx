import type { ReactNode } from "react";
import { Header } from "@/app/(games)/header";
import { getBackgroundImageStyle } from "@/app/bg";
import { ScrollArea } from "@/components/ui/scroll-area";

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
        <ScrollArea className="h-[calc(100dvh-3rem)]">{children}</ScrollArea>
      </div>
    </>
  );
}
