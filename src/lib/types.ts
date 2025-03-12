import { z } from "zod";

export type Res<T> = {
  code: number;
  data?: T;
  msg?: string;
};

export const UserSchema = z.object({
  userName: z.string(),
  token: z.string(),
  coins: z.number().nullable(),
});

export type User = z.infer<typeof UserSchema>;

export type Record = {
  businessId: string;
  businessTypeId: number;
  orderName: string;
  createdTime: string;
  productionStatus: number;
  processingResult: string;
  originalMaterial: string;
};

export type UserInfo = {
  userName: string;
  coins: number;
};

export type Resource = {
  businessId: string;
  materialUrl: string;
  materialCoins: number;
  materialType: number;
};

export type RechargeRecord = {
  businessId: string;
  rechargeAmount: number;
  coinsReceived: number;
  createdTime: number;
  rechargeStatus: number;
};
