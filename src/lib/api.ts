"use server";

import type { Record, User } from "@/lib/types";
import { redirect } from "next/navigation";
import { apiRequest } from "./request";
import { setSession } from "./session";

export async function guestLogin() {
  const res = await apiRequest<User>({
    url: "/api/account/v1/tourist",
    method: "POST",
  });
  if (res.code === 0 && res.data) {
    await setSession(res.data);
  }
  return res;
}

export async function login(username: string, password: string) {
  const res = await apiRequest<User>({
    url: "/api/account/v1/login",
    method: "POST",
    data: {
      userName: username,
      password,
    },
  });
  if (res.code === 0 && res.data) {
    await setSession(res.data);
    return redirect("/");
  }
  return res;
}

export async function register(username: string, password: string) {
  const res = await apiRequest<User>({
    url: "/api/account/v1/register",
    method: "POST",
    data: {
      userName: username,
      password,
    },
  });
  if (res.code === 0 && res.data) {
    await setSession(res.data);
  }
  return res;
}

export async function getRecords() {
  const res = await apiRequest<Record[]>({
    url: "/api/record/v1/list",
  });
  return [1, 2, 3];
}
