import { getUserInfo } from "@/lib/api";

export async function Coins() {
  const res = await getUserInfo();
  return <>{res.data?.coins ?? 0}</>;
}
