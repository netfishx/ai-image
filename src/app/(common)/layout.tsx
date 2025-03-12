import { ScrollArea } from "@/components/ui/scroll-area";
import type { ReactNode } from "react";
import { CommonHeader } from "./common-header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <CommonHeader />
      <ScrollArea className="h-[calc(100vh-3rem)]">{children}</ScrollArea>
    </>
  );
}
