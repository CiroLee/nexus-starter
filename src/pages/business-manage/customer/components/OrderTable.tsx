import { useTranslation } from 'react-i18next';
import Tag from '@ui/Tag';
import { Table, TableHeader, TableHeaderCell, TableBody, TableCell, TableRow } from '@ui/Table';
import Empty from '@/components/business/Empty';
import { OrderItem } from '@/types/order';
import { formatDate } from '@/utils/date';
import DynamicTrans from '@/components/business/DynamicTrans';
import { formatCurrency } from '@/utils/number';
interface OrderTableProps {
  data: OrderItem[];
}
export default function OrderTable({ data }: OrderTableProps) {
  const { t } = useTranslation();
  return (
    <>
      {data.length ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>{t('orders.orderId')}</TableHeaderCell>
              <TableHeaderCell>{t('orders.productName')}</TableHeaderCell>
              <TableHeaderCell>{t('orders.paymentAmount')}</TableHeaderCell>
              <TableHeaderCell>{t('orders.paymentTime')}</TableHeaderCell>
              <TableHeaderCell>{t('orders.orderTime')}</TableHeaderCell>
              <TableHeaderCell>{t('orders.status.DEFAULT')}</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.orderId}>
                <TableCell className="text-primary cursor-pointer underline underline-offset-4">{item.orderId.slice(0, 10)}</TableCell>
                <TableCell>{item.productName}</TableCell>
                <TableCell>{formatCurrency(item.paymentAmount, 'USD', 'en-US')}</TableCell>
                <TableCell>{formatDate(Number(item.paymentTime))}</TableCell>
                <TableCell>{formatDate(Number(item.orderTime))}</TableCell>
                <TableCell className="min-w-20">
                  <Tag size="sm" colors={item.status === 'refunded' ? 'danger' : 'secondary'}>
                    <DynamicTrans prefix="orders.status.">{item.status}</DynamicTrans>
                  </Tag>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Empty className="border-line h-60 rounded-md border" />
      )}
    </>
  );
}
