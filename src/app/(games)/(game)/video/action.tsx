"use client";

import { Button } from "@/components/ui/button";
import { resourceAtom } from "@/lib/store";
import type { Resource } from "@/lib/types";
import { useSetAtom } from "jotai";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function ActionButton({ resource }: { resource: Resource }) {
  const setCurrentResource = useSetAtom(resourceAtom);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      size="sm"
      className="rounded-xl text-xs"
      onClick={() => {
        startTransition(() => {
          setCurrentResource(resource);
          router.push("/step?type=3");
        });
      }}
      disabled={isPending}
    >
      {isPending && <Loader2 className="animate-spin" />}
      立即制作
    </Button>
  );
}
