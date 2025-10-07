"use client";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
export function GoBack({ className }: { className?: string }) {
  const router = useRouter();
  return (
    <Button
      className={cn(className, "bg-transparent")}
      onClick={() => {
        router.push("/");
      }}
      size="icon"
    >
      <X className="size-8" />
    </Button>
  );
}
