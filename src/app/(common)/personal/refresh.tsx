"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function RefreshButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <Button
      size="icon"
      className="size-4 bg-transparent p-0"
      disabled={isPending}
      onClick={async () => {
        startTransition(async () => {
          await sleep(800);
          router.refresh();
        });
      }}
    >
      <RefreshCw
        className={cn("size-4 text-background", isPending && "animate-spin")}
      />
    </Button>
  );
}
