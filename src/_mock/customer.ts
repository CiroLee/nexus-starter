import { lorem } from './base';
import { delay } from '@/utils/utils';
import type { Response } from '@/types/response';
interface CustomerData {
  key: Date;
  data: number;
}

interface CustomerItem {
  list: CustomerData[];
  total: number;
}

interface CustomerMetrics {
  total: CustomerItem;
  news: CustomerItem;
  churns: CustomerItem;
  refunds: CustomerItem;
}
export function getCustomerMetrics(): Promise<Response<CustomerMetrics>> {
  let total = 1934;
  let news = 0;
  let churns = 10;
  let refunds = 12;

  const totalList = Array.from({ length: 10 }).map((_, i) => {
    const key = new Date(2025, 3, i + 1);
    total += lorem.number.int([50, 400]);
    return {
      key,
      data: total
    };
  });
  const newsList = Array.from({ length: 10 }).map((_, i) => {
    const key = new Date(2025, 1, i + 1);
    news += lorem.number.int([1, 5]);
    return {
      key,
      data: news
    };
  });

  const churnsList = Array.from({ length: 10 }).map((_, i) => {
    const key = new Date(2025, 1, i + 1);
    churns += lorem.number.int([-1, 0]);
    return {
      key,
      data: churns
    };
  });

  const refundsList = Array.from({ length: 10 }).map((_, i) => {
    const key = new Date(2025, 1, i + 1);
    refunds += lorem.number.int([-1, 0]);
    return {
      key,
      data: refunds
    };
  });
  const data: CustomerMetrics = {
    total: {
      total: totalList[totalList.length - 1].data,
      list: totalList
    },
    news: {
      total: newsList[newsList.length - 1].data,
      list: newsList
    },
    churns: {
      total: 0.0021,
      list: churnsList
    },
    refunds: {
      total: refundsList[refundsList.length - 1].data,
      list: refundsList
    }
  };

  return delay(500, () => ({ code: 200, data }));
}
