"use client";

import { Upload } from "@/app/(games)/step/upload";
import mb from "@/assets/mb.png";
import { Button } from "@/components/ui/button";
import {
  gifConversion,
  imageConversion,
  upload,
  videoConversion,
} from "@/lib/api";
import { resourceAtom } from "@/lib/store";
import type { Res } from "@/lib/types";
import { rgbDataURL } from "@/lib/utils";
import { useAtomValue } from "jotai";
import { Loader2, Minus } from "lucide-react";
import Form from "next/form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useRef, useTransition } from "react";
import { toast } from "sonner";
export function UploadForm({ coins, type }: { coins: number; type: string }) {
  const resource = useAtomValue(resourceAtom);
  const ref = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(async () => {
      if (!ref.current) {
        return;
      }
      const formData = new FormData(ref.current);
      const file = formData.get("face") as File;
      if (!file || file.size === 0) {
        toast.error("请上传脸部信息");
        return;
      }
      const aFormData = new FormData();
      aFormData.append("file", file);
      const aRes = await upload(aFormData);

      if (aRes.code !== 0) {
        toast.error(aRes.msg ?? "上传失败");
        return;
      }
      let res: Res<unknown> | null = null;
      switch (type) {
        case "1":
          res = await imageConversion({
            imageKeyA: aRes.data ?? "",
            materialBid: resource?.businessId ?? "",
          });
          break;
        case "2":
          res = await gifConversion({
            imageKey: aRes.data ?? "",
            materialBid: resource?.businessId ?? "",
          });
          break;
        case "3":
          res = await videoConversion({
            imageKey: aRes.data ?? "",
            materialBid: resource?.businessId ?? "",
          });
          break;
        default:
          break;
      }
      console.info(res);
      if (res?.code !== 0) {
        toast.error(res?.msg ?? "上传失败");
        return;
      }
      toast.success(res?.msg ?? "开始制作");
      router.replace("/records");
    });
  }

  useEffect(() => {
    if (!resource) {
      router.replace("/personal");
    }
  }, [resource, router.replace]);
  return (
    <Form action="" ref={ref} onSubmit={handleSubmit}>
      <div className="p-4">
        <div className="relative h-50 w-full">
          <Image
            src={resource?.materialUrl ?? ""}
            alt="gif"
            fill
            placeholder="blur"
            blurDataURL={rgbDataURL(200, 200, 200)}
            className="rounded-lg object-cover"
            sizes="100vw"
          />
        </div>
      </div>
      <div className="flex items-center justify-between px-1 text-lg">
        <div className="flex items-center gap-2">
          <Minus className="rotate-90" />
          上传脸部信息
        </div>
        <span className="text-xs">(请上传正脸照，五官清晰)</span>
      </div>
      <div className="p-4">
        <div className="flex rounded-2xl bg-gradient-to-r from-neutral-100 to-sky-200 py-4">
          <div className="w-3/5 p-4">
            <Image src={mb} alt="mb" width={424} height={292} />
          </div>
          <div className="flex-1 p-4">
            <Upload name="face" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-4 gap-2 rounded-full bg-primary px-4 py-2 text-sm *:flex *:flex-col *:items-center *:justify-center">
          <div>
            <span className="text-amber-400 text-xs">
              {resource?.materialCoins ?? 0}
            </span>
            <span>消耗金币</span>
          </div>
          <div>
            <span className="text-amber-400 text-xs">0</span>
            <span>剩余次数</span>
          </div>
          <div>
            <span className="text-amber-400 text-xs">{coins}.00</span>
            <span>账户余额</span>
          </div>
          <div>
            <Button
              type="submit"
              className="rounded-full bg-amber-400 text-sm"
              size="sm"
              disabled={isPending}
            >
              {isPending && <Loader2 className="animate-spin" />}
              开始制作
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
}
