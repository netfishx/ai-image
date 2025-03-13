"use client";

import { getBackgroundImageStyle } from "@/app/bg";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export function CommonHeader() {
  const router = useRouter();
  const pathname = usePathname();
  let title: string;
  switch (pathname) {
    case "/personal":
      title = "个人中心";
      break;
    case "/login":
      title = "登录账号";
      break;
    case "/reg":
      title = "注册账号";
      break;
    case "/records":
      title = "AI制作记录";
      break;
    case "/recharge":
      title = "充值";
      break;
    case "/orders":
      title = "充值记录";
      break;
    default:
      title = "";
  }
  return (
    <div
      className="flex h-12 shrink-0 items-center bg-cover px-2"
      style={getBackgroundImageStyle("nav")}
    >
      <Button onClick={() => router.back()} variant="ghost" size="icon">
        <ArrowLeft className="size-7" />
      </Button>
      <div className="-translate-x-1/2 absolute left-1/2 transform">
        {title}
      </div>
    </div>
  );
}
