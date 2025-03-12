"use server";

import type { Record, Resource, User, UserInfo } from "@/lib/types";
import axios from "axios";
import { redirect } from "next/navigation";
import { apiRequest } from "./request";
import { getSession, setSession } from "./session";

export async function checkUser(inviteCode: string | null) {
  const session = await getSession();
  if (!session) {
    await guestLogin(inviteCode);
  }
}

export async function guestLogin(userName: string | null) {
  const res = await apiRequest<User>({
    url: "/api/account/v1/tourist",
    method: "POST",
    data: {
      userName,
    },
  });
  if (res.code === 0 && res.data) {
    await setSession(res.data);
  }
  return res;
}

export async function login(userName: string, password: string) {
  const res = await apiRequest<User>({
    url: "/api/account/v1/login",
    method: "POST",
    data: {
      userName,
      password,
    },
  });
  if (res.code === 0 && res.data) {
    await setSession(res.data);
    return redirect("/yjty");
  }
  return res;
}

export async function register(userName: string, password: string) {
  const session = await getSession();
  const token = session?.token;
  const res = await apiRequest<User>({
    url: "/api/account/v1/register",
    method: "POST",
    token,
    data: {
      userName,
      password,
    },
  });
  if (res.code === 0 && res.data) {
    await setSession(res.data);
    return redirect("/yjty");
  }
  return res;
}

export async function getRecords() {
  const session = await getSession();
  const token = session?.token;
  const res = await apiRequest<Record[]>({
    url: "/api/order/v1/queryOrder",
    token,
  });
  return res.data;
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
    maxBodyLength: 1024 * 1024 * 1024,
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

export async function gifConversion({
  gifKey,
  imageKey,
  materialBid,
}: {
  gifKey?: string;
  imageKey: string;
  materialBid?: string;
}) {
  const session = await getSession();
  const token = session?.token;
  return await apiRequest({
    url: "/api/processing/v1/gifConversion",
    method: "POST",
    token,
    data: { gifKey, imageKey, materialBid },
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

export async function takeOff(key: string) {
  const session = await getSession();
  const token = session?.token;
  return await apiRequest({
    url: "/api/processing/v1/takeOff",
    method: "POST",
    token,
    data: { key },
  });
}

export async function deleteOrder(businessId: string) {
  const session = await getSession();
  const token = session?.token;
  return await apiRequest({
    url: "/api/order/v1/deleteOrder",
    method: "POST",
    token,
    data: { businessId },
  });
}

export async function getUserInfo() {
  const session = await getSession();
  const token = session?.token;
  return await apiRequest<UserInfo>({
    url: "/api/account/v1/User",
    token,
  });
}

export async function checkDownload() {
  const session = await getSession();
  const token = session?.token;
  return await apiRequest<boolean>({
    url: "/api/account/v1/canDownloaded",
    token,
  });
}

export async function getResource(materialType: number) {
  const session = await getSession();
  const token = session?.token;
  return await apiRequest<Resource[]>({
    url: "/api/processing/v1/materialList",
    token,
    params: {
      materialType,
    },
  });
}

export async function recharge(amount: number) {
  const session = await getSession();
  const token = session?.token;
  return await apiRequest<string>({
    url: "/api/order/v1/recharge",
    method: "POST",
    token,
    data: {
      amount,
    },
  });
}
