import { useEffect } from 'react';
import { toast } from 'sonner';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CustomerInfo } from '@/types/user';
import { Dialog, DialogClose } from '@ui/Dialog';
import FormField from '@/components/business/FormField';
import Input from '@ui/Input';
import Button from '@ui/Button';
import { mailRegex, phoneRegex } from '@/utils/regexp';
import Select from '@/components/ui/Select';
import { Radio, RadioGroup } from '@/components/ui/RadioGroup';
import { zhNames } from '@/_mock/constant';
import DatePicker from '@/components/ui/DatePicker';

interface EditDialogProps extends React.ComponentPropsWithoutRef<typeof Dialog> {
  data?: CustomerInfo;
}
export default function EditDialog({ data, ...props }: EditDialogProps) {
  const { t } = useTranslation();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CustomerInfo>();

  const handleUpdate: SubmitHandler<CustomerInfo> = (data) => {
    console.log('update data::', data);
    toast.success(t('toast.updateSucceed'), { position: 'top-right' });
  };

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);
  return (
    <Dialog {...props} hideFooter>
      <form onSubmit={handleSubmit(handleUpdate)} className="mt-6 px-4">
        <FormField id="name" name={t('customers.profile.name')} required showError={errors.name} errorMsg="name is required">
          <Input state={errors.name && 'error'} id="name" {...register('name', { required: true })} />
        </FormField>
        <FormField id="phone" name={t('customers.profile.phone')} required showError={errors.phone} errorMsg="please enter 11 digits phone number">
          <Input state={errors.phone && 'error'} id="phone" {...register('phone', { required: true, pattern: phoneRegex })} />
        </FormField>
        <FormField id="email" name={t('customers.profile.email')} required showError={errors.email} errorMsg="please enter a valid email">
          <Input state={errors.email && 'error'} id="email" {...register('email', { required: true, pattern: mailRegex })} />
        </FormField>
        <FormField id="address" name={t('customers.profile.address')} required showError={errors.address} errorMsg="address is required">
          <Input state={errors.address && 'error'} id="address" {...register('address', { required: true })} />
        </FormField>
        <FormField id="owner" name={t('customers.profile.owner')} required showError={errors.owner} errorMsg="please choose an owner">
          <Controller
            name="owner"
            control={control}
            render={({ field }) => <Select className="w-40" onValueChange={(val) => field.onChange(val)} {...field} items={zhNames.map((name) => ({ id: name, label: name, value: name }))} />}
          />
        </FormField>
        <FormField id="memberType" name={t('customers.profile.memberType')}>
          <Controller
            name="memberType"
            control={control}
            render={({ field }) => (
              <RadioGroup {...field} onValueChange={(val) => field.onChange(val)}>
                <Radio size="sm" id="ordinary" value="ordinary">
                  {t('customers.tags.ordinary')}
                </Radio>
                <Radio size="sm" id="vip" value="vip">
                  {t('customers.tags.vip')}
                </Radio>
                <Radio size="sm" id="corporate" value="corporate">
                  {t('customers.tags.corporate')}
                </Radio>
              </RadioGroup>
            )}
          />
        </FormField>
        <FormField id="sex" name={t('customers.profile.sex')}>
          <Controller
            name="sex"
            control={control}
            render={({ field }) => (
              <RadioGroup {...field} onValueChange={(val) => field.onChange(val)}>
                <Radio size="sm" id="male" value="male">
                  {t('common.male')}
                </Radio>
                <Radio size="sm" id="female" value="female">
                  {t('common.female')}
                </Radio>
              </RadioGroup>
            )}
          />
        </FormField>
        <FormField id="birthday" name={t('customers.profile.birthday')}>
          <Controller
            name="birthday"
            control={control}
            render={({ field }) => (
              <DatePicker
                className="w-40"
                defaultValue={Number(field.value)}
                onValueChange={(value) => {
                  const date = value.getTime();
                  field.onChange(date.toString());
                }}
                {...field}
              />
            )}
          />
        </FormField>
        <div className="mt-4 flex justify-end gap-2">
          <DialogClose>
            <Button type="button" colors="neutral" variant="light">
              {t('actions.cancel')}
            </Button>
          </DialogClose>
          <DialogClose>
            <Button type="submit" colors="primary">
              {t('actions.confirm')}
            </Button>
          </DialogClose>
        </div>
      </form>
    </Dialog>
  );
}
