"use client";

import { Button } from "@/components/ui/button";
import Upload from "@/components/upload";
import { upload, videoConversion } from "@/lib/api";
import { Loader2, Minus } from "lucide-react";
import Form from "next/form";
import { type FormEvent, useRef, useTransition } from "react";
import { toast } from "sonner";

export function VideoForm() {
  const ref = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    startTransition(async () => {
      if (!ref.current) {
        return;
      }
      const formData = new FormData(ref.current);
      formData.forEach((value, key) => {
        console.info(key, value);
      });
      const aFormData = new FormData();
      aFormData.append("file", formData.get("image") as File);
      const bFormData = new FormData();
      bFormData.append("file", formData.get("video") as File);
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
        <Upload type="image" name="image" />
      </div>
      <div className="flex items-center gap-2">
        <Minus className="rotate-90" />
        请上传原视频
      </div>
      <div>
        <Upload type="video" name="video" maxSize={200} />
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
