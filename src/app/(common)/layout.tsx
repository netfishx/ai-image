import { CommonHeader } from "@/app/(common)/common-header";
import { IdDialog, ShareDialog } from "@/components/share";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getSession } from "@/lib/session";
import type { ReactNode } from "react";
import { Suspense } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <CommonHeader />
      <ScrollArea className="flex h-[calc(100vh-3rem)] flex-col">
        {children}
      </ScrollArea>
      <Suspense>
        <Dialog />
      </Suspense>
    </>
  );
}

async function Dialog() {
  const session = await getSession();
  const username = session?.userName;
  return (
    <>
      <ShareDialog username={username ?? ""} />
      <IdDialog username={username ?? ""} />
    </>
  );
}
