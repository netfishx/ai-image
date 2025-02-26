"use client";

import { getBackgroundImageStyle } from "@/app/bg";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function CommonHeader({ title }: { title: string }) {
  const router = useRouter();
  return (
    <div
      className="flex h-12 items-center bg-cover px-2 text-background"
      style={getBackgroundImageStyle("nav")}
    >
      <Button onClick={() => router.back()} variant="ghost" size="icon">
        <ArrowLeft className="size-6" />
      </Button>
      <div className="-translate-x-1/2 absolute left-1/2 transform">
        {title}
      </div>
    </div>
  );
}
