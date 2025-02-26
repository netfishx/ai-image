import { Button } from "@/components/ui/button";
import { House, MenuSquare } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <div className="flex h-12 justify-between bg-[url('https://res.meiyan88.com/ai-v2/nav_bg.jpg')] bg-cover px-2 text-background">
      <div className="flex items-center justify-center gap-2">
        <House />
        <span>username</span>
      </div>
      <div className="flex items-center gap-2">
        <Button className="rounded-full bg-background/20" size="sm" asChild>
          <Link href="/personal">个人中心</Link>
        </Button>
        <Link href="/personal">
          <MenuSquare className="opacity-50" />
        </Link>
      </div>
    </div>
  );
}
