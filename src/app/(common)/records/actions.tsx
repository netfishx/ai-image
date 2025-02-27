"use client";
import head from "@/assets/head.png";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

export function Actions() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="px-0">
            下载作品
          </Button>
          <Button variant="ghost" size="sm" className="px-0">
            删除作品
          </Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="px-0 opacity-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          点击查看
        </Button>
      </div>
      <Separator className={cn(isOpen ? "opacity-20" : "hidden")} />
      <div
        className={cn(
          isOpen ? "flex items-center justify-center" : "hidden",
          "transition-all duration-300",
        )}
      >
        <Image src={head} alt="review" width={300} />
      </div>
    </>
  );
}
