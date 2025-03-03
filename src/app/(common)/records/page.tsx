import { getBackgroundImageStyle } from "@/app/bg";
import { Time } from "@/components/time";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { getRecords } from "@/lib/api";
import Image from "next/image";
import { Suspense } from "react";
import { Actions } from "./actions";
export default function RecordsPage() {
  return (
    <ScrollArea className="h-[calc(100vh-48px)]">
      <div
        className="flex flex-1 flex-col gap-4 bg-cover p-4"
        style={getBackgroundImageStyle("main")}
      >
        <Suspense>
          <List />
        </Suspense>
      </div>
    </ScrollArea>
  );
}

async function List() {
  const list = await getRecords();
  return (
    <>
      {list?.map((item) => (
        <div
          key={item.businessId}
          className="flex flex-col gap-2 rounded-sm border bg-card-foreground py-2 text-card shadow-sm *:px-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src={item.originalMaterial}
                alt="head"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <span>{item.orderName}</span>
                <span className="text-xs">
                  <Time time={item.createdTime} />
                </span>
              </div>
            </div>
            <div className="text-sm">
              {item.productionStatus === "2" ? "制作成功" : "制作中"}
            </div>
          </div>
          <Separator className="opacity-20" />
          <Actions url={item.processingResult} />
        </div>
      ))}
    </>
  );
}
