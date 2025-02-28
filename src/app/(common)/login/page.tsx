import { LoginForm } from "@/app/(common)/login/form";
import { getBackgroundImageStyle } from "@/app/bg";

export default function Login() {
  return (
    <div
      className="flex-1 bg-cover px-4 pt-24"
      style={getBackgroundImageStyle("main")}
    >
      <LoginForm />
    </div>
  );
}
