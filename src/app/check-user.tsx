import { guestLogin } from "@/lib/api";
import { getSession } from "@/lib/session";

export async function CheckUser() {
  const session = await getSession();
  if (!session) {
    const res = await guestLogin();
    console.info("guset login:", res);
  }
  return null;
}
