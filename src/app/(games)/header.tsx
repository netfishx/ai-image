import { getBackgroundImageStyle } from "@/app/bg";
import { Button } from "@/components/ui/button";
import { House, MenuSquare } from "lucide-react";
import { Link } from "next-view-transitions";
export function Header() {
  return (
    <div
      className="flex h-12 justify-between bg-cover px-2"
      style={getBackgroundImageStyle("nav")}
    >
      <div className="flex items-center justify-center gap-2">
        <House />
        <span>username</span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          className="rounded-full bg-white/20 backdrop-blur-sm"
          variant="secondary"
          size="sm"
          asChild
        >
          <Link href="/personal">个人中心</Link>
        </Button>
        <Link href="/personal">
          <MenuSquare className="opacity-50" />
        </Link>
      </div>
    </div>
  );
}
