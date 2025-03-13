"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { checkDownload, deleteOrder } from "@/lib/api";
import { downloadAlertAtom } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useSetAtom } from "jotai";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export function Actions({
  url,
  businessId,
  type,
}: {
  url: string | null;
  businessId: string;
  type: "video" | "image" | "gif";
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isDownloading, startDownloadTransition] = useTransition();
  const setDownloadAlert = useSetAtom(downloadAlertAtom);
  const router = useRouter();
  async function handleDeleteOrder() {
    startTransition(async () => {
      const res = await deleteOrder(businessId);
      if (res.code === 0) {
        toast.success("删除成功");
        router.refresh();
      } else {
        toast.error(res.msg);
      }
    });
  }
  async function handleDownloadOrder(url: string) {
    startDownloadTransition(async () => {
      const res = await checkDownload();
      if (res.code !== 0) {
        toast.error(res.msg);
      } else if (res.data) {
        window.open(url, "_blank");
      } else {
        setDownloadAlert(true);
      }
    });
  }
  return (
    <>
      <div className="flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="px-0" asChild>
            {url ? (
              <Button
                variant="ghost"
                size="sm"
                className="px-0"
                onClick={() => handleDownloadOrder(url)}
                disabled={isDownloading}
              >
                {isDownloading && <Loader2 className="animate-spin" />}
                下载作品
              </Button>
            ) : (
              <span>下载作品</span>
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="px-0"
            onClick={handleDeleteOrder}
            disabled={isPending}
          >
            {isPending && <Loader2 className="animate-spin" />}
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
              "overflow-hidden px-2 transition-all duration-500 ease-in-out",
              isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0",
            )}
          >
            <div
              className="flex items-center justify-center"
              suppressHydrationWarning={true}
            >
              <div className="relative h-44 w-76">
                {type === "video" ? (
                  <video
                    autoPlay
                    muted
                    playsInline
                    src={url}
                    width={304}
                    height={196}
                    className="object-contain"
                  />
                ) : (
                  <Image
                    src={url}
                    alt="review"
                    fill
                    sizes="100vw"
                    className="object-contain"
                    unoptimized={type === "gif"}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
