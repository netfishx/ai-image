"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
export function GoBack({ className }: { className?: string }) {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.back()}
      size="icon"
      className={cn(className, "bg-transparent")}
    >
      <X className="size-8" />
    </Button>
  );
}
