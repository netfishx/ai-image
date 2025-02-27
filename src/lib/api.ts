import type { User } from "@/lib/types";
import { apiRequest } from "./request";
import { setSession } from "./session";

export async function getGuestToken() {
  const res = await apiRequest<User>({
    url: "/api/account/v1/tourist",
    method: "POST",
  });
  if (res.code === 0 && res.data) {
    await setSession(res.data);
  }
  return res;
}
