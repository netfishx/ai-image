import { getBackgroundImageStyle } from "@/app/bg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  return (
    <div
      className="flex-1 bg-cover px-4 pt-24"
      style={getBackgroundImageStyle("main")}
    >
      <div className="flex flex-col items-center gap-6 p-4">
        <div className="grid w-full gap-2">
          <Label htmlFor="username">用户名</Label>
          <Input
            id="username"
            placeholder="请输入用户名"
            className="h-12"
            required
          />
        </div>
        <div className="grid w-full gap-2">
          <Label htmlFor="password">密码</Label>
          <Input
            id="password"
            type="password"
            placeholder="请输入密码"
            className="h-12"
            required
          />
        </div>
        <Button className="w-2/3 rounded-full bg-blue-500 text-foreground">
          登录
        </Button>
      </div>
    </div>
  );
}
