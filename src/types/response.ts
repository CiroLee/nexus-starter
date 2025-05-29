export interface Response<T = unknown> {
  code: number;
  msg?: string;
  data: T;
}
