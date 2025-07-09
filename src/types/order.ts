/* simple order data structure **/
export interface OrderItem {
  orderId: string;
  productName: string;
  /** 订单金额 */
  paymentAmount: number;
  /** 支付方式 微信 | 支付宝 | 现金 | 信用卡 | PayPal */
  paymentMethod: 'wechat' | 'alipay' | 'cash' | 'credit' | 'paypal';
  /** 支付时间 */
  paymentTime: string;
  /** 下单时间 */
  orderTime: string;
  /** 订单状态 待处理 | 已支付 | 处理中 | 已发货 | 已完成 | 已取消 | 退货中 | 退货完成 */
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'completed' | 'cancelled' | 'refunded';
  receiver: {
    name: string;
    phone: string;
    address: string;
  };
}
