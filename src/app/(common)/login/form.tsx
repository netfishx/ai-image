"use client";
import { Loader2 } from "lucide-react";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { type FormEvent, useRef, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/api";

export function LoginForm() {
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
      const res = await login(userName, password);
      if (res.code !== 0) {
        toast.error(res?.msg ?? "登录失败");
      } else {
        toast.success("登录成功");
        router.replace("/yjty");
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
        <div className="grid w-full gap-2 pb-2">
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
        <Button
          className="h-12 w-full text-lg"
          disabled={isLoading}
          type="submit"
        >
          {isLoading && <Loader2 className="animate-spin" />}
          登录
        </Button>
      </div>
    </Form>
  );
}
