"use client";

import { Button } from "@/components/ui/button";
import Upload from "@/components/upload";
import { takeOff, upload } from "@/lib/api";
import { Loader2, Minus } from "lucide-react";
import Form from "next/form";
import { type FormEvent, useRef, useTransition } from "react";
import { toast } from "sonner";

export function YjtyForm() {
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
      const aRes = await upload(aFormData);
      console.info(aRes);
      if (aRes.code !== 0) {
        toast.error(aRes.msg ?? "上传失败");
        return;
      }
      const res = await takeOff(aRes.data ?? "");
      console.info(res);
      if (res.code !== 0) {
        toast.error(res.msg ?? "上传失败");
        return;
      }
      toast.success("开始制作");
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
        请上传您需要脱衣的图片
      </div>
      <div>
        <Upload type="image" name="image" />
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
