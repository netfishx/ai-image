"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function Actions({ url }: { url: string | null }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="px-0" asChild>
            {url ? (
              <a href={url} target="_blank" rel="noreferrer">
                下载作品
              </a>
            ) : (
              <span>下载作品</span>
            )}
          </Button>
          <Button variant="ghost" size="sm" className="px-0">
            删除作品
          </Button>
        </div>
        {url && (
          <Button
            variant="ghost"
            size="sm"
            className="group flex items-center gap-1 px-0 hover:opacity-80"
            onClick={() => setIsOpen(!isOpen)}
            disabled={!url}
          >
            点击查看
            {isOpen ? (
              <ChevronUp className="h-4 w-4 transition-transform duration-300" />
            ) : (
              <ChevronDown className="h-4 w-4 transition-transform duration-300" />
            )}
          </Button>
        )}
      </div>
      {url && (
        <>
          <Separator className={cn(isOpen ? "opacity-20" : "hidden")} />
          <div
            className={cn(
              "overflow-hidden transition-all duration-500 ease-in-out",
              isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0",
            )}
          >
            <div className="flex items-center justify-center">
              <Image
                src={url}
                alt="review"
                width={300}
                className="transform transition-transform duration-500"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
