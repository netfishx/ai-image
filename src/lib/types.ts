import { z } from "zod";

export type Res<T> = {
  code: number;
  data?: T;
  msg?: string;
};

export const UserSchema = z.object({
  username: z.string(),
  token: z.string(),
});

export type User = z.infer<typeof UserSchema>;
