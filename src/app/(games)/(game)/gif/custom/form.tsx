"use client";

import { Button } from "@/components/ui/button";
import Upload from "@/components/upload";
import { gifConversion, upload } from "@/lib/api";
import { Loader2, Minus } from "lucide-react";
import Form from "next/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useRef, useTransition } from "react";
import { toast } from "sonner";

export function GifForm() {
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
      formData.forEach((value, key) => {
        console.info(key, value);
      });
      const aFormData = new FormData();
      aFormData.append("file", formData.get("gif") as File);
      const bFormData = new FormData();
      bFormData.append("file", formData.get("image") as File);
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
      const res = await gifConversion({
        gifKey: aRes.data ?? "",
        imageKey: bRes.data ?? "",
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
        <Button className="rounded-full" size="sm" asChild>
          <Link href="/gif">返回列表</Link>
        </Button>
      </div>
      <div>
        <Upload type="image" name="image" />
      </div>
      <div className="flex items-center gap-2">
        <Minus className="rotate-90" />
        请上传原GIF
      </div>
      <div>
        <Upload type="image" name="gif" />
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
