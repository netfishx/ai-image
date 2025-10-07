"use server";

import axios from "axios";
import type {
  RechargeRecord,
  Record,
  Resource,
  User,
  UserInfo,
} from "@/lib/types";
import { apiRequest } from "./request";
import { getSession, setSession } from "./session";

export async function checkUser(
  inviteCode: string | null,
  revenueBusinessId: string | null,
) {
  const session = await getSession();
  if (!session) {
    await guestLogin(inviteCode, revenueBusinessId);
  }
}

export async function guestLogin(
  userName: string | null,
  revenueBusinessId: string | null,
) {
  const res = await apiRequest<User>({
    data: {
      revenueBusinessId,
      userName,
    },
    method: "POST",
    url: "/api/account/v1/tourist",
  });
  if (res.code === 0 && res.data) {
    await setSession(res.data);
  }
  return res;
}

export async function login(userName: string, password: string) {
  const res = await apiRequest<User>({
    data: {
      password,
      userName,
    },
    method: "POST",
    url: "/api/account/v1/login",
  });
  if (res.code === 0 && res.data) {
    await setSession(res.data);
  }
  return res;
}

export async function register(userName: string, password: string) {
  const session = await getSession();
  const token = session?.token;
  const res = await apiRequest<User>({
    data: {
      password,
      userName,
    },
    method: "POST",
    token,
    url: "/api/account/v1/register",
  });
  if (res.code === 0 && res.data) {
    await setSession(res.data);
  }
  return res;
}

export async function getRecords() {
  const session = await getSession();
  const token = session?.token;
  const res = await apiRequest<Record[]>({
    token,
    url: "/api/order/v1/queryOrder",
  });
  return res.data;
}

export async function upload(data: FormData) {
  const session = await getSession();
  const token = session?.token;
  const res = await axios({
    data,
    headers: {
      "Content-Type": "multipart/form-data",
      token,
    },
    maxBodyLength: 1024 * 1024 * 1024,
    method: "POST",
    url: `${process.env.BASE_URL}/api/processing/v1/upFile`,
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

export async function imageConversion({
  imageKeyA,
  imageKeyB,
  materialBid,
}: {
  imageKeyA: string;
  imageKeyB?: string;
  materialBid?: string;
}) {
  const session = await getSession();
  const token = session?.token;
  return await apiRequest({
    data: {
      imageKeyA,
      imageKeyB,
      materialBid,
    },
    method: "POST",
    token,
    url: "/api/processing/v1/imageConversion",
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
    data: { gifKey, imageKey, materialBid },
    method: "POST",
    token,
    url: "/api/processing/v1/gifConversion",
  });
}

export async function videoConversion({
  imageKey,
  videoKey,
  materialBid,
}: {
  imageKey: string;
  videoKey?: string;
  materialBid?: string;
}) {
  const session = await getSession();
  const token = session?.token;
  return await apiRequest({
    data: { imageKey, materialBid, videoKey },
    method: "POST",
    token,
    url: "/api/processing/v1/videoConversion",
  });
}

export async function takeOff(key: string) {
  const session = await getSession();
  const token = session?.token;
  return await apiRequest({
    data: { key },
    method: "POST",
    token,
    url: "/api/processing/v1/takeOff",
  });
}

export async function deleteOrder(businessId: string) {
  const session = await getSession();
  const token = session?.token;
  return await apiRequest({
    data: { businessId },
    method: "POST",
    token,
    url: "/api/order/v1/deleteOrder",
  });
}

export async function getUserInfo() {
  const session = await getSession();
  const token = session?.token;
  return await apiRequest<UserInfo>({
    token,
    url: "/api/account/v1/User",
  });
}

export async function checkDownload() {
  const session = await getSession();
  const token = session?.token;
  return await apiRequest<boolean>({
    token,
    url: "/api/account/v1/canDownloaded",
  });
}

export async function getResource(materialType: number) {
  const session = await getSession();
  const token = session?.token;
  return await apiRequest<Resource[]>({
    params: {
      materialType,
    },
    token,
    url: "/api/processing/v1/materialList",
  });
}

export async function recharge(amount: number) {
  const session = await getSession();
  const token = session?.token;
  return await apiRequest<string>({
    data: {
      amount,
    },
    method: "POST",
    token,
    url: "/api/order/v1/recharge",
  });
}

export async function getRechargeRecords() {
  const session = await getSession();
  const token = session?.token;
  return await apiRequest<RechargeRecord[]>({
    token,
    url: "/api/order/v1/queryRecharge",
  });
}
