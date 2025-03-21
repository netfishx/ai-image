import { getBackgroundImageStyle } from "@/app/bg";
import { Button } from "@/components/ui/button";
import { UserName } from "@/components/user-name";
import { House, MenuSquare } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
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
        <Button asChild size="sm" className="h-7 rounded-full bg-amber-400/80">
          <Link href="/recharge">充值</Link>
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button
          className="bg-foreground/20 backdrop-blur-sm"
          variant="secondary"
          size="sm"
          asChild
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
