import { CustomMarquee } from "@/app/(games)/custom-marquee";
import { CustomTabs } from "@/app/(games)/custom-tabs";
import { Header } from "@/app/(games)/header";
import { getBackgroundImageStyle } from "@/app/bg";
import type { ReactNode } from "react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="flex-1 bg-cover" style={getBackgroundImageStyle("main")}>
        <CustomTabs />
        <CustomMarquee />
        {children}
      </div>
    </>
  );
}
