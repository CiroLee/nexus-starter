import { IconGenderFemale, IconGenderMale, IconX } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Heading from '@ui/Heading';
import Tag from '@ui/Tag';
import { Button } from '@ui/Button';
import { DataList, DataListItem, DataListLabel, DataListValue } from '@ui/DataList';
import { Avatar } from '@ui/Avatar';
import { Drawer, DrawerClose } from '@ui/Drawer';
import OrderTable from './OrderTable';
import DynamicTrans from '@/components/business/DynamicTrans';
import MemberTag from './MemberTag';
import { CustomerInfo } from '@/types/user';
import { formatDate } from '@/utils/date';
import { getStatusColors } from '../utils';
import React from 'react';

interface PreviewEditDrawerProps extends React.ComponentPropsWithoutRef<typeof Drawer> {
  open?: boolean;
  userId?: string;
  customer?: CustomerInfo;
}
export default function PreviewEditDrawer({ customer, open, ...props }: PreviewEditDrawerProps) {
  const { t } = useTranslation();

  return (
    <Drawer open={open} placement="right" className="w-full max-w-2xl pt-0 outline-none md:w-[40%]" {...props}>
      <div className="border-line flex h-14 items-center justify-between border-b">
        <Heading as="h5">{t('customers.detail')}</Heading>
        <DrawerClose>
          <Button colors="neutral" variant="bordered" size="sm" asIcon>
            <IconX size={16} />
          </Button>
        </DrawerClose>
      </div>
      <div className="flex items-center pt-4">
        <div className="flex items-center gap-3">
          <Avatar src={customer?.avatarUrl} bordered />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <p className="text-sm">{customer?.name}</p>
              <MemberTag tag={customer?.memberType} text={<DynamicTrans prefix="customers.tags.">{customer?.memberType}</DynamicTrans>} />
            </div>
            <p className="flex items-center gap-1 text-xs">
              {customer?.sex === 'male' ? <IconGenderMale className="text-primary" size={16} /> : <IconGenderFemale className="text-pink-500" size={16} />}
              <DynamicTrans prefix="common.">{customer?.sex}</DynamicTrans>
            </p>
          </div>
        </div>
      </div>
      <p className="mt-8 mb-2 text-sm font-semibold">AI Profile</p>
      <div className="text-description flex flex-wrap gap-2 text-sm">
        {customer?.aiTags?.map((item, i) => (
          <Tag size="sm" colors="neutral" key={i}>
            {item}
          </Tag>
        ))}
      </div>
      <hr className="border-line relative mt-8 border-b border-dashed bg-transparent" />
      <DataList orientation="vertical" className="mt-6 grid grid-cols-2">
        <DataListItem>
          <DataListLabel>{t('customers.profile.email')}</DataListLabel>
          <DataListValue>{customer?.email}</DataListValue>
        </DataListItem>
        <DataListItem>
          <DataListLabel>{t('customers.profile.address')}</DataListLabel>
          <DataListValue>{customer?.address}</DataListValue>
        </DataListItem>
        <DataListItem>
          <DataListLabel>{t('customers.profile.phone')}</DataListLabel>
          <DataListValue>{customer?.phone}</DataListValue>
        </DataListItem>
        <DataListItem>
          <DataListLabel>{t('customers.profile.owner')}</DataListLabel>
          <DataListValue>{customer?.owner}</DataListValue>
        </DataListItem>
        <DataListItem>
          <DataListLabel>{t('customers.profile.birthday')}</DataListLabel>
          <DataListValue>{customer?.birthday && formatDate(Number(customer?.birthday), { formatStr: 'yyyy/MM/dd' })}</DataListValue>
        </DataListItem>
        <DataListItem>
          <DataListLabel>{t('customers.profile.memberType')}</DataListLabel>
          <DataListValue>
            <Tag size="sm" pill bordered colors={getStatusColors(customer?.status)}>
              <DynamicTrans prefix="customers.status.">{customer?.status}</DynamicTrans>
            </Tag>
          </DataListValue>
        </DataListItem>
      </DataList>
      <div className="mt-12">
        <div className="mb-3 flex items-center justify-between">
          <Heading as="h5">{t('orders.recentOrders')}</Heading>
          <Link to="#" className="text-primary text-sm">
            {t('actions.viewMore')}
          </Link>
        </div>
        <OrderTable data={customer?.orders || []} />
      </div>
    </Drawer>
  );
}
