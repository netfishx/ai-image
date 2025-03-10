"use client";

import { Button } from "@/components/ui/button";
import { resourceAtom } from "@/lib/store";
import type { Resource } from "@/lib/types";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
export function ActionButton({ resource }: { resource: Resource }) {
  const setCurrentResource = useSetAtom(resourceAtom);
  const router = useRouter();

  return (
    <Button
      size="sm"
      className="rounded-xl text-xs"
      onClick={() => {
        setCurrentResource(resource);
        router.push("/step?type=2");
      }}
    >
      立即制作
    </Button>
  );
}
