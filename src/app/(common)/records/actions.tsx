"use client";
import { useSetAtom } from "jotai";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { checkDownload, deleteOrder } from "@/lib/api";
import { downloadAlertAtom } from "@/lib/store";
import { cn } from "@/lib/utils";

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
          <Button asChild className="px-0" size="sm" variant="ghost">
            {url ? (
              <Button
                className="px-0"
                disabled={isDownloading}
                onClick={() => handleDownloadOrder(url)}
                size="sm"
                variant="ghost"
              >
                {isDownloading && <Loader2 className="animate-spin" />}
                下载作品
              </Button>
            ) : (
              <span>下载作品</span>
            )}
          </Button>
          <Button
            className="px-0"
            disabled={isPending}
            onClick={handleDeleteOrder}
            size="sm"
            variant="ghost"
          >
            {isPending && <Loader2 className="animate-spin" />}
            删除作品
          </Button>
        </div>
        {url && (
          <Button
            className="group flex items-center gap-1 px-0 hover:opacity-80"
            disabled={!url}
            onClick={() => setIsOpen(!isOpen)}
            size="sm"
            variant="ghost"
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
                    className="object-contain"
                    height={196}
                    muted
                    playsInline
                    src={url}
                    width={304}
                  />
                ) : (
                  <Image
                    alt="review"
                    className="object-contain"
                    fill
                    sizes="100vw"
                    src={url}
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
