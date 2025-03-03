import { getSession } from "@/lib/session";

export async function UserName() {
  const session = await getSession();
  const userName = session?.userName;
  return <span>{userName ?? ""}</span>;
}
