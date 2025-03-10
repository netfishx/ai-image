"use client";

import { Tabs, TabsList } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function CustomTabs() {
  const pathname = usePathname();
  return (
    <Tabs>
      <TabsList className="grid w-full grid-cols-4 gap-2">
        <Link
          data-state={["/yjty", "/"].includes(pathname) ? "active" : "inactive"}
          href="/yjty"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-full p-1 font-medium text-sm transition-all focus-visible:outline-hidden focus-visible:ring focus-visible:ring-ring data-[state=active]:pointer-events-none data-[state=active]:bg-primary data-[state=active]:text-foreground data-[state=active]:shadow-sm"
        >
          一键脱衣
        </Link>
        <Link
          data-state={pathname === "/image" ? "active" : "inactive"}
          href="/image"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-full p-1 font-medium text-sm transition-all focus-visible:outline-hidden focus-visible:ring focus-visible:ring-ring data-[state=active]:pointer-events-none data-[state=active]:bg-primary data-[state=active]:text-foreground data-[state=active]:shadow-sm"
        >
          图片换脸
        </Link>
        <Link
          data-state={pathname === "/video" ? "active" : "inactive"}
          href="/video"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-full p-1 font-medium text-sm transition-all focus-visible:outline-hidden focus-visible:ring focus-visible:ring-ring data-[state=active]:pointer-events-none data-[state=active]:bg-primary data-[state=active]:text-foreground data-[state=active]:shadow-sm"
        >
          视频换脸
        </Link>
        <Link
          data-state={pathname === "/gif" ? "active" : "inactive"}
          href="/gif"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-full p-1 font-medium text-sm transition-all focus-visible:outline-hidden focus-visible:ring focus-visible:ring-ring data-[state=active]:pointer-events-none data-[state=active]:bg-primary data-[state=active]:text-foreground data-[state=active]:shadow-sm"
        >
          GIF换脸
        </Link>
      </TabsList>
    </Tabs>
  );
}
