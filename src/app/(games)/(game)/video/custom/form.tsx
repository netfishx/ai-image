"use client";

import { Button } from "@/components/ui/button";
import Upload from "@/components/upload";
import { upload, videoConversion } from "@/lib/api";
import { Loader2, Minus } from "lucide-react";
import Form from "next/form";
import { type FormEvent, useRef, useTransition } from "react";
import { toast } from "sonner";

export function VideoForm({ coins }: { coins: number }) {
  const ref = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    startTransition(async () => {
      if (!ref.current) {
        return;
      }
      const formData = new FormData(ref.current);

      const aFormData = new FormData();
      const face = formData.get("face") as File;
      if (!face || face.size === 0) {
        toast.error("请上传脸部照片");
        return;
      }
      aFormData.append("file", face);
      const bFormData = new FormData();
      const video = formData.get("video") as File;
      if (!video || video.size === 0) {
        toast.error("请上传原视频");
        return;
      }
      bFormData.append("file", video);
      const [aRes, bRes] = await Promise.all([
        upload(aFormData),
        upload(bFormData),
      ]);
      console.info(aRes, bRes);
      if (aRes.code !== 0) {
        toast.error(aRes.msg ?? "上传失败");
        return;
      }
      if (bRes.code !== 0) {
        toast.error(bRes.msg ?? "上传失败");
        return;
      }
      const res = await videoConversion(aRes.data ?? "", bRes.data ?? "");
      console.info(res);
      if (res.code !== 0) {
        toast.error(res.msg ?? "上传失败");
        return;
      }
      toast.success(res.msg ?? "开始制作");
    });
  }
  return (
    <Form
      action=""
      onSubmit={handleSubmit}
      ref={ref}
      className="flex flex-col gap-4"
    >
      <div className="flex items-center gap-2">
        <Minus className="rotate-90" />
        请上传脸部照片
      </div>
      <div>
        <Upload type="image" name="face" />
      </div>
      <div className="flex items-center gap-2">
        <Minus className="rotate-90" />
        请上传原视频
      </div>
      <div>
        <Upload type="video" name="video" maxSize={20} />
      </div>
      <div className="flex items-center justify-between gap-2 px-8 text-xs">
        <span>
          消耗金币：<span className="text-amber-400">45</span>
        </span>
        <span>
          金币：
          <span className="text-amber-400">{coins}</span>
        </span>
        <span>免费次数：0</span>
      </div>
      <div className="flex justify-center px-8">
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <Loader2 className="animate-spin" />}
          立刻制作
        </Button>
      </div>
    </Form>
  );
}
