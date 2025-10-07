"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tabs, TabsList } from "@/components/ui/tabs";

export function CustomTabs() {
  const pathname = usePathname();
  const tab = pathname.split("/")[1];
  return (
    <Tabs>
      <TabsList className="grid w-full grid-cols-4 gap-2">
        <Link
          className="inline-flex items-center justify-center whitespace-nowrap rounded-full p-1 font-medium text-sm transition-all focus-visible:outline-hidden focus-visible:ring focus-visible:ring-ring data-[state=active]:pointer-events-none data-[state=active]:bg-primary data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          data-state={["yjty", ""].includes(tab) ? "active" : "inactive"}
          href="/yjty"
        >
          一键脱衣
        </Link>
        <Link
          className="inline-flex items-center justify-center whitespace-nowrap rounded-full p-1 font-medium text-sm transition-all focus-visible:outline-hidden focus-visible:ring focus-visible:ring-ring data-[state=active]:pointer-events-none data-[state=active]:bg-primary data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          data-state={tab === "image" ? "active" : "inactive"}
          href="/image/custom"
        >
          图片换脸
        </Link>
        <Link
          className="inline-flex items-center justify-center whitespace-nowrap rounded-full p-1 font-medium text-sm transition-all focus-visible:outline-hidden focus-visible:ring focus-visible:ring-ring data-[state=active]:pointer-events-none data-[state=active]:bg-primary data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          data-state={tab === "video" ? "active" : "inactive"}
          href="/video"
        >
          视频换脸
        </Link>
        <Link
          className="inline-flex items-center justify-center whitespace-nowrap rounded-full p-1 font-medium text-sm transition-all focus-visible:outline-hidden focus-visible:ring focus-visible:ring-ring data-[state=active]:pointer-events-none data-[state=active]:bg-primary data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          data-state={tab === "gif" ? "active" : "inactive"}
          href="/gif"
        >
          GIF换脸
        </Link>
      </TabsList>
    </Tabs>
  );
}
