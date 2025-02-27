export type Res<T> = {
  code: number;
  data?: T;
  msg?: string;
};
