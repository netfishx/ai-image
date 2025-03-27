"use client";

import { Button } from "@/components/ui/button";
import Upload from "@/components/upload";
import { imageConversion, upload } from "@/lib/api";
import { Loader2, Minus } from "lucide-react";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { type FormEvent, useRef, useTransition } from "react";
import { toast } from "sonner";

export function ImageForm({ coins }: { coins: number }) {
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

      const aFormData = new FormData();
      const face = formData.get("face") as File;
      if (!face || face.size === 0) {
        toast.error("请上传脸部照片");
        return;
      }
      aFormData.append("file", face);
      const bFormData = new FormData();
      const image = formData.get("image") as File;
      if (!image || image.size === 0) {
        toast.error("请上传原图");
        return;
      }
      bFormData.append("file", image);
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
      const res = await imageConversion({
        imageKeyA: aRes.data ?? "",
        imageKeyB: bRes.data ?? "",
      });
      console.info(res);
      if (res.code !== 0) {
        toast.error(res.msg ?? "上传失败");
        return;
      }
      toast.success(res.msg ?? "开始制作");
      router.replace("/records");
    });
  }
  return (
    <Form
      action=""
      onSubmit={handleSubmit}
      ref={ref}
      className="flex flex-col gap-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Minus className="rotate-90" />
          请上传脸部照片
        </div>
      </div>
      <div>
        <Upload type="image" name="face" />
      </div>
      <div className="flex items-center gap-2">
        <Minus className="rotate-90" />
        请上传原图
      </div>
      <div>
        <Upload type="image" name="image" />
      </div>
      <div className="flex items-center justify-between gap-2 px-8 text-xs">
        <span>
          消耗金币：<span className="text-gold">8</span>
        </span>
        <span>
          金币：
          <span className="text-gold">{coins}</span>
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
