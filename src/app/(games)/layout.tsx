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
      <div
        className="flex flex-1 flex-col bg-cover"
        style={getBackgroundImageStyle("main")}
      >
        {children}
      </div>
    </>
  );
}
