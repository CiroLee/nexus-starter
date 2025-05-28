import TinyLorem from 'tiny-lorem';
import type { Response } from '@/types/response';
const lorem = new TinyLorem();
const goodNames = ['apple', 'banana', 'orange'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export interface SalesRes {
  key: string;
  data: {
    key: string;
    data: number;
  }[];
}
export function getSalesMonthly(): Promise<Response<SalesRes[]>> {
  const data = months.map((item) => ({
    key: item,
    data: goodNames.map((good) => ({
      key: good,
      data: lorem.number.int([100, 999])
    }))
  }));

  return Promise.resolve({
    code: 200,
    data
  });
}
