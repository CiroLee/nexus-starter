import TinyLorem from 'tiny-lorem';
import type { Response } from '@/types/response';
import { type ChartDataTypes } from 'reaviz';
const lorem = new TinyLorem();

// sales summary
const goodNames = ['expense', 'revenue'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

interface GoodsData {
  key: ChartDataTypes;
  data: number;
}
export interface GoodsRes {
  key: string;
  data: GoodsData[];
}
export function getSalesSummary(): Promise<Response<GoodsRes[]>> {
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

// revenue contrast
const days = [
  new Date('2024/5/4'),
  new Date('2024/5/6'),
  new Date('2024/5/8'),
  new Date('2024/5/10'),
  new Date('2024/5/12'),
  new Date('2024/5/14'),
  new Date('2024/5/16'),
  new Date('2024/5/18'),
  new Date('2024/5/20'),
  new Date('2024/5/22'),
  new Date('2024/5/24'),
  new Date('2024/5/26'),
  new Date('2024/5/28'),
  new Date('2024/5/30')
];

export function getRevenueContrast(): Promise<Response<GoodsRes[]>> {
  const data = ['this month', 'last month'].map((item) => ({
    key: item,
    data: days.map((d) => ({
      key: d,
      data: lorem.number.int([20, 200])
    }))
  }));

  return Promise.resolve({
    code: 200,
    data
  });
}
