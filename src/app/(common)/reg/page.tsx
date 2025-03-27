import { RegForm } from "@/app/(common)/reg/form";
import { getBackgroundImageStyle } from "@/app/bg";

export default function Reg() {
  return (
    <div
      className="h-[calc(100dvh-3rem)] bg-cover px-4 pt-24"
      style={getBackgroundImageStyle("main")}
    >
      <RegForm />
    </div>
  );
}
