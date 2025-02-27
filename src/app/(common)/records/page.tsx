import { getBackgroundImageStyle } from "@/app/bg";
import head from "@/assets/head.png";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Actions } from "./actions";
export default function RecordsPage() {
  return (
    <ScrollArea className="h-[calc(100vh-48px)]">
      <div
        className="flex flex-1 flex-col gap-4 bg-cover p-4"
        style={getBackgroundImageStyle("main")}
      >
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="flex flex-col gap-2 rounded-sm border bg-card-foreground py-2 text-card shadow-sm *:px-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src={head}
                  alt="head"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex flex-col">
                  <span>模板 - 动图050410</span>
                  <span className="text-xs">2025-02-26 10:00:00</span>
                </div>
              </div>
              <div className="text-sm">制作成功</div>
            </div>
            <Separator className="opacity-20" />
            <Actions />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
