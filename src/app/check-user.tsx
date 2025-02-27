import { getSession } from "@/lib/session";

export async function CheckUser() {
  const session = await getSession();
  if (!session) {
  }
  return null;
}
