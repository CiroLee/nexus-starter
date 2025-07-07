import { IconGenderFemale, IconGenderMale, IconPencil } from '@tabler/icons-react';
import Heading from '@ui/Heading';
import Tag from '@ui/Tag';
import Button from '@ui/Button';
import { Avatar } from '@ui/Avatar';
import { Drawer } from '@ui/Drawer';
import { IconX } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { CustomerInfo } from '@/types/user';
import DynamicTrans from '@/components/business/DynamicTrans';
interface PreviewEditDrawerProps {
  mode?: 'preview' | 'edit';
  open?: boolean;
  customer?: CustomerInfo;
  onClose?: () => void;
}
export default function PreviewEditDrawer({ open, customer, onClose }: PreviewEditDrawerProps) {
  const { t } = useTranslation();
  console.log('customer::', customer);
  return (
    <Drawer open={open} placement="right" className="w-full max-w-2xl pt-0 outline-none md:w-[40%]" onOpenChange={onClose}>
      <div className="border-line flex h-14 items-center justify-between border-b">
        <Heading as="h5">{t('customers.detail')}</Heading>
        <Button colors="neutral" variant="bordered" size="sm" asIcon onClick={onClose}>
          <IconX size={16} />
        </Button>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div className="flex items-center gap-3">
          <Avatar src={customer?.avatarUrl} bordered />
          <div className="space-y-1">
            <p className="text-sm">{customer?.name}</p>
            <p className="flex items-center gap-1 text-xs">
              {customer?.sex === 'male' ? <IconGenderMale className="text-primary" size={16} /> : <IconGenderFemale className="text-pink-500" size={16} />}
              <DynamicTrans prefix="common.">{customer?.sex || ''}</DynamicTrans>
            </p>
          </div>
        </div>
        <Button size="sm" className="gap-1">
          <IconPencil size={18} />
          {t('actions.edit')}
        </Button>
      </div>
      <p className="mt-8 mb-2 text-sm font-semibold">Profile (AI generated)</p>
      <div className="text-description flex gap-2 text-sm">
        {customer?.aiTags?.map((item, i) => (
          <Tag size="sm" colors="neutral" key={i}>
            {item}
          </Tag>
        ))}
      </div>
    </Drawer>
  );
}
