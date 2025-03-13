import { ShareDialog } from "@/components/share";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getSession } from "@/lib/session";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { CommonHeader } from "./common-header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <CommonHeader />
      <ScrollArea className="h-[calc(100vh-3rem)]">{children}</ScrollArea>
      <Suspense>
        <Dialog />
      </Suspense>
    </>
  );
}

async function Dialog() {
  const session = await getSession();
  const username = session?.userName;
  return <ShareDialog username={username ?? ""} />;
}
