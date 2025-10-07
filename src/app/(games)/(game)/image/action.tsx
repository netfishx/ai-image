"use client";

import { useSetAtom } from "jotai";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { resourceAtom } from "@/lib/store";
import type { Resource } from "@/lib/types";

export function ActionButton({ resource }: { resource: Resource }) {
  const setCurrentResource = useSetAtom(resourceAtom);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      className="rounded-xl text-xs"
      disabled={isPending}
      onClick={() => {
        startTransition(() => {
          setCurrentResource(resource);
          router.push("/step?type=1");
        });
      }}
      size="sm"
    >
      {isPending && <Loader2 className="animate-spin" />}
      立即制作
    </Button>
  );
}
