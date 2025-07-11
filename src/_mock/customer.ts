import { lorem } from './base';
import { delay } from '@/utils/utils';
import type { Response } from '@/types/response';
import { CustomerInfo } from '@/types/user';
import { customerTags, goods, zhNames } from './constant';
import { OrderItem } from '@/types/order';
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

export function getCustomerList(): Promise<Response<CustomerInfo[]>> {
  const data: CustomerInfo[] = Array.from({ length: 100 }).map(() => ({
    id: lorem.texts.string({ range: 5, source: '0123456789' }),
    name: lorem.texts.name(),
    avatarUrl: lorem.image.picsum({ random: true, width: 100 }),
    aiTags: lorem.helper.elements<string[]>(customerTags),
    phone: lorem.internet.mobile(),
    email: lorem.internet.email(),
    address: lorem.address.full(),
    sex: lorem.helper.elements<CustomerInfo['sex']>(['male', 'female']),
    memberType: lorem.helper.elements<CustomerInfo['memberType']>(['ordinary', 'vip', 'corporate']),
    status: lorem.helper.elements<CustomerInfo['status']>(['active', 'forbidden', 'reviewing', 'churned']),
    owner: lorem.helper.elements<string>(zhNames),
    orders: Array.from({ length: lorem.number.int([0, 5]) }).map(() => {
      const orderTime = lorem.date.timestamp({ from: '2020/1/1', to: '2025/12/31', ms: true });
      // paymentTime is later less than 2hours than orderTime
      const paymentTime = parseInt(orderTime) + Math.floor(Math.random() * 7200000);
      return {
        orderId: lorem.unique.nanoid(),
        productName: lorem.helper.elements<string>(goods),
        paymentAmount: lorem.number.int([10, 999]),
        paymentMethod: lorem.helper.elements<OrderItem['paymentMethod']>(['wechat', 'alipay', 'cash', 'credit', 'paypal']),
        paymentTime: paymentTime.toString(),
        orderTime,
        status: lorem.helper.elements<OrderItem['status']>(['pending', 'paid', 'processing', 'shipped', 'completed', 'cancelled', 'refunded']),
        receiver: {
          name: lorem.texts.name(),
          phone: lorem.internet.mobile(),
          address: lorem.address.full()
        }
      };
    }),
    birthday: lorem.date.timestamp({ from: '1970/1/1', to: '2020/12/31', ms: true }),
    createAt: lorem.date.timestamp({ from: '2020/1/1', to: '2025/12/31', ms: true }),
    updateAt: lorem.date.timestamp({ from: '2020/1/1', to: '2025/12/31', ms: true })
  }));

  return delay(500, () => ({ code: 200, data }));
}
