"use client";
import { Loader2 } from "lucide-react";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { type FormEvent, useRef, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { register } from "@/lib/api";

export function RegForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(async () => {
      if (!formRef.current) {
        return;
      }
      const formData = new FormData(formRef.current);
      const userName = formData.get("userName") as string;
      const password = formData.get("password") as string;
      const confirmPassword = formData.get("confirmPassword") as string;
      if (password !== confirmPassword) {
        toast.error("密码不一致");
        return;
      }
      const res = await register(userName, password);
      if (res.code !== 0) {
        toast.error(res?.msg ?? "注册失败");
      } else {
        toast.success("注册成功");
        router.replace("/personal");
      }
    });
  }

  return (
    <Form action="" onSubmit={handleSubmit} ref={formRef}>
      <div className="flex flex-col items-center gap-6 p-4">
        <div className="grid w-full gap-2">
          <Label htmlFor="userName">用户名</Label>
          <Input
            className="h-12 bg-foreground/20 backdrop-blur-sm"
            id="userName"
            name="userName"
            placeholder="请输入用户名"
            required
          />
        </div>
        <div className="grid w-full gap-2">
          <Label htmlFor="password">密码</Label>
          <Input
            className="h-12 bg-foreground/20 backdrop-blur-sm"
            id="password"
            name="password"
            placeholder="请输入密码"
            required
            type="password"
          />
        </div>
        <div className="grid w-full gap-2 pb-2">
          <Label htmlFor="confirmPassword">确认密码</Label>
          <Input
            className="h-12 bg-foreground/20 backdrop-blur-sm"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="请确认密码"
            required
            type="password"
          />
        </div>

        <Button
          className="h-12 w-full text-lg"
          disabled={isLoading}
          type="submit"
        >
          {isLoading && <Loader2 className="animate-spin" />}
          注册
        </Button>
      </div>
    </Form>
  );
}
