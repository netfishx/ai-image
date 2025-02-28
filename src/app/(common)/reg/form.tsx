"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { register } from "@/lib/api";
import { Loader2 } from "lucide-react";
import Form from "next/form";
import { type FormEvent, useRef, useTransition } from "react";
import { toast } from "sonner";

export function RegForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, startTransition] = useTransition();
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(async () => {
      if (!formRef.current) {
        return;
      }
      const formData = new FormData(formRef.current);
      const username = formData.get("username") as string;
      const password = formData.get("password") as string;
      const confirmPassword = formData.get("confirmPassword") as string;
      if (password !== confirmPassword) {
        toast.error("密码不一致");
        return;
      }
      const res = await register(username, password);
      if (res.code !== 0) {
        toast.error(res?.msg ?? "注册失败");
      }
    });
  }

  return (
    <Form action="" onSubmit={handleSubmit} ref={formRef}>
      <div className="flex flex-col items-center gap-6 p-4">
        <div className="grid w-full gap-2">
          <Label htmlFor="username">用户名</Label>
          <Input
            id="username"
            name="username"
            placeholder="请输入用户名"
            className="h-12 bg-foreground/20 backdrop-blur-sm"
            required
          />
        </div>
        <div className="grid w-full gap-2">
          <Label htmlFor="password">密码</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="请输入密码"
            className="h-12 bg-foreground/20 backdrop-blur-sm"
            required
          />
        </div>
        <div className="grid w-full gap-2 pb-2">
          <Label htmlFor="confirmPassword">确认密码</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="请确认密码"
            className="h-12 bg-foreground/20 backdrop-blur-sm"
            required
          />
        </div>

        <Button
          type="submit"
          className="h-12 w-full text-lg"
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="animate-spin" />}
          注册
        </Button>
      </div>
    </Form>
  );
}
