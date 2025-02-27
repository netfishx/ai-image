import { getGuestToken } from "@/lib/api";
import { getSession } from "@/lib/session";

export async function CheckUser() {
  const session = await getSession();
  if (!session) {
    const res = await getGuestToken();
    console.info("guset login:", res);
  }
  return null;
}
