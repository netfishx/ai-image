"use server";

import type { Record, User } from "@/lib/types";
import axios from "axios";
import { redirect } from "next/navigation";
import { apiRequest } from "./request";
import { getSession, setSession } from "./session";

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

export async function upload(data: FormData) {
  const session = await getSession();
  const token = session?.token;
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/processing/v1/upFile`,
    method: "POST",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
      token,
    },
    maxBodyLength: 5 * 1024 * 1024,
  });
  console.group("upload");
  console.dir(res.data, { depth: null });
  console.groupEnd();
  return res.data as {
    code: number;
    data?: string;
    msg?: string;
  };
}

export async function imageConversion(imageKeyA: string, imageKeyB: string) {
  const session = await getSession();
  const token = session?.token;
  return await apiRequest({
    url: "/api/processing/v1/imageConversion",
    method: "POST",
    token,
    data: {
      imageKeyA,
      imageKeyB,
    },
  });
}

export async function gifConversion(gifKey: string, imageKey: string) {
  const session = await getSession();
  const token = session?.token;
  return await apiRequest({
    url: "/api/processing/v1/gifConversion",
    method: "POST",
    token,
    data: { gifKey, imageKey },
  });
}

export async function videoConversion(imageKey: string, videoKey: string) {
  const session = await getSession();
  const token = session?.token;
  return await apiRequest({
    url: "/api/processing/v1/videoConversion",
    method: "POST",
    token,
    data: { imageKey, videoKey },
  });
}

export async function takeOff(imageKey: string) {
  const session = await getSession();
  const token = session?.token;
  return await apiRequest({
    url: "/api/processing/v1/takeOff",
    method: "POST",
    token,
    data: { imageKey },
  });
}
