"use client";
import { Button } from "@/components/ui/button";
import Upload from "@/components/upload";
import { takeOff, upload } from "@/lib/api";
import { Loader2, Minus } from "lucide-react";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { type FormEvent, useRef, useTransition } from "react";
import { toast } from "sonner";

export function YjtyForm({ coins }: { coins: number }) {
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
      const file = formData.get("image") as File;
      if (!file || file.size === 0) {
        toast.error("请上传图片");
        return;
      }
      aFormData.append("file", file);
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
      <div className="flex items-center gap-2">
        <Minus className="rotate-90" />
        请上传您需要脱衣的图片
      </div>
      <div>
        <Upload type="image" name="image" />
      </div>
      <div className="flex items-center justify-between gap-2 px-8 text-xs">
        <span>
          消耗金币：<span className="text-gold">10</span>
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
