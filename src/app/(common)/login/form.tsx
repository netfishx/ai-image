"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/api";
import { Loader2 } from "lucide-react";
import Form from "next/form";
import { type FormEvent, useRef, useTransition } from "react";
import { toast } from "sonner";

export function LoginForm() {
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
      const res = await login(username, password);
      if (res.code !== 0) {
        toast.error(res?.msg ?? "登录失败");
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
            className="h-12"
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
            className="h-12"
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="animate-spin" />}
          登录
        </Button>
      </div>
    </Form>
  );
}
