import { House, MenuSquare } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { getBackgroundImageStyle } from "@/app/bg";
import { Button } from "@/components/ui/button";
import { UserName } from "@/components/user-name";
export function Header() {
  return (
    <div
      className="flex h-12 shrink-0 justify-between bg-cover px-2"
      style={getBackgroundImageStyle("nav")}
    >
      <div className="flex items-center justify-center gap-2">
        <House />
        <Suspense>
          <UserName />
        </Suspense>
        <Button asChild className="h-7 rounded-full bg-gold/80" size="sm">
          <Link href="/recharge">充值</Link>
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button
          asChild
          className="bg-foreground/20 backdrop-blur-sm"
          size="sm"
          variant="secondary"
        >
          <Link href="/personal">个人中心</Link>
        </Button>
        <Link href="/records">
          <MenuSquare className="opacity-50" />
        </Link>
      </div>
    </div>
  );
}
