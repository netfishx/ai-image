import { z } from "zod";

export type Res<T> = {
  code: number;
  data?: T;
  msg?: string;
};

export const UserSchema = z.object({
  userName: z.string(),
  token: z.string(),
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
