import { Coins } from "@/components/coins";
import { RefreshButton } from "@/components/refresh";
import { getSession } from "@/lib/session";
import { CircleDollarSign } from "lucide-react";

export async function UserName() {
  const session = await getSession();

  return (
    <div className="flex items-center gap-1 text-sm">
      <span>{session?.userName ?? ""}</span>
      <CircleDollarSign className="size-4 text-amber-400" />
      <span>
        <Coins />
      </span>
      <RefreshButton className="size-4 text-foreground" />
    </div>
  );
}
