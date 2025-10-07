"use client";

import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function RefreshButton({ className }: { className?: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <Button
      className="size-4 bg-transparent p-0"
      disabled={isPending}
      onClick={async () => {
        startTransition(async () => {
          await sleep(500);
          router.refresh();
        });
      }}
      size="icon"
    >
      <RefreshCw
        className={cn("size-4", isPending && "animate-spin", className)}
      />
    </Button>
  );
}
